export type QuoteSummaryProps = {
  quote: {
    pages: number;
    copies: number;
    color: boolean;
    duplex: boolean;
    printingSubtotalCents: number;
    serviceFeeCents: number;
    gstCents: number;
    totalCents: number;
    platformCommissionCents: number;
    providerEarningsCents: number;
  };
};

export function QuoteSummary({ quote }: QuoteSummaryProps) {
  const fmt = (cents: number) => `S$${(cents / 100).toFixed(2)}`;

  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
        <span className="text-sm text-slate-500">Print option</span>
        <span className="font-semibold text-slate-800">
          {quote.color ? 'Colour' : 'Black & white'} • {quote.duplex ? 'Double-sided' : 'Single-sided'}
        </span>
      </div>

      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div className="flex items-center justify-between">
          <span>Printing cost</span>
          <span className="font-semibold text-slate-900">{fmt(quote.printingSubtotalCents)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Service fee</span>
          <span className="font-semibold text-slate-900">{fmt(quote.serviceFeeCents)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>GST</span>
          <span className="font-semibold text-slate-900">{fmt(quote.gstCents)}</span>
        </div>
        <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-bold text-slate-900">
          <span>Total payable</span>
          <span>{fmt(quote.totalCents)}</span>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-brand-50 p-3 text-xs text-brand-700">
        Provider earnings: {fmt(quote.providerEarningsCents)} • Platform commission: {fmt(quote.platformCommissionCents)}
      </div>
    </div>
  );
}
