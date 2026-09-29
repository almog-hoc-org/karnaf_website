import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

interface VelocityMarqueeProps {
  items: string[];
  /** Base drift in % of one copy per second. Negative flips direction. */
  speed?: number;
  className?: string;
  itemClassName?: string;
  /** Rendered between items. */
  separator?: React.ReactNode;
}

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/**
 * An endless ribbon that drifts on its own and surges with the reader's
 * scroll: scrolling fast pushes it faster, scrolling up reverses it. The
 * track holds two identical copies and wraps at -50%, so the seam never
 * shows. Geometry runs LTR (predictable percentages); each item keeps
 * RTL text. Holds still — as a plain wrapped row — under reduced motion.
 */
export const VelocityMarquee = ({
  items,
  speed = 2.2,
  className = "",
  itemClassName = "",
  separator = <span aria-hidden className="inline-block w-1.5 h-1.5 rounded-full bg-accent mx-6 md:mx-8 align-middle" />,
}: VelocityMarqueeProps) => {
  const still = useStillMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "200px 0px" });
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smooth = useSpring(velocity, { damping: 50, stiffness: 400 });
  const boost = useTransform(smooth, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (still || !inView) return;
    let move = dir.current * speed * (delta / 1000);
    const b = boost.get();
    if (b < 0) dir.current = -1;
    else if (b > 0) dir.current = 1;
    move += dir.current * Math.abs(move) * Math.abs(b);
    baseX.set(baseX.get() + move);
  });

  const copy = (key: string, hidden: boolean) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span dir="rtl" className={`whitespace-nowrap ${itemClassName}`}>
            {item}
          </span>
          {separator}
        </span>
      ))}
    </div>
  );

  if (still) {
    return (
      <div className={`flex flex-wrap justify-center gap-x-2 gap-y-3 ${className}`}>
        {items.map((item) => (
          <span key={item} className={itemClassName}>
            {item}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`} dir="ltr">
      <motion.div className="flex w-max will-change-transform" style={{ x }}>
        {copy("a", false)}
        {copy("b", true)}
      </motion.div>
    </div>
  );
};
