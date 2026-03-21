import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import FooterBar from "@/components/FooterBar";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

gsap.registerPlugin(ScrollTrigger);

const PageLoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

const ScrollProgress = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const tween = gsap.to(barRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.3,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-gradient-to-l from-accent via-accent to-accent/60 origin-right"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

const SharedLayout = () => {
  const location = useLocation();
  useScrollToTop();

  return (
    <SmoothScroll key={location.pathname}>
      <div className="min-h-screen">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-accent focus:text-accent-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold">
          דלג לתוכן הראשי
        </a>
        <ScrollProgress />
        <Navigation />
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            key={location.pathname}
            initial={{ opacity: 0, y: 20, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
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
    </SmoothScroll>
  );
};

export default SharedLayout;
