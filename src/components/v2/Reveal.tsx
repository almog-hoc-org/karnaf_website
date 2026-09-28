import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  /** Start slightly out of focus and sharpen while rising (px). 0 disables. */
  blur?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const SAFETY_TIMEOUT_MS = 2500;

export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  blur = 6,
  className,
  as = "div",
}: RevealProps) => {
  // OS reduced-motion, or the accessibility widget's stop-animations profiles.
  const still = useStillMotion();
  const reduce = useReducedMotion() || still;
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setShown(true);
                  io?.disconnect();
                }
              });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
          )
        : null;
    io?.observe(el);
    const t = window.setTimeout(() => setShown(true), SAFETY_TIMEOUT_MS);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [reduce]);

  const MotionTag = motion[as] as typeof motion.div;
  // Hand the filter back as "none" once sharp: a lingering blur(0px) still
  // makes the element a containing block for position:fixed descendants.
  const hidden = blur ? { opacity: 0, y, filter: `blur(${blur}px)` } : { opacity: 0, y };
  const visible = blur
    ? { opacity: 1, y: 0, filter: "blur(0px)", transitionEnd: { filter: "none" } }
    : { opacity: 1, y: 0 };

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? false : hidden}
      animate={shown ? visible : hidden}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
};
