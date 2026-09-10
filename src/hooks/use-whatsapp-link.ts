import { useLocation } from "react-router-dom";
import { chatLink, premiumLink } from "@/lib/whatsapp";

/**
 * Resolves the WhatsApp opening message for the page the visitor is on.
 *
 * Every route now opens the same business line; only the prefilled text
 * changes. Site-wide chrome (nav, sticky bar, floating button) renders on
 * /premium too, and there it carries the accompaniment message instead of
 * the generic one so a high-intent lead identifies itself immediately.
 *
 * @param context Hebrew page/funnel name for the prefilled text, e.g.
 *                "שאלה כללית" — ignored on /premium, which has its own.
 */
export function useWhatsAppLink(context: string): string {
  const { pathname } = useLocation();
  return pathname.startsWith("/premium") ? premiumLink() : chatLink(context);
}
