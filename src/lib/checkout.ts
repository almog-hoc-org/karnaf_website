import { CHECKOUT_URL } from "@/lib/constants";
import { getLeadContext } from "@/lib/leadContext";
import { getQuizContext } from "@/lib/quizContext";

/** Ad-platform click IDs worth carrying into the checkout page so paid
 *  traffic stays attributable after the visitor leaves the site. */
const CLICK_ID_PARAMS = ["fbclid", "gclid", "ttclid"] as const;

/** Cached GA4 client id — resolved in the background, attached when ready. */
let gaClientId: string | null = null;

/** Store the GA4 client id so purchases reported server-side (Schooler →
 *  CRM → GA4 Measurement Protocol) can be stitched to this session. */
export function setCheckoutClientId(id: string | null): void {
  gaClientId = id;
}

/**
 * The hosted-checkout URL enriched with attribution: first-touch UTM
 * context, ad click IDs, the visitor's quiz answers (so the CRM knows
 * which fear bought) and the GA4 client id for closed-loop purchase
 * reporting. Params already baked into the checkout link (Schooler's tid
 * and utm_source) are never overwritten. SSR-safe.
 */
export function buildCheckoutUrl(): string {
  if (typeof window === "undefined") return CHECKOUT_URL;
  try {
    const url = new URL(CHECKOUT_URL);
    const ctx = getLeadContext();
    const quiz = getQuizContext();
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
    if (quiz) {
      url.searchParams.set("quiz_goal", quiz.goal);
      url.searchParams.set("quiz_concern", quiz.concern);
      url.searchParams.set("quiz_timeline", quiz.timeline);
    }
    if (gaClientId) url.searchParams.set("ga_cid", gaClientId);
    return url.toString();
  } catch {
    return CHECKOUT_URL;
  }
}
