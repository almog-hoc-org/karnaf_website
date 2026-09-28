import { motion, useScroll, useSpring } from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

/**
 * A 3px amber reading-progress line pinned to the top edge. It fills from
 * the right, the way a Hebrew reader moves through the page. Under reduced
 * motion it still reports progress, just without the spring's lag.
 */
export const ScrollProgress = () => {
  const still = useStillMotion();
  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      className="fixed top-0 inset-x-0 h-[3px] z-[60] bg-accent origin-right pointer-events-none"
      style={{ scaleX: still ? scrollYProgress : sprung }}
    />
  );
};
