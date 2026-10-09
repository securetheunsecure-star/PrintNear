import { NextResponse } from 'next/server';
import { getProviderMatches, getProviderById, printNearStore, updateOrderStatus } from '@/lib/printnear-store';

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

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' ? body.status : '';

    if (!id || !status) {
      return NextResponse.json({ ok: false, error: 'Order ID and status are required.' }, { status: 400 });
    }

    const updated = updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to update status.' }, { status: 400 });
  }
}
