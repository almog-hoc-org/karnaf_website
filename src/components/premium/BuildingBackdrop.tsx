import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

/**
 * Fixed page backdrop for /lp/premium: an architect's sheet on which a
 * house is drawn as the visitor scrolls — crane and foundation first,
 * then walls, roof, door and windows, and at the bottom of the page the
 * windows light up and the crane leaves — finished before the closing
 * band scrolls in over the backdrop, so the lit house is seen. The surface tint moves from
 * cream to a pale green on the way down.
 *
 * Page-level scroll (useScroll without a target), so the range form of
 * useTransform is safe here (docs/SCROLL-MOTION.md). With reduced motion
 * the drawing rests complete. Purely decorative: aria-hidden.
 */

const GREEN = "hsl(152 38% 30%)";
const NAVY = "hsl(217 42% 22%)";

/** pathLength for a part drawn between page progress a..b. */
function useDraw(p: MotionValue<number>, a: number, b: number) {
  return useTransform(p, [a, b], [0, 1], { clamp: true });
}

interface LineProps {
  d: string;
  stroke: string;
  width: number;
  dash?: string;
}

const lineAttrs = ({ d, stroke, width, dash }: LineProps) => ({
  d,
  fill: "none",
  stroke,
  strokeWidth: width,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeDasharray: dash,
  vectorEffect: "non-scaling-stroke" as const,
});

/** A part drawn with scroll. Hidden until it starts drawing — a round cap
 *  at zero length otherwise leaves a dot on the sheet. */
const AnimatedLine = ({ draw, ...line }: LineProps & { draw: MotionValue<number> }) => {
  const opacity = useTransform(draw, (v) => (v > 0.002 ? 1 : 0));
  return <motion.path {...lineAttrs(line)} style={{ pathLength: draw, opacity }} />;
};

const PartLine = ({ draw, ...line }: LineProps & { draw: MotionValue<number> | number }) =>
  typeof draw === "number" ? <path {...lineAttrs(line)} /> : <AnimatedLine draw={draw} {...line} />;

const Part = (props: {
  d: string;
  draw: MotionValue<number> | number;
  stroke?: string;
  width?: number;
  dash?: string;
}) => <PartLine stroke={NAVY} width={1.6} {...props} />;

/* Geometry, in a 1000×500 sheet: crane on the left, house on the right,
   one ground line across. The mobile view crops to the house. */
const GROUND = "M 20 460 H 980";
const FOUNDATION = "M 650 460 V 440 H 930 V 460";
const WALLS = "M 670 440 V 290 H 910 V 440";
const FLOOR = "M 670 365 H 910";
const ROOF = "M 645 296 L 790 190 L 935 296";
const ROOF_INNER = "M 690 288 L 790 215 L 890 288";
const CHIMNEY = "M 860 240 V 205 H 884 V 258";
const DOOR = "M 772 440 V 392 H 808 V 440";
const WINDOWS = [
  { x: 694, y: 305 },
  { x: 846, y: 305 },
  { x: 694, y: 382 },
  { x: 846, y: 382 },
];
const winPath = (x: number, y: number) => `M ${x} ${y} H ${x + 40} V ${y + 40} H ${x} Z M ${x + 20} ${y} V ${y + 40} M ${x} ${y + 20} H ${x + 40}`;
const ROUND_WINDOW = "M 790 262 m -13 0 a 13 13 0 1 0 26 0 a 13 13 0 1 0 -26 0";

const CRANE_MAST = "M 160 460 V 70 M 184 460 V 70 M 160 420 L 184 380 M 160 380 L 184 340 M 160 340 L 184 300 M 160 300 L 184 260 M 160 260 L 184 220 M 160 220 L 184 180 M 160 180 L 184 140 M 160 140 L 184 100";
const CRANE_JIB = "M 100 70 H 560 M 172 70 L 172 40 M 172 40 L 100 70 M 172 40 L 560 70 M 100 70 V 92 H 132 V 70";
const TREE = "M 470 460 V 410 M 470 395 m -30 0 a 30 30 0 1 0 60 0 a 30 30 0 1 0 -60 0";
const FENCE = "M 380 460 V 438 M 405 460 V 438 M 430 460 V 438 M 370 446 H 440";

const Drawing = ({ p, still, viewBox, className }: { p: MotionValue<number>; still: boolean; viewBox: string; className: string }) => {
  const ground = useDraw(p, 0, 0.04);
  const crane = useDraw(p, 0, 0.1);
  const foundation = useDraw(p, 0.03, 0.12);
  const walls = useDraw(p, 0.1, 0.26);
  const floor = useDraw(p, 0.24, 0.32);
  const roof = useDraw(p, 0.28, 0.42);
  const roofInner = useDraw(p, 0.38, 0.48);
  const chimney = useDraw(p, 0.44, 0.5);
  const door = useDraw(p, 0.48, 0.56);
  const windows = useDraw(p, 0.52, 0.64);
  const garden = useDraw(p, 0.6, 0.7);
  const lit = useTransform(p, [0.66, 0.76], [0, 1], { clamp: true });
  const litOpacity = useTransform(lit, (l) => l * 0.55);
  const craneGone = useTransform(p, [0.68, 0.78], [1, 0], { clamp: true });
  const hookY = useTransform(p, [0, 0.4, 0.7], [150, 230, 120]);
  const hookX = useTransform(p, [0, 0.4, 0.7], [440, 520, 360]);

  const v = (m: MotionValue<number>) => (still ? 1 : m);

  return (
    <svg viewBox={viewBox} preserveAspectRatio="xMidYMax meet" className={className}>
      <Part d={GROUND} draw={v(ground)} stroke={GREEN} width={1.4} />

      {/* crane — arrives first, leaves when the house is done */}
      <motion.g style={{ opacity: still ? 0 : craneGone }}>
        <Part d={CRANE_MAST} draw={v(crane)} width={1.1} />
        <Part d={CRANE_JIB} draw={v(crane)} width={1.1} />
        <motion.g style={{ x: still ? 0 : hookX }}>
          <motion.line x1={0} x2={0} y1={70} y2={hookY} stroke={NAVY} strokeWidth={1} vectorEffect="non-scaling-stroke" style={{ opacity: v(crane) }} />
          <motion.path
            d="M -9 0 H 9 V 14 H -9 Z"
            fill="none"
            stroke={GREEN}
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
            style={{ y: hookY, opacity: v(crane) }}
          />
        </motion.g>
      </motion.g>

      <Part d={FOUNDATION} draw={v(foundation)} width={2} />
      <Part d={WALLS} draw={v(walls)} width={2} />
      <Part d={FLOOR} draw={v(floor)} width={1} dash="4 6" />
      <Part d={ROOF} draw={v(roof)} stroke={GREEN} width={2.2} />
      <Part d={ROOF_INNER} draw={v(roofInner)} stroke={GREEN} width={1} />
      <Part d={CHIMNEY} draw={v(chimney)} width={1.6} />
      <Part d={DOOR} draw={v(door)} width={1.6} />
      <Part d={ROUND_WINDOW} draw={v(windows)} width={1.2} />

      {WINDOWS.map((w) => (
        <g key={`${w.x}-${w.y}`}>
          <motion.rect
            x={w.x}
            y={w.y}
            width={40}
            height={40}
            fill="hsl(28 90% 60%)"
            style={{ opacity: still ? 0.55 : litOpacity }}
          />
          <Part d={winPath(w.x, w.y)} draw={v(windows)} width={1.2} />
        </g>
      ))}

      <Part d={TREE} draw={v(garden)} stroke={GREEN} width={1.4} />
      <Part d={FENCE} draw={v(garden)} stroke={GREEN} width={1.2} />
    </svg>
  );
};

const BuildingBackdrop = () => {
  const still = useStillMotion();
  const { scrollYProgress } = useScroll();
  const bg = useTransform(scrollYProgress, [0, 0.4, 0.75], ["hsl(40 38% 97%)", "hsl(70 24% 94%)", "hsl(145 24% 91%)"]);

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ backgroundColor: still ? "hsl(80 22% 95%)" : bg }}
    >
      {/* architect's sheet */}
      <div
        className="absolute inset-0 opacity-[0.55]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(152 20% 40% / 0.07) 1px, transparent 1px), linear-gradient(90deg, hsl(152 20% 40% / 0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 60%, black 30%, transparent 85%)",
        }}
      />
      {/* mobile: the house alone, faint, behind the column */}
      <Drawing
        p={scrollYProgress}
        still={still}
        viewBox="610 160 360 320"
        className="absolute inset-x-0 bottom-0 mx-auto h-[62vh] w-full max-w-[34rem] opacity-[0.38] lg:hidden"
      />
      {/* desktop: crane on one side of the column, house on the other */}
      <Drawing
        p={scrollYProgress}
        still={still}
        viewBox="0 20 1000 470"
        className="absolute inset-x-0 bottom-0 hidden h-[92vh] w-full opacity-[0.6] lg:block"
      />
    </motion.div>
  );
};

export default BuildingBackdrop;
