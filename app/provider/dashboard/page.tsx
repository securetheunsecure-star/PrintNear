import Link from 'next/link';
import { OrderStatusBadge } from '@/components/order-status-badge';

const orders = [
  { id: 'PN-1024', status: 'READY_FOR_COLLECTION', total: 1372, title: 'Document pickup ready' },
  { id: 'PN-1025', status: 'PAID', total: 860, title: 'Awaiting provider approval' },
  { id: 'PN-1026', status: 'COMPLETED', total: 640, title: 'Completed and reviewed' }
];

export default function ProviderDashboardPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Provider dashboard</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">PrintNest @ Tampines</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        {[
          ['Pending orders', '3'],
          ['Earnings', 'S$618.20'],
          ['Completed jobs', '41'],
          ['Availability', 'Open']
        ].map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-slate-900">Incoming orders</h2>
          <Link href="/provider/orders" className="text-sm font-semibold text-brand-600">View all</Link>
        </div>

        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="card flex flex-col gap-4 p-5 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">{order.id}</p>
                <h3 className="mt-2 text-lg font-bold text-slate-900">{order.title}</h3>
              </div>
              <div className="flex items-center gap-4">
                <OrderStatusBadge status={order.status} />
                <span className="text-lg font-black text-slate-900">S${(order.total / 100).toFixed(2)}</span>
              </div>
              <Link href="/provider/orders" className="inline-flex rounded-full border border-slate-200 px-4 py-2 font-semibold text-slate-700">
                Manage
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
