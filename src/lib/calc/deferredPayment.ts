import { SALE_LAW_LINKAGE } from "@/data/finance/rules2026";

export interface DeferredDealInput {
  /** Contract price, ₪. */
  price: number;
  /** Paid at signing, 0–1 (0.2 in a 20/80 deal); the rest is due at delivery. */
  upfrontShare: number;
  /** Signing to contractual delivery, years. */
  years: number;
  /** What money costs you, % a year — a mortgage rate, or what the cash would earn. */
  discountRate: number;
  /** The deferred payment carries the legal maximum of construction-index linkage. */
  linked: boolean;
  /** Assumed construction-index rise, % a year. */
  indexRate: number;
  /** The bank's LTV ceiling at delivery, 0–1. */
  maxLtv: number;
}

export interface DeferredDealResult {
  upfront: number;
  deferred: number;
  /** The part of the deferred payment that is index-linked, ₪. */
  linkedAmount: number;
  /** What the linkage adds by delivery, ₪. */
  linkage: number;
  /** deferred + linkage. */
  dueAtDelivery: number;
  /** dueAtDelivery in today's money. */
  dueAtDeliveryToday: number;
  /** The whole deal in today's money. */
  presentValue: number;
  /** price − presentValue: positive is a discount hidden in the timing. */
  hiddenDiscount: number;
  hiddenDiscountRate: number;
  /** Most the bank lends at delivery, on the contract price. */
  bankAtDelivery: number;
  /** Cash still needed on delivery day beyond that loan. */
  equityAtDelivery: number;
}

/**
 * Most of the deferred payment the developer may link (חוק המכר, contracts
 * from 7.7.2022): half of whatever is paid after the first 20% of the price.
 */
export function linkableShare(upfrontShare: number): number {
  const { exemptShare, maxLinkedShare } = SALE_LAW_LINKAGE.value;
  return maxLinkedShare * Math.max(0, 1 - Math.max(upfrontShare, exemptShare));
}

/**
 * The real price of a developer's deferred-payment deal (20/80, 10/90…):
 * the payment due at delivery — plus index linkage if the contract has it —
 * discounted to today at the buyer's cost of money, annual compounding.
 * The same method and worked example as the developer-financing-deals-2026
 * article (₪2M, 20/80, 3 years, 5% → ₪1,782,140).
 */
export function deferredDeal(input: DeferredDealInput): DeferredDealResult {
  const price = Math.max(0, input.price);
  const upfront = price * input.upfrontShare;
  const deferred = price - upfront;
  const linkedAmount = input.linked ? price * linkableShare(input.upfrontShare) : 0;
  const linkage = linkedAmount * (Math.pow(1 + input.indexRate / 100, input.years) - 1);
  const dueAtDelivery = deferred + linkage;
  const dueAtDeliveryToday = dueAtDelivery / Math.pow(1 + input.discountRate / 100, input.years);
  const presentValue = upfront + dueAtDeliveryToday;
  const bankAtDelivery = price * input.maxLtv;

  return {
    upfront,
    deferred,
    linkedAmount,
    linkage,
    dueAtDelivery,
    dueAtDeliveryToday,
    presentValue,
    hiddenDiscount: price - presentValue,
    hiddenDiscountRate: price > 0 ? (price - presentValue) / price : 0,
    bankAtDelivery,
    equityAtDelivery: Math.max(0, dueAtDelivery - bankAtDelivery),
  };
}
