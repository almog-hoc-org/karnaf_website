import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let lenis: Lenis | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      tickerCallback = (time: number) => {
        lenis!.raf(time * 1000);
      };
      gsap.ticker.add(tickerCallback);
      gsap.ticker.lagSmoothing(0);
    }

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a[href^='#']");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      const el = document.querySelector(href);
      if (!el) return;
      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(el as HTMLElement, { offset: -80 });
      } else {
        const rect = (el as HTMLElement).getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top - 80, behavior: "auto" });
      }
    };
    document.addEventListener("click", handleAnchorClick);

    const refreshOnReady = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshOnReady);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshOnReady).catch(() => {});
    }
    const refreshTimeout = window.setTimeout(refreshOnReady, 1500);

    return () => {
      window.clearTimeout(refreshTimeout);
      window.removeEventListener("load", refreshOnReady);
      document.removeEventListener("click", handleAnchorClick);
      if (tickerCallback) gsap.ticker.remove(tickerCallback);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
