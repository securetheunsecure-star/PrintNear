import Link from 'next/link';

export default function PricingPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Transparent pricing</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Simple, clear costs for customers and providers.</h1>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Black &amp; white</p>
          <p className="mt-4 text-4xl font-black text-slate-900">S$0.15</p>
          <p className="mt-2 text-slate-600">Per page</p>
        </div>
        <div className="card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Colour</p>
          <p className="mt-4 text-4xl font-black text-slate-900">S$0.40</p>
          <p className="mt-2 text-slate-600">Per page</p>
        </div>
        <div className="card p-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Service fee</p>
          <p className="mt-4 text-4xl font-black text-slate-900">S$0.50</p>
          <p className="mt-2 text-slate-600">Per order</p>
        </div>
      </div>

      <div className="mt-10 card p-8">
        <h2 className="text-2xl font-bold text-slate-900">Checkout breakdown</h2>
        <div className="mt-6 space-y-4">
          {[
            ['Printing cost', 'S$4.80'],
            ['Service fee', 'S$0.50'],
            ['GST', 'S$0.39'],
            ['Total payable', 'S$5.69']
          ].map(([label, value]) => (
            <div key={label} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-none last:pb-0">
              <span className="text-slate-600">{label}</span>
              <span className="font-bold text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 max-w-3xl">
        <h2 className="text-2xl font-bold text-slate-900">Provider economics</h2>
        <p className="mt-3 text-slate-600">Providers set their own page prices, while PrintNear applies a 20% platform commission on the printing subtotal. The platform also collects a flat service fee from the customer.</p>
      </div>

      <div className="mt-8 text-center">
        <Link href="/find-printer" className="inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">
          Book your print job
        </Link>
      </div>
    </div>
  );
}
