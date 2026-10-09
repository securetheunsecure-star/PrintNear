import { NextResponse } from 'next/server';
import { printNearStore, updateOrderStatus } from '@/lib/printnear-store';

export async function GET() {
  return NextResponse.json({
    ok: true,
    stats: {
      users: printNearStore.users.length,
      providers: printNearStore.providers.length,
      orders: printNearStore.orders.length,
      revenue: printNearStore.orders.reduce((sum, order) => sum + order.totalCents, 0),
      commission: printNearStore.orders.reduce((sum, order) => sum + Math.round(order.totalCents * 0.2), 0),
      pendingRefunds: printNearStore.orders.filter((order) => order.status === 'REFUND_PENDING').length,
    },
    activity: [
      { label: 'Provider registered', value: 'PrintNest @ Tampines' },
      { label: 'Order ready for pickup', value: 'PN-1024' },
      { label: 'Platform commission updated', value: '20%' },
    ],
  });
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body?.id === 'string' ? body.id : '';
    const status = typeof body?.status === 'string' ? body.status : '';

    const updated = updateOrderStatus(id, status);
    if (!updated) {
      return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
    }

    return NextResponse.json({ ok: true, order: updated });
  } catch (error) {
    return NextResponse.json({ ok: false, error: error instanceof Error ? error.message : 'Unable to update status.' }, { status: 400 });
  }
}
