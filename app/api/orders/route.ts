import { NextRequest, NextResponse } from 'next/server';
import { calculateQuote } from '@/lib/pricing';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const pages = Number(body.pages ?? 0);
    const copies = Number(body.copies ?? 1);
    const color = Boolean(body.color);
    const duplex = Boolean(body.duplex);
    const providerRate = body.providerRate
      ? {
          bwPerPage: Number(body.providerRate.bwPerPage ?? 0.15),
          colourPerPage: Number(body.providerRate.colourPerPage ?? 0.4),
        }
      : undefined;

    if (!Number.isFinite(pages) || pages <= 0) {
      return NextResponse.json({ error: 'pages must be a positive number.' }, { status: 400 });
    }

    if (!Number.isFinite(copies) || copies <= 0) {
      return NextResponse.json({ error: 'copies must be a positive number.' }, { status: 400 });
    }

    const quote = calculateQuote({ pages, copies, color, duplex, providerRate });

    return NextResponse.json({ quote }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid order payload.' }, { status: 500 });
  }
}
