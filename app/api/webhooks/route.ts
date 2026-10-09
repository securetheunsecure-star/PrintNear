import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const event = typeof body?.event === 'string' ? body.event : 'payment_succeeded';

    return NextResponse.json({ ok: true, received: true, event, note: 'Sandbox webhook accepted without external provider credentials.' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Webhook failed.' }, { status: 400 });
  }
}
