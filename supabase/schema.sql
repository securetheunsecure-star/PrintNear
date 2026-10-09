-- Required tables for PrintNear MVP
-- Run this in a Supabase SQL editor.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  role text not null default 'customer' check (role in ('customer', 'provider', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.printers (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  name text not null,
  description text,
  service_area text,
  postal_code text,
  latitude double precision,
  longitude double precision,
  is_available boolean not null default true,
  supports_colour boolean not null default true,
  supports_duplex boolean not null default true,
  paper_sizes text[] not null default array['A4'],
  bw_price_cents integer not null default 15,
  colour_price_cents integer not null default 40,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.printer_availability (
  id uuid primary key default gen_random_uuid(),
  printer_id uuid references public.printers(id) on delete cascade,
  monday boolean not null default true,
  tuesday boolean not null default true,
  wednesday boolean not null default true,
  thursday boolean not null default true,
  friday boolean not null default true,
  saturday boolean not null default false,
  sunday boolean not null default false,
  start_time text not null default '09:00',
  end_time text not null default '18:00',
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.profiles(id) on delete set null,
  printer_id uuid references public.printers(id) on delete set null,
  status text not null default 'PENDING_PAYMENT' check (status in ('PENDING_PAYMENT','PAID','ACCEPTED','PRINTING','READY_FOR_COLLECTION','COMPLETED','REJECTED','CANCELLED','REFUND_PENDING','REFUNDED','FAILED')),
  payment_status text not null default 'UNPAID' check (payment_status in ('UNPAID','PENDING','PAID','REFUND_PENDING','REFUNDED','FAILED')),
  print_mode text not null default 'bw' check (print_mode in ('bw','colour')),
  duplex boolean not null default true,
  copies integer not null default 1,
  page_count integer not null default 1,
  subtotal_cents integer not null default 0,
  service_fee_cents integer not null default 50,
  platform_fee_cents integer not null default 0,
  gst_cents integer not null default 0,
  total_cents integer not null default 0,
  pickup_code text,
  collection_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_documents (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  file_name text not null,
  storage_path text not null,
  file_size_bytes integer not null default 0,
  mime_type text not null default 'application/pdf',
  uploaded_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  provider_id uuid references public.profiles(id),
  customer_id uuid references public.profiles(id),
  payment_provider text not null default 'stripe',
  provider_payment_id text,
  amount_cents integer not null default 0,
  currency text not null default 'SGD',
  status text not null default 'PENDING' check (status in ('PENDING','PAID','REFUND_PENDING','REFUNDED','FAILED')),
  idempotency_key text not null,
  webhook_event_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references public.orders(id) on delete cascade,
  customer_id uuid references public.profiles(id),
  provider_id uuid references public.profiles(id),
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.platform_settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text not null,
  description text,
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

create index if not exists idx_printers_owner_id on public.printers(owner_id);
create index if not exists idx_orders_customer_id on public.orders(customer_id);
create index if not exists idx_orders_printer_id on public.orders(printer_id);
create index if not exists idx_payments_order_id on public.payments(order_id);

-- Core RLS policies are intended to be enabled in Supabase, but are intentionally lightweight here.
-- Example: enable row level security and add policy stubs in Supabase UI for auth role-based access.
