import { useRef } from "react";
import { motion, useMotionTemplate, useScroll } from "framer-motion";
import { useScrubbed } from "./useScrubbed";
import { useStillMotion } from "@/hooks/use-still-motion";

interface ExpandOnScrollProps {
  children: React.ReactNode;
  className?: string;
  /** Starting side inset, % of width on each side. */
  inset?: number;
  /** Starting corner radius, px. */
  radius?: number;
}

/**
 * A block that arrives as an inset, rounded card and opens out to full
 * bleed as it climbs toward the top of the viewport — the "window becomes
 * the room" move. Clip-path only: the layout box never changes, so nothing
 * around it reflows while it grows.
 */
export const ExpandOnScroll = ({
  children,
  className = "",
  inset = 5,
  radius = 40,
}: ExpandOnScrollProps) => {
  const still = useStillMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.25"],
  });
  const side = useScrubbed(scrollYProgress, [0, 1], [inset, 0]);
  const round = useScrubbed(scrollYProgress, [0, 1], [radius, 0]);
  const clipPath = useMotionTemplate`inset(0% ${side}% 0% ${side}% round ${round}px)`;

  return (
    <motion.div ref={ref} className={className} style={{ clipPath: still ? "none" : clipPath }}>
      {children}
    </motion.div>
  );
};
