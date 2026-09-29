import { useRef, type ReactNode } from "react";
import { motion, useScroll } from "framer-motion";
import { useScrubbed } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";

export interface RailStep {
  num: string;
  title: string;
  body: ReactNode;
  /** One line on what the client walks away with from this step. */
  outcome?: string;
}

/* Where the reading line sits: a step "arrives" when its top crosses this
   fraction of the viewport height, and the rail's fill tracks the same line,
   so the amber fill reaches each number exactly as it lights up. */
const LINE = 0.6;

/* Number ink: cream on the unlit ink circle, navy once the circle turns
   amber (navy on amber ≈ 5:1). rgb() so framer can interpolate it. */
const CREAM = "rgb(246, 243, 238)";
const NAVY = "rgb(22, 34, 54)";

const Step = ({ step, dark }: { step: RailStep; dark: boolean }) => {
  const still = useStillMotion();
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${LINE + 0.06}`, `start ${LINE}`],
  });
  const lit = useScrubbed(scrollYProgress, [0, 1], [0, 1]);
  const ink = useScrubbed(scrollYProgress, [0.4, 0.6], [dark ? CREAM : NAVY, NAVY]);

  return (
    <li ref={ref} className="relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-5 md:gap-8">
      <span className="relative z-10 w-11 h-11">
        <span
          aria-hidden
          className={`absolute inset-0 rounded-full border ${
            dark ? "border-white/20 bg-[hsl(var(--ink))]" : "border-primary/20 bg-background"
          }`}
        />
        <motion.span
          aria-hidden
          className="absolute inset-0 rounded-full bg-accent"
          style={{ opacity: still ? 1 : lit }}
        />
        <motion.span
          className="relative flex w-full h-full items-center justify-center font-mono text-sm font-bold tabular-nums"
          style={{ color: still ? NAVY : ink }}
        >
          {step.num}
        </motion.span>
      </span>
      <div className="pb-2 pt-1.5">
        <h3
          className={`text-xl md:text-2xl font-bold mb-2 tracking-[-0.015em] leading-snug ${
            dark ? "text-white" : "text-foreground"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`leading-[1.85] max-w-[62ch] ${dark ? "" : "text-muted-foreground"}`}
          style={dark ? { color: "hsl(36 33% 95% / 0.74)" } : undefined}
        >
          {step.body}
        </p>
        {step.outcome && (
          <p
            className={`mt-3 text-sm font-semibold flex items-baseline gap-2 ${
              dark ? "text-accent" : "text-[hsl(var(--accent-deep))]"
            }`}
          >
            <span aria-hidden>←</span>
            <span>{step.outcome}</span>
          </p>
        )}
      </div>
    </li>
  );
};

/**
 * A numbered process told down a vertical rail. The rail fills with amber
 * as the reader moves through it and each number lights as it reaches the
 * reading line — progress you can see without a stepper widget. Under
 * reduced motion the rail rests full and every number is lit.
 */
export const StepRail = ({
  steps,
  dark = false,
  className = "",
}: {
  steps: RailStep[];
  dark?: boolean;
  className?: string;
}) => {
  const still = useStillMotion();
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${LINE}`, `end ${LINE}`],
  });
  const fill = useScrubbed(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className={`relative ${className}`}>
      {/* The rail runs through the centers of the number circles (start side). */}
      <span
        aria-hidden
        className={`absolute top-5 bottom-8 start-[1.375rem] w-px ${dark ? "bg-white/15" : "bg-primary/15"}`}
      />
      <motion.span
        aria-hidden
        className="absolute top-5 bottom-8 start-[1.375rem] w-px bg-accent origin-top"
        style={{ scaleY: still ? 1 : fill }}
      />
      <ol ref={ref} className="relative space-y-10 md:space-y-12">
        {steps.map((s) => (
          <Step key={s.num} step={s} dark={dark} />
        ))}
      </ol>
    </div>
  );
};

export default StepRail;
