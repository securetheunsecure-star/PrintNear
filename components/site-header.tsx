import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/find-printer', label: 'Find a Printer' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/partner', label: 'Partner' }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="container flex h-20 items-center justify-between gap-5">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-lg font-black text-white">
            P
          </span>
          <div>
            <div className="text-lg font-black tracking-tight text-slate-900">PrintNear</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">Singapore</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-brand-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-600 sm:inline-flex">
            Login
          </Link>
          <Link href="/register" className="inline-flex rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500">
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
