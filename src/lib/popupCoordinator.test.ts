import { describe, expect, it } from "vitest";
import { isDiscoveryPath } from "./popupCoordinator";

describe("isDiscoveryPath", () => {
  it("allows the homepage and the blog index", () => {
    expect(isDiscoveryPath("/")).toBe(true);
    expect(isDiscoveryPath("/blog")).toBe(true);
    expect(isDiscoveryPath("/blog/")).toBe(true);
  });

  it("stays quiet on articles, which carry their own offers", () => {
    expect(isDiscoveryPath("/blog/first-apartment-guide")).toBe(false);
  });

  it("stays quiet on the converting pages", () => {
    for (const p of ["/course", "/premium", "/contact", "/tools/total-cost"]) {
      expect(isDiscoveryPath(p)).toBe(false);
    }
  });
});
