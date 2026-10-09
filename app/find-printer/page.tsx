import Link from 'next/link';
import { ProviderCard } from '@/components/provider-card';
import { SearchForm } from '@/components/search-form';
import { mockProviders } from '@/lib/mock-data';

export default function FindPrinterPage() {
  return (
    <div className="container py-12">
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Find a printer</p>
          <h1 className="mt-3 text-4xl font-black text-slate-900">Nearby print providers</h1>
        </div>
        <div className="w-full max-w-xl">
          <SearchForm />
        </div>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-slate-600">
        <span className="badge bg-emerald-100 text-emerald-700">Available now</span>
        <span>Search radius: 3 km</span>
        <span>Showing 8 providers</span>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {mockProviders.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
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
