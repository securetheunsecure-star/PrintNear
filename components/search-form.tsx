import type { FormEvent } from 'react';

export function SearchForm({ className = '' }: { className?: string }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} className={`rounded-2xl border border-slate-200 bg-white p-3 shadow-soft ${className}`}>
      <div className="flex flex-col gap-3 lg:flex-row">
        <label className="flex-1">
          <span className="sr-only">Postal code or location</span>
          <input
            type="text"
            defaultValue="Tampines"
            aria-label="Location"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 outline-none transition focus:border-brand-500"
            placeholder="Enter postal code or location"
          />
        </label>
        <label className="w-full lg:max-w-[160px]">
          <span className="sr-only">Search radius</span>
          <select
            defaultValue="3"
            aria-label="Search radius"
            className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-slate-800 outline-none transition focus:border-brand-500"
          >
            <option value="1">1 km</option>
            <option value="3">3 km</option>
            <option value="5">5 km</option>
            <option value="10">10 km</option>
          </select>
        </label>
        <button
          type="submit"
          className="inline-flex h-12 items-center justify-center rounded-xl bg-brand-600 px-5 font-semibold text-white transition hover:bg-brand-500"
        >
          Find a Printer
        </button>
      </div>
    </form>
  );
}
