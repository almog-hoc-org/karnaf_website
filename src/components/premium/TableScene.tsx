import { useCallback, useEffect, useRef, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { Building2, Handshake, Home, Landmark, RotateCcw, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useStillMotion } from "@/hooks/use-still-motion";
import mascot from "@/assets/mascot/mascot-thumbsup.webp";

/**
 * The /lp/premium hero scene — the brand line "מישהו בצד שלכם של השולחן"
 * played out: four seats with an interest pull the price up, then the
 * buyer sits down and an investor-accompaniment seat joins on their side
 * and pulls it back to what comparable deals support.
 *
 * Amber is reserved for "on your side": the accompaniment seat, its line,
 * and the price once it works for the buyer. One orchestrated sequence on
 * load (~4.5s), no loop; a replay button appears at the end. With reduced
 * motion (OS or the accessibility widget) it renders the final state.
 *
 * The numbers are an illustration and say so under the scene.
 */

const PRICE_START = 2_090_000;
const PRICE_PEAK = 2_150_000;
const PRICE_END = 2_040_000;

/* Seat centres as % of the stage. The stage is 10:9; the SVG viewBox is
   100×90, so y in the SVG is y% × 0.9. */
interface Seat {
  key: string;
  /** Where its pull line leaves the seat — clear of the label, in stage %. */
  from: { x: number; y: number };
  name: string;
  interest: string;
  icon: LucideIcon;
  x: number;
  y: number;
}

const OPPONENTS: Seat[] = [
  { key: "seller", name: "המוכר", interest: "כמה שיותר", icon: Home, x: 71, y: 11, from: { x: 69, y: 23 } },
  { key: "developer", name: "היזם", interest: "מחיר מחירון", icon: Building2, x: 29, y: 11, from: { x: 31, y: 23 } },
  { key: "bank", name: "הבנק", interest: "עוד משכנתא", icon: Landmark, x: 87, y: 50, from: { x: 80, y: 50 } },
  { key: "broker", name: "המתווך", interest: "שייסגר מהר", icon: Handshake, x: 13, y: 50, from: { x: 20, y: 50 } },
];

const YOU = { x: 37, y: 86 };
const ALLY = { x: 63, y: 86 };
const ALLY_LINE_FROM = { x: 61, y: 78.5 };
const CENTER = { x: 50, y: 48 };
const TABLE_RX = 33;
const TABLE_RY = 21;

/** In SVG units (y already ×0.9): where the line from `p` toward the
 *  table's centre meets the table's rim — lines stop at the edge, so they
 *  never cross the price. */
function rimPoint(p: { x: number; y: number }) {
  const cx = CENTER.x;
  const cy = CENTER.y * 0.9;
  const dx = p.x - cx;
  const dy = p.y * 0.9 - cy;
  const t = 1 / Math.sqrt((dx / TABLE_RX) ** 2 + (dy / TABLE_RY) ** 2);
  return { x: cx + dx * t, y: cy + dy * t };
}

/* Phases: 0 empty table · 1 price on the table · 2 the room pulls ·
   3 you sit down · 4 someone on your side · 5 done */
type Phase = 0 | 1 | 2 | 3 | 4 | 5;
const SCHEDULE: [Phase, number][] = [
  [1, 250],
  [2, 650],
  [3, 2500],
  [4, 3150],
  [5, 4800],
];

const ease = [0.16, 1, 0.3, 1] as const;

const formatPrice = (v: number) => `₪${(Math.round(v / 1000) * 1000).toLocaleString("en-US")}`;

const PullLine = ({ from, active, dim }: { from: { x: number; y: number }; active: boolean; dim: boolean }) => {
  const end = rimPoint(from);
  return (
  <motion.line
    x1={from.x}
    y1={from.y * 0.9}
    x2={end.x}
    y2={end.y}
    stroke="hsl(36 33% 95%)"
    strokeWidth={1.25}
    strokeDasharray="3 4"
    vectorEffect="non-scaling-stroke"
    initial={{ pathLength: 0, opacity: 0 }}
    animate={{ pathLength: active ? 1 : 0, opacity: active ? (dim ? 0.12 : 0.38) : 0 }}
    transition={{ duration: 0.7, ease }}
  />
  );
};

const SeatChip = ({
  seat,
  show,
  dim,
  index,
}: {
  seat: Seat;
  show: boolean;
  dim: boolean;
  index: number;
}) => {
  const Icon = seat.icon;
  return (
    <div
      className="absolute w-[5.5rem] lg:w-[7.5rem] -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${seat.x}%`, top: `${seat.y}%` }}
    >
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: show ? (dim ? 0.45 : 1) : 0, scale: show ? 1 : 0.6 }}
      transition={{ duration: 0.5, ease, delay: show && !dim ? index * 0.32 : 0 }}
    >
      <span className="flex h-11 w-11 lg:h-12 lg:w-12 items-center justify-center rounded-full border border-white/15 bg-[hsl(217_38%_17%)] text-white/85">
        <Icon size={18} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="mt-1.5 text-[0.8rem] lg:text-[0.95rem] font-bold leading-none text-white">{seat.name}</span>
      <motion.span
        className="mt-1 text-[0.7rem] lg:text-[0.8rem] leading-tight text-white/60"
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : -4 }}
        transition={{ duration: 0.4, ease, delay: show && !dim ? index * 0.32 + 0.25 : 0 }}
      >
        רוצה: {seat.interest}
      </motion.span>
    </motion.div>
    </div>
  );
};

const TableScene = () => {
  const still = useStillMotion();
  const [phase, setPhase] = useState<Phase>(0);
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);
  const price = useMotionValue(PRICE_START);
  const priceText = useTransform(price, formatPrice);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  // Run (or re-run) the sequence.
  useEffect(() => {
    clear();
    if (still) {
      setPhase(5);
      price.set(PRICE_END);
      return;
    }
    setPhase(0);
    price.set(PRICE_START);
    SCHEDULE.forEach(([p, at]) => {
      timers.current.push(window.setTimeout(() => setPhase(p), at));
    });
    return clear;
  }, [still, run, price]);

  // The price follows the room: up while the four pull, down once the
  // buyer has someone on their side.
  useEffect(() => {
    if (still) return;
    if (phase === 2) {
      const c = animate(price, PRICE_PEAK, { duration: 1.6, ease: "easeOut", delay: 0.3 });
      return () => c.stop();
    }
    if (phase === 4) {
      const c = animate(price, PRICE_END, { duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 });
      return () => c.stop();
    }
  }, [phase, still, price]);

  const replay = useCallback(() => setRun((r) => r + 1), []);

  const roomPulls = phase >= 2;
  const allyIn = phase >= 4;

  return (
    <figure className="relative w-full max-w-[34rem] lg:max-w-[38rem] mx-auto" aria-labelledby="table-scene-caption">
      <div className="relative w-full aspect-[10/9] select-none" aria-hidden="true">
        {/* Glow that marks your side of the table */}
        <motion.div
          className="pointer-events-none absolute inset-x-[10%] bottom-[-6%] h-[48%] rounded-[50%] blur-3xl"
          style={{ background: "radial-gradient(closest-side, hsl(24 80% 52% / 0.45), transparent)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: allyIn ? 1 : 0 }}
          transition={{ duration: 1.2, ease }}
        />

        <svg
          viewBox="0 0 100 90"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
        >
          {/* the table */}
          <motion.ellipse
            cx={CENTER.x}
            cy={CENTER.y * 0.9}
            rx={TABLE_RX}
            ry={TABLE_RY}
            fill="hsl(217 40% 14%)"
            stroke="hsl(36 33% 95% / 0.14)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: phase >= 1 ? 1 : 0.35, scale: phase >= 1 ? 1 : 0.92 }}
            transition={{ duration: 0.8, ease }}
            style={{ transformOrigin: "50% 48%" }}
          />
          {/* the buyer's edge of the table */}
          <motion.path
            d={`M ${CENTER.x - 24} ${CENTER.y * 0.9 + 14.6} Q ${CENTER.x} ${CENTER.y * 0.9 + 23.5} ${CENTER.x + 24} ${CENTER.y * 0.9 + 14.6}`}
            fill="none"
            stroke="hsl(24 80% 52%)"
            strokeWidth={2}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: allyIn ? 1 : 0, opacity: allyIn ? 1 : 0 }}
            transition={{ duration: 0.9, ease, delay: 0.2 }}
          />

          {OPPONENTS.map((s) => (
            <PullLine key={s.key} from={s.from} active={roomPulls} dim={allyIn} />
          ))}

          {/* the line from your side */}
          <motion.line
            x1={ALLY_LINE_FROM.x}
            y1={ALLY_LINE_FROM.y * 0.9}
            x2={rimPoint(ALLY_LINE_FROM).x}
            y2={rimPoint(ALLY_LINE_FROM).y}
            stroke="hsl(24 80% 52%)"
            strokeWidth={2.25}
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: allyIn ? 1 : 0, opacity: allyIn ? 1 : 0 }}
            transition={{ duration: 0.6, ease }}
          />
        </svg>

        {/* price on the table */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${CENTER.x}%`, top: `${CENTER.y}%` }}
        >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: phase >= 1 ? 1 : 0, y: phase >= 1 ? 0 : 6 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="text-[0.7rem] text-white/55 leading-none mb-1.5">המחיר על השולחן</span>
          <motion.span
            dir="ltr"
            className="tabular-nums font-black text-[1.45rem] sm:text-[1.7rem] lg:text-[2rem] leading-none tracking-tight"
            animate={{ color: allyIn ? "hsl(24 85% 60%)" : "hsl(36 33% 95%)" }}
            transition={{ duration: 0.6, delay: allyIn ? 0.45 : 0 }}
          >
            {priceText}
          </motion.span>
          <motion.span
            className="mt-2 rounded-full border border-[hsl(24_80%_52%/0.5)] px-2.5 py-0.5 text-[0.68rem] font-semibold text-[hsl(24_85%_64%)] whitespace-nowrap"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: allyIn && phase >= 5 ? 1 : 0, y: allyIn && phase >= 5 ? 0 : -4 }}
            transition={{ duration: 0.4, ease }}
          >
            לפי עסקאות אמת באזור
          </motion.span>
        </motion.div>
        </div>

        {OPPONENTS.map((s, i) => (
          <SeatChip key={s.key} seat={s} show={roomPulls} dim={allyIn} index={i} />
        ))}

        {/* you */}
        <div
          className="absolute w-[5.5rem] lg:w-[7.5rem] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${YOU.x}%`, top: `${YOU.y}%` }}
        >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase >= 3 ? 1 : 0, y: phase >= 3 ? 0 : 10 }}
          transition={{ duration: 0.55, ease }}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(36_33%_95%)] text-[hsl(217_42%_15%)]">
            <User size={20} strokeWidth={2} aria-hidden />
          </span>
          <span className="mt-1.5 text-[0.85rem] font-bold leading-none text-white">אתם</span>
          <motion.span
            className="mt-1 text-[0.7rem] leading-tight text-white/60"
            animate={{ opacity: phase === 3 ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            לבד מול כולם?
          </motion.span>
        </motion.div>
        </div>

        {/* someone on your side */}
        <div
          className="absolute w-[6.5rem] -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${ALLY.x}%`, top: `${ALLY.y}%` }}
        >
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 0, x: 24, scale: 0.85 }}
          animate={{ opacity: allyIn ? 1 : 0, x: allyIn ? 0 : 24, scale: allyIn ? 1 : 0.85 }}
          transition={{ duration: 0.6, ease }}
        >
          <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-[hsl(36_33%_95%)] ring-2 ring-[hsl(24_80%_52%)] ring-offset-2 ring-offset-[hsl(217_50%_8%)]">
            <img src={mascot} alt="" width={48} height={48} className="h-full w-full object-cover object-top" />
          </span>
          <span className="mt-1.5 text-[0.85rem] font-bold leading-none text-[hsl(24_85%_64%)]">
            מלווה משקיעים
          </span>
          <span className="mt-1 text-[0.7rem] leading-tight text-white/70">רק בשבילכם</span>
        </motion.div>
        </div>
      </div>

      <figcaption id="table-scene-caption" className="mt-3 flex items-center justify-center gap-3 text-[0.72rem] text-white/45">
        <span>
          <span className="sr-only">
            המחשה: המוכר, היזם, הבנק והמתווך מושכים את המחיר למעלה, ומלווה משקיעים שיושב לצדכם מחזיר אותו למה שעסקאות אמת באזור מצדיקות.{" "}
          </span>
          המחשה. בכל עסקה המספרים אחרים.
        </span>
        {!still && (
          <motion.button
            type="button"
            onClick={replay}
            className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-white/60 hover:text-white focus-visible:text-white transition-colors min-h-[32px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 5 ? 1 : 0 }}
            tabIndex={phase >= 5 ? 0 : -1}
            aria-hidden={phase < 5}
          >
            <RotateCcw size={13} aria-hidden />
            לראות שוב
          </motion.button>
        )}
      </figcaption>
    </figure>
  );
};

export default TableScene;
