import { adminStats } from '@/lib/mock-data';

export default function AdminPage() {
  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Admin dashboard</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Platform overview</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
        {[
          ['Users', adminStats.users],
          ['Providers', adminStats.providers],
          ['Orders', adminStats.orders],
          ['Revenue', `S$${(adminStats.revenue / 100).toFixed(2)}`],
          ['Pending refunds', adminStats.pendingRefunds]
        ].map(([label, value]) => (
          <div key={label} className="card p-5">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-3 text-3xl font-black text-slate-900">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Recent activity</h2>
          <ul className="mt-5 space-y-4 text-slate-600">
            <li className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Refund approved</span><span className="font-semibold text-slate-900">Order PN-1022</span></li>
            <li className="flex items-center justify-between border-b border-slate-200 pb-3"><span>Provider suspended</span><span className="font-semibold text-slate-900">QuickCopy Bedok</span></li>
            <li className="flex items-center justify-between"><span>Platform commission updated</span><span className="font-semibold text-slate-900">20%</span></li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-900">Commission settings</h2>
          <div className="mt-5 space-y-4">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Platform commission</span>
              <input type="number" defaultValue={20} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-slate-700">Service fee</span>
              <input type="number" step="0.01" defaultValue={0.5} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none" />
            </label>
            <button type="button" className="inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">Save settings</button>
          </div>
        </div>
      </div>
    </div>
  );
}
