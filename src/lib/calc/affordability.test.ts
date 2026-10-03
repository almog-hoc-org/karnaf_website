import { describe, expect, it } from "vitest";
import { affordability, equityNeeded, type AffordabilityInput } from "./affordability";
import { maxLoanForPayment } from "./mortgage";

const base: AffordabilityInput = {
  equity: 600_000,
  monthlyIncome: 25_000,
  paymentShare: 0.4,
  maxLtv: 0.75,
  annualRate: 4.75,
  years: 30,
  costsAt: () => 0,
};

describe("affordability", () => {
  it("equity-bound: with no costs, 25% down → price = equity / 0.25", () => {
    // income high enough that the payment never binds
    const r = affordability({ ...base, monthlyIncome: 1_000_000 });
    expect(r.limitedBy).toBe("equity");
    expect(r.maxPrice).toBe(2_400_000);
    expect(r.loan).toBeCloseTo(1_800_000, 0);
  });

  it("income-bound: the loan equals what the payment carries", () => {
    const r = affordability({ ...base, equity: 5_000_000, monthlyIncome: 10_000, paymentShare: 0.3 });
    const cap = maxLoanForPayment(3_000, 4.75, 30);
    expect(r.limitedBy).toBe("income");
    expect(r.maxLoanByIncome).toBeCloseTo(cap, 6);
    expect(r.monthlyPayment).toBeLessThanOrEqual(3_000 + 1e-6);
    expect(r.paymentToIncome).toBeLessThanOrEqual(0.3 + 1e-9);
  });

  it("costs come out of equity and lower the price", () => {
    const withCosts = affordability({ ...base, monthlyIncome: 1_000_000, costsAt: (p) => p * 0.02 });
    expect(withCosts.maxPrice).toBeLessThan(2_400_000);
    // the found price is feasible and the next step up is not
    const inp = { ...base, monthlyIncome: 1_000_000, costsAt: (p: number) => p * 0.02 };
    expect(equityNeeded(withCosts.maxPrice, inp)).toBeLessThanOrEqual(600_000);
    expect(equityNeeded(withCosts.maxPrice + 20_000, inp)).toBeGreaterThan(600_000);
  });

  it("an investor (50% LTV) reaches half the price of a single-home buyer's 25% rule", () => {
    const single = affordability({ ...base, monthlyIncome: 1_000_000 });
    const investor = affordability({ ...base, monthlyIncome: 1_000_000, maxLtv: 0.5 });
    expect(investor.maxPrice).toBe(1_200_000);
    expect(single.maxPrice).toBe(2_400_000);
  });

  it("no equity, no purchase", () => {
    const r = affordability({ ...base, equity: 0 });
    expect(r.maxPrice).toBe(0);
  });

  it("rounds the price down to ₪10,000", () => {
    const r = affordability({ ...base, equity: 612_345, monthlyIncome: 1_000_000 });
    expect(r.maxPrice % 10_000).toBe(0);
  });
});
