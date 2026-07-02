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

type PixelParams = Record<string, string | number | boolean | undefined>;

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

/** Human-readable Hebrew name for each page, by URL path. */
export function pageNameFor(pathname: string): string {
  if (pathname === "/") return "דף הבית";
  if (pathname.startsWith("/course")) return "הדרך לדירה — הקורס";
  if (pathname.startsWith("/premium")) return "ליווי משקיעים פרימיום";
  if (pathname.startsWith("/program")) return "הדרך לדירה — עמוד תוכנית";
  if (pathname.startsWith("/about")) return "אודות — סיפורו של קרנף";
  if (pathname.startsWith("/testimonials")) return "סיפורי הצלחה";
  if (pathname.startsWith("/contact")) return "צור קשר";
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
const FORM_LABELS: Record<string, { name: string; category: string }> = {
  "premium-investors": { name: "טופס ליווי משקיעים פרימיום", category: "ליווי משקיעים" },
  website: { name: "טופס יצירת קשר באתר", category: "יצירת קשר" },
  "webinar-section": { name: "הרשמה לוובינר", category: "וובינר" },
  "contact-strip": { name: "טופס וובינר", category: "וובינר" },
  footer: { name: "טופס בתחתית העמוד", category: "יצירת קשר" },
};

/** ליד — נשלח כשמישהו משאיר פרטים בטופס בהצלחה. */
export function trackLead(source: string, extra?: PixelParams): void {
  const label = FORM_LABELS[source] || { name: "טופס באתר", category: "כללי" };
  fbq("track", "Lead", {
    content_name: label.name,
    content_category: label.category,
    source,
    ...extra,
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
