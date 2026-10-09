import Link from 'next/link';
import { SearchForm } from '@/components/search-form';
import { mockProviders } from '@/lib/mock-data';
import { ProviderCard } from '@/components/provider-card';

export default function HomePage() {
  return (
    <>
      <section className="gradient-bg text-white">
        <div className="container grid gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-20">
          <div>
            <span className="mb-6 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium text-blue-100">
              Singapore print marketplace
            </span>
            <h1 className="max-w-xl text-4xl font-black tracking-tight sm:text-5xl">
              Print nearby. Earn from your printer.
            </h1>
            <p className="mt-5 max-w-lg text-lg text-slate-200">
              Upload a PDF, choose your print settings, and get it handled by a trusted local provider near you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/find-printer"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-400"
              >
                Find a Printer
              </Link>
              <Link
                href="/partner"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Earn with Your Printer
              </Link>
            </div>
            <SearchForm className="mt-8 max-w-xl" />
          </div>

          <div className="rounded-[1.75rem] border border-white/15 bg-white/5 p-5 backdrop-blur-sm">
            <div className="rounded-[1.5rem] bg-white p-6 text-slate-900 shadow-soft">
              <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">Popular this week</p>
              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-2xl font-bold">PrintNest @ Tampines</p>
                  <p className="text-sm text-slate-500">1.2 km away</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">Available</span>
              </div>
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-slate-600">Black &amp; white</span>
                  <span className="font-semibold">S$0.15/page</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-slate-600">Colour</span>
                  <span className="font-semibold">S$0.40/page</span>
                </div>
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3">
                  <span className="text-slate-600">Pickup window</span>
                  <span className="font-semibold">Within 4 h</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">How it works</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Three simple steps</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="card p-6">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-600">1</span>
              <h3 className="text-xl font-bold">Search nearby</h3>
              <p className="mt-3 text-slate-600">Enter your postal code or area to see available printers within a 3 km radius.</p>
            </div>
            <div className="card p-6">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-600">2</span>
              <h3 className="text-xl font-bold">Upload &amp; choose</h3>
              <p className="mt-3 text-slate-600">Upload a PDF, confirm the number of copies, and get a transparent server-side quote.</p>
            </div>
            <div className="card p-6">
              <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-600">3</span>
              <h3 className="text-xl font-bold">Pay &amp; collect</h3>
              <p className="mt-3 text-slate-600">Pay online, collect from a verified local provider, and confirm completion through the app.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Earn with your printer</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Turn idle printing capacity into reliable income.</h2>
            <p className="mt-4 text-lg text-slate-600">
              Ideal for home offices, students, and small businesses with a reliable printer and flexible weekday hours.
            </p>
            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Example monthly earnings</p>
              <div className="mt-3 flex items-end justify-between">
                <div>
                  <p className="text-4xl font-black text-slate-900">S$642</p>
                  <p className="mt-1 text-sm text-slate-500">Average from 10 orders/week</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Net earnings</span>
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              ['Low setup cost', 'Create a profile and list your printer in minutes.'],
              ['Flexible schedule', 'Turn your availability on and off by day and time.'],
              ['Simple payouts', 'Track all earnings and platform commission in one dashboard.'],
              ['Safe handoff', 'Customers collect only after the pickup code is verified.']
            ].map(([title, text]) => (
              <div key={title} className="card p-5">
                <div className="mb-4 h-12 w-12 rounded-xl bg-brand-50 flex items-center justify-center text-xl">✓</div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">Nearby providers</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Trusted local printing options</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {mockProviders.slice(0, 3).map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-slate-900 text-white">
        <div className="container grid gap-8 lg:grid-cols-3">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Privacy first</p>
            <h3 className="mt-3 text-2xl font-bold">Your documents stay private.</h3>
            <p className="mt-3 text-slate-300">We keep uploads in private Supabase storage with short-lived signed URLs and only share exact collection details after an order is accepted.</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Transparent pricing</p>
            <h3 className="mt-3 text-2xl font-bold">No hidden surprises.</h3>
            <p className="mt-3 text-slate-300">Best-in-class pricing and server-side quote calculation ensure customers know the exact total before paying.</p>
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-200">Verified providers</p>
            <h3 className="mt-3 text-2xl font-bold">Quality control built in.</h3>
            <p className="mt-3 text-slate-300">Provider profiles, service times, and collection verification help keep the marketplace trustworthy.</p>
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="container max-w-4xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">FAQs</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-900">Everything you need to know</h2>
          </div>
          <div className="space-y-4">
            {[
              ['How long does printing usually take?', 'Most accepted orders are ready for collection within 2–6 hours, depending on the provider’s availability.'],
              ['Do you support colour printing?', 'Yes. Customers can choose black-and-white or colour, along with single- or double-sided output.'],
              ['Is the PDF secure?', 'Yes. Private storage and short-lived signed download links ensure customers’ documents remain protected.'],
              ['What if my order is rejected?', 'The customer receives a refund workflow, and the platform monitors the payment status until the supplier confirms a refund.'],
              ['Where can I pick up my order?', 'Collection details are shared only after the provider accepts the order and the order reaches the ready-for-collection step.']
            ].map(([question, answer]) => (
              <div key={question} className="card p-5">
                <h3 className="text-lg font-bold">{question}</h3>
                <p className="mt-2 text-slate-600">{answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
