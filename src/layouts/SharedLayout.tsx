import { Suspense, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navigation from "@/components/Navigation";
import FooterBar from "@/components/FooterBar";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import SmoothScroll from "@/components/SmoothScroll";
import { StickyCTA } from "@/components/v2/StickyCTA";
import { useScrollToTop } from "@/hooks/use-scroll-to-top";

gsap.registerPlugin(ScrollTrigger);

const PageLoadingSkeleton = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent/30 border-t-accent rounded-full animate-spin" />
  </div>
);

/** Briefly sweeps a navy curtain across the screen on route change. */
const RouteCurtain = ({ pathname }: { pathname: string }) => (
  <motion.div
    key={pathname}
    aria-hidden
    className="fixed inset-0 z-[55] pointer-events-none"
    initial={{ scaleX: 1, transformOrigin: "left center" }}
    animate={{ scaleX: 0, transformOrigin: "left center" }}
    transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
    style={{
      background:
        "linear-gradient(to left, hsl(217 50% 6%) 0%, hsl(217 50% 8%) 60%, hsl(24 80% 52% / 0.4) 100%)",
    }}
  />
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
    <div className="fixed top-0 inset-x-0 z-[60] h-[3px] pointer-events-none">
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
  const reduceMotion = useReducedMotion();

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
            initial={
              reduceMotion
                ? false
                : { opacity: 0, y: 24, filter: "blur(8px)" }
            }
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -16, filter: "blur(8px)" }
            }
            transition={
              reduceMotion
                ? { duration: 0.15 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
          >
            <Suspense fallback={<PageLoadingSkeleton />}>
              <Outlet />
            </Suspense>
          </motion.main>
        </AnimatePresence>

        {/* Curtain mask — sweeps across the screen during route changes */}
        {!reduceMotion && <RouteCurtain pathname={location.pathname} />}
        <FooterBar />
        <WhatsAppFAB />
        <AccessibilityWidget />
        <StickyCTA
          label="30 דקות · ייעוץ ראשוני · ללא התחייבות"
          ctaLabel="בואו נדבר"
          ctaHref="/contact"
        />
      </div>
    </SmoothScroll>
  );
};

export default SharedLayout;
