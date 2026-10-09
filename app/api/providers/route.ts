import { NextResponse } from 'next/server';
import { getProviderMatches, registerProvider, printNearStore } from '@/lib/printnear-store';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const providers = q ? getProviderMatches(q) : [...printNearStore.providers];
  return NextResponse.json({ ok: true, providers });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const provider = registerProvider({
      name: typeof body?.name === 'string' ? body.name : '',
      location: typeof body?.location === 'string' ? body.location : '',
      postalCode: typeof body?.postalCode === 'string' ? body.postalCode : '',
      available: Boolean(body?.available),
      rating: Number(body?.rating ?? 4.8),
      distance: Number(body?.distance ?? 1.2),
      pickupWindow: typeof body?.pickupWindow === 'string' ? body.pickupWindow : 'Within 4 hours',
      pricing: {
        bwPerPage: Number(body?.pricing?.bwPerPage ?? 0.15),
        colourPerPage: Number(body?.pricing?.colourPerPage ?? 0.4),
      },
      features: Array.isArray(body?.features) ? body.features : ['A4', 'Duplex'],
    });

    if (!provider) {
      return NextResponse.json({ ok: false, error: 'Provider name and location are required.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, provider });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to save provider.' }, { status: 400 });
  }
}
