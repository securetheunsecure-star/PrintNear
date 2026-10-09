# Testing and validation

This project ships with a lightweight Vitest suite focused on pricing and validation logic.

## Run the suite

```bash
npm test
```

## Coverage included

- pricing engine correctness for BW and colour jobs
- GST and platform commission calculation checks
- PDF validation and page-estimation heuristics

## Recommended validation checklist before production

1. Configure Supabase environment variables in `.env.local`.
2. Run the SQL schema in the Supabase SQL editor.
3. Use a valid Stripe test secret and webhook secret.
4. Confirm the order lifecycle route accepts provider status updates.
5. Upload a real PDF and verify page count detection matches the file.

## Sandbox behavior

If the required environment variables are absent, the app intentionally falls back to sandbox-safe responses to keep local development moving without crashing.

This makes it easy to verify the UI and API flow before a production credential set is available.




