import Link from 'next/link';

export default function HowItWorksPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">How it works</p>
        <h1 className="mt-3 text-4xl font-black text-slate-900">A simple print marketplace designed for busy Singaporeans.</h1>
        <p className="mt-5 text-lg text-slate-600">From uploading your PDF to collecting your finished documents, the flow is built to be quick, transparent, and reliable.</p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {[
          ['1. Search nearby', 'Enter your location or postal code to view available local providers within a radius of up to 3 km.'],
          ['2. Upload and configure', 'Upload a PDF, select black-and-white or colour, double-sided or single-sided, and choose the number of copies.'],
          ['3. Pay and collect', 'Review the quote, pay in sandbox mode, and collect from the provider with a verified pickup code.']
        ].map(([title, text], index) => (
          <div key={title} className="card p-6">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 font-bold text-brand-600">{index + 1}</span>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="mt-3 text-slate-600">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-3xl bg-slate-900 p-8 text-white">
        <h2 className="text-2xl font-bold">Why customers use PrintNear</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ['Easy ordering', 'No complicated setup — just upload and pay.'],
            ['Secure documents', 'Private storage and short-lived download links protect your PDFs.'],
            ['Reliable pickup', 'Providers verify the pickup code before completing the order.']
          ].map(([title, text]) => (
            <div key={title}>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="mt-2 text-slate-300">{text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/find-printer" className="inline-flex rounded-full bg-brand-600 px-6 py-3 font-semibold text-white">
          Start your search
        </Link>
      </div>
    </div>
  );
}
