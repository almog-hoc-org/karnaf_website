/**
 * Meta Pixel helpers.
 *
 * All events are sent with Hebrew, human-readable parameters so the reports
 * in Meta Events Manager are easy to read — also for people who don't know
 * the technical world. See META-PIXEL.md for a full explanation of every event.
 *
 * Every call is guarded: if the pixel didn't load (ad-blocker etc.) nothing
 * breaks — the function simply does nothing.
 */

import { COURSE_PRICE } from "@/lib/constants";

type PixelParams = Record<string, string | number | boolean | undefined>;

/** The Meta Pixel id — single source of truth, kept in sync with the
 *  fbq('init', …) call in index.html and the Purchase snippet on the
 *  Schooler/Grow thank-you page (see docs/PIXEL-CLOSED-LOOP.md). */
export const META_PIXEL_ID = "1659334891302781";

/** Stable product id shared across InitiateCheckout (site) and Purchase
 *  (checkout thank-you page) so both map to the same catalog product and
 *  can power value-based audiences. */
export const COURSE_CONTENT_ID = "derech-ladira";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function fbq(...args: unknown[]): void {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq(...args);
  }
}

/**
 * Enable Advanced Matching for this visitor by re-initialising the pixel
 * with the identifiers they just gave us (on a successful lead). Meta
 * hashes em/ph/fn in the browser before sending — we pass raw values and
 * never store them. This lets Meta match the Lead (and the later
 * Purchase) to a real person, tightening attribution and audiences.
 */
export function setAdvancedMatching(user: {
  email?: string;
  phone?: string;
  firstName?: string;
}): void {
  const data: Record<string, string> = {};
  if (user.email) data.em = user.email.trim().toLowerCase();
  if (user.phone) data.ph = user.phone.replace(/[^\d]/g, "");
  if (user.firstName) data.fn = user.firstName.trim().toLowerCase();
  if (Object.keys(data).length === 0) return;
  fbq("init", META_PIXEL_ID, data);
}

/** Human-readable Hebrew name for each page, by URL path. */
export function pageNameFor(pathname: string): string {
  if (pathname === "/") return "דף הבית";
  if (pathname.startsWith("/course")) return "המדריך המעשי לרכישת דירה — הקורס";
  if (pathname.startsWith("/premium")) return "ליווי משקיעים פרימיום";
  if (pathname.startsWith("/mortgage")) return "קרנף משכנתא — ייעוץ משכנתא";
  if (pathname.startsWith("/program")) return "המדריך המעשי לרכישת דירה — עמוד תוכנית";
  if (pathname.startsWith("/about")) return "אודות — סיפורו של קרנף";
  if (pathname.startsWith("/testimonials")) return "סיפורי הצלחה";
  if (pathname.startsWith("/contact")) return "צור קשר";
  if (pathname.startsWith("/services")) return "השירותים שלנו";
  if (pathname.startsWith("/privacy")) return "מדיניות פרטיות";
  if (pathname.startsWith("/blog/")) return "מאמר בבלוג";
  if (pathname.startsWith("/blog")) return "בלוג — ידע ותובנות";
  return "עמוד באתר";
}

/** צפייה בעמוד — נשלח בכל מעבר בין עמודים באתר. */
export function trackPageView(pathname: string): void {
  const name = pageNameFor(pathname);
  fbq("track", "PageView", { content_name: name, page_path: pathname });

  // Key service pages also count as "ViewContent" so ad campaigns that
  // send people to them can optimize toward the page-view.
  if (pathname.startsWith("/premium") || pathname.startsWith("/course")) {
    fbq("track", "ViewContent", {
      content_name: name,
      content_category: "עמוד שירות",
      page_path: pathname,
    });
  }
}

/** Which form was submitted — maps the technical source to a Hebrew label. */
export const FORM_LABELS: Record<string, { name: string; category: string }> = {
  "premium-investors": { name: "טופס ליווי משקיעים פרימיום", category: "ליווי משקיעים" },
  "research-waitlist": { name: "רשימת המתנה — מערכת המחקר", category: "מערכת המחקר" },
  mortgage: { name: "טופס קרנף משכנתא", category: "ייעוץ משכנתא" },
  website: { name: "טופס יצירת קשר באתר", category: "יצירת קשר" },
  footer: { name: "טופס בתחתית העמוד", category: "יצירת קשר" },
  "course-quiz-early": { name: "הרשמה לוובינר — שאלון ההתאמה (עוד מוקדם)", category: "וובינר" },
  "course-not-today": { name: "הרשמה לוובינר — דף התוכנית (לא היום)", category: "וובינר" },
  "home-paths": { name: "הרשמה לוובינר — דף הבית", category: "וובינר" },
  "blog-index": { name: "הרשמה לוובינר — הבלוג", category: "וובינר" },
};

/**
 * Relative lead values (ILS). Without a value every Lead looks the same to
 * Meta — a ₪1M-equity investor and a webinar sign-up would train the same
 * optimisation. These are weights, not revenue: tune them in one place.
 */
const LEAD_VALUES: Record<string, number> = {
  "premium-investors": 5000,
  mortgage: 1500,
  website: 500,
  footer: 500,
  "course-quiz-early": 200,
  "course-not-today": 200,
  "home-paths": 200,
  "blog-index": 200,
};
const DEFAULT_LEAD_VALUE = 300;

/** ליד — נשלח כשמישהו משאיר פרטים בטופס בהצלחה. */
export function trackLead(source: string, extra?: PixelParams): void {
  const label = FORM_LABELS[source] || { name: "טופס באתר", category: "כללי" };
  // A waitlist for an unreleased product is interest, not a sales lead —
  // keep it out of the Lead event so it never trains the ad optimisation.
  if (source === "research-waitlist") {
    fbq("trackCustom", "רשימת_המתנה", {
      content_name: label.name,
      content_category: label.category,
      source,
      ...extra,
    });
    return;
  }
  fbq("track", "Lead", {
    content_name: label.name,
    content_category: label.category,
    source,
    value: LEAD_VALUES[source] ?? DEFAULT_LEAD_VALUE,
    currency: "ILS",
    ...extra,
  });
}

/** מעבר לסליקה — נשלח בלחיצה על כפתור הרכישה, לפני היציאה לדף התשלום.
 *  קהל "נוטשי סליקה" = מי שירה את האירוע הזה ולא ירה Purchase (שמגיע
 *  מ-Schooler דרך ה-CRM ב-Conversions API). */
export function trackInitiateCheckout(ctaLocation?: string): void {
  fbq("track", "InitiateCheckout", {
    content_name: "המדריך המעשי לרכישת דירה — התוכנית הדיגיטלית",
    content_category: "רכישה",
    // content_ids + content_type mirror the Purchase event fired on the
    // Schooler/Grow thank-you page, so both feed the same product audiences.
    content_ids: [COURSE_CONTENT_ID],
    content_type: "product",
    currency: "ILS",
    value: COURSE_PRICE,
    ...(ctaLocation ? { cta_location: ctaLocation } : {}),
  });
}

/** יצירת קשר — נשלח בלחיצה על וואטסאפ / טלפון / אימייל. */
export function trackContact(channel: string, page: string): void {
  fbq("track", "Contact", {
    content_name: channel,
    content_category: "יצירת קשר",
    page_path: page,
  });
}

/** לחיצה על כפתור — נשלח בלחיצה על כפתור או קישור חשוב. */
export function trackButton(label: string, destination: string, page: string): void {
  fbq("trackCustom", "לחיצה_על_כפתור", {
    content_name: label,
    destination,
    page_path: page,
  });
}

/** רשת חברתית — נשלח בלחיצה על אייקון רשת חברתית. */
export function trackSocial(network: string, page: string): void {
  fbq("trackCustom", "רשת_חברתית", { content_name: network, page_path: page });
}

/** עומק גלילה — נשלח כשגולשים 25% / 50% / 75% / 100% מהעמוד. */
export function trackScrollDepth(depth: number, page: string): void {
  fbq("trackCustom", "עומק_גלילה", {
    content_name: `${depth}%`,
    depth,
    page_path: page,
  });
}
