# PrintNear

PrintNear is a simple Singapore-based print marketplace designed to connect customers with local printer owners.

## Current status

This repository now includes a working MVP frontend shell and the first set of business logic designed for the requested customer-to-provider marketplace flow.

### Included

- Next.js + TypeScript + Tailwind foundation
- Landing page and core marketplace UI
- Customer order flow screens
- Provider dashboard and printer management screens
- Admin overview screens
- Business logic for quote calculation and validation
- API route stubs for quote and health checks
- Supabase schema for the required database tables
- Test coverage for the quote engine
- Setup, architecture, security, payments, and deployment docs

### Planned next integration steps

- Supabase auth and database wiring
- Real PDF upload and page counting on the server
- Stripe sandbox checkout and webhook verification
- RLS and policy enforcement in Supabase
- Provider acceptance/rejection and refund workflow

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
