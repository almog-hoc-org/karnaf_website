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

/** Click on the purchase CTA (hosted checkout or WhatsApp purchase intent). */
export function gaBeginCheckout(method: "checkout" | "whatsapp"): void {
  gtag("event", "begin_checkout", {
    currency: "ILS",
    value: COURSE_PRICE,
    payment_channel: method,
  });
}

export function gaLead(source: string): void {
  gtag("event", "generate_lead", { lead_source: source });
}

export function gaContactClick(channel: string, page: string): void {
  gtag("event", "contact_click", { channel, page_path: page });
}
