import { useRef, useState } from "react";
import {
  motion,
  motionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

interface StackCardsProps {
  cards: React.ReactNode[];
  className?: string;
}

/* Sticky tops, px: the first card pins at TOP, each next one STEP lower,
   so a sliver of every card underneath stays visible. */
const TOP = 104;
const STEP = 20;

/**
 * Zero-height, non-sticky marker at the static position where card k
 * begins. It reports card k's arrival (0 = its top at the viewport bottom,
 * 1 = pinned in place) into a shared motion value. Measured on a plain
 * in-flow element because a sticky element's offsets move while stuck.
 */
const ArrivalMarker = ({ into, k }: { into: MotionValue<number>; k: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", `start ${TOP + k * STEP}px`],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => into.set(v));
  return <div ref={ref} aria-hidden />;
};

const StackCard = ({
  children,
  i,
  last,
  coveredBy,
}: {
  children: React.ReactNode;
  i: number;
  last: boolean;
  /** Arrival progress of every card dealt after this one. */
  coveredBy: MotionValue<number>[];
}) => {
  // 0 while nothing covers it, +1 for each card that has fully landed on top.
  const covered = useTransform(coveredBy, (vals: number[]) => vals.reduce((a, b) => a + b, 0));
  const scale = useTransform(covered, (c) => 1 - c * 0.05);
  const shade = useTransform(covered, (c) => c * 0.12);

  return (
    <div className={`sticky ${last ? "" : "h-[72svh] md:h-[62vh]"}`} style={{ top: TOP + i * STEP }}>
      <motion.div
        className="relative rounded-3xl overflow-hidden will-change-transform"
        style={{ scale, transformOrigin: "50% 0%" }}
      >
        {children}
        {!last && (
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-[hsl(var(--ink))]"
            style={{ opacity: shade }}
          />
        )}
      </motion.div>
    </div>
  );
};

/**
 * Cards that pin one over the other as you scroll: each card sticks a
 * little lower than the one before, the next slides up over it, and every
 * card underneath recedes a step (scale + shade) per card dealt on top — a
 * deck being dealt onto the table. A short spacer after the last card
 * keeps the finished deck pinned for a beat before it scrolls away.
 * Falls back to a plain vertical list under reduced motion.
 */
export const StackCards = ({ cards, className = "" }: StackCardsProps) => {
  const still = useStillMotion();
  const [arrivals] = useState(() => cards.map(() => motionValue(0)));
  const [nothing] = useState(() => motionValue(0));

  if (still) {
    return (
      <div className={`space-y-6 ${className}`}>
        {cards.map((card, i) => (
          <div key={i} className="rounded-3xl overflow-hidden">
            {card}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {cards.map((card, i) => {
        const later = arrivals.slice(i + 1);
        return (
          <div key={i} className="contents">
            {i > 0 && <ArrivalMarker into={arrivals[i]} k={i} />}
            <StackCard i={i} last={i === cards.length - 1} coveredBy={later.length ? later : [nothing]}>
              {card}
            </StackCard>
          </div>
        );
      })}
      <div className="h-[18vh]" aria-hidden />
    </div>
  );
};
