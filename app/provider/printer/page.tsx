import Link from 'next/link';

export default function ProviderPrinterPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Printer profile</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Set your pricing and availability</h1>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Printer model</span>
            <input type="text" defaultValue="Canon PIXMA G2010" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Service area</span>
            <input type="text" defaultValue="Tampines, Singapore" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Black &amp; white price</span>
            <input type="number" step="0.01" defaultValue={0.15} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Colour price</span>
            <input type="number" step="0.01" defaultValue={0.4} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Supported options</span>
            <input type="text" defaultValue="A4, Duplex, Colour printing" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
        </div>

        <div className="mt-8 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
          <span className="font-medium text-slate-700">Availability</span>
          <button type="button" className="inline-flex rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Available now</button>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button type="button" className="inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">Save profile</button>
          <Link href="/provider/dashboard" className="inline-flex rounded-full border border-slate-200 px-5 py-3 font-semibold text-slate-700">Back to dashboard</Link>
        </div>
      </div>
    </div>
  );
}
