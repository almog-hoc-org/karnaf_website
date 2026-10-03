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

/** All rules, for the staleness test. */
export const FINANCE_RULES: Record<string, FinanceRule<unknown>> = {
  BOI_RATE,
  PRIME_RATE,
};
