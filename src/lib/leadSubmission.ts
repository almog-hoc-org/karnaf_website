import { trackLead, setAdvancedMatching, FORM_LABELS } from "@/lib/pixel";
import { gaLead } from "@/lib/analytics";
import { getLeadContext } from "@/lib/leadContext";
import { MARKETING_CONSENT_TEXT, MARKETING_CONSENT_VERSION } from "@/lib/consent";

const CRM_WEBSITE_LEADS_URL: string =
  import.meta.env.VITE_LEADS_INTAKE_URL ||
  "https://svkzkpgccahwmyflobvn.functions.supabase.co/website-leads-intake";

/**
 * Make.com webhook that mirrors every lead into the per-product Google
 * Sheets (backup + partner sharing). Delivery is best-effort: a webhook
 * failure never blocks the CRM submission or the user experience.
 */
const SHEETS_WEBHOOK_URL: string =
  import.meta.env.VITE_LEADS_SHEETS_WEBHOOK_URL ||
  "https://hook.eu2.make.com/l8rrywaljm34l2sjus2327hy9o0sgogu";

export interface WebsiteLeadPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  source: string;
  stage?: string;
  equity?: string;
  message?: string;
  /** Opted in to marketing messages (unchecked by default — lib/consent.ts). */
  marketingConsent?: boolean;
}

/** The consent record sent with every lead: yes/no, the exact text, when. */
function consentRecord(payload: WebsiteLeadPayload) {
  const yes = !!payload.marketingConsent;
  return {
    yes,
    text: yes ? MARKETING_CONSENT_TEXT : "",
    version: MARKETING_CONSENT_VERSION,
    at: yes ? new Date().toISOString() : "",
  };
}

/** Product bucket — decides which backup sheet the lead lands in. */
function productFor(payload: WebsiteLeadPayload): { product: string; productLabel: string } {
  if (payload.source === "mortgage" || payload.service === "mortgage") {
    return { product: "mortgage", productLabel: "קרנף משכנתא" };
  }
  if (payload.source === "premium-investors" || payload.service === "premium") {
    return { product: "premium", productLabel: "ליווי משקיעים פרימיום" };
  }
  if (payload.source === "research-waitlist") {
    return { product: "research", productLabel: "מערכת המחקר — רשימת המתנה" };
  }
  if (payload.service === "webinar") {
    return { product: "course", productLabel: "וובינר (המדריך המעשי לרכישת דירה)" };
  }
  if (payload.service === "derech" || payload.service === "waitlist") {
    return { product: "course", productLabel: "המדריך המעשי לרכישת דירה" };
  }
  return { product: "course", productLabel: "כללי — יצירת קשר" };
}

/**
 * Mirror the lead into the per-product Google Sheet via Make. Resolves
 * true when Make accepted it; never rejects.
 */
function mirrorLeadToSheets(payload: WebsiteLeadPayload): Promise<boolean> {
  try {
    const ctx = getLeadContext();
    const { product, productLabel } = productFor(payload);
    const label = FORM_LABELS[payload.source] || { name: payload.source, category: "כללי" };
    const consent = consentRecord(payload);

    const body = JSON.stringify({
      product,
      productLabel,
      name: payload.name,
      phone: payload.phone,
      email: payload.email || "",
      service: payload.service || "",
      source: payload.source,
      sourceLabel: label.name,
      page: window.location.pathname,
      pageUrl: window.location.href,
      landingPage: ctx.landingPage,
      referrer: ctx.referrer,
      utm_source: ctx.utm_source,
      utm_medium: ctx.utm_medium,
      utm_campaign: ctx.utm_campaign,
      utm_content: ctx.utm_content,
      utm_term: ctx.utm_term,
      message: payload.message || "",
      stage: payload.stage || "",
      equity: payload.equity || "",
      marketingConsent: consent.yes ? "כן" : "לא",
      marketingConsentText: consent.text,
      marketingConsentVersion: consent.version,
      marketingConsentAt: consent.at,
      submittedAt: new Date().toISOString(),
    });

    // keepalive lets the request survive an immediate navigation away.
    return fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    })
      .then((res) => res.ok)
      .catch(() => false);
  } catch {
    // Never let the mirror break the main submission path.
    return Promise.resolve(false);
  }
}

/** Resolves the promise's value, or false if it takes longer than `ms`. */
function within(promise: Promise<boolean>, ms: number): Promise<boolean> {
  return Promise.race([promise, new Promise<boolean>((r) => setTimeout(() => r(false), ms))]);
}

/** refused = the CRM rejected the submission itself (a 4xx the visitor must fix). */
interface CrmResult {
  ok: boolean;
  refused: boolean;
  error: string;
}

async function postToCrm(body: string): Promise<CrmResult> {
  let response: Response;
  try {
    response = await fetch(CRM_WEBSITE_LEADS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
  } catch {
    return { ok: false, refused: false, error: "Lead submission failed" };
  }
  if (response.ok) return { ok: true, refused: false, error: "" };

  let error = "Lead submission failed";
  try {
    const data = await response.json();
    if (typeof data?.error === "string") error = data.error;
  } catch {
    // Keep the generic error.
  }
  // A 4xx (other than a rate limit) refuses the submission itself — an
  // invalid email, a missing name — so the visitor has to fix it.
  const refused = response.status >= 400 && response.status < 500 && response.status !== 429;
  return { ok: false, refused, error };
}

export async function submitWebsiteLead(payload: WebsiteLeadPayload): Promise<void> {
  const ctx = getLeadContext();
  const { product, productLabel } = productFor(payload);
  const consent = consentRecord(payload);
  const { marketingConsent: _consent, ...lead } = payload;

  // Mirror to the backup sheet first — even if the CRM call fails, the
  // lead is not lost.
  const mirrored = mirrorLeadToSheets(payload);

  const crm = await postToCrm(
    JSON.stringify({
      ...lead,
      // Extra classification/attribution fields. Intakes that don't know
      // them simply ignore unknown JSON keys.
      product,
      product_label: productLabel,
      page_path: window.location.pathname,
      page_url: window.location.href,
      landing_page: ctx.landingPage,
      referrer: ctx.referrer,
      utm_source: ctx.utm_source,
      utm_medium: ctx.utm_medium,
      utm_campaign: ctx.utm_campaign,
      utm_content: ctx.utm_content,
      utm_term: ctx.utm_term,
      marketing_consent: consent.yes,
      marketing_consent_text: consent.text,
      marketing_consent_version: consent.version,
      marketing_consent_at: consent.at || null,
    })
  );

  if (!crm.ok) {
    if (crm.refused) throw new Error(crm.error);
    // The CRM is down (5xx, network, rate limit). If the backup sheet took
    // the lead, it is captured: carry on to the thank-you page rather than
    // tell the visitor to retry into the same outage — and the conversion
    // still counts. Only when both channels failed is it an error.
    if (!(await within(mirrored, 6000))) throw new Error(crm.error);
  }

  // Turn on Advanced Matching with the details this lead just gave us, so
  // the Lead event (and the eventual Purchase) match a real person.
  setAdvancedMatching({
    email: payload.email,
    phone: payload.phone,
    firstName: payload.name?.split(" ")[0],
  });

  // Report a successful lead to the Meta Pixel (Hebrew-labelled by form) + GA4.
  trackLead(payload.source, {
    service: payload.service,
    equity: payload.equity,
  });
  gaLead(payload.source);
}
