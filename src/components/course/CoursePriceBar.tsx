import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { COURSE_PRICE, CHECKOUT_URL } from "@/lib/constants";
import { buildCheckoutUrl } from "@/lib/checkout";
import { hasSeenPricing, PRICING_SEEN_EVENT } from "@/lib/pricingState";
import { useQuizContext } from "@/hooks/use-quiz-context";
import { gaBeginCheckout, gaStickyBar } from "@/lib/analytics";
import { trackInitiateCheckout } from "@/lib/pixel";

/**
 * Sticky purchase bar for the sales page. It is state-aware: before the
 * visitor has seen the price it points at the pricing section; once they
 * have (and kept scrolling through the FAQ), it becomes a direct
 * purchase button — making them scroll back up would be friction at the
 * exact wrong moment. If they completed the fit quiz, their own score
 * rides along.
 */
const CoursePriceBar = () => {
  const [visible, setVisible] = useState(false);
  const [pricingSeen, setPricingSeen] = useState(false);
  const [impressionSent, setImpressionSent] = useState(false);
  const [checkoutHref, setCheckoutHref] = useState(CHECKOUT_URL);
  const quiz = useQuizContext();

  useEffect(() => {
    setPricingSeen(hasSeenPricing());
    const onSeen = () => {
      setPricingSeen(true);
      setCheckoutHref(buildCheckoutUrl());
    };
    window.addEventListener(PRICING_SEEN_EVENT, onSeen);
    return () => window.removeEventListener(PRICING_SEEN_EVENT, onSeen);
  }, []);

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

  // One impression event per page view, the first time the bar appears.
  useEffect(() => {
    if (visible && !impressionSent) {
      setImpressionSent(true);
      gaStickyBar("impression", pricingSeen ? "post_pricing" : "pre_pricing");
    }
  }, [visible, impressionSent, pricingSeen]);

  const showScore = quiz && quiz.fit !== "low";

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
            {showScore && (
              <span className="text-accent font-bold text-sm tabular-nums whitespace-nowrap">
                התאמה {quiz.score}%
              </span>
            )}
            <span className="text-white font-black text-lg tabular-nums whitespace-nowrap">
              ₪{COURSE_PRICE.toLocaleString("he-IL")}
            </span>
            <span
              className="text-sm truncate hidden sm:inline"
              style={{ color: "hsl(36 33% 95% / 0.65)" }}
            >
              תשלום אחד · גישה מיידית · תשלום מאובטח
            </span>
          </div>

          {pricingSeen ? (
            <a
              href={checkoutHref}
              target="_blank"
              rel="noopener noreferrer"
              data-no-btn-track
              onClick={() => {
                gaStickyBar("click", "post_pricing");
                trackInitiateCheckout("sticky_bar");
                gaBeginCheckout("sticky_bar");
              }}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm md:text-base px-6 py-2.5 rounded-full transition-colors whitespace-nowrap active:scale-[0.98]"
            >
              לרכישה מאובטחת ←
            </a>
          ) : (
            <a
              href="#pricing"
              onClick={() => gaStickyBar("click", "pre_pricing")}
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-sm md:text-base px-6 py-2.5 rounded-full transition-colors whitespace-nowrap active:scale-[0.98]"
            >
              לפרטים ולמחיר
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CoursePriceBar;
