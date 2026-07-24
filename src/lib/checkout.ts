import { CHECKOUT_URL } from "@/lib/constants";
import { getLeadContext } from "@/lib/leadContext";

/** Ad-platform click IDs worth carrying into the checkout page so paid
 *  traffic stays attributable after the visitor leaves the site. */
const CLICK_ID_PARAMS = ["fbclid", "gclid", "ttclid"] as const;

/**
 * The hosted-checkout URL enriched with attribution: first-touch UTM
 * context plus any ad click IDs present on the current page URL. Params
 * already baked into the checkout link (e.g. Schooler's tid and
 * utm_source) are never overwritten. SSR-safe — returns the plain
 * checkout URL when there is no window.
 */
export function buildCheckoutUrl(): string {
  if (typeof window === "undefined") return CHECKOUT_URL;
  try {
    const url = new URL(CHECKOUT_URL);
    const ctx = getLeadContext();
    const current = new URLSearchParams(window.location.search);

    const utm: Record<string, string> = {
      utm_medium: ctx.utm_medium,
      utm_campaign: ctx.utm_campaign,
      utm_content: ctx.utm_content,
      utm_term: ctx.utm_term,
    };
    for (const [key, value] of Object.entries(utm)) {
      if (value && !url.searchParams.has(key)) url.searchParams.set(key, value);
    }
    for (const param of CLICK_ID_PARAMS) {
      const value = current.get(param);
      if (value && !url.searchParams.has(param)) url.searchParams.set(param, value);
    }
    return url.toString();
  } catch {
    return CHECKOUT_URL;
  }
}
