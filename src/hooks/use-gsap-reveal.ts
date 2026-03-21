import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    const targets = stagger ? el.children : el;

    gsap.set(targets, { opacity, y, x });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      delay,
      stagger: stagger || undefined,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        once,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
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

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(el, { opacity: 1 });
      return;
    }

    // Wrap each character in a span
    const text = el.textContent || "";
    el.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? " "
          : `<span style="display:inline-block;opacity:0;transform:translateY(30px)">${char}</span>`
      )
      .join("");

    const chars = el.querySelectorAll("span");

    const tween = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start,
        once: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = text;
    };
  }, [duration, stagger, delay, start]);

  return ref;
}
