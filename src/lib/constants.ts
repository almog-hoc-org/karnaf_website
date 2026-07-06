import { Instagram, Facebook, Youtube, Music } from "lucide-react";

export const WHATSAPP_NUMBER = "972559966175";

/* ── Course commerce ─────────────────────────────────────────────
 * Single product, single price (see PRODUCT.md: "One product, sold once").
 * CHECKOUT_URL: hosted payment page (Grow/Meshulam/Cardcom/Stripe). When the
 * env var is unset, purchase CTAs fall back to a WhatsApp purchase message.
 */
export const COURSE_PRICE = 5490;
export const COURSE_INSTALLMENTS = 12;
export const COURSE_INSTALLMENT_AMOUNT = Math.round(COURSE_PRICE / COURSE_INSTALLMENTS); // ₪458
export const CHECKOUT_URL: string = import.meta.env.VITE_CHECKOUT_URL || "";

export const WHATSAPP_PURCHASE_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי! אני רוצה להצטרף לתוכנית הדרך לדירה"
)}`;

/** Where the main purchase CTA points: hosted checkout if configured, WhatsApp otherwise. */
export const PURCHASE_URL = CHECKOUT_URL || WHATSAPP_PURCHASE_URL;

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
