import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="container py-12">
      <div className="mx-auto max-w-md card p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Welcome back</p>
        <h1 className="mt-3 text-3xl font-black text-slate-900">Log in</h1>
        <form className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Email</span>
            <input type="email" defaultValue="customer@example.com" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-slate-700">Password</span>
            <input type="password" defaultValue="password123" className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 outline-none focus:border-brand-500" />
          </label>
          <button type="submit" className="inline-flex h-12 w-full items-center justify-center rounded-xl bg-brand-600 font-semibold text-white">
            Log in
          </button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-600">
          New here? <Link href="/register" className="font-semibold text-brand-600">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
