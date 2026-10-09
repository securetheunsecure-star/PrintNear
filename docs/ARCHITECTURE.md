# Architecture

## System overview

The application uses a single Next.js app connected to a single PostgreSQL database in Supabase. The app manages customer experiences, provider operations, and admin controls without introducing separate services.

## Core entities

- `profiles`: user identity and role metadata
- `printers`: provider printer profiles and pricing
- `printer_availability`: enabled/disabled schedule and service radius
- `orders`: print jobs and status tracking
- `order_documents`: uploaded PDF metadata and private storage references
- `payments`: Stripe/payment events and idempotency keys
- `reviews`: post-order customer reviews
- `platform_settings`: commission and policy configuration

## Request flow

1. Customer enters location or postal code.
2. App queries available printers within radius.
3. Customer selects a provider, uploads PDF, and configures print options.
4. Next.js server calculates pricing and records an order.
5. Payment provider confirms payment via webhook.
6. Provider accepts or rejects the order.
7. Provider marks the order ready for collection and the customer verifies pickup code.

## Security model

- Use public pages for non-sensitive content.
- Use Supabase auth for all authenticated flows.
- Use server-side validation and signed URLs for document access.
- Use RLS to isolate customer orders, provider jobs, and admin actions.

## Operational model

- Single app deployment for frontend and backend routes.
- Single database for all transaction and metadata records.
- Stripe test mode for initial launch and validation.
