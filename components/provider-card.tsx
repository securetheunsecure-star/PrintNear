import Link from 'next/link';
import type { Provider } from '@/lib/mock-data';

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="card overflow-hidden p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{provider.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{provider.location}</p>
        </div>
        <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">
          {provider.available ? 'Available' : 'Busy'}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <span className="font-semibold text-amber-500">★ {provider.rating}</span>
        <span>•</span>
        <span>{provider.distance} km away</span>
      </div>

      <div className="mt-5 grid gap-3 text-sm">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span className="text-slate-600">Black &amp; white</span>
          <span className="font-bold text-slate-900">S${provider.pricing.bwPerPage.toFixed(2)} / page</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
          <span className="text-slate-600">Colour</span>
          <span className="font-bold text-slate-900">S${provider.pricing.colourPerPage.toFixed(2)} / page</span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
        {provider.features.map((feature) => (
          <span key={feature} className="rounded-full bg-brand-50 px-2.5 py-1 text-brand-700">
            {feature}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-slate-400">Pickup</p>
          <p className="text-sm font-semibold text-slate-700">{provider.pickupWindow}</p>
        </div>
        <Link href="/customer/upload" className="inline-flex items-center justify-center rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-500">
          Book now
        </Link>
      </div>
    </article>
  );
}
