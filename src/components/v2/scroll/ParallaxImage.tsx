import { useRef } from "react";
import { motion, useMotionTemplate, useScroll } from "framer-motion";
import { useScrubbed } from "./useScrubbed";
import { useStillMotion } from "@/hooks/use-still-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}

/**
 * Photo that uncovers itself from the bottom up as it enters, while the
 * picture inside drifts slower than the page (parallax) and settles from
 * a slight zoom. Both are tied to scroll position, not a timer.
 */
export const ParallaxImage = ({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/5]",
}: ParallaxImageProps) => {
  const still = useStillMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ["start end", "start 0.45"] });
  const top = useScrubbed(enter, [0, 1], [38, 0]);
  const clipPath = useMotionTemplate`inset(${top}% 0% 0% 0% round 1rem)`;
  const y = useScrubbed(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const scale = useScrubbed(enter, [0, 1], [1.25, 1.12]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{ clipPath: still ? "none" : clipPath }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        style={still ? { y: 0, scale: 1 } : { y, scale }}
      />
    </motion.div>
  );
};
