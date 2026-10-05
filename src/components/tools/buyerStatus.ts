import type { BuyerStatus } from "@/lib/calc/purchaseTax";

/** The buyer statuses every calculator offers, in display order. */
export const BUYER_STATUSES: readonly BuyerStatus[] = ["single", "replacement", "additional", "oleh"];

export const STATUS_LABEL: Record<BuyerStatus, string> = {
  single: "דירה יחידה",
  replacement: "משפרי דיור",
  additional: "דירה נוספת",
  oleh: "עולה חדש",
};

/** A status from a shared link, or undefined when it isn't one. */
export const parseStatus = (s: string | null): BuyerStatus | undefined =>
  BUYER_STATUSES.find((v) => v === s);
