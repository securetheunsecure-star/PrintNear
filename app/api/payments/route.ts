import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    if (!stripe) {
      return NextResponse.json({
        ok: true,
        mode: 'test',
        message: 'Stripe test mode is enabled. Connect live keys in a real environment.',
        orderId: payload.orderId || 'mock-order-id',
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'sgd',
            product_data: {
              name: 'PrintNear order',
            },
            unit_amount: Number(payload.amountCents ?? 0),
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/customer/orders?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/customer/upload?cancel=1`,
      metadata: {
        orderId: String(payload.orderId || 'pending-order'),
      },
    });

    return NextResponse.json({ ok: true, checkoutUrl: session.url });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to start sandbox payment.' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, mode: 'sandbox', message: 'Stripe endpoint ready for test mode.' });
}
