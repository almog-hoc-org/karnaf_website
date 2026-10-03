import { describe, expect, it } from "vitest";
import { formatILS, formatPercent } from "./format";

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
