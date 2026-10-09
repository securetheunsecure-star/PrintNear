import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <div className="text-xl font-black text-white">PrintNear</div>
          <p className="mt-4 text-sm text-slate-400">Print nearby. Earn from your printer.</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Platform</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link href="/find-printer">Find a Printer</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/partner">Become a Provider</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Customer</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li><Link href="/customer/upload">Upload PDF</Link></li>
            <li><Link href="/customer/orders">Order history</Link></li>
            <li><Link href="/how-it-works">How it works</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-slate-300">
            <li>support@printnear.sg</li>
            <li>Singapore</li>
            <li>Privacy-first document handling</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="container flex flex-col items-center justify-between gap-3 py-5 text-sm text-slate-400 md:flex-row">
          <span>© 2026 PrintNear. Built for the Singapore market.</span>
          <span>Sandbox mode for test payments</span>
        </div>
      </div>
    </footer>
  );
}
