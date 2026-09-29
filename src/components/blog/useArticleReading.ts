import { useEffect, useRef, useState } from "react";

/** Space the fixed nav may cover when it comes back on scroll-up. */
const TOP_OFFSET = 120;

/**
 * Reading state for a long-form article:
 * - `activeId`: the last section heading that has crossed ~30% of the
 *   viewport (null while still in the lede);
 * - progress through the article body, written to the CSS variable
 *   `--read` (0…1) on the body element on every frame — no React render
 *   per scroll tick; the table of contents' rail reads the variable.
 *
 * Starts as `null` / 0 on both server and client (SSR-safe) and measures
 * after mount. A scroll listener (passive, rAF-throttled) rather than an
 * IntersectionObserver so a jump from the TOC lands on the right section.
 */
export function useArticleReading(ids: string[]) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const targets = key
      .split("|")
      .map((id) => (id ? document.getElementById(id) : null))
      .filter((el): el is HTMLElement => !!el);

    let frame = 0;
    let last: string | null = null;

    const measure = () => {
      frame = 0;
      const vh = window.innerHeight;
      const rect = body.getBoundingClientRect();
      const span = rect.height - vh + TOP_OFFSET;
      const p = span > 0 ? (TOP_OFFSET - rect.top) / span : rect.top < vh ? 1 : 0;
      body.style.setProperty("--read", String(Math.min(1, Math.max(0, p))));

      const line = vh * 0.3;
      let current: string | null = null;
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      // At the very bottom the last short section may never reach the line.
      if (
        targets.length &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 &&
        targets[targets.length - 1].getBoundingClientRect().top < vh
      ) {
        current = targets[targets.length - 1].id;
      }
      if (current !== last) {
        last = current;
        setActiveId(current);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [key]);

  return { bodyRef, activeId };
}
