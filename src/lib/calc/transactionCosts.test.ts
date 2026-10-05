import { describe, expect, it } from "vitest";
import { developerLegalFee, maxLtvFor, transactionCosts, type CostOptions } from "./transactionCosts";

const base: CostOptions = {
  price: 2_600_000,
  status: "single",
  newBuild: false,
  viaAgent: true,
  withMortgage: true,
  privateAppraisal: false,
  mortgageAdvisor: false,
};

const item = (r: ReturnType<typeof transactionCosts>, key: string) => r.items.find((i) => i.key === key);

describe("transactionCosts — 2026", () => {
  it("second-hand, ₪2.6M single home via an agent with a mortgage", () => {
    const r = transactionCosts(base);
    expect(Math.round(item(r, "purchaseTax")!.low)).toBe(25_538);
    // lawyer 0.5–1% + 18% VAT
    expect(item(r, "buyerLawyer")!.low).toBeCloseTo(15_340, 6);
    expect(item(r, "buyerLawyer")!.high).toBeCloseTo(30_680, 6);
    // agent 1–2% + 18% VAT
    expect(item(r, "agent")!.low).toBeCloseTo(30_680, 6);
    expect(item(r, "agent")!.high).toBeCloseTo(61_360, 6);
    expect(item(r, "bankAppraisal")).toMatchObject({ low: 350, high: 950 });
    expect(item(r, "mortgageFileFee")).toMatchObject({ low: 360, high: 360 });
    // sale 44 + caveat 188 + mortgage 188
    expect(item(r, "landRegistry")).toMatchObject({ low: 420, high: 420 });
    expect(item(r, "developerLawyer")).toBeUndefined();
    expect(Math.round(r.low)).toBe(72_688);
    expect(Math.round(r.high)).toBe(119_308);
    // 25% down payment + costs
    expect(r.minDownPayment).toBeCloseTo(650_000, 6);
    expect(Math.round(r.equityLow)).toBe(722_688);
  });

  it("from a developer: the capped legal fee, no agent", () => {
    const r = transactionCosts({ ...base, newBuild: true, viaAgent: false });
    expect(item(r, "agent")).toBeUndefined();
    // min(₪5,915, 0.5%) + VAT
    expect(item(r, "developerLawyer")!.low).toBeCloseTo(6_979.7, 6);
    expect(r.developerFeeCapped).toBe(true);
  });

  it("developer fee: 0.5% when lower than the cap, uncapped above the price ceiling", () => {
    expect(developerLegalFee(1_000_000).high).toBeCloseTo(5_900, 6);
    const over = developerLegalFee(5_000_000);
    expect(over.capped).toBe(false);
    expect(over.low).toBeCloseTo(6_979.7, 6);
    expect(over.high).toBeCloseTo(29_500, 6);
  });

  it("without a mortgage: no bank fees, the whole price is equity", () => {
    const r = transactionCosts({ ...base, withMortgage: false, mortgageAdvisor: true });
    expect(item(r, "bankAppraisal")).toBeUndefined();
    expect(item(r, "mortgageFileFee")).toBeUndefined();
    expect(item(r, "mortgageAdvisor")).toBeUndefined();
    expect(item(r, "landRegistry")!.low).toBe(232);
    expect(r.maxLtv).toBe(0);
    expect(r.minDownPayment).toBe(2_600_000);
  });

  it("optional extras add their market range", () => {
    const r = transactionCosts({ ...base, privateAppraisal: true, mortgageAdvisor: true });
    expect(item(r, "privateAppraisal")).toMatchObject({ low: 1_500, high: 3_500 });
    expect(item(r, "mortgageAdvisor")).toMatchObject({ low: 5_000, high: 10_000 });
  });

  it("LTV by status: 75% single and oleh, 70% replacement, 50% additional", () => {
    expect(maxLtvFor("single")).toBe(0.75);
    expect(maxLtvFor("oleh")).toBe(0.75);
    expect(maxLtvFor("replacement")).toBe(0.7);
    expect(maxLtvFor("additional")).toBe(0.5);
    const r = transactionCosts({ ...base, status: "additional" });
    expect(Math.round(item(r, "purchaseTax")!.low)).toBe(208_000);
    expect(r.minDownPayment).toBeCloseTo(1_300_000, 6);
  });

  it("every item is a valid range", () => {
    const r = transactionCosts({ ...base, newBuild: true, price: 6_000_000, privateAppraisal: true, mortgageAdvisor: true });
    for (const i of r.items) expect(i.high).toBeGreaterThanOrEqual(i.low);
    expect(r.high).toBeGreaterThan(r.low);
  });
});
