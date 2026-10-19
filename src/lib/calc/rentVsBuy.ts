import {
  CAPITAL_GAINS_TAX,
  INFLATION_12M,
  MARKET_FEES,
  PAYMENT_TO_INCOME,
  VAT_RATE,
} from "@/data/finance/rules2026";
import { spitzerPayment } from "./mortgage";
import { maxLtvFor, transactionCosts } from "./transactionCosts";

export interface RentVsBuyInput {
  price: number;
  /** Rent for the same apartment today, ₪ a month. */
  monthlyRent: number;
  /** Cash available today. The buyer spends it on costs and the down payment; the renter invests it. */
  equity: number;
  /** One-off purchase costs (purchase tax, lawyer, agent…), ₪. */
  buyCosts: number;
  /** Selling costs at the horizon, as a share of the sale price (VAT included). */
  sellCostRate: number;
  /** The bank's LTV ceiling, 0–1. */
  maxLtv: number;
  /** Mortgage rate, % a year. */
  mortgageRate: number;
  mortgageYears: number;
  /** Comparison horizon, years. */
  years: number;
  /** Home price change, % a year. */
  priceGrowth: number;
  /** Rent change, % a year, applied once a year. */
  rentGrowth: number;
  /** What invested cash earns, % a year before tax. */
  investReturn: number;
  /** Consumer inflation, % a year — capital-gains tax is on the real gain. */
  inflation: number;
  /** Tax on a real capital gain, 0–1. */
  capitalGainsTax: number;
  /** Repairs and upkeep the owner pays, share of the home's value a year. */
  maintenanceRate: number;
}

export interface RentVsBuyResult {
  /** False when the equity can't cover costs plus the minimum down payment. */
  feasible: boolean;
  /** Smallest equity that makes the purchase possible. */
  minEquity: number;
  loan: number;
  monthlyPayment: number;
  /** Owner's first-month cost: mortgage payment + upkeep. */
  ownerMonthly: number;
  /** Net worth at the horizon if buying: home after selling costs, minus the loan left, plus any savings after tax. */
  buyWealth: number;
  /** Net worth at the horizon if renting: the invested equity and savings, after tax. */
  rentWealth: number;
  /** buyWealth − rentWealth. */
  advantage: number;
  homeValue: number;
  loanBalance: number;
  totalRent: number;
  totalInterest: number;
}

/** Growth per month equivalent to an annual % rate. */
const monthly = (annualPct: number) => Math.pow(1 + annualPct / 100, 1 / 12);

/** A savings pot that tracks its inflation-indexed cost basis, so tax falls on the real gain only. */
class Pot {
  value = 0;
  basis = 0;
  constructor(
    private readonly growth: number,
    private readonly indexation: number,
  ) {}
  add(n: number) {
    this.value += n;
    this.basis += n;
  }
  step() {
    this.value *= this.growth;
    this.basis *= this.indexation;
  }
  afterTax(rate: number) {
    return this.value - rate * Math.max(0, this.value - this.basis);
  }
}

/**
 * Buy the home you live in, or rent it and invest the difference? Both
 * households start with the same cash and the same monthly budget, month
 * by month: whoever pays less that month invests the difference. At the
 * horizon the owner sells (a single home — no capital-gains tax on it) and
 * the renter's investments pay tax on their real gain. Compares net worth.
 */
export function rentVsBuy(input: RentVsBuyInput): RentVsBuyResult {
  const price = Math.max(0, input.price);
  const minEquity = input.buyCosts + price * (1 - input.maxLtv);
  const downPayment = Math.min(price, Math.max(0, input.equity - input.buyCosts));
  const loan = price - downPayment;
  const feasible = input.equity >= minEquity - 0.5;
  const monthlyPayment = spitzerPayment(loan, input.mortgageRate, input.mortgageYears);

  const r = input.mortgageRate / 100 / 12;
  const invest = monthly(input.investReturn);
  const index = monthly(input.inflation);
  const appreciate = monthly(input.priceGrowth);
  const ownerPot = new Pot(invest, index);
  const renterPot = new Pot(invest, index);
  // Equity the buyer doesn't need (paid more than the price) stays invested.
  ownerPot.add(Math.max(0, input.equity - input.buyCosts - downPayment));
  renterPot.add(input.equity);

  let value = price;
  let balance = loan;
  let rent = input.monthlyRent;
  let totalRent = 0;
  let totalInterest = 0;
  let ownerMonthly = 0;
  const months = Math.round(input.years * 12);
  const payMonths = input.mortgageYears * 12;

  for (let m = 0; m < months; m++) {
    if (m > 0 && m % 12 === 0) rent *= 1 + input.rentGrowth / 100;
    let payment = 0;
    if (m < payMonths && balance > 0) {
      const interest = balance * r;
      payment = Math.min(monthlyPayment, balance + interest);
      balance = balance + interest - payment;
      totalInterest += interest;
    }
    const owner = payment + (value * input.maintenanceRate) / 12;
    if (m === 0) ownerMonthly = owner;
    totalRent += rent;
    // Same budget for both: the cheaper household invests the difference.
    if (owner > rent) renterPot.add(owner - rent);
    else ownerPot.add(rent - owner);
    ownerPot.step();
    renterPot.step();
    value *= appreciate;
  }

  const buyWealth = value * (1 - input.sellCostRate) - balance + ownerPot.afterTax(input.capitalGainsTax);
  const rentWealth = renterPot.afterTax(input.capitalGainsTax);
  return {
    feasible,
    minEquity,
    loan,
    monthlyPayment,
    ownerMonthly,
    buyWealth,
    rentWealth,
    advantage: buyWealth - rentWealth,
    homeValue: value,
    loanBalance: balance,
    totalRent,
    totalInterest,
  };
}

/**
 * The yearly home-price change at which buying and renting end even —
 * above it buying comes out ahead. Clamped to [−15%, 25%]; buying gains
 * from appreciation, so the advantage rises with it and a bisection finds
 * the crossing.
 */
export function breakEvenGrowth(input: RentVsBuyInput): number {
  const at = (g: number) => rentVsBuy({ ...input, priceGrowth: g }).advantage;
  let lo = -15;
  let hi = 25;
  if (at(lo) >= 0) return lo;
  if (at(hi) <= 0) return hi;
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    if (at(mid) >= 0) hi = mid;
    else lo = mid;
  }
  return (lo + hi) / 2;
}

export interface HomeBuyerChoices {
  price: number;
  monthlyRent: number;
  equity: number;
  years: number;
  mortgageRate: number;
  rentGrowth: number;
  investReturn: number;
  /** % of the home's value a year. */
  upkeepPct: number;
}

const mid = ([lo, hi]: [number, number]) => (lo + hi) / 2;

/**
 * The /tools/rent-vs-buy calculator's full input from the visitor's
 * choices: a single home bought second-hand via an agent with the longest
 * mortgage the Bank of Israel allows, purchase costs and selling costs at
 * the middle of the market ranges, and this year's inflation and tax rules.
 */
export function homeBuyerInput(c: HomeBuyerChoices): RentVsBuyInput {
  const costs = transactionCosts({
    price: c.price,
    status: "single",
    newBuild: false,
    viaAgent: true,
    withMortgage: true,
    privateAppraisal: false,
    mortgageAdvisor: false,
  });
  const fees = MARKET_FEES.value;
  return {
    price: c.price,
    monthlyRent: c.monthlyRent,
    equity: c.equity,
    buyCosts: (costs.low + costs.high) / 2,
    sellCostRate: (mid(fees.agentRate) + mid(fees.buyerLawyerRate)) * (1 + VAT_RATE.value),
    maxLtv: maxLtvFor("single"),
    mortgageRate: c.mortgageRate,
    mortgageYears: PAYMENT_TO_INCOME.value.maxYears,
    years: c.years,
    priceGrowth: 0,
    rentGrowth: c.rentGrowth,
    investReturn: c.investReturn,
    inflation: INFLATION_12M.value,
    capitalGainsTax: CAPITAL_GAINS_TAX.value,
    maintenanceRate: c.upkeepPct / 100,
  };
}
