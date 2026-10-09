import Link from 'next/link';
import { OrderStatusBadge } from '@/components/order-status-badge';

const incomingOrders = [
  { id: 'PN-1025', status: 'PAID', customer: 'Daniel Tan', total: 860 },
  { id: 'PN-1026', status: 'ACCEPTED', customer: 'Sofia Ng', total: 1250 },
  { id: 'PN-1027', status: 'READY_FOR_COLLECTION', customer: 'Mina Lee', total: 930 }
];

export default function ProviderOrdersPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Order management</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Incoming and active orders</h1>
      </div>

      <div className="space-y-4">
        {incomingOrders.map((order) => (
          <div key={order.id} className="card p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{order.id}</p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">{order.customer}</h2>
              </div>
              <OrderStatusBadge status={order.status} />
              <span className="text-lg font-black text-slate-900">S${(order.total / 100).toFixed(2)}</span>
              <div className="flex gap-2">
                <button type="button" className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Accept</button>
                <button type="button" className="inline-flex rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">Reject</button>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-600">
              <span>PDF: annual-report.pdf</span>
              <span>•</span>
              <span>Colour • Duplex • 2 copies</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link href="/provider/printer" className="inline-flex rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700">
          Update printer profile
        </Link>
      </div>
    </div>
  );
}
