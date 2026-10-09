import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const pages = Number(body.pages ?? 0);
    const copies = Number(body.copies ?? 0);
    const color = Boolean(body.color);
    const duplex = Boolean(body.duplex);

    if (!Number.isFinite(pages) || pages <= 0 || !Number.isFinite(copies) || copies <= 0) {
      return NextResponse.json(
        { error: 'Invalid page count or copy count.' },
        { status: 400 }
      );
    }

    const quote = calculateQuote({
      pages,
      copies,
      color,
      duplex,
    });

    return NextResponse.json({ quote });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unable to calculate quote.' },
      { status: 500 }
    );
  }
}
