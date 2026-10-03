import { describe, expect, it } from "vitest";
import { purchaseTax, taxByBrackets } from "./purchaseTax";

/* Golden cases are the worked examples in the purchase-tax-2026 article
   (and the Tax Authority's own brackets), so the calculator and the
   article can never disagree. */
describe("purchaseTax — 2026", () => {
  it("single home, ₪2.6M → ₪25,538", () => {
    expect(Math.round(purchaseTax(2_600_000, "single").total)).toBe(25_538);
  });

  it("single home, ₪3M → ₪45,538 (≈1.5%)", () => {
    const r = purchaseTax(3_000_000, "single");
    expect(Math.round(r.total)).toBe(45_538);
    expect(r.effectiveRate).toBeCloseTo(0.0152, 3);
  });

  it("single home under the exemption pays nothing", () => {
    expect(purchaseTax(1_900_000, "single").total).toBe(0);
    expect(purchaseTax(1_978_745, "single").total).toBe(0);
  });

  it("a replacement home pays the single-home table", () => {
    expect(purchaseTax(2_600_000, "replacement").total).toBe(purchaseTax(2_600_000, "single").total);
  });

  it("additional home, ₪2.6M → ₪208,000 (8% from the first shekel)", () => {
    expect(Math.round(purchaseTax(2_600_000, "additional").total)).toBe(208_000);
  });

  it("additional home above ₪6,055,070 pays 10% on the rest", () => {
    const r = purchaseTax(7_000_000, "additional");
    expect(r.total).toBeCloseTo(6_055_070 * 0.08 + (7_000_000 - 6_055_070) * 0.1, 6);
  });

  it("oleh, ₪2.6M → ₪3,106", () => {
    const r = purchaseTax(2_600_000, "oleh");
    expect(r.table).toBe("oleh");
    expect(Math.round(r.total)).toBe(3_106);
  });

  it("oleh above ₪20,183,565 loses the benefit entirely", () => {
    const r = purchaseTax(21_000_000, "oleh");
    expect(r.olehOverCap).toBe(true);
    expect(r.total).toBe(purchaseTax(21_000_000, "single").total);
  });

  it("the breakdown adds up to the total and covers the whole price", () => {
    const r = purchaseTax(2_600_000, "single");
    expect(r.lines.reduce((s, l) => s + l.tax, 0)).toBeCloseTo(r.total, 9);
    expect(r.lines[0].from).toBe(0);
    expect(r.lines[r.lines.length - 1].to).toBe(2_600_000);
  });

  it("zero or negative price is zero tax", () => {
    expect(purchaseTax(0, "additional").total).toBe(0);
    expect(purchaseTax(-5, "single").total).toBe(0);
  });
});

describe("taxByBrackets", () => {
  it("taxes each slice at its own rate", () => {
    const { total, lines } = taxByBrackets(300, [
      { upTo: 100, rate: 0 },
      { upTo: 200, rate: 0.1 },
      { upTo: Infinity, rate: 0.2 },
    ]);
    expect(lines).toHaveLength(3);
    expect(total).toBeCloseTo(30, 10);
  });
});
