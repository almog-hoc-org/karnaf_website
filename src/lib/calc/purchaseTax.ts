import {
  PURCHASE_TAX_ADDITIONAL,
  PURCHASE_TAX_OLEH,
  PURCHASE_TAX_SINGLE,
  type TaxBracket,
} from "@/data/finance/rules2026";

/** The buyer's status on the day of purchase (the whole family unit counts as one buyer). */
export type BuyerStatus = "single" | "replacement" | "additional" | "oleh";

export interface TaxLine {
  /** The slice of the price this line taxes: (from, to]. */
  from: number;
  to: number;
  rate: number;
  tax: number;
}

export interface PurchaseTaxResult {
  /** Unrounded total, ₪. */
  total: number;
  /** total / price (0 when price is 0). */
  effectiveRate: number;
  lines: TaxLine[];
  /** Which table was applied. */
  table: "single" | "additional" | "oleh";
  /** An oleh above the benefit's price ceiling pays the regular single-home table. */
  olehOverCap: boolean;
}

/** Progressive tax: each slice of the price at its own bracket's rate. */
export function taxByBrackets(price: number, brackets: TaxBracket[]): { total: number; lines: TaxLine[] } {
  const lines: TaxLine[] = [];
  let from = 0;
  for (const b of brackets) {
    if (price <= from) break;
    const to = Math.min(price, b.upTo);
    lines.push({ from, to, rate: b.rate, tax: (to - from) * b.rate });
    from = b.upTo;
  }
  return { total: lines.reduce((sum, l) => sum + l.tax, 0), lines };
}

/**
 * Purchase tax on a residential apartment in 2026.
 * - single / replacement (sold within the legal window): single-home table;
 * - additional: 8% from the first shekel, 10% above ₪6,055,070;
 * - oleh (eligible new immigrant): 0.5% band, unless the price is above
 *   the benefit's ceiling — then the regular single-home table.
 */
export function purchaseTax(price: number, status: BuyerStatus): PurchaseTaxResult {
  const p = Math.max(0, price);
  let table: PurchaseTaxResult["table"] = "single";
  let brackets = PURCHASE_TAX_SINGLE.value;
  let olehOverCap = false;

  if (status === "additional") {
    table = "additional";
    brackets = PURCHASE_TAX_ADDITIONAL.value;
  } else if (status === "oleh") {
    if (p > PURCHASE_TAX_OLEH.value.maxPrice) {
      olehOverCap = true;
    } else {
      table = "oleh";
      brackets = PURCHASE_TAX_OLEH.value.brackets;
    }
  }

  const { total, lines } = taxByBrackets(p, brackets);
  return { total, effectiveRate: p > 0 ? total / p : 0, lines, table, olehOverCap };
}
