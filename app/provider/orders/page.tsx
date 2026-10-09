'use client';

import Link from 'next/link';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function CustomerUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [printMode, setPrintMode] = useState<'bw' | 'colour'>('colour');
  const [duplex, setDuplex] = useState(true);
  const [copies, setCopies] = useState(3);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ fileName?: string; pageCount?: number; uploadMessage?: string } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!file) {
      setError('Please choose a PDF to continue.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('printMode', printMode);
      formData.append('duplex', String(duplex));
      formData.append('copies', String(copies));

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Upload failed.');
      }

      setResult({
        fileName: payload.fileName,
        pageCount: payload.pageCount,
        uploadMessage: payload.uploadMessage,
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Upload failed.');
    } finally {
      setLoading(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files?.[0] ?? null);
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Checkout</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">Upload your PDF and set print options</h1>

        <form onSubmit={handleSubmit} className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-6">
            <label className="block">
              <span className="sr-only">Upload PDF</span>
              <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                <div className="text-4xl">📄</div>
                <p className="mt-4 text-lg font-semibold text-slate-700">{file ? file.name : 'Drop your PDF here'}</p>
                <p className="mt-2 text-sm text-slate-500">PDF only • Max 20 MB • Secure upload</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  className="mt-5 block w-full text-sm text-slate-500 file:mr-4 file:rounded-full file:border-0 file:bg-brand-600 file:px-5 file:py-3 file:font-semibold file:text-white"
                />
              </div>
            </label>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Print mode</span>
                <select
                  value={printMode}
                  onChange={(event) => setPrintMode(event.target.value as 'bw' | 'colour')}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none"
                >
                  <option value="bw">Black &amp; white</option>
                  <option value="colour">Colour</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Sides</span>
                <select
                  value={duplex ? 'double' : 'single'}
                  onChange={(event) => setDuplex(event.target.value === 'double')}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none"
                >
                  <option value="single">Single-sided</option>
                  <option value="double">Double-sided</option>
                </select>
              </label>
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-slate-700">Copies</span>
                <input
                  type="number"
                  min={1}
                  value={copies}
                  onChange={(event) => setCopies(Math.max(1, Number(event.target.value) || 1))}
                  className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none"
                />
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
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-slate-400">Upload status</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900">
              {result?.pageCount ? `S$${(result.pageCount * 0.15).toFixed(2)}` : 'Ready'}
            </h2>

            {result ? (
              <div className="mt-6 space-y-4 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-semibold">{result.uploadMessage}</p>
                <p>File: {result.fileName}</p>
                <p>Detected pages: {result.pageCount}</p>
              </div>
            ) : null}

            {error ? (
              <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Checking PDF...' : 'Validate & continue'}
            </button>
            <p className="mt-4 text-center text-xs text-slate-500">Sandbox payment mode enabled. No real charge is processed.</p>
            <div className="mt-6 text-center">
              <Link href="/customer/orders" className="text-sm font-semibold text-brand-600">View order history</Link>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
}
