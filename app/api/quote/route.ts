import { NextResponse } from 'next/server';
import { calculateQuote } from '@/lib/pricing';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const pages = Number(body?.pages ?? 0);
    const copies = Number(body?.copies ?? 1);
    const color = Boolean(body?.color);
    const duplex = Boolean(body?.duplex);
    const providerRate = body?.providerRate ?? undefined;

    const quote = calculateQuote({
      pages,
      copies,
      color,
      duplex,
      providerRate,
    });

    return NextResponse.json({ ok: true, quote });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to calculate quote.' }, { status: 400 });
  }
}
