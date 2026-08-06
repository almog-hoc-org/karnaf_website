import { motion, useReducedMotion } from "framer-motion";

/**
 * Word-by-word masked reveal for display headlines: each word rises out
 * of its own overflow clip in a cascade. Built on Framer Motion (like the
 * rest of the hero choreography) so the SSG HTML stays fully visible
 * before hydration and prefers-reduced-motion renders instantly.
 */
export const WordCascade = ({
  text,
  delay = 0,
  step = 0.09,
  className = "",
}: {
  text: string;
  /** Seconds before the first word starts. */
  delay?: number;
  /** Seconds between one word and the next. */
  step?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          {/* Extra bottom padding + negative margin keep Hebrew descenders
              (ך ף ץ) outside the clip at rest. */}
          <span className="inline-block overflow-hidden align-baseline pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className="inline-block"
              initial={reduce ? false : { y: "120%" }}
              animate={{ y: "0%" }}
              transition={{
                duration: 0.85,
                delay: delay + i * step,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </span>
  );
};

/**
 * The squiggle underline (role #3 of the horn wedge family): a hand-drawn
 * amber stroke under one key word, drawn in by the existing
 * `.squiggle-path` CSS animation. Wrap the word: <Squiggled>מספרים</Squiggled>
 */
export const Squiggled = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block">
    {children}
    <svg
      viewBox="0 0 200 14"
      preserveAspectRatio="none"
      className="absolute -bottom-[0.28em] right-0 w-full h-[0.32em] text-accent"
      aria-hidden
      focusable="false"
    >
      <path
        className="squiggle-path"
        d="M3 9 Q 28 3, 52 8 T 100 8 T 148 8 T 197 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  </span>
);
