# PrintNear

PrintNear is a simple Singapore-based print marketplace designed to connect customers with local printer owners.

## Current status

This repository now includes the full MVP flow for the requested customer-to-provider marketplace, including working UI screens, Supabase-ready auth/database hooks, secured PDF validation, Stripe sandbox payment routing, provider decision workflows, and the testing/docs layer needed to move to a live deployment.

### Included

- Next.js + TypeScript + Tailwind foundation
- Landing page and core marketplace UI
- Customer order flow screens
- Provider dashboard and printer management screens
- Admin overview screens
- Business logic for quote calculation and validation
- API route stubs and full sandbox integrations for quote, upload, auth, orders, and payment flows
- Supabase schema for the required database tables
- Secure PDF validation and page-count estimation
- Stripe sandbox checkout preparation and webhook verification path
- Provider accept/reject lifecycle handling
- Test coverage for pricing and validation logic
- Setup, architecture, security, payments, startup, and testing docs

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Supabase
- Stripe test mode

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Scripts

- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run test`

## Documentation

- `docs/SETUP.md`
- `docs/ARCHITECTURE.md`
- `docs/SECURITY.md`
- `docs/PAYMENTS.md`
- `docs/DEPLOYMENT.md`
- `docs/TESTING.md`

## Important runtime notes

- Supabase auth and database wiring work in sandbox mode when no environment variables are configured.
- PDF uploads are validated on the server and reject non-PDF files or oversized uploads.
- Stripe mode defaults to a sandbox-safe response unless real secret keys are present.
- Provider order status updates are handled through the order lifecycle API so the workflow can be extended to a persistent database later.
