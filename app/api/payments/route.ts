import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ ok: true, mode: 'sandbox', paymentProvider: 'local-sandbox' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const amountCents = Number(body?.amountCents ?? 0);
    const orderId = typeof body?.orderId === 'string' ? body.orderId : '';

    if (!orderId || !Number.isFinite(amountCents) || amountCents <= 0) {
      return NextResponse.json({ ok: false, error: 'Valid order ID and amount are required.' }, { status: 400 });
    }

    return NextResponse.json({
      ok: true,
      paymentId: `sandbox_${Date.now()}`,
      status: 'PAID',
      amountCents,
      provider: 'local-sandbox',
      note: 'Sandbox payment mode enabled. No external API key required.',
    });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to process payment.' }, { status: 400 });
  }
}
