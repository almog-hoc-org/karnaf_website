import { WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants";

/**
 * WhatsApp link builders.
 *
 * Every chat CTA on the site opens the same WhatsApp Business line
 * (055-996-6175), answered personally. The prefilled text is written the
 * way a person would actually open the chat — no bracketed page tags — but
 * each opener is still distinct, so whoever answers (and the CRM) can tell
 * which page the conversation started from.
 */

/** Where the chat was opened from — picks the opening line. */
export type ChatIntent =
  | "general"
  | "course"
  | "course-question"
  | "course-fit"
  | "contact"
  | "mortgage"
  | "webinar-followup"
  | "mortgage-followup"
  | "contact-followup";

/* First-person, gender-neutral Hebrew (past tense / "אני לפני…"), so the
   line reads naturally whoever sends it. */
const OPENERS: Record<ChatIntent, string> = {
  general: "היי קרנף, הגעתי אליכם מהאתר ויש לי שאלה",
  course: "היי קרנף, ראיתי באתר את הקורס הדיגיטלי ויש לי כמה שאלות עליו",
  "course-question": "היי קרנף, אני לפני רכישת הקורס הדיגיטלי ויש לי שאלה",
  "course-fit": "היי קרנף, מילאתי באתר את שאלון ההתאמה ואשמח להתייעץ אם הקורס מתאים לי",
  contact: "היי קרנף, הגעתי אליכם מהאתר ואשמח לדבר",
  mortgage: "היי קרנף, קראתי באתר על ליווי המשכנתא ואשמח לשמוע איך זה עובד",
  "webinar-followup": "היי קרנף, נרשמתי לוובינר ויש לי שאלה",
  "mortgage-followup": "היי קרנף, השארתי באתר פרטים לגבי משכנתא ורציתי להוסיף משהו",
  "contact-followup": "היי קרנף, השארתי באתר פרטים ורציתי להוסיף משהו",
};

/** The same line with a fully custom opening message. */
export function businessLink(text?: string): string {
  return text
    ? `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}`;
}

/** Chat from anywhere on the site, opened with the line for `intent`. */
export function chatLink(intent: ChatIntent): string {
  return businessLink(OPENERS[intent]);
}

/**
 * The /premium opener. Same number as everywhere else — what differs is
 * the message: a 1:1 accompaniment lead names its own intent so the reply
 * can start from the right place.
 */
export function premiumLink(): string {
  return businessLink("היי קרנף, הגעתי מהאתר ואשמח לשמוע על ליווי המשקיעים האישי 1:1");
}
