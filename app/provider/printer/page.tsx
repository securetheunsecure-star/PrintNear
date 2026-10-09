'use client';

import { FormEvent, useState } from 'react';

export default function ProviderPrinterPage() {
  const [form, setForm] = useState({
    name: 'PrintNest @ Tampines',
    location: 'Tampines Street 21',
    postalCode: '520123',
    bwPerPage: '0.15',
    colourPerPage: '0.40',
    available: true,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch('/api/providers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          pricing: { bwPerPage: Number(form.bwPerPage), colourPerPage: Number(form.colourPerPage) },
          features: ['A4', 'Duplex', 'Priority pickup'],
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload.ok) {
        throw new Error(payload.error || 'Unable to save printer profile.');
      }

      setMessage(`Printer profile saved for ${payload.provider.name}.`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to save provider profile.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-3xl card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Provider setup</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Add your printer profile</h1>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Printer name</span>
            <input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>

          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Service area</span>
            <input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Postal code</span>
            <input value={form.postalCode} onChange={(event) => setForm({ ...form, postalCode: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Availability</span>
            <select value={form.available ? 'available' : 'offline'} onChange={(event) => setForm({ ...form, available: event.target.value === 'available' })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500">
              <option value="available">Available</option>
              <option value="offline">Offline</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">BW price per page</span>
            <input type="number" step="0.01" value={form.bwPerPage} onChange={(event) => setForm({ ...form, bwPerPage: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Colour price per page</span>
            <input type="number" step="0.01" value={form.colourPerPage} onChange={(event) => setForm({ ...form, colourPerPage: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>

          {error ? <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
          {message ? <div className="md:col-span-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{message}</div> : null}

          <div className="md:col-span-2">
            <button type="submit" disabled={loading} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
              {loading ? 'Saving...' : 'Save printer details'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
