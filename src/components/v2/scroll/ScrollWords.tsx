import { useRef } from "react";
import { motion, useScroll, type MotionValue } from "framer-motion";
import { useScrubbed } from "./useScrubbed";
import { useStillMotion } from "@/hooks/use-still-motion";

interface ScrollWordsProps {
  /** Plain text; words are split on spaces. */
  text: string;
  /** Words (punctuation ignored) painted in the accent color once lit. */
  highlight?: string[];
  className?: string;
  as?: "p" | "h2";
}

const bare = (w: string) => w.replace(/[.,:;!?״"׳'—–-]/g, "");

const Word = ({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) => {
  const opacity = useScrubbed(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }} className={accent ? "text-accent" : undefined}>
        {children}
      </motion.span>{" "}
    </>
  );
};

/**
 * Scroll-scrubbed statement: every word starts ghosted and lights up in
 * reading order as the paragraph travels up the viewport — the reader's
 * own scroll is the playhead, so it never runs ahead of them. The full
 * text is real DOM text from the first paint (SEO, screen readers, copy).
 */
export const ScrollWords = ({
  text,
  highlight = [],
  className = "",
  as = "p",
}: ScrollWordsProps) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const still = useStillMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.5"],
  });
  const words = text.split(" ").filter(Boolean);
  const accentSet = new Set(highlight.map(bare));
  const Tag = as;

  if (still) {
    return (
      <Tag ref={ref} className={className}>
        {words.map((w, i) => (
          <span key={i} className={accentSet.has(bare(w)) ? "text-accent" : undefined}>
            {w}{" "}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, start + 1 / words.length]}
            accent={accentSet.has(bare(w))}
          >
            {w}
          </Word>
        );
      })}
    </Tag>
  );
};
