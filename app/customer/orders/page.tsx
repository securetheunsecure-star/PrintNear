import Link from 'next/link';
import { OrderStatusBadge } from '@/components/order-status-badge';
import { mockOrders } from '@/lib/mock-data';

export default function CustomerOrdersPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Orders</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Your order history</h1>
        </div>
        <Link href="/customer/upload" className="inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">
          New order
        </Link>
      </div>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <div key={order.id} className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{order.id}</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">{order.providerName}</h2>
              <p className="mt-1 text-sm text-slate-500">Customer: {order.customerName} • Ordered {order.createdAt}</p>
            </div>
            <div className="flex items-center gap-4">
              <OrderStatusBadge status={order.status} />
              <span className="text-lg font-black text-slate-900">S${(order.total / 100).toFixed(2)}</span>
            </div>
            <Link href={`/customer/order/${order.id}`} className="inline-flex rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-700">
              View details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
