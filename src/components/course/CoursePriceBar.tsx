import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COURSE_PRICE, COURSE_INSTALLMENTS, COURSE_INSTALLMENT_AMOUNT } from "@/lib/constants";

/**
 * Slim sticky purchase bar for the course page — appears after the visitor
 * scrolls past the hero, shows the price (no surprises) and anchors to the
 * pricing card. Hidden near the pricing card itself and at the very top.
 */
const CoursePriceBar = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const pct = window.scrollY / scrollable;
      const pricing = document.getElementById("pricing");
      let nearPricing = false;
      if (pricing) {
        const rect = pricing.getBoundingClientRect();
        nearPricing = rect.top < window.innerHeight && rect.bottom > 0;
      }
      setVisible(pct > 0.12 && !nearPricing);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      initial={{ y: 88, opacity: 0 }}
      animate={{ y: visible ? 0 : 88, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-40"
      style={{
        pointerEvents: visible ? "auto" : "none",
        visibility: visible ? "visible" : "hidden",
      }}
      aria-hidden={!visible}
    >
      <div
        className="border-t"
        style={{
          backgroundColor: "hsl(217 50% 8% / 0.92)",
          borderColor: "hsl(36 33% 95% / 0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          paddingBottom: "env(safe-area-inset-bottom, 0px)",
        }}
      >
        <div className="container mx-auto px-5 md:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3 min-w-0" dir="rtl">
            <span className="text-white font-black text-lg tabular-nums whitespace-nowrap">
              ₪{COURSE_PRICE.toLocaleString("he-IL")}
            </span>
            <span
              className="text-sm truncate hidden sm:inline"
              style={{ color: "hsl(36 33% 95% / 0.65)" }}
            >
              או עד {COURSE_INSTALLMENTS} תשלומים של ₪{COURSE_INSTALLMENT_AMOUNT}
            </span>
          </div>
          <a
            href="#pricing"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm md:text-base px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
          >
            הצטרפות לתוכנית
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePriceBar;
