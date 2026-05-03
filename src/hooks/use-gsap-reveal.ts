import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface GsapRevealOptions {
  y?: number;
  x?: number;
  opacity?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
}

const SAFETY_TIMEOUT_MS = 2500;

const rootMarginFromStart = (start: string): string => {
  const match = start.match(/top\s+(\d+)%/);
  if (!match) return "0px 0px -15% 0px";
  const pct = Math.max(0, Math.min(100, 100 - parseInt(match[1], 10)));
  return `0px 0px -${pct}% 0px`;
};

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useGsapReveal<T extends HTMLElement>(
  options: GsapRevealOptions = {}
) {
  const ref = useRef<T>(null);
  const {
    y = 40,
    x = 0,
    opacity = 0,
    duration = 0.8,
    delay = 0,
    stagger = 0,
    once = true,
    start = "top 85%",
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger ? Array.from(el.children) : el;

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, clearProps: "transform" });
      return;
    }

    gsap.set(targets, { opacity, y, x });

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(targets, {
        opacity: 1,
        y: 0,
        x: 0,
        duration,
        delay,
        stagger: stagger || undefined,
        ease: "power3.out",
      });
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  play();
                  if (once) observer?.disconnect();
                  break;
                }
              }
            },
            { rootMargin: rootMarginFromStart(start), threshold: 0.01 }
          )
        : null;

    observer?.observe(el);

    const safety = window.setTimeout(() => {
      if (!played) {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          x: 0,
          duration: 0.4,
          stagger: stagger || undefined,
          ease: "power2.out",
        });
        played = true;
        observer?.disconnect();
      }
    }, SAFETY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(safety);
      observer?.disconnect();
    };
  }, [y, x, opacity, duration, delay, stagger, once, start]);

  return ref;
}

export function useGsapSplitReveal<T extends HTMLElement>(
  options: { duration?: number; stagger?: number; delay?: number; start?: string } = {}
) {
  const ref = useRef<T>(null);
  const { duration = 0.6, stagger = 0.03, delay = 0, start = "top 85%" } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const originalText = el.textContent || "";

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    el.innerHTML = originalText
      .split("")
      .map((char) =>
        char === " "
          ? " "
          : `<span style="display:inline-block;opacity:0;transform:translateY(30px)">${char}</span>`
      )
      .join("");

    const chars = el.querySelectorAll("span");

    let played = false;
    const play = () => {
      if (played) return;
      played = true;
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      });
    };

    const observer =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (entry.isIntersecting) {
                  play();
                  observer?.disconnect();
                  break;
                }
              }
            },
            { rootMargin: rootMarginFromStart(start), threshold: 0.01 }
          )
        : null;

    observer?.observe(el);

    const safety = window.setTimeout(() => {
      if (!played) {
        gsap.to(chars, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          stagger,
          ease: "power2.out",
        });
        played = true;
        observer?.disconnect();
      }
    }, SAFETY_TIMEOUT_MS);

    return () => {
      window.clearTimeout(safety);
      observer?.disconnect();
      el.textContent = originalText;
    };
  }, [duration, stagger, delay, start]);

  return ref;
}
