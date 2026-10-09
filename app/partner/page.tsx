import Link from 'next/link';

export default function PartnerPage() {
  return (
    <div className="container py-12">
      <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Become a printer partner</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Earn from your printer without managing a full print shop.</h1>
          <p className="mt-5 text-lg text-slate-600">Set your availability, list your printer, and accept orders from customers near you.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/register" className="inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">
              Sign up as a provider
            </Link>
            <Link href="/provider/dashboard" className="inline-flex rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700">
              View provider dashboard
            </Link>
          </div>
        </div>

        <div className="card p-8">
          <h2 className="text-2xl font-bold">Why partner with us</h2>
          <ul className="mt-6 space-y-5 text-slate-600">
            <li className="flex gap-3"><span className="mt-1 text-brand-600">✓</span><span>Simple setup and no complex printer integration required.</span></li>
            <li className="flex gap-3"><span className="mt-1 text-brand-600">✓</span><span>Set your own rates and weekly availability.</span></li>
            <li className="flex gap-3"><span className="mt-1 text-brand-600">✓</span><span>Track revenue and accept or reject jobs from a single dashboard.</span></li>
            <li className="flex gap-3"><span className="mt-1 text-brand-600">✓</span><span>Manual printing workflow with secure document download and verified collection.</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
