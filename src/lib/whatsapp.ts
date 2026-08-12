import { WHATSAPP_BOT_NUMBER, WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants";

/**
 * WhatsApp link builders.
 *
 * All initial site inquiries go to the CRM intake bot, which greets the
 * visitor, offers the service menu (digital program / premium guidance /
 * other) and files a classified ticket in karnaf-crm. The prefilled text
 * carries the page context so both the bot flow and the CRM ticket know
 * where the conversation started.
 */

/** Chat with the intake bot. `context` names the page/funnel in Hebrew,
 *  e.g. "התוכנית הדיגיטלית", "ליווי משקיעים", "דף הבית". */
export function botLink(context: string): string {
  const text = `היי קרנף! אשמח לפרטים (הגעתי מהאתר — ${context})`;
  return `https://wa.me/${WHATSAPP_BOT_NUMBER}?text=${encodeURIComponent(text)}`;
}

/** Chat with the human business line — reserved for touchpoints that must
 *  stay personal (used sparingly; the bot is the default front door). */
export function businessLink(text?: string): string {
  return text
    ? `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`;
}

/**
 * The premium lane's one deliberate exception to the bot-first rule: every
 * WhatsApp touchpoint on /premium opens the human business line instead.
 * A 1:1 accompaniment lead is worth tens of thousands of shekels and is
 * already deep in intent — routing it through an automated intake menu
 * costs more than the classification is worth.
 *
 * Note for the CRM side: these arrive as plain messages on the business
 * number, not as bot-classified tickets (see docs/ARCHITECTURE-CRM-INTEGRATIONS.md).
 */
export function premiumLink(): string {
  return businessLink("היי, אשמח לקבל פרטים נוספים על תהליך ליווי משקיעים 1:1");
}
