import { describe, expect, it } from "vitest";
import { deferredDeal, linkableShare, type DeferredDealInput } from "./deferredPayment";

const base: DeferredDealInput = {
  price: 2_000_000,
  upfrontShare: 0.2,
  years: 3,
  discountRate: 5,
  linked: false,
  indexRate: 3.5,
  maxLtv: 0.75,
};

/* Golden cases are the worked examples in the developer-financing-deals-2026
   and construction-index-linkage articles. */
describe("deferredDeal — 20/80", () => {
  it("₪2M, 20/80, 3 years at 5%, no linkage → ₪1,782,140 today", () => {
    const r = deferredDeal(base);
    expect(r.upfront).toBe(400_000);
    expect(Math.round(r.dueAtDeliveryToday)).toBe(1_382_140);
    expect(Math.round(r.presentValue)).toBe(1_782_140);
    expect(r.hiddenDiscountRate).toBeCloseTo(0.109, 3);
  });

  it("linked at the legal maximum: 40% of ₪2M, 3.5% a year for 3 years ≈ ₪87K", () => {
    const r = deferredDeal({ ...base, linked: true });
    expect(r.linkedAmount).toBe(800_000);
    expect(Math.round(r.linkage / 1000)).toBe(87);
    expect(r.linkage / base.price).toBeCloseTo(0.043, 3);
  });

  it("linkage on ₪2.5M is ≈ ₪109K, as in the index article", () => {
    const r = deferredDeal({ ...base, price: 2_500_000, linked: true });
    expect(Math.round(r.linkage / 1000)).toBe(109);
  });

  it("linkable share: the first 20% is exempt, then half of every payment", () => {
    expect(linkableShare(0.2)).toBeCloseTo(0.4, 10);
    expect(linkableShare(0.1)).toBeCloseTo(0.4, 10);
    expect(linkableShare(0.3)).toBeCloseTo(0.35, 10);
  });

  it("delivery day: 80% due, the bank lends 75% → 5% from equity", () => {
    const r = deferredDeal(base);
    expect(r.bankAtDelivery).toBe(1_500_000);
    expect(r.equityAtDelivery).toBeCloseTo(100_000, 6);
    const investor = deferredDeal({ ...base, maxLtv: 0.5 });
    expect(investor.equityAtDelivery).toBeCloseTo(600_000, 6);
  });

  it("a higher cost of money makes the hidden discount bigger", () => {
    expect(deferredDeal({ ...base, discountRate: 6 }).hiddenDiscount).toBeGreaterThan(
      deferredDeal(base).hiddenDiscount,
    );
  });

  it("paying everything up front has no hidden discount", () => {
    const r = deferredDeal({ ...base, upfrontShare: 1, linked: true });
    expect(r.presentValue).toBeCloseTo(2_000_000, 6);
    expect(r.linkage).toBe(0);
  });
});
