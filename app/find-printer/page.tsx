import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

export default function FindPrinterPage() {
  const [query, setQuery] = useState('Tampines');
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void loadProviders(query);
  }, []);

  async function loadProviders(search: string) {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/providers?q=${encodeURIComponent(search)}`);
      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to load providers.');
      }
      setProviders(payload.providers ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Unable to load providers.');
    } finally {
      setLoading(false);
    }
  }

  const providerCards = useMemo(() => providers.map((provider) => ({
    ...provider,
    pricingLabel: `${provider.pricing.bwPerPage.toFixed(2)}/page`,
  })), [providers]);

  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Find a printer</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Nearby print providers</h1>
        </div>
        <div className="w-full max-w-xl">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Search by location or postal code</span>
            <div className="flex gap-3">
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Tampines, Bedok, or postal code"
                className="h-12 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500"
              />
              <button
                type="button"
                onClick={() => void loadProviders(query)}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-5 font-semibold text-white"
              >
                Search
              </button>
            </div>
          </label>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <span className="badge bg-emerald-100 text-emerald-700">Available now</span>
        <span>Search radius: 3 km</span>
        <span>Showing {providerCards.length} providers</span>
      </div>

      {error ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      {loading ? <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">Loading nearby printers…</div> : null}

      {!loading && providerCards.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-slate-600">No providers match your search yet.</div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {providerCards.map((provider) => (
          <div key={provider.id} className="card overflow-hidden p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">{provider.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{provider.location}</p>
              </div>
              <span className={`rounded-full px-2 py-1 text-xs font-semibold ${provider.available ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'}`}>
                {provider.available ? 'Available' : 'Busy'}
              </span>
            </div>

            <div className="mt-5 flex items-center justify-between text-sm text-slate-600">
              <span>⭐ {provider.rating}</span>
              <span>{provider.distance} km away</span>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              <div className="flex justify-between"><span>Black &amp; white</span><span className="font-semibold">S${provider.pricing.bwPerPage.toFixed(2)}/page</span></div>
              <div className="mt-2 flex justify-between"><span>Colour</span><span className="font-semibold">S${provider.pricing.colourPerPage.toFixed(2)}/page</span></div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(provider.features ?? []).map((feature) => (
                <span key={feature} className="rounded-full bg-brand-50 px-2 py-1 text-xs font-medium text-brand-700">{feature}</span>
              ))}
            </div>

            <div className="mt-6">
              <Link href={`/customer/upload?providerId=${encodeURIComponent(provider.id)}`} className="inline-flex rounded-full bg-brand-600 px-4 py-2 font-semibold text-white">
                Select provider
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/customer/upload" className="inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">
          Upload a PDF to begin your order
        </Link>
      </div>
    </div>
  );
}
