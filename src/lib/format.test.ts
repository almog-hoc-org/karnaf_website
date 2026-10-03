import { describe, expect, it } from "vitest";
import { formatDateDots, formatILS, formatMillions, formatPercent } from "./format";

describe("formatILS", () => {
  it("groups thousands and rounds to whole shekels", () => {
    expect(formatILS(1_978_745)).toBe("₪1,978,745");
    expect(formatILS(25_537.6)).toBe("₪25,538");
    expect(formatILS(0)).toBe("₪0");
  });
});

describe("formatPercent", () => {
  it("drops trailing zeros", () => {
    expect(formatPercent(4.75)).toBe("4.75%");
    expect(formatPercent(25)).toBe("25%");
    expect(formatPercent(3.5)).toBe("3.5%");
  });
});

describe("formatMillions", () => {
  it("one decimal at most", () => {
    expect(formatMillions(2_600_000)).toBe("₪2.6M");
    expect(formatMillions(2_000_000)).toBe("₪2M");
  });
});

describe("formatDateDots", () => {
  it("day.month.year", () => {
    expect(formatDateDots("2026-12-31")).toBe("31.12.2026");
  });
});
