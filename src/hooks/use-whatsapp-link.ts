import { useLocation } from "react-router-dom";
import { botLink, premiumLink } from "@/lib/whatsapp";

/**
 * Resolves the right WhatsApp destination for the page the visitor is on.
 *
 * Site-wide chrome (nav, sticky bar, floating button) is rendered on every
 * route, including /premium — and there the bot is the wrong front door: a
 * 1:1 accompaniment lead is worth tens of thousands of shekels and is
 * already deep in intent, so it goes to the human business line like the
 * rest of that page. Everywhere else the intake bot stays the default.
 *
 * @param context Hebrew page/funnel name for the bot's prefilled text,
 *                e.g. "שאלה כללית" — ignored on /premium, which carries
 *                its own message.
 */
export function useWhatsAppLink(context: string): string {
  const { pathname } = useLocation();
  return pathname.startsWith("/premium") ? premiumLink() : botLink(context);
}
