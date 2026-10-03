import { maxLoanForPayment, spitzerPayment } from "./mortgage";

export interface AffordabilityInput {
  /** Cash available for the purchase, ₪. */
  equity: number;
  /** Household disposable income per month (net of fixed commitments), ₪. */
  monthlyIncome: number;
  /** Share of income the buyers will put toward the mortgage, 0–1. */
  paymentShare: number;
  /** Bank of Israel loan-to-value ceiling for this buyer, 0–1. */
  maxLtv: number;
  /** Blended annual rate assumption, % (4.75 = 4.75%). */
  annualRate: number;
  years: number;
  /** One-off costs that come out of equity at a given price (tax, lawyer…), ₪. */
  costsAt: (price: number) => number;
}

export interface AffordabilityResult {
  /** Highest price that fits all three limits, rounded down to ₪10,000. */
  maxPrice: number;
  loan: number;
  monthlyPayment: number;
  /** monthlyPayment / monthlyIncome. */
  paymentToIncome: number;
  /** Equity left for the down payment after costs. */
  downPayment: number;
  costs: number;
  /** What stops the price from going higher. */
  limitedBy: "equity" | "income";
  /** Largest loan the chosen payment carries. */
  maxLoanByIncome: number;
}

const ROUND_TO = 10_000;

/** Smallest equity a purchase at `price` needs: what the bank won't lend, plus costs. */
export function equityNeeded(price: number, input: AffordabilityInput): number {
  const maxLoanByIncome = maxLoanForPayment(input.monthlyIncome * input.paymentShare, input.annualRate, input.years);
  const loan = Math.max(0, Math.min(price * input.maxLtv, maxLoanByIncome));
  return price - loan + input.costsAt(price);
}

/**
 * The highest price these buyers can reach. A price works when the equity
 * covers both the part the bank won't finance (loan-to-value ceiling, or
 * the loan the chosen monthly payment carries — whichever is lower) and
 * the one-off costs. equityNeeded() rises with the price, so a binary
 * search finds the edge.
 */
export function affordability(input: AffordabilityInput): AffordabilityResult {
  const maxLoanByIncome = maxLoanForPayment(input.monthlyIncome * input.paymentShare, input.annualRate, input.years);

  let lo = 0;
  let hi = 50_000_000;
  if (equityNeeded(0, input) > input.equity) hi = 0;
  for (let i = 0; i < 60 && hi - lo > 1; i++) {
    const mid = (lo + hi) / 2;
    if (equityNeeded(mid, input) <= input.equity) lo = mid;
    else hi = mid;
  }
  // The search closes in on the edge from below; a price exactly on it
  // (equity covers it to the shekel) still counts.
  let maxPrice = Math.floor(lo / ROUND_TO) * ROUND_TO;
  if (equityNeeded(maxPrice + ROUND_TO, input) <= input.equity + 0.5) maxPrice += ROUND_TO;

  const costs = input.costsAt(maxPrice);
  const loanCap = Math.min(maxPrice * input.maxLtv, maxLoanByIncome);
  const loan = Math.max(0, Math.min(loanCap, maxPrice + costs - input.equity));
  const monthlyPayment = spitzerPayment(loan, input.annualRate, input.years);
  // Income binds when the loan the payment carries is below the LTV ceiling at this price.
  const limitedBy = maxLoanByIncome < maxPrice * input.maxLtv ? "income" : "equity";

  return {
    maxPrice,
    loan,
    monthlyPayment,
    paymentToIncome: input.monthlyIncome > 0 ? monthlyPayment / input.monthlyIncome : 0,
    downPayment: maxPrice - loan,
    costs,
    limitedBy,
    maxLoanByIncome,
  };
}
