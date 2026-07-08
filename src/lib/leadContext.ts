/**
 * Lead attribution context — captured once per session on first page load
 * and attached to every lead so the CRM and the backup sheets can tell
 * exactly where each lead came from (page, referrer, UTM parameters).
 */

const STORAGE_KEY = "karnaf_lead_context";

export interface LeadContext {
  landingPage: string;
  referrer: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
}

/** Capture first-touch attribution once per browser session. */
export function captureLeadContext(): void {
  if (typeof window === "undefined") return;
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    const params = new URLSearchParams(window.location.search);
    const ctx: LeadContext = {
      landingPage: window.location.pathname,
      referrer: document.referrer || "",
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
      utm_content: params.get("utm_content") || "",
      utm_term: params.get("utm_term") || "",
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(ctx));
  } catch {
    // Storage unavailable — leads will simply carry less attribution detail.
  }
}

export function getLeadContext(): LeadContext {
  const empty: LeadContext = {
    landingPage: "",
    referrer: "",
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
  };
  if (typeof window === "undefined") return empty;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? { ...empty, ...JSON.parse(raw) } : empty;
  } catch {
    return empty;
  }
}
