import { NextRequest, NextResponse } from 'next/server';

const validStatuses = new Set([
  'PENDING_PAYMENT',
  'PAID',
  'ACCEPTED',
  'PRINTING',
  'READY_FOR_COLLECTION',
  'COMPLETED',
  'REJECTED',
  'CANCELLED',
  'REFUND_PENDING',
  'REFUNDED',
]);

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params;
    const body = await request.json();
    const status = String(body.status || '').trim();

    if (!validStatuses.has(status)) {
      return NextResponse.json({ ok: false, error: 'Unsupported order status' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, orderId: id, status, message: 'Order status updated.' });
  } catch (error) {
    return NextResponse.json({ ok: false, error: 'Unable to update order.' }, { status: 500 });
  }
}
