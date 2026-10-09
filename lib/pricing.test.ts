import { describe, expect, it } from 'vitest';
import { calculateQuote, formatSgdFromCents } from '@/lib/pricing';

describe('calculateQuote', () => {
  it('calculates a standard black and white quote in cents', () => {
    const quote = calculateQuote({
      pages: 10,
      copies: 2,
      color: false,
      duplex: true,
    });

    expect(quote.printingSubtotalCents).toBe(300);
    expect(quote.serviceFeeCents).toBe(50);
    expect(quote.platformCommissionCents).toBe(60);
    expect(quote.totalCents).toBe(410);
  });

  it('calculates a colour quote with a provider override rate', () => {
    const quote = calculateQuote({
      pages: 5,
      copies: 3,
      color: true,
      duplex: false,
      providerRate: { bwPerPage: 0.15, colourPerPage: 0.42 },
    });

    expect(quote.printingSubtotalCents).toBe(630);
    expect(quote.totalCents).toBe(630 + 50 + 54);
  });

  it('formats SGD values correctly', () => {
    expect(formatSgdFromCents(1372)).toBe('S$13.72');
  });
});
