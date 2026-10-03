import { describe, expect, it } from "vitest";
import { maxLoanForPayment, spitzerPayment } from "./mortgage";

describe("spitzerPayment", () => {
  it("matches the textbook annuity: ₪1M, 5%, 30 years → ₪5,368.22", () => {
    expect(spitzerPayment(1_000_000, 5, 30)).toBeCloseTo(5368.22, 2);
  });

  it("splits the principal evenly at 0%", () => {
    expect(spitzerPayment(1_200_000, 0, 25)).toBe(4000);
  });

  it("costs more at a higher rate", () => {
    expect(spitzerPayment(1_000_000, 5.25, 25)).toBeGreaterThan(spitzerPayment(1_000_000, 4.75, 25));
  });
});

describe("maxLoanForPayment", () => {
  it("is the inverse of spitzerPayment", () => {
    for (const [rate, years] of [[4.75, 25], [3.1, 30], [0, 20]] as const) {
      const pay = spitzerPayment(1_350_000, rate, years);
      expect(maxLoanForPayment(pay, rate, years)).toBeCloseTo(1_350_000, 4);
    }
  });
});
