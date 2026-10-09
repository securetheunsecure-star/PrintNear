# Security

## Core principles

- Use Supabase auth and strict database permissions.
- Validate all incoming form data on the server.
- Only allow PDF uploads under configured size limits.
- Keep all documents in a private bucket.
- Issue signed URLs with short expiry times.

## Recommended controls

- PDF-only validation using MIME checking and file signature validation.
- Max file size of 20 MB by default.
- Rate limiting on sensitive routes such as login, upload, payment, and webhook endpoints.
- Idempotency keys for all payment and order processing.
- Basic audit table for admin and payment actions.

## Webhooks and payments

- Verify Stripe webhook signatures before processing.
- Store event IDs to prevent duplicate handling.
- Keep payment status separate from order print status.
- Refunds only after provider rejection or failed fulfillment is confirmed.

## Data protection

- Do not expose residential addresses on public pages.
- Only reveal pickup details after the order is accepted.
- Delete documents after a configured retention period.
