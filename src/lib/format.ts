/**
 * Shekel amounts for interactive widgets. en-US grouping ("1,250,000")
 * renders identically on the server and in every browser, so pre-rendered
 * HTML matches hydration — he-IL output varies by ICU build.
 */
export const formatILS = (n: number): string => `₪${Math.round(n).toLocaleString("en-US")}`;

/** A percentage with at most `digits` decimals, e.g. 4.75 → "4.75%", 25 → "25%". */
export const formatPercent = (n: number, digits = 2): string =>
  `${Number(n.toFixed(digits)).toString()}%`;

/** Millions for compact chips, e.g. 2_600_000 → "₪2.6M". */
export const formatMillions = (n: number): string =>
  `₪${(n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;

/** An ISO date (YYYY-MM-DD) as Israelis write it: "31.12.2026". */
export const formatDateDots = (iso: string): string => iso.split("-").reverse().join(".");
