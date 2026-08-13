/**
 * First-party analytics loader — GA4 + Microsoft Clarity.
 *
 * Both are gated behind env vars so the codebase carries the wiring without
 * shipping third-party scripts until the account IDs exist:
 *   VITE_GA4_ID     — e.g. "G-XXXXXXXXXX"
 *   VITE_CLARITY_ID — e.g. "abcdefghij"
 *
 * Funnel events mirror the Meta Pixel taxonomy so both report the same
 * journey: page_view → view_pricing → begin_checkout / generate_lead.
 * Every call is a no-op when the script didn't load (unset ID, ad-blocker).
 */

import { COURSE_PRICE } from "@/lib/constants";

const GA4_ID: string = import.meta.env.VITE_GA4_ID || "";
const CLARITY_ID: string = import.meta.env.VITE_CLARITY_ID || "";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let loaded = false;

/** Inject GA4 + Clarity. Call once, client-side only. */
export function initAnalytics(): void {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  if (GA4_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer!.push(args);
    };
    window.gtag("js", new Date());
    // SPA: page_view is reported manually per route from PixelTracker.
    window.gtag("config", GA4_ID, { send_page_view: false });
  }

  if (CLARITY_ID) {
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.clarity.ms/tag/${CLARITY_ID}`;
    document.head.appendChild(s);
  }
}

function gtag(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

export function gaPageView(path: string, title: string): void {
  gtag("event", "page_view", { page_path: path, page_title: title });
}

/** The pricing card entered the viewport — the funnel's key micro-conversion. */
export function gaViewPricing(page: string): void {
  gtag("event", "view_pricing", { page_path: page });
}

/** Purchase-CTA click locations on the sales page — which emotional beat closed. */
export type CheckoutCtaLocation =
  | "hero"
  | "curriculum"
  | "transformation"
  | "testimonials"
  | "quiz"
  | "pricing_card"
  | "final_close"
  | "sticky_bar";

/** Click on a purchase CTA (always hosted checkout). */
export function gaBeginCheckout(location: CheckoutCtaLocation): void {
  gtag("event", "begin_checkout", {
    currency: "ILS",
    value: COURSE_PRICE,
    cta_location: location,
  });
}

/** A named sales-page section entered the viewport (fired once per view).
 *  The drop-off curve across sections is the page's diagnostic EKG. */
export function gaSectionView(section: string): void {
  gtag("event", "section_view", {
    section,
    page_path: typeof window !== "undefined" ? window.location.pathname : "",
  });
}

export function gaQuizStart(): void {
  gtag("event", "quiz_start", {});
}

export function gaQuizComplete(score: number, fit: string): void {
  gtag("event", "quiz_complete", { score, fit });
}

/** Started the quiz but never reached the result — where they dropped. */
export function gaQuizAbandon(step: number): void {
  gtag("event", "quiz_abandon", { step });
}

/** Which curriculum module drew attention = which promise sells. */
export function gaCurriculumOpen(moduleTitle: string): void {
  gtag("event", "curriculum_open", { module: moduleTitle });
}

/** The FAQ open-rate ranking is the objection leaderboard. */
export function gaFaqOpen(question: string): void {
  gtag("event", "faq_open", { question });
}

/** Sticky bar shown / clicked, split by whether pricing was already seen. */
export function gaStickyBar(action: "impression" | "click", state: "pre_pricing" | "post_pricing"): void {
  gtag("event", "sticky_bar", { action, state });
}

/** The sales video was started. */
export function gaVideoPlay(): void {
  gtag("event", "video_play", { video: "course_vsl" });
}

/** Watch milestones — do people actually watch it through? */
export function gaVideoProgress(percent: number): void {
  gtag("event", "video_progress", { video: "course_vsl", percent });
}

/**
 * Course-invite popup shown / accepted. Deliberately NOT begin_checkout: this
 * is curiosity, not purchase intent, and folding the two together would teach
 * the ad platforms to optimise for browsers over buyers.
 */
export function gaCoursePopup(action: "shown" | "accepted" | "dismissed"): void {
  gtag("event", "course_popup", { action });
}

/** Scroll milestones (mirrors the Meta Pixel scroll-depth events). */
export function gaScrollDepth(depth: number, page: string): void {
  gtag("event", "scroll_depth", { depth, page_path: page });
}

/** Register an A/B assignment as a GA4 user property so every downstream
 *  event (including purchases via Measurement Protocol) can be segmented. */
export function gaSetExperiment(experimentId: string, variant: string): void {
  gtag("set", "user_properties", { [`exp_${experimentId}`]: variant });
}

/** The GA4 client id, for stitching server-side purchases back to this
 *  session (the payment itself happens on the Schooler domain). */
export function getGaClientId(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || typeof window.gtag !== "function" || !GA4_ID) {
      resolve(null);
      return;
    }
    let settled = false;
    const done = (value: string | null) => {
      if (!settled) {
        settled = true;
        resolve(value);
      }
    };
    // gtag never calls back if the script is blocked — don't hang the caller.
    setTimeout(() => done(null), 800);
    try {
      window.gtag("get", GA4_ID, "client_id", (id: string) => done(id || null));
    } catch {
      done(null);
    }
  });
}

export function gaLead(source: string): void {
  gtag("event", "generate_lead", { lead_source: source });
}

export function gaContactClick(channel: string, page: string): void {
  gtag("event", "contact_click", { channel, page_path: page });
}
