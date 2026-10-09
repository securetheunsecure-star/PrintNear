export const DEFAULT_PRICING = {
  bwPerPage: 0.15,
  colourPerPage: 0.4,
  serviceFeeCents: 50,
  platformCommissionRate: 0.2,
  gstRate: 0.08,
} as const;

export type QuoteInput = {
  pages: number;
  color: boolean;
  duplex: boolean;
  copies: number;
  providerRate?: {
    bwPerPage: number;
    colourPerPage: number;
  };
};

export function calculateQuote(input: QuoteInput) {
  const { pages, color, copies, providerRate } = input;

  if (!Number.isFinite(pages) || pages <= 0) {
    throw new Error('Page count must be greater than zero.');
  }

  if (!Number.isFinite(copies) || copies <= 0) {
    throw new Error('Copies must be greater than zero.');
  }

  const pageRate = color
    ? providerRate?.colourPerPage ?? DEFAULT_PRICING.colourPerPage
    : providerRate?.bwPerPage ?? DEFAULT_PRICING.bwPerPage;

  const rawPrintingCost = pages * pageRate * copies;
  const printingSubtotalCents = Math.round(rawPrintingCost * 100);
  const serviceFeeCents = DEFAULT_PRICING.serviceFeeCents;
  const platformCommissionCents = Math.round(printingSubtotalCents * DEFAULT_PRICING.platformCommissionRate);
  const gstCents = Math.round((printingSubtotalCents + serviceFeeCents) * DEFAULT_PRICING.gstRate);
  const totalCents = printingSubtotalCents + serviceFeeCents + gstCents;

  return {
    pageRate,
    pages,
    copies,
    color,
    duplex: Boolean(input.duplex),
    printingSubtotalCents,
    platformCommissionCents,
    serviceFeeCents,
    gstCents,
    totalCents,
    customerTotalCents: totalCents,
    providerEarningsCents: Math.max(printingSubtotalCents - platformCommissionCents, 0),
    platformRevenueCents: platformCommissionCents + serviceFeeCents + gstCents,
  };
}

export function formatSgdFromCents(cents: number) {
  return new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(cents / 100);
}
