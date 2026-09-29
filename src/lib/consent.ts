/**
 * Marketing (direct-mail) consent, shown with every lead form.
 *
 * Israeli law (חוק התקשורת, סעיף 30א — "חוק הספאם") requires explicit,
 * prior opt-in for advertising messages by email / SMS / WhatsApp, so the
 * checkbox is never pre-checked and is never a condition for sending the
 * form. The exact wording and its version go out with the lead (CRM +
 * Sheets), so the consent record matches what the person actually saw —
 * bump MARKETING_CONSENT_VERSION whenever the text changes.
 */
export const MARKETING_CONSENT_VERSION = "2026-09-29";

export const MARKETING_CONSENT_TEXT =
  "אשמח לקבל מקרנף נדל״ן תוכן מקצועי, עדכונים והצעות במייל, ב\u2011SMS ובוואטסאפ.";

export const MARKETING_CONSENT_NOTE =
  "לא חובה. אפשר להסיר את ההסכמה בכל רגע, והפרטים שלכם לעולם לא יימכרו ולא יועברו לצד שלישי לצורכי שיווק.";
