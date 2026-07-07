import { trackLead, FORM_LABELS } from "@/lib/pixel";
import { gaLead } from "@/lib/analytics";
import { getLeadContext } from "@/lib/leadContext";

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
}

/** Product bucket — decides which backup sheet the lead lands in. */
function productFor(payload: WebsiteLeadPayload): { product: string; productLabel: string } {
  if (payload.source === "mortgage" || payload.service === "mortgage") {
    return { product: "mortgage", productLabel: "קרנף משכנתא" };
  }
  if (payload.source === "premium-investors" || payload.service === "premium") {
    return { product: "premium", productLabel: "ליווי משקיעים פרימיום" };
  }
  if (payload.service === "webinar") {
    return { product: "course", productLabel: "וובינר (הדרך לדירה)" };
  }
  if (payload.service === "derech" || payload.service === "waitlist") {
    return { product: "course", productLabel: "הדרך לדירה" };
  }
  return { product: "course", productLabel: "כללי — יצירת קשר" };
}

/** Mirror the lead into the per-product Google Sheet via Make. Best-effort. */
function mirrorLeadToSheets(payload: WebsiteLeadPayload): void {
  try {
    const ctx = getLeadContext();
    const { product, productLabel } = productFor(payload);
    const label = FORM_LABELS[payload.source] || { name: payload.source, category: "כללי" };

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
      submittedAt: new Date().toISOString(),
    });

    // keepalive lets the request survive an immediate navigation away.
    fetch(SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      // Backup channel only — never surface to the user.
    });
  } catch {
    // Never let the mirror break the main submission path.
  }
}

export async function submitWebsiteLead(payload: WebsiteLeadPayload): Promise<void> {
  const ctx = getLeadContext();
  const { product, productLabel } = productFor(payload);

  // Mirror to the backup sheet first — even if the CRM call fails, the
  // lead is not lost.
  mirrorLeadToSheets(payload);

  const response = await fetch(CRM_WEBSITE_LEADS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
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
    }),
  });

  if (!response.ok) {
    let errorMessage = "Lead submission failed";
    try {
      const data = await response.json();
      if (typeof data?.error === "string") errorMessage = data.error;
    } catch {
      // Keep the generic error.
    }
    throw new Error(errorMessage);
  }

  // Report a successful lead to the Meta Pixel (Hebrew-labelled by form) + GA4.
  trackLead(payload.source, {
    service: payload.service,
    equity: payload.equity,
  });
  gaLead(payload.source);
}
