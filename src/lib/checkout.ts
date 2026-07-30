import { CHECKOUT_URL, COURSE_PRICE } from "@/lib/constants";
import { getLeadContext } from "@/lib/leadContext";
import { getQuizContext } from "@/lib/quizContext";

/** Ad-platform click IDs worth carrying into the checkout page so paid
 *  traffic stays attributable after the visitor leaves the site. */
const CLICK_ID_PARAMS = ["fbclid", "gclid", "ttclid"] as const;

/** Cached GA4 client id — resolved in the background, attached when ready. */
let gaClientId: string | null = null;

/** Read a browser cookie by name (SSR-safe). */
function readCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
  );
  return match ? decodeURIComponent(match[1]) : null;
}

/** Store the GA4 client id so purchases reported server-side (Schooler →
 *  CRM → GA4 Measurement Protocol) can be stitched to this session. */
export function setCheckoutClientId(id: string | null): void {
  gaClientId = id;
}

export interface CheckoutUrlOptions {
  /**
   * Mark the visit as a free-lesson preview rather than purchase intent, so
   * the checkout page's own reporting can tell the two apart. Attribution is
   * still attached in full — a previewer who buys next week should credit
   * the same source.
   */
  preview?: boolean;
}

/**
 * The hosted-checkout URL enriched with attribution: first-touch UTM
 * context, ad click IDs, the visitor's quiz answers (so the CRM knows
 * which fear bought) and the GA4 client id for closed-loop purchase
 * reporting. Everything is added as query params only — the checkout
 * link's own path (Schooler's tracking segment, e.g. /t_JHrKI) and any
 * params baked into it are never touched. SSR-safe.
 */
export function buildCheckoutUrl(options: CheckoutUrlOptions = {}): string {
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

    // Meta identity for the Purchase event fired on the checkout thank-you
    // page (see docs/PIXEL-CLOSED-LOOP.md): the pixel's browser id (_fbp)
    // and click id (_fbc). If _fbc isn't set yet but fbclid is in the URL,
    // synthesise it in Meta's canonical "fb.1.<ts>.<fbclid>" format so the
    // Purchase still attributes to the ad click across the domain hop.
    const fbp = readCookie("_fbp");
    if (fbp && !url.searchParams.has("_fbp")) url.searchParams.set("_fbp", fbp);
    let fbc = readCookie("_fbc");
    const fbclid = current.get("fbclid");
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    if (fbc && !url.searchParams.has("_fbc")) url.searchParams.set("_fbc", fbc);

    // Purchase value fallback for the thank-you page when the platform's
    // own order-total variable isn't available.
    if (!url.searchParams.has("karnaf_value")) {
      url.searchParams.set("karnaf_value", String(COURSE_PRICE));
    }
    if (!url.searchParams.has("currency")) url.searchParams.set("currency", "ILS");

    if (quiz) {
      url.searchParams.set("quiz_goal", quiz.goal);
      url.searchParams.set("quiz_concern", quiz.concern);
      url.searchParams.set("quiz_timeline", quiz.timeline);
    }
    if (gaClientId) url.searchParams.set("ga_cid", gaClientId);
    if (options.preview && !url.searchParams.has("karnaf_intent")) {
      url.searchParams.set("karnaf_intent", "free_preview");
    }
    return url.toString();
  } catch {
    return CHECKOUT_URL;
  }
}
