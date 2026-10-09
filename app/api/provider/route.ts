import { NextResponse } from 'next/server';
import { getProviderMatches, getProviderById, printNearStore } from '@/lib/printnear-store';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') || '';
  const id = url.searchParams.get('id') || '';

  if (id) {
    const provider = getProviderById(id);
    if (!provider) {
      return NextResponse.json({ ok: false, error: 'Provider not found.' }, { status: 404 });
    }
    return NextResponse.json({ ok: true, provider });
  }

  return NextResponse.json({ ok: true, providers: q ? getProviderMatches(q) : printNearStore.providers });
}
