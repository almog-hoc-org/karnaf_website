/**
 * Monthly payment on a fixed-rate Spitzer (annuity) schedule — no index
 * linkage, no fees. `annualRate` is a percentage (4.75 = 4.75%).
 */
export function spitzerPayment(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  return r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** The inverse: the largest loan a given monthly payment carries. */
export function maxLoanForPayment(monthlyPayment: number, annualRate: number, years: number): number {
  const r = annualRate / 100 / 12;
  const n = years * 12;
  if (n <= 0) return 0;
  return r === 0 ? monthlyPayment * n : (monthlyPayment * (1 - Math.pow(1 + r, -n))) / r;
}
