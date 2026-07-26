import { useEffect, useRef, useState } from "react";

/**
 * Count a number up when it scrolls into view — numbers that move get
 * read. Honors prefers-reduced-motion by rendering the final value
 * immediately, and starts from the target during SSG so the static HTML
 * always contains the real figure (crawlers included).
 */
export function useCountUp(target: number, durationMs = 1100) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(target);
  const started = useRef(false);
  const frame = useRef<number>();

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    setValue(0);
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting) || started.current) return;
        started.current = true;
        observer.disconnect();
        const start = performance.now();
        const animate = (now: number) => {
          const t = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setValue(Math.round(eased * target));
          if (t < 1) frame.current = requestAnimationFrame(animate);
        };
        frame.current = requestAnimationFrame(animate);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [target, durationMs]);

  return { ref, value };
}
