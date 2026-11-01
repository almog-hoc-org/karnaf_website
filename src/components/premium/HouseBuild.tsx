import { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useStillMotion } from "@/hooks/use-still-motion";

/**
 * The /lp/premium story: a pinned frame where a house is drawn line by line
 * as the visitor scrolls. Each part of the house is one stage of the
 * accompaniment (plot → foundation → walls → windows → roof → lit windows),
 * and the caption under the drawing switches with it.
 *
 * Scroll-linked to the section's own progress (useScroll with a target);
 * every frame writes stroke-dashoffset/opacity straight to the SVG nodes, so
 * React re-renders only when the stage changes. Pre-rendered HTML shows the
 * finished house, so nothing is hidden before hydration (and the section is
 * below the fold anyway). Still mode (OS reduced motion or the a11y widget):
 * no pinning, the house rests complete and every stage is listed.
 *
 * Screen readers get the stages once, as a plain ordered list; the visual
 * captions are aria-hidden so a scroll never re-announces them.
 */

interface Stage {
  title: string;
  body: string;
  /** True for what the visitor does; false for what follows if it's a fit. */
  now: boolean;
}

const STAGES: Stage[] = [
  { now: true, title: "משאירים פרטים", body: "שם וטלפון. זה כל מה שצריך כדי להתחיל." },
  {
    now: true,
    title: "שיחת היכרות אישית",
    body: "מלווה משקיעים חוזר אליכם, מכיר אתכם ואת המטרות שלכם ואומר בכנות אם הליווי מתאים. ללא עלות וללא התחייבות.",
  },
  { now: false, title: "אסטרטגיה שמתאימה לכם", body: "מגדירים יחד מה מחפשים, איפה ובאיזה תקציב, לפני שמתחילים לחפש." },
  {
    now: false,
    title: "בדיקה מעמיקה של כל עסקה",
    body: "מחיר מול עסקאות אמת, מצב תכנוני ומשפטי ותנאי החוזה, כדי שתחליטו בעיניים פקוחות.",
  },
  { now: false, title: "משא ומתן לצדכם", body: "יושבים לצדכם מול המוכר, היזם והבנק, עם הנתונים ביד." },
  { now: false, title: "עד החתימה", body: "נשארים איתכם עד שהחוזה חתום ואתם בטוחים בצעד שעשיתם." },
];

const TAG_NOW = "מה שאתם עושים";
const TAG_THEN = "אם הליווי מתאים";
const N = STAGES.length;
/** Share of each stage's scroll window spent drawing its part. */
const DRAW = 0.75 / N;

/* One part per path: `s` is the stage that draws it. Dashed guide lines fade
   instead of drawing (a dash pattern can't also carry the draw offset). */
const PARTS: { d: string; s: number; tone?: "green"; thin?: boolean; dashed?: boolean }[] = [
  { s: 0, tone: "green", d: "M8 270 H392" },
  { s: 0, thin: true, d: "M108 270 V250 M292 270 V250" },
  { s: 0, thin: true, dashed: true, d: "M108 254 H292" },
  { s: 0, tone: "green", d: "M292 250 V228 L310 235 L292 242" },
  { s: 1, d: "M100 270 V256 H300 V270 M100 262 H300" },
  { s: 2, d: "M115 256 V150 H285 V256" },
  { s: 2, thin: true, d: "M115 205 H285" },
  { s: 3, thin: true, d: "M133 164 h32 v28 h-32 Z M149 164 v28 M133 178 h32" },
  { s: 3, thin: true, d: "M235 164 h32 v28 h-32 Z M251 164 v28 M235 178 h32" },
  { s: 3, thin: true, d: "M133 218 h32 v28 h-32 Z M149 218 v28 M133 232 h32" },
  { s: 3, thin: true, d: "M235 218 h32 v28 h-32 Z M251 218 v28 M235 232 h32" },
  { s: 3, d: "M185 256 V214 H215 V256" },
  { s: 4, tone: "green", d: "M98 156 L200 86 L302 156" },
  { s: 4, tone: "green", thin: true, d: "M130 150 L200 103 L270 150" },
  { s: 4, d: "M254 120 V95 H272 V133" },
  { s: 5, tone: "green", d: "M350 270 V238" },
  { s: 5, tone: "green", d: "M334 222 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0" },
];
const WINDOWS = [
  [133, 164],
  [235, 164],
  [133, 218],
  [235, 218],
];
const CRANE_MAST =
  "M40 270 V40 M54 270 V40 M40 250 L54 230 M40 230 L54 210 M40 210 L54 190 M40 190 L54 170 M40 170 L54 150 M40 150 L54 130 M40 130 L54 110 M40 110 L54 90 M40 90 L54 70 M40 70 L54 50";
const CRANE_JIB = "M18 40 H236 M47 40 V20 M47 20 L18 40 M47 20 L236 40 M18 40 V56 H34 V40";

const clamp = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const HouseBuild = ({ onProgress }: { onProgress?: (p: number) => void }) => {
  const still = useStillMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [stage, setStage] = useState(0);
  const lengths = useRef<number[]>([]);
  /* Nodes are queried once and reused every frame. */
  const nodes = useRef<{
    parts: SVGPathElement[];
    lites: SVGRectElement[];
    crane: SVGGElement | null;
    hook: SVGLineElement | null;
    block: SVGRectElement | null;
  } | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  // Measure every drawable part once mounted.
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const parts = [...svg.querySelectorAll<SVGPathElement>("[data-part]")];
    lengths.current = parts.map((el) => (el.dataset.dashed ? 0 : el.getTotalLength()));
    nodes.current = {
      parts,
      lites: [...svg.querySelectorAll<SVGRectElement>("[data-lite]")],
      crane: svg.querySelector<SVGGElement>("[data-crane]"),
      hook: svg.querySelector<SVGLineElement>("[data-hook]"),
      block: svg.querySelector<SVGRectElement>("[data-block]"),
    };
  }, []);

  const paint = (p: number) => {
    const n = nodes.current;
    if (!n) return;
    n.parts.forEach((el, i) => {
      const t = clamp((p - Number(el.dataset.s) / N) / DRAW);
      if (el.dataset.dashed) {
        el.style.opacity = String(t);
        return;
      }
      const len = lengths.current[i];
      el.style.strokeDasharray = `${len} ${len}`;
      el.style.strokeDashoffset = String(len * (1 - t));
      // A round cap at zero length still paints a dot — hide until it draws.
      el.style.opacity = t > 0.002 ? "1" : "0";
    });
    const lit = clamp((p - 5 / N) / (0.6 / N));
    n.lites.forEach((el) => (el.style.opacity = String(lit * 0.6)));
    if (n.crane) n.crane.style.opacity = String(1 - clamp((p - 0.86) / 0.1));
    const swing = clamp(p / 0.8);
    const hx = lerp(170, 220, swing);
    const hy = lerp(80, 150, Math.sin(swing * Math.PI));
    n.hook?.setAttribute("x1", String(hx));
    n.hook?.setAttribute("x2", String(hx));
    n.hook?.setAttribute("y2", String(hy));
    n.block?.setAttribute("x", String(hx - 10));
    n.block?.setAttribute("y", String(hy));
    const k = Math.min(N - 1, Math.floor(p * N));
    setStage((prev) => (prev === k ? prev : k));
    onProgress?.(p);
  };

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!still) paint(p);
  });

  // Initial paint, and the rest state when motion must hold still.
  useEffect(() => {
    if (still) {
      paint(1);
      return;
    }
    paint(scrollYProgress.get());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [still]);

  const ink = "hsl(217 42% 18%)";
  const green = "hsl(152 42% 30%)";

  return (
    <section
      ref={sectionRef}
      aria-labelledby="build-title"
      className={still ? "relative" : "relative h-[480vh]"}
    >
      <div
        className={
          still
            ? "flex flex-col items-center gap-6 px-5 py-16"
            : "sticky top-0 flex h-[100svh] flex-col items-center justify-center gap-5 px-5"
        }
      >
        <h2 id="build-title" className="text-balance text-[1.6rem] font-bold leading-tight text-[hsl(217_42%_18%)] sm:text-[2rem]">
          הכול מתחיל בשיחה אחת
        </h2>

        <svg
          ref={svgRef}
          viewBox="0 0 400 300"
          aria-hidden="true"
          className="h-auto max-h-[44svh] w-[min(92vw,34rem)] overflow-visible lg:max-h-[52svh] lg:w-[44rem]"
        >
          <g data-crane fill="none" stroke={ink} strokeWidth={1.1} strokeLinecap="round" strokeLinejoin="round">
            <path d={CRANE_MAST} vectorEffect="non-scaling-stroke" />
            <path d={CRANE_JIB} vectorEffect="non-scaling-stroke" />
            <line data-hook x1={170} y1={40} x2={170} y2={80} vectorEffect="non-scaling-stroke" />
            <rect data-block x={160} y={80} width={20} height={14} stroke={green} strokeWidth={1.6} vectorEffect="non-scaling-stroke" />
          </g>
          {WINDOWS.map(([x, y]) => (
            <rect key={`${x}-${y}`} data-lite x={x} y={y} width={32} height={28} fill="hsl(28 82% 55%)" opacity={0.6} />
          ))}
          {PARTS.map((part, i) => (
            <path
              key={i}
              data-part
              data-s={part.s}
              data-dashed={part.dashed ? "1" : undefined}
              d={part.d}
              fill="none"
              stroke={part.tone === "green" ? green : ink}
              strokeWidth={part.thin ? 1.1 : 1.8}
              strokeDasharray={part.dashed ? "3 5" : undefined}
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        {/* screen readers: every stage, once */}
        <ol className="sr-only">
          {STAGES.map((s) => (
            <li key={s.title}>
              {s.title}. {s.body}
            </li>
          ))}
        </ol>

        {still ? (
          <ol className="grid w-full max-w-[26rem] gap-7" aria-hidden="true">
            {STAGES.map((s) => (
              <li key={s.title}>
                <Caption stage={s} />
              </li>
            ))}
          </ol>
        ) : (
          <>
            <div className="relative h-[8.25rem] w-full max-w-[26rem]" aria-hidden="true">
              {STAGES.map((s, i) => (
                <div
                  key={s.title}
                  className="absolute inset-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
                  style={{
                    opacity: i === stage ? 1 : 0,
                    transform: i === stage ? "none" : `translate3d(0, ${i < stage ? -8 : 8}px, 0)`,
                  }}
                >
                  <Caption stage={s} />
                </div>
              ))}
            </div>
            <div className="flex gap-2" aria-hidden="true">
              {STAGES.map((s, i) => (
                <span
                  key={s.title}
                  className="h-[7px] w-[7px] rounded-full transition-[background-color,transform] duration-200 ease-out"
                  style={{
                    backgroundColor: i <= stage ? green : "hsl(150 10% 82%)",
                    transform: i === stage ? "scale(1.3)" : "none",
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

const Caption = ({ stage }: { stage: Stage }) => (
  <div className="text-center">
    <span className="inline-block rounded-full bg-[hsl(150_32%_93%)] px-3 py-1 text-[0.82rem] font-semibold text-[hsl(152_45%_22%)]">
      {stage.now ? TAG_NOW : TAG_THEN}
    </span>
    <h3 className="mt-2.5 text-[1.22rem] font-semibold text-[hsl(217_42%_18%)]">{stage.title}</h3>
    <p className="mt-1.5 text-pretty leading-[1.7] text-[hsl(215_14%_40%)]">{stage.body}</p>
  </div>
);

export default HouseBuild;
