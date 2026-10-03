/**
 * Shekel amounts for interactive widgets. en-US grouping ("1,250,000")
 * renders identically on the server and in every browser, so pre-rendered
 * HTML matches hydration — he-IL output varies by ICU build.
 */
export const formatILS = (n: number): string => `₪${Math.round(n).toLocaleString("en-US")}`;

/** A percentage with at most `digits` decimals, e.g. 4.75 → "4.75%", 25 → "25%". */
export const formatPercent = (n: number, digits = 2): string =>
  `${Number(n.toFixed(digits)).toString()}%`;
