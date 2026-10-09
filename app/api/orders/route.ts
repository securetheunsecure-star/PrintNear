import { NextResponse } from 'next/server';
import { createOrder, getOrderById, printNearStore } from '@/lib/printnear-store';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json({ ok: true, orders: printNearStore.orders });
  }

  const order = getOrderById(id);
  if (!order) {
    return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  }

  return NextResponse.json({ ok: true, order });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const customerName = typeof body?.customerName === 'string' ? body.customerName.trim() : '';
    const providerId = typeof body?.providerId === 'string' ? body.providerId : '';
    const totalCents = Number(body?.totalCents ?? 0);
    const status = typeof body?.status === 'string' ? body.status : 'PAID';

    if (!customerName || !providerId || !Number.isFinite(totalCents) || totalCents <= 0) {
      return NextResponse.json({ ok: false, error: 'Order details are incomplete.' }, { status: 400 });
    }

    const order = createOrder({ customerName, providerId, totalCents, status });
    return NextResponse.json({ ok: true, order });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to create order.' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' ? body.status : '';

    if (!id || !status) {
      return NextResponse.json({ ok: false, error: 'Order ID and status are required.' }, { status: 400 });
    }

    const updated = printNearStore.orders.find((item) => item.id === id);
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
    }

    updated.status = status;
    if (status === 'READY_FOR_COLLECTION') {
      updated.pickupCode = updated.pickupCode || `PRN-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to update order.' }, { status: 400 });
  }
}
