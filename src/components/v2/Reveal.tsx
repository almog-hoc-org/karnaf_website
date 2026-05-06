import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "article" | "header" | "footer";
}

const SAFETY_TIMEOUT_MS = 2500;

export const Reveal = ({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: RevealProps) => {
  const reduce = useReducedMotion();
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

  return (
    <MotionTag
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
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
