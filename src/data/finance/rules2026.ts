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

/* ── Mortgage limits (Bank of Israel directive 329) ───────────────────── */

const BOI_DIRECTIVE_329: ArticleSource = {
  title: "ניהול בנקאי תקין 329 — מגבלות למתן הלוואות לדיור (גרסה 13, חוזר 2852)",
  publisher: "בנק ישראל — הפיקוח על הבנקים",
  url: "https://boi.org.il/media/ez4npagt/329.pdf",
  date: "2026-06-30",
};

/** Maximum loan-to-value by buyer type (section 2). An eligible oleh buys a single home. */
export const MAX_LTV: FinanceRule<{ single: number; replacement: number; additional: number }> = {
  value: { single: 0.75, replacement: 0.7, additional: 0.5 },
  asOf: "2026-06-30",
  source: BOI_DIRECTIVE_329,
};

/**
 * Repayment-to-income (sections 5–6): a bank may not approve a payment above
 * 50% of disposable income; above 40% the loan carries a 100% risk weight
 * (more capital for the bank), so many banks stop before it. Max term 30 years.
 */
export const PAYMENT_TO_INCOME: FinanceRule<{ max: number; extraCapitalAbove: number; maxYears: number }> = {
  value: { max: 0.5, extraCapitalAbove: 0.4, maxYears: 30 },
  asOf: "2026-06-30",
  source: BOI_DIRECTIVE_329,
};

/* ── One-off costs of a purchase ──────────────────────────────────────── */

export const VAT_RATE: FinanceRule = {
  value: 0.18,
  asOf: "2026-10-03",
  source: {
    title: "הוראת פרשנות: העלאת שיעור המע״מ ל-18% מ-1.1.2025",
    publisher: "רשות המסים",
    url: "https://www.gov.il/BlobFolder/dynamiccollectorresultitem/represent-info-051224-2/he/vat_represent-info-051224-2.pdf",
    date: "2024-12-05",
  },
};

/**
 * What a developer may charge a buyer toward its lawyer (תקנות המכר
 * (דירות) (הגבלת גובה ההוצאות המשפטיות), 2014): the lower of the indexed
 * cap and 0.5% of the price, before VAT. Not capped above the price
 * ceiling. The cap is re-indexed every 1 January, hence validTo.
 */
export const DEVELOPER_LEGAL_FEE: FinanceRule<{ cap: number; rate: number; capAppliesUpTo: number }> = {
  value: { cap: 5_915, rate: 0.005, capAppliesUpTo: 4_642_750 },
  asOf: "2026-01-21",
  validTo: "2026-12-31",
  source: {
    title: "הודעת המכר (דירות) (הגבלת גובה ההוצאות המשפטיות) (עדכון סכום), ק״ת 12242",
    publisher: "קובץ התקנות",
    url: "https://olaw.org.il/takanot/takanot-12242.pdf",
    date: "2026-01-21",
  },
};

/** Land registry fees from 1.1.2026, re-indexed every 1 January. */
export const LAND_REGISTRY_FEES: FinanceRule<{ sale: number; caveat: number; mortgage: number; caveatRemoval: number }> = {
  value: { sale: 44, caveat: 188, mortgage: 188, caveatRemoval: 127 },
  asOf: "2026-01-05",
  validTo: "2026-12-31",
  source: {
    title: "הודעת המקרקעין (אגרות) (עדכון סכומים), ק״ת 12193",
    publisher: "קובץ התקנות",
    url: "https://olaw.org.il/takanot/takanot-12193.pdf",
    date: "2026-01-05",
  },
};

/** Mortgage file-opening fee cap — חוק הבנקאות (שירות ללקוח), section 9ז(א1). */
export const MORTGAGE_FILE_FEE: FinanceRule = {
  value: 360,
  asOf: "2026-10-01",
  source: {
    title: "חוק הבנקאות (שירות ללקוח) (תיקון מס׳ 34): עמלה על טיפול בבקשה להלוואה לדיור",
    publisher: "ספר החוקים (הכנסת)",
    url: "https://fs.knesset.gov.il/24/law/24_lsr_628369.pdf",
    date: "2022-06-22",
  },
};

const COSTS_2026_BIZPORTAL: ArticleSource = {
  title: "העלויות הנלוות שמפילות תקציבים: כמה באמת עולה לקנות דירה",
  publisher: "ביזפורטל",
  url: "https://www.bizportal.co.il/realestates/news/article/20038031",
  date: "2026-08-06",
};

/**
 * Market ranges — practice, not law, so they are shown as ranges and
 * re-checked yearly (validTo). Rates are before VAT.
 */
export const MARKET_FEES: FinanceRule<{
  buyerLawyerRate: [number, number];
  agentRate: [number, number];
  bankAppraisal: [number, number];
  privateAppraisal: [number, number];
  mortgageAdvisor: [number, number];
}> = {
  value: {
    buyerLawyerRate: [0.005, 0.01],
    agentRate: [0.01, 0.02],
    bankAppraisal: [350, 950],
    privateAppraisal: [1_500, 3_500],
    mortgageAdvisor: [5_000, 10_000],
  },
  asOf: "2026-08-06",
  validTo: "2027-08-06",
  source: COSTS_2026_BIZPORTAL,
};

export const MORTGAGE_ADVISOR_SOURCE: ArticleSource = {
  title: "יועצי משכנתאות: כמה זה עולה ומה מקבלים",
  publisher: "ביזפורטל",
  url: "https://www.bizportal.co.il/realestates/news/article/20038357",
  date: "2026-08-09",
};

export const REAL_ESTATE_AGENTS_LAW: ArticleSource = {
  title: "חוק המתווכים במקרקעין, התשנ״ו–1996 (סעיפים 9 ו-14)",
  publisher: "ויקיטקסט (נוסח החוק)",
  url: "https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%94%D7%9E%D7%AA%D7%95%D7%95%D7%9B%D7%99%D7%9D_%D7%91%D7%9E%D7%A7%D7%A8%D7%A7%D7%A2%D7%99%D7%9F",
};

/* ── Buying from a developer (חוק המכר) ─────────────────────────────── */

const SALE_LAW_AMENDMENT_9: ArticleSource = {
  title: "חוק המכר (דירות) (תיקון מס׳ 9), התשפ״ב–2022: הצמדה ופיצוי על איחור במסירה",
  publisher: "ספר החוקים (הכנסת)",
  url: "https://fs.knesset.gov.il/24/law/24_lsr_628987.pdf",
  date: "2022-06-30",
};

/**
 * Index linkage a developer may charge (contracts from 7.7.2022): no
 * linkage by default; by agreement, at most half of each payment, and
 * never on the first 20% of the price. In a 20/80 deal that caps the
 * linked part at 40% of the price.
 */
export const SALE_LAW_LINKAGE: FinanceRule<{ exemptShare: number; maxLinkedShare: number }> = {
  value: { exemptShare: 0.2, maxLinkedShare: 0.5 },
  asOf: "2026-09-28",
  source: SALE_LAW_AMENDMENT_9,
};

/**
 * Residential construction-inputs index, change over the last 12 months, %.
 * A monthly statistic — validTo forces a refresh within six months.
 */
export const CONSTRUCTION_INDEX_12M: FinanceRule = {
  value: 3.5,
  asOf: "2026-09-15",
  validTo: "2027-03-15",
  source: {
    title: "מדדי מחירי תשומות: אוגוסט 2026 (הודעה לתקשורת 291/2026)",
    publisher: "הלשכה המרכזית לסטטיסטיקה",
    url: "https://www.cbs.gov.il/he/mediarelease/Madad/DocLib/2026/291/10_26_291b.pdf",
    date: "2026-09-15",
  },
};

/* ── Market statistics and tax for the rent-vs-buy comparison ───────── */

const CBS_SEPTEMBER_2026: ArticleSource = {
  title: "אפקט הריבית? מחירי הדירות שוב עולים, האינפלציה מרוסנת",
  publisher: "N12 / mako (נתוני הלמ״ס)",
  url: "https://www.mako.co.il/news-money/2026_q3/Article-cc1b459fe95a0a1026.htm",
  date: "2026-09-15",
};

/**
 * Rent change over the last year, % (CBS, published 15.9.2026): tenants
 * who renewed a lease vs. new tenants. Monthly statistics — validTo forces
 * a refresh within six months.
 */
export const RENT_CHANGE_12M: FinanceRule<{ renewals: number; newTenants: number }> = {
  value: { renewals: 2.6, newTenants: 4.4 },
  asOf: "2026-09-15",
  validTo: "2027-03-15",
  source: CBS_SEPTEMBER_2026,
};

/** Consumer-price inflation over the 12 months to August 2026, %. */
export const INFLATION_12M: FinanceRule = {
  value: 1.5,
  asOf: "2026-09-15",
  validTo: "2027-03-15",
  source: CBS_SEPTEMBER_2026,
};

/** Home price index, June–July 2026 against a year earlier, %. */
export const HOME_PRICES_12M: FinanceRule = {
  value: -1.2,
  asOf: "2026-09-15",
  validTo: "2027-03-15",
  source: CBS_SEPTEMBER_2026,
};

/** Gross rental yield on an average apartment, July 2026 — lowest and highest city in the analysis. */
export const GROSS_RENT_YIELD: FinanceRule<[number, number]> = {
  value: [0.0231, 0.0321],
  asOf: "2026-09-08",
  validTo: "2027-09-08",
  source: {
    title: "המשקיעים חוזרים? למה רכישת דירה הפכה להיות אטרקטיבית ביחס להשקעות סולידיות",
    publisher: "ביזפורטל",
    url: "https://www.bizportal.co.il/realestates/news/article/20041549",
    date: "2026-09-08",
  },
};

/** Tax on an individual's real capital gain from securities (not a substantial shareholder). */
export const CAPITAL_GAINS_TAX: FinanceRule = {
  value: 0.25,
  asOf: "2026-07-25",
  source: {
    title: "מיסוי רווחי הון ודיבידנד למשקיע הפרטי: כמה תשלמו על כל שקל רווח",
    publisher: "ביזפורטל",
    url: "https://www.bizportal.co.il/guides/news/article/20036860",
    date: "2026-07-25",
  },
};

/** All rules, for the staleness test. */
export const FINANCE_RULES: Record<string, FinanceRule<unknown>> = {
  BOI_RATE,
  PRIME_RATE,
  PURCHASE_TAX_SINGLE,
  PURCHASE_TAX_ADDITIONAL,
  PURCHASE_TAX_OLEH,
  MAX_LTV,
  PAYMENT_TO_INCOME,
  VAT_RATE,
  DEVELOPER_LEGAL_FEE,
  LAND_REGISTRY_FEES,
  MORTGAGE_FILE_FEE,
  MARKET_FEES,
  SALE_LAW_LINKAGE,
  CONSTRUCTION_INDEX_12M,
  RENT_CHANGE_12M,
  INFLATION_12M,
  HOME_PRICES_12M,
  GROSS_RENT_YIELD,
  CAPITAL_GAINS_TAX,
};
