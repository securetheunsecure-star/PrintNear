import Link from 'next/link';

export default function RegisterPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-xl card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Create account</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Join PrintNear</h1>
        <form className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">First name</span>
            <input type="text" defaultValue="Alicia" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Last name</span>
            <input type="text" defaultValue="Wong" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" defaultValue="alicia@example.com" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input type="password" defaultValue="password123" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm font-medium text-slate-700">Account type</span>
            <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500">
              <option>Customer</option>
              <option>Printer owner</option>
              <option>Administrator</option>
            </select>
          </label>
          <div className="md:col-span-2">
            <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white">
              Create account
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          Already registered? <Link href="/login" className="font-semibold text-brand-600">Log in</Link>
        </p>
      </div>
    </div>
  );
}
