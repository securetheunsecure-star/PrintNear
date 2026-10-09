'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';

export default function RegisterPage() {
  const [form, setForm] = useState({
    firstName: 'Alicia',
    lastName: 'Wong',
    email: 'alicia@example.com',
    password: 'password123',
    role: 'customer',
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          role: form.role,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.error || 'Unable to create account.');
      }

      window.location.href = '/login';
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="container py-12">
      <div className="mx-auto max-w-xl card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Create account</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Join PrintNear</h1>
        <form onSubmit={handleSubmit} className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">First name</span>
            <input type="text" value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Last name</span>
            <input type="text" value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Account type</span>
            <select value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })} className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500">
              <option value="customer">Customer</option>
              <option value="provider">Printer owner</option>
              <option value="admin">Administrator</option>
            </select>
          </label>
          {error ? <div className="md:col-span-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div> : null}
          <div className="md:col-span-2">
            <button type="submit" disabled={isSubmitting} className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">Already registered? <Link href="/login" className="font-semibold text-brand-600">Log in</Link></p>
      </div>
    </div>
  );
}
