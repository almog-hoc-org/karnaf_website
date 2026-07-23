import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Navigation from "@/components/Navigation";
import FooterBar from "@/components/FooterBar";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { StickyCTA } from "@/components/v2/StickyCTA";
import WebinarPopup from "@/components/WebinarPopup";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const PageLoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const SharedLayout = () => {
  const location = useLocation();
  useScrollToTop();
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">
        דלג לתוכן הראשי
      </a>
      <Navigation />
      <AnimatePresence mode="wait">
        <motion.main
          id="main-content"
          key={location.pathname}
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={
            reduceMotion
              ? { duration: 0.15 }
              : { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <Suspense fallback={<PageLoadingSkeleton />}>
            <Outlet />
          </Suspense>
        </motion.main>
      </AnimatePresence>

      <FooterBar />
      <WhatsAppFAB />
      <AccessibilityWidget />
      {/* Desktop-only — on mobile the WhatsApp FAB is the single floating CTA.
          The course page carries its own price bar, so skip it there. */}
      <StickyCTA
        label="הדרך לדירה · הקורס הדיגיטלי המקיף בישראל"
        ctaLabel="₪980 · לרכישה מיידית"
        ctaHref="/course#pricing"
        hideOn={["/contact", "/course"]}
      />
      <WebinarPopup />
    </div>
  );
};

export default SharedLayout;
