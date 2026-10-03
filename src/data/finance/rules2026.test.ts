import { describe, expect, it } from "vitest";
import { FINANCE_RULES, PRIME_RATE, BOI_RATE } from "./rules2026";

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const today = new Date().toISOString().slice(0, 10);

describe("finance rules", () => {
  for (const [name, rule] of Object.entries(FINANCE_RULES)) {
    it(`${name} has a date and a source`, () => {
      expect(rule.asOf).toMatch(ISO_DATE);
      expect(rule.source.url).toMatch(/^https:\/\//);
      expect(rule.source.title.length).toBeGreaterThan(0);
    });

    // Fails the build the day a temporary rule (e.g. a tax order) expires,
    // so the calculators can't keep using it silently.
    it(`${name} is still in force`, () => {
      if (rule.validTo) expect(rule.validTo >= today, `${name} expired on ${rule.validTo}`).toBe(true);
    });
  }

  it("prime is the Bank of Israel rate + 1.5%", () => {
    expect(PRIME_RATE.value).toBeCloseTo(BOI_RATE.value + 1.5, 10);
  });
});
