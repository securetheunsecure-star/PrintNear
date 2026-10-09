# Setup guide

## 1. Install prerequisites

- Node.js 18+
- npm
- A Supabase project
- A Stripe test account

## 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in values:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`

## 3. Supabase setup

- Create a new Supabase project.
- Create tables for `profiles`, `printers`, `printer_availability`, `orders`, `order_documents`, `payments`, `reviews`, and `platform_settings`.
- Enable Row Level Security on all tables.
- Create a private bucket named `documents`.
- Add storage policies for customer, provider, and admin access.

## 4. Stripe setup

- Use Stripe test mode.
- Set up a product or checkout flow for sandbox payment simulation.
- Configure webhook forwarding to `/api/webhooks/stripe`.
- Test successful and failed payment events.

## 5. Run the app

```bash
npm install
npm run dev
```

## 6. Recommended MVP validations

- Customer can search providers by postal code.
- Provider can set printer profile and prices.
- Customer can upload a PDF and review the quote.
- Order lifecycle updates as the provider accepts or rejects the job.
- Payment status is updated only once.
