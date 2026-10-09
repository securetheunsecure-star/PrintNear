# PrintNear

PrintNear is a Next.js + TypeScript marketplace for on-demand printing in Singapore. Customers can find nearby home printer owners, upload a PDF, configure print options, and pay in sandbox mode. Providers can set pricing, accept and reject orders, and manage collection status.

## Features

- Customer registration and login
- Nearby printer search by postal code or location
- Printable quote calculation with PDF page counting and configurable print options
- Sandbox payments and basic refund flow
- Provider dashboard for pricing, availability, and orders
- Admin dashboard for platform settings and oversight
- Privacy-first document storage using Supabase private buckets
- Row Level Security design for customer, provider, and admin access

## Tech stack

- Next.js 14 + TypeScript
- Tailwind CSS
- Supabase PostgreSQL + auth + storage
- Stripe test mode for payment integration

## Local development

1. Install dependencies:
   npm install
2. Copy `.env.example` to `.env.local` and fill in secrets.
3. Start the app:
   npm run dev
4. Open http://localhost:3000

## Scripts

- `npm run dev` - start local development server
- `npm run build` - production build
- `npm run lint` - lint the app
- `npm run test` - run business-logic tests

## Deployment notes

This MVP is designed for a single app + single database. Use Supabase for auth and data, Stripe in sandbox mode, and a single Next.js deployment target in Vercel or an equivalent platform.

## Security reminders

- Never commit real credentials or production secrets.
- Use Supabase RLS to restrict access.
- Keep all document links private and short-lived.
- Use verified payment webhooks and idempotent order handling.
