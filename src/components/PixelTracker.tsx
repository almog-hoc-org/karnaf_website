import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  trackPageView,
  trackContact,
  trackButton,
  trackSocial,
  trackScrollDepth,
  pageNameFor,
} from "@/lib/pixel";
import { initAnalytics, gaPageView, gaContactClick } from "@/lib/analytics";

/**
 * PixelTracker — mounted once above the whole route tree. It reports to the
 * Meta Pixel:
 *   1. A page view on every navigation (client-side SPA routing).
 *   2. Clicks on WhatsApp / phone / email / social / important buttons.
 *   3. Scroll depth (25% / 50% / 75% / 100%) per page.
 * Renders nothing.
 */
const socialNetworkFor = (href: string): string | null => {
  if (/instagram\.com/i.test(href)) return "אינסטגרם";
  if (/facebook\.com|fb\.com/i.test(href)) return "פייסבוק";
  if (/youtube\.com|youtu\.be/i.test(href)) return "יוטיוב";
  if (/tiktok\.com/i.test(href)) return "טיקטוק";
  if (/spotify\.com/i.test(href)) return "ספוטיפיי";
  return null;
};

const PixelTracker = () => {
  const location = useLocation();
  const scrollMarks = useRef<Set<number>>(new Set());

  // Load GA4 / Clarity once (no-ops until their env IDs are configured).
  useEffect(() => {
    initAnalytics();
  }, []);

  // Page view on every route change (+ reset scroll marks for the new page).
  useEffect(() => {
    trackPageView(location.pathname);
    gaPageView(location.pathname, pageNameFor(location.pathname));
    scrollMarks.current = new Set();
    // Re-check scroll position for short pages that are already fully in view.
    requestAnimationFrame(() => window.dispatchEvent(new Event("scroll")));
  }, [location.pathname]);

  // Global click classification.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest("a, button") as HTMLElement | null;
      if (!el) return;

      const page = window.location.pathname;
      const href = el.getAttribute("href") || "";
      const label = (el.getAttribute("aria-label") || el.textContent || "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, 60);

      if (/wa\.me|whatsapp/i.test(href)) {
        gaContactClick("whatsapp", page);
        return trackContact("וואטסאפ", page);
      }
      if (href.startsWith("tel:")) {
        gaContactClick("phone", page);
        return trackContact("טלפון", page);
      }
      if (href.startsWith("mailto:")) {
        gaContactClick("email", page);
        return trackContact("אימייל", page);
      }

      const network = socialNetworkFor(href);
      if (network) return trackSocial(network, page);

      // Internal navigation is already captured by the PageView above, so we
      // only log buttons and external links here.
      const isInternal = href.startsWith("/") || href.startsWith("#");
      if (el.tagName === "BUTTON" || (href && !isInternal)) {
        if (label) trackButton(label, href, page);
      }
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  // Scroll depth.
  useEffect(() => {
    let ticking = false;
    const check = () => {
      ticking = false;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = Math.round(((window.scrollY || doc.scrollTop) / scrollable) * 100);
      for (const mark of [25, 50, 75, 100]) {
        if (pct >= mark && !scrollMarks.current.has(mark)) {
          scrollMarks.current.add(mark);
          trackScrollDepth(mark, window.location.pathname);
        }
      }
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
};

export default PixelTracker;
