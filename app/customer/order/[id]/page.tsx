import Link from 'next/link';
import { OrderStatusBadge } from '@/components/order-status-badge';

export default function CustomerOrderDetailPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Order details</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">PN-1024</h1>
        </div>
        <OrderStatusBadge status="READY_FOR_COLLECTION" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="card p-6">
          <h2 className="text-xl font-bold">PrintNest @ Tampines</h2>
          <div className="mt-5 space-y-4 text-slate-600">
            <div className="flex items-center justify-between"><span>Pickup code</span><span className="font-bold text-slate-900">PRN-8421</span></div>
            <div className="flex items-center justify-between"><span>Estimated collection</span><span className="font-bold text-slate-900">Today, 6:00 PM</span></div>
            <div className="flex items-center justify-between"><span>Document</span><span className="font-bold text-slate-900">annual-report.pdf</span></div>
            <div className="flex items-center justify-between"><span>Format</span><span className="font-bold text-slate-900">Colour • Double-sided • 3 copies</span></div>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold">Payment summary</h2>
          <div className="mt-5 space-y-3 text-slate-600">
            <div className="flex items-center justify-between"><span>Printing cost</span><span className="font-bold text-slate-900">S$12.25</span></div>
            <div className="flex items-center justify-between"><span>Service fee</span><span className="font-bold text-slate-900">S$0.50</span></div>
            <div className="flex items-center justify-between"><span>GST</span><span className="font-bold text-slate-900">S$0.97</span></div>
            <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-lg font-black text-slate-900"><span>Total</span><span>S$13.72</span></div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/customer/orders" className="inline-flex rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700">
          Back to orders
        </Link>
        <Link href="/customer/upload" className="inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">
          Place another order
        </Link>
      </div>
    </div>
  );
}
