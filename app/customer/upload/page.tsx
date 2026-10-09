import Link from 'next/link';

export default function CustomerUploadPage() {
  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Checkout</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Upload your PDF and set print options</h1>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
              <div className="text-4xl">📄</div>
              <p className="mt-4 text-lg font-semibold text-slate-700">Drop your PDF here</p>
              <p className="mt-2 text-sm text-slate-500">PDF only • Max 20 MB • Secure upload</p>
              <button type="button" className="mt-5 inline-flex rounded-full bg-brand-600 px-5 py-3 font-semibold text-white">
                Select file
              </button>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Print mode</span>
                <select defaultValue="colour" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none">
                  <option value="bw">Black &amp; white</option>
                  <option value="colour">Colour</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Sides</span>
                <select defaultValue="double" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none">
                  <option value="single">Single-sided</option>
                  <option value="double">Double-sided</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Copies</span>
                <input type="number" defaultValue={3} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none" />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Paper size</span>
                <select defaultValue="a4" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none">
                  <option value="a4">A4</option>
                  <option value="a3">A3</option>
                </select>
              </label>
            </div>
          </div>

          <aside className="card p-6">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Quote</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">S$13.72</h2>
            <div className="mt-6 space-y-4 text-slate-600">
              <div className="flex items-center justify-between"><span>Printing</span><span className="font-semibold text-slate-900">S$12.25</span></div>
              <div className="flex items-center justify-between"><span>Service fee</span><span className="font-semibold text-slate-900">S$0.50</span></div>
              <div className="flex items-center justify-between"><span>GST</span><span className="font-semibold text-slate-900">S$0.97</span></div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">Provider</p>
              <p className="mt-1 text-lg font-bold text-slate-900">PrintNest @ Tampines</p>
              <p className="text-sm text-slate-500">1.2 km away • 4 hour pickup window</p>
            </div>
            <button type="button" className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white">
              Pay securely
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">Sandbox payment mode enabled. No real charge is processed.</p>
          </aside>
        </div>
      </div>
    </div>
  );
}
