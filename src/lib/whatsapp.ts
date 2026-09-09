import { WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants";

/**
 * WhatsApp link builders.
 *
 * Every chat CTA on the site opens the same WhatsApp Business line
 * (055-996-6175), answered personally. The automated intake bot was
 * retired as the front door, so a visitor never lands in a menu — but the
 * prefilled text still carries the page context, so whoever answers knows
 * which funnel the conversation started in and the CRM can classify it.
 */

/** Chat from anywhere on the site. `context` names the page/funnel in
 *  Hebrew, e.g. "התוכנית הדיגיטלית", "ליווי משקיעים", "דף הבית". */
export function chatLink(context: string): string {
  const text = `היי קרנף! אשמח לפרטים (הגעתי מהאתר — ${context})`;
  return `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** The same line with a fully custom opening message. */
export function businessLink(text?: string): string {
  return text
    ? `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`;
}

/**
 * The /premium opener. Same number as everywhere else — what differs is
 * the message: a 1:1 accompaniment lead names its own intent so the reply
 * can start from the right place.
 */
export function premiumLink(): string {
  return businessLink("היי, אשמח לקבל פרטים נוספים על תהליך ליווי משקיעים 1:1");
}
