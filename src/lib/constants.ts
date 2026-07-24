import { Instagram, Facebook, Youtube, Music } from "lucide-react";

/* ── WhatsApp ────────────────────────────────────────────────────
 * Two numbers, two jobs:
 * - BUSINESS (055-996-6175): the human line, answered personally. Also the
 *   tel: number across the site.
 * - BOT (055-992-5725): the automated intake bot wired to karnaf-crm. Site
 *   chat CTAs point here so every inquiry is classified and ticketed.
 * VITE_WHATSAPP_BOT_NUMBER overrides the bot number without a deploy —
 * set it to the business number to bypass the bot if its flow is down.
 * Build links via src/lib/whatsapp.ts (botLink / businessLink).
 */
export const WHATSAPP_BUSINESS_NUMBER = "972559966175";
export const WHATSAPP_BOT_NUMBER: string =
  import.meta.env.VITE_WHATSAPP_BOT_NUMBER || "972559925725";

/* ── Course commerce ─────────────────────────────────────────────
 * Single product, single price (see PRODUCT.md: "One product, sold once").
 * The digital program is fully self-serve: purchase CTAs go straight to the
 * hosted Schooler (רב מסר) checkout. VITE_CHECKOUT_URL overrides the
 * destination without a deploy. Build the actual CTA href via
 * buildCheckoutUrl() (src/lib/checkout.ts) so utm/click-id attribution
 * carries through to the payment page.
 */
export const COURSE_PRICE = 980;
/** The previous list price — shown struck-through as the price anchor. */
export const COURSE_PRICE_ORIGINAL = 5490;
export const CHECKOUT_URL: string =
  import.meta.env.VITE_CHECKOUT_URL ||
  "https://my.schooler.biz/s/117502/KarnafNewProgram?tid=30291&utm_source=%D7%A7%D7%A8%D7%A0%D7%A326";

export const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/karnaf_nadlan/", label: "Instagram", hoverColor: "hover:bg-pink-500/20 hover:text-pink-600 hover:border-pink-500/50" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61563350768976", label: "Facebook", hoverColor: "hover:bg-blue-500/20 hover:text-blue-600 hover:border-blue-500/50" },
  { icon: Youtube, href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F", label: "YouTube", hoverColor: "hover:bg-red-500/20 hover:text-red-600 hover:border-red-500/50" },
  { icon: Music, href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8", label: "Spotify", hoverColor: "hover:bg-green-500/20 hover:text-green-600 hover:border-green-500/50" },
];

export const TIKTOK_URL = "https://www.tiktok.com/@karnaf.nadlan";
export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F";
export const PHONE_NUMBER = "055-996-6175";
export const EMAIL = "karnaf.yazamut@gmail.com";
