import { useEffect, useRef, useState, type CSSProperties } from "react";

interface SplitRevealProps {
  text: string;
  /** Words (punctuation ignored) painted in the accent color. */
  highlight?: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p";
  /**
   * "load" — pure CSS keyframes that start on first paint, before
   * hydration (use for the hero H1: no JS gate in front of the LCP text).
   * "inview" — rises when the heading scrolls into view.
   */
  trigger?: "load" | "inview";
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
}

const bare = (w: string) => w.replace(/[.,:;!?״"׳'—–-]/g, "");

/**
 * Headline that rises word by word out of a mask. Each word sits in an
 * overflow-hidden slot and slides up from below its own baseline, so the
 * line reads as being typeset in front of you rather than faded in.
 * Motion collapses to instant under prefers-reduced-motion and under the
 * accessibility widget's stop-animations profile (both are CSS rules).
 */
export const SplitReveal = ({
  text,
  highlight = [],
  className = "",
  as: Tag = "h2",
  trigger = "inview",
  delay = 0,
  stagger = 0.06,
}: SplitRevealProps) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const [shown, setShown] = useState(trigger === "load");
  const accentSet = new Set(highlight.map(bare));

  useEffect(() => {
    if (trigger !== "inview") return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    // Never leave a heading hidden if the observer misfires.
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [trigger]);

  const words = text.split(" ").filter(Boolean);

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const style = { "--w-delay": `${delay + i * stagger}s` } as CSSProperties;
        return (
          <span key={i}>
            <span
              className={`word-mask ${trigger === "load" ? "word-mask--load" : ""} ${
                shown ? "is-revealed" : ""
              }`}
              style={style}
            >
              <span className={`word ${accentSet.has(bare(w)) ? "text-accent" : ""}`}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </span>
        );
      })}
    </Tag>
  );
};
