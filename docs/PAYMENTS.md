# Payments

## Payment model

PrintNear uses Stripe in test mode during MVP development. All monetary values are stored in integer cents on the server.

## Quote example

- Black-and-white printing: S$0.15/page
- Colour printing: S$0.40/page
- Customer service fee: S$0.50 per order
- Platform commission: 20% of printing subtotal

## Server-side calculation

The app calculates all totals server-side and never trusts the browser for final pricing. Example:

- 10 pages black-and-white at S$0.15 = S$1.50
- 5 pages colour at S$0.40 = S$2.00
- subtotal = S$3.50
- service fee = S$0.50
- commission = 20% of S$3.50 = S$0.70
- final total = S$4.20 + applicable GST if enabled

## Payment lifecycle

1. Customer reviews server-generated quote.
2. Order is created in `PENDING_PAYMENT` state.
3. Stripe confirms payment.
4. Order moves to `PAID`.
5. Provider accepts order and sets status to `ACCEPTED`.
6. Payment is retained until refund or completion is processed.

## Refunds and idempotency

- The same order should not be charged more than once.
- Store `payment_intent_id` and idempotency key per order.
- If a provider rejects a paid order, start refund workflow after provider confirmation and Stripe refund processing.
