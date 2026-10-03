import {
  DEVELOPER_LEGAL_FEE,
  LAND_REGISTRY_FEES,
  MARKET_FEES,
  MAX_LTV,
  MORTGAGE_FILE_FEE,
  VAT_RATE,
} from "@/data/finance/rules2026";
import { purchaseTax, type BuyerStatus, type PurchaseTaxResult } from "./purchaseTax";

export type CostKey =
  | "purchaseTax"
  | "buyerLawyer"
  | "developerLawyer"
  | "agent"
  | "bankAppraisal"
  | "privateAppraisal"
  | "mortgageFileFee"
  | "landRegistry"
  | "mortgageAdvisor";

/** One cost, as a range: fixed by law → low === high; market practice → a spread. ₪, VAT included. */
export interface CostItem {
  key: CostKey;
  low: number;
  high: number;
}

export interface CostOptions {
  price: number;
  status: BuyerStatus;
  /** Bought from a developer (adds the developer's capped legal fee). */
  newBuild: boolean;
  viaAgent: boolean;
  withMortgage: boolean;
  privateAppraisal: boolean;
  mortgageAdvisor: boolean;
}

export interface CostsResult {
  items: CostItem[];
  low: number;
  high: number;
  tax: PurchaseTaxResult;
  /** Loan-to-value ceiling for this buyer (0 when paying without a mortgage). */
  maxLtv: number;
  /** The part of the price the bank won't finance — the whole price without a mortgage. */
  minDownPayment: number;
  /** Down payment + costs: the least cash the purchase needs. */
  equityLow: number;
  equityHigh: number;
  /** False above the price ceiling, where the developer's fee isn't capped by law. */
  developerFeeCapped: boolean;
}

/** Bank of Israel LTV ceiling by status. An eligible oleh buys a single home. */
export function maxLtvFor(status: BuyerStatus): number {
  if (status === "additional") return MAX_LTV.value.additional;
  if (status === "replacement") return MAX_LTV.value.replacement;
  return MAX_LTV.value.single;
}

const withVat = (n: number) => n * (1 + VAT_RATE.value);
const range = (price: number, [lo, hi]: [number, number]): [number, number] => [withVat(price * lo), withVat(price * hi)];

/**
 * The developer's legal fee a buyer pays: the lower of the indexed cap and
 * 0.5% of the price, plus VAT. Above the price ceiling the regulations don't
 * apply, so it runs from the cap up to 0.5%.
 */
export function developerLegalFee(price: number): { low: number; high: number; capped: boolean } {
  const { cap, rate, capAppliesUpTo } = DEVELOPER_LEGAL_FEE.value;
  if (price <= capAppliesUpTo) {
    const fee = withVat(Math.min(cap, price * rate));
    return { low: fee, high: fee, capped: true };
  }
  return { low: withVat(cap), high: withVat(price * rate), capped: false };
}

/**
 * Everything a purchase costs on top of the price, in one list — purchase
 * tax, lawyers, agent, appraisal, mortgage fees and land registry — and the
 * cash it all needs once the bank's LTV ceiling is applied. Fees set by law
 * are exact; fees set by the market are ranges (rules2026 MARKET_FEES).
 */
export function transactionCosts(o: CostOptions): CostsResult {
  const price = Math.max(0, o.price);
  const fees = MARKET_FEES.value;
  const tabu = LAND_REGISTRY_FEES.value;
  const tax = purchaseTax(price, o.status);
  const items: CostItem[] = [{ key: "purchaseTax", low: tax.total, high: tax.total }];

  const [lawyerLow, lawyerHigh] = range(price, fees.buyerLawyerRate);
  items.push({ key: "buyerLawyer", low: lawyerLow, high: lawyerHigh });

  let developerFeeCapped = true;
  if (o.newBuild) {
    const dev = developerLegalFee(price);
    developerFeeCapped = dev.capped;
    items.push({ key: "developerLawyer", low: dev.low, high: dev.high });
  }

  if (o.viaAgent) {
    const [low, high] = range(price, fees.agentRate);
    items.push({ key: "agent", low, high });
  }

  if (o.withMortgage) {
    items.push({ key: "bankAppraisal", low: fees.bankAppraisal[0], high: fees.bankAppraisal[1] });
    items.push({ key: "mortgageFileFee", low: MORTGAGE_FILE_FEE.value, high: MORTGAGE_FILE_FEE.value });
  }
  if (o.privateAppraisal) {
    items.push({ key: "privateAppraisal", low: fees.privateAppraisal[0], high: fees.privateAppraisal[1] });
  }

  const registry = tabu.sale + tabu.caveat + (o.withMortgage ? tabu.mortgage : 0);
  items.push({ key: "landRegistry", low: registry, high: registry });

  if (o.withMortgage && o.mortgageAdvisor) {
    items.push({ key: "mortgageAdvisor", low: fees.mortgageAdvisor[0], high: fees.mortgageAdvisor[1] });
  }

  const low = items.reduce((s, i) => s + i.low, 0);
  const high = items.reduce((s, i) => s + i.high, 0);
  const maxLtv = o.withMortgage ? maxLtvFor(o.status) : 0;
  const minDownPayment = price * (1 - maxLtv);

  return {
    items,
    low,
    high,
    tax,
    maxLtv,
    minDownPayment,
    equityLow: minDownPayment + low,
    equityHigh: minDownPayment + high,
    developerFeeCapped,
  };
}
