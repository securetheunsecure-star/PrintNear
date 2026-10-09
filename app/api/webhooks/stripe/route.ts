import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-06-20',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';

    if (!stripe || !webhookSecret) {
      return NextResponse.json({ ok: true, mode: 'test', message: 'Webhook received in sandbox mode.' });
    }

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (_error) {
      return NextResponse.json({ error: 'Invalid Stripe signature.' }, { status: 400 });
    }

    return NextResponse.json({ received: true, type: event.type, id: event.id });
  } catch (error) {
    return NextResponse.json({ error: 'Unable to handle webhook.' }, { status: 500 });
  }
}
