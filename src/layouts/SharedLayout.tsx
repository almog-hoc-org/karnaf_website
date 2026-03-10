import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navigation from "@/components/Navigation";
import FooterBar from "@/components/FooterBar";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const PageLoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full"
    />
  </div>
);

const SharedLayout = () => {
  const location = useLocation();
  useScrollToTop();

  return (
    <SmoothScroll key={location.pathname}>
      <div className="min-h-screen">
        <Navigation />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <Suspense fallback={<PageLoadingSkeleton />}>
              <Outlet />
            </Suspense>
          </motion.main>
        </AnimatePresence>
        <FooterBar />
        <WhatsAppFAB />
        <AccessibilityWidget />
      </div>
      </div>
    </SmoothScroll>
  );
};

export default SharedLayout;
