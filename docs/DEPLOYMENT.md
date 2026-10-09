# Deployment

## Recommended deployment target

Use a single Next.js deployment platform such as Vercel or a comparable Node.js host. Keep Supabase as the single managed database plus auth and storage layer.

## Environment variables for production

- Set all `.env` values from the production environment.
- Use separate development and production Supabase projects.
- Use Stripe test mode for development and live mode only after migration.

## Deployment checklist

- Verify `NEXT_PUBLIC_SUPABASE_URL` and anon key.
- Configure Stripe webhook endpoint and secret.
- Set up CORS and storage policy for document uploads.
- Confirm RLS policies are active.
- Run production build and smoke tests.

## Operational recommendations

- Monitor Stripe webhook failures.
- Review provider earnings and platform commission reports.
- Keep document retention and admin audit logging enabled.
- Provide a clear support route for refund disputes and complaints.
