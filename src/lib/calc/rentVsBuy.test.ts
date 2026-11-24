import { describe, expect, it } from "vitest";
import { breakEvenGrowth, homeBuyerInput, rentVsBuy, type RentVsBuyInput } from "./rentVsBuy";

/* A world with nothing moving, so each test switches on one thing. */
const still: RentVsBuyInput = {
  price: 2_000_000,
  monthlyRent: 0,
  equity: 2_000_000,
  buyCosts: 0,
  sellCostRate: 0,
  maxLtv: 0.75,
  mortgageRate: 0,
  mortgageYears: 30,
  years: 10,
  priceGrowth: 0,
  rentGrowth: 0,
  investReturn: 0,
  inflation: 0,
  capitalGainsTax: 0.25,
  maintenanceRate: 0,
};

describe("rentVsBuy", () => {
  it("nothing moving: both end with what they started with", () => {
    const r = rentVsBuy(still);
    expect(r.buyWealth).toBeCloseTo(2_000_000, 6);
    expect(r.rentWealth).toBeCloseTo(2_000_000, 6);
    expect(r.advantage).toBeCloseTo(0, 6);
  });

  it("a cash buyer saves the rent: the advantage is exactly the rent paid", () => {
    const r = rentVsBuy({ ...still, monthlyRent: 5_000 });
    expect(r.totalRent).toBeCloseTo(600_000, 6);
    expect(r.advantage).toBeCloseTo(600_000, 6);
  });

  it("rent rises once a year", () => {
    const r = rentVsBuy({ ...still, monthlyRent: 1_000, years: 2, rentGrowth: 10 });
    expect(r.totalRent).toBeCloseTo(12_000 + 13_200, 6);
  });

  it("tax falls on the real gain only: a return equal to inflation is tax-free", () => {
    const r = rentVsBuy({ ...still, equity: 1_000_000, price: 1_000_000, investReturn: 2, inflation: 2 });
    expect(r.rentWealth).toBeCloseTo(1_000_000 * Math.pow(1.02, 10), 4);
  });

  it("and a real gain pays 25%", () => {
    const r = rentVsBuy({ ...still, equity: 1_000_000, price: 1_000_000, investReturn: 5 });
    const grown = 1_000_000 * Math.pow(1.05, 10);
    expect(r.rentWealth).toBeCloseTo(grown - 0.25 * (grown - 1_000_000), 4);
  });

  it("with a mortgage at 0%, the loan left after 10 of 30 years is two thirds", () => {
    const r = rentVsBuy({ ...still, equity: 500_000 });
    expect(r.loan).toBe(1_500_000);
    expect(r.loanBalance).toBeCloseTo(1_000_000, 4);
  });

  it("selling costs and upkeep come out of the owner's side", () => {
    const base = rentVsBuy(still);
    expect(rentVsBuy({ ...still, sellCostRate: 0.02 }).buyWealth).toBeCloseTo(base.buyWealth - 40_000, 6);
    expect(rentVsBuy({ ...still, maintenanceRate: 0.006 }).advantage).toBeLessThan(0);
  });

  it("not enough equity for costs plus the 25% down payment", () => {
    const r = rentVsBuy({ ...still, equity: 540_000, buyCosts: 50_000 });
    expect(r.feasible).toBe(false);
    expect(r.minEquity).toBe(550_000);
  });

  it("break-even growth: the advantage is ~0 there and rises above it", () => {
    const input: RentVsBuyInput = {
      ...still,
      monthlyRent: 4_500,
      equity: 600_000,
      buyCosts: 55_000,
      sellCostRate: 0.03,
      mortgageRate: 4.75,
      investReturn: 5,
      inflation: 1.5,
      rentGrowth: 2.6,
      maintenanceRate: 0.005,
    };
    const g = breakEvenGrowth(input);
    expect(g).toBeGreaterThan(-15);
    expect(g).toBeLessThan(25);
    expect(Math.abs(rentVsBuy({ ...input, priceGrowth: g }).advantage)).toBeLessThan(1);
    expect(rentVsBuy({ ...input, priceGrowth: g + 1 }).advantage).toBeGreaterThan(0);
    expect(rentVsBuy({ ...input, priceGrowth: g - 1 }).advantage).toBeLessThan(0);
  });
});

/* The /tools/rent-vs-buy page's defaults and FAQ example: ₪2M, rent ₪4,500
   (2.7% gross), ₪600K equity, prime 4.75%, rent +2.6%, 5% return, 0.5% upkeep. */
describe("rent-vs-buy page example", () => {
  const page = homeBuyerInput({
    price: 2_000_000,
    monthlyRent: 4_500,
    equity: 600_000,
    years: 10,
    mortgageRate: 4.75,
    rentGrowth: 2.6,
    investReturn: 5,
    upkeepPct: 0.5,
  });

  it("over 10 years buying breaks even at ≈ 3% a year", () => {
    expect(breakEvenGrowth(page)).toBeCloseTo(2.96, 2);
  });

  it("first year: ≈ ₪69K of mortgage interest against ₪54K of rent", () => {
    const y1 = rentVsBuy({ ...page, years: 1 });
    expect(Math.round(y1.totalInterest / 1000)).toBe(69);
    expect(y1.totalRent).toBe(54_000);
  });
});
