import type { ArticleSource } from "@/data/blog/types";

/**
 * Every number the site's calculators rely on, in one place — each with
 * the date it was true as of, the date it stops being true (when known),
 * and the source it came from. Same rule as the blog: no figure without a
 * dated source. A unit test fails once any rule passes its `validTo`, so
 * a stale rate can't sit on the site unnoticed.
 */
export interface FinanceRule<T = number> {
  value: T;
  /** The figure was verified as true on this date (YYYY-MM-DD). */
  asOf: string;
  /** Last day the figure is known to apply, e.g. a temporary order. */
  validTo?: string;
  source: ArticleSource;
}

const BOI_RATE_CUT_2026_09: ArticleSource = {
  title: "בפעם השלישית ברציפות: בנק ישראל הוריד את הריבית ב-0.25% ל-3.25%",
  publisher: "ביזפורטל",
  url: "https://www.bizportal.co.il/general/news/article/20040979",
  date: "2026-09-01",
};

/** Bank of Israel policy rate, %. Next decision: 21.10.2026. */
export const BOI_RATE: FinanceRule = {
  value: 3.25,
  asOf: "2026-09-01",
  source: BOI_RATE_CUT_2026_09,
};

/** Prime = Bank of Israel rate + 1.5%. */
export const PRIME_RATE: FinanceRule = {
  value: BOI_RATE.value + 1.5,
  asOf: BOI_RATE.asOf,
  source: BOI_RATE_CUT_2026_09,
};

/* ── Purchase tax (מס רכישה) ─────────────────────────────────────────── */

/** One bracket: `rate` applies to the part of the price up to `upTo`. */
export interface TaxBracket {
  /** Upper bound of the bracket, ₪ (Infinity for the top one). */
  upTo: number;
  /** 0.035 = 3.5%. */
  rate: number;
}

const PURCHASE_TAX_LAW: ArticleSource = {
  title: "חוק מיסוי מקרקעין (שבח ורכישה), התשכ״ג–1963: סעיף 9 (מס רכישה), נוסח מעודכן",
  publisher: "ויקיטקסט (נוסח החוק)",
  url: "https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%9E%D7%99%D7%A1%D7%95%D7%99_%D7%9E%D7%A7%D7%A8%D7%A7%D7%A2%D7%99%D7%9F_(%D7%A9%D7%91%D7%97_%D7%95%D7%A8%D7%9B%D7%99%D7%A9%D7%94)",
};

const PURCHASE_TAX_2026_BIZPORTAL: ArticleSource = {
  title: "מס רכישה 2026: מדרגות דירה יחידה מול דירה נוספת, ומה ההפרש בפועל",
  publisher: "ביזפורטל",
  url: "https://www.bizportal.co.il/realestates/news/article/20038028",
  date: "2026-08-06",
};

const OLEH_REGULATION: ArticleSource = {
  title: "תקנות מיסוי מקרקעין (שבח ורכישה) (מס רכישה): תקנה 12א, הטבה לעולה ברכישת דירת מגורים",
  publisher: "ויקיטקסט (נוסח התקנות)",
  url: "https://he.wikisource.org/wiki/%D7%AA%D7%A7%D7%A0%D7%95%D7%AA_%D7%9E%D7%99%D7%A1%D7%95%D7%99_%D7%9E%D7%A7%D7%A8%D7%A7%D7%A2%D7%99%D7%9F_(%D7%A9%D7%91%D7%97_%D7%95%D7%A8%D7%9B%D7%99%D7%A9%D7%94)_(%D7%9E%D7%A1_%D7%A8%D7%9B%D7%99%D7%A9%D7%94)",
};

/**
 * Single home (דירה יחידה) — also a replacement home sold in time.
 * Section 9: the amounts are not indexed in tax years 2025–2027, so they
 * hold until 15.1.2028.
 */
export const PURCHASE_TAX_SINGLE: FinanceRule<TaxBracket[]> = {
  value: [
    { upTo: 1_978_745, rate: 0 },
    { upTo: 2_347_040, rate: 0.035 },
    { upTo: 6_055_070, rate: 0.05 },
    { upTo: 20_183_565, rate: 0.08 },
    { upTo: Infinity, rate: 0.1 },
  ],
  asOf: "2026-09-28",
  validTo: "2028-01-15",
  source: PURCHASE_TAX_LAW,
};

/**
 * Additional home (דירה נוספת): 8% from the first shekel, 10% above.
 * A temporary order in force until 31.12.2026 — the test below fails on
 * 1.1.2027 so the calculator can't keep quoting it without a re-check.
 */
export const PURCHASE_TAX_ADDITIONAL: FinanceRule<TaxBracket[]> = {
  value: [
    { upTo: 6_055_070, rate: 0.08 },
    { upTo: Infinity, rate: 0.1 },
  ],
  asOf: "2026-09-28",
  validTo: "2026-12-31",
  source: PURCHASE_TAX_2026_BIZPORTAL,
};

/**
 * New immigrant (עולה), regulation 12א: a single (or replacement) home
 * bought from a year before aliyah to seven years after. 0.5% up to
 * ₪6,055,070, the regular brackets above; not available at all when the
 * home is worth more than ₪20,183,565.
 */
export const PURCHASE_TAX_OLEH: FinanceRule<{ brackets: TaxBracket[]; maxPrice: number }> = {
  value: {
    brackets: [
      { upTo: 1_978_745, rate: 0 },
      { upTo: 6_055_070, rate: 0.005 },
      { upTo: 20_183_565, rate: 0.08 },
      { upTo: Infinity, rate: 0.1 },
    ],
    maxPrice: 20_183_565,
  },
  asOf: "2026-09-28",
  validTo: "2028-01-15",
  source: OLEH_REGULATION,
};

/** All rules, for the staleness test. */
export const FINANCE_RULES: Record<string, FinanceRule<unknown>> = {
  BOI_RATE,
  PRIME_RATE,
  PURCHASE_TAX_SINGLE,
  PURCHASE_TAX_ADDITIONAL,
  PURCHASE_TAX_OLEH,
};
