/**
 * Tiny shared flag: has the visitor actually seen the price yet?
 * The sticky bar uses it to switch from "scroll to the price" to a
 * direct purchase CTA — someone who read the price and kept scrolling
 * through the FAQ is handling objections, not looking for the price.
 */

export const PRICING_SEEN_EVENT = "karnaf:pricing-seen";

let pricingSeen = false;

export function markPricingSeen(): void {
  if (pricingSeen || typeof window === "undefined") return;
  pricingSeen = true;
  window.dispatchEvent(new Event(PRICING_SEEN_EVENT));
}

export function hasSeenPricing(): boolean {
  return pricingSeen;
}
