import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { Check } from "lucide-react";
import { courseParts, moduleLessons } from "@/data/curriculum";
import { TOTAL_CHAPTERS } from "@/data/courseStats";
import { useStillMotion } from "@/hooks/use-still-motion";

/* The route, in reading order: a divider card opens each part, then its
   chapters, numbered across the whole course. */
type Stop =
  | { kind: "part"; part: (typeof courseParts)[number] }
  | { kind: "chapter"; num: number; title: string; partId: number; lessons: string[] };

const stops: Stop[] = [];
{
  let n = 0;
  for (const part of courseParts) {
    stops.push({ kind: "part", part });
    for (const title of part.modules) {
      n += 1;
      stops.push({ kind: "chapter", num: n, title, partId: part.id, lessons: moduleLessons[title] ?? [] });
    }
  }
}
const chapterStops = stops.filter((s): s is Extract<Stop, { kind: "chapter" }> => s.kind === "chapter");
const pad = (n: number) => String(n).padStart(2, "0");

/* How much vertical scroll one pixel of sideways travel costs: < 1 so the
   pinned route doesn't overstay its welcome. */
const SCROLL_PER_PX = 0.62;

const PartCard = ({ part }: { part: (typeof courseParts)[number] }) => (
  <div className="snap-start shrink-0 w-[72vw] sm:w-[17rem] lg:w-[16rem] min-h-[19rem] lg:min-h-[21rem] rounded-3xl bg-accent text-accent-foreground p-7 flex flex-col">
    <span
      aria-hidden
      className="font-black leading-none text-[6rem] tabular-nums text-transparent [-webkit-text-stroke:2px_hsl(var(--accent-foreground)/0.55)]"
    >
      {pad(part.id)}
    </span>
    <p className="mt-auto text-eyebrow uppercase tracking-[0.2em] font-bold opacity-80">חלק {part.id}</p>
    <h3 className="text-2xl lg:text-[1.7rem] font-black leading-tight tracking-[-0.02em] mt-1">{part.title}</h3>
    <p className="text-sm mt-2 opacity-85 leading-snug">{part.subtitle}</p>
    <p className="text-sm font-bold mt-4">{part.modules.length} פרקים ←</p>
  </div>
);

const ChapterCard = ({ stop }: { stop: Extract<Stop, { kind: "chapter" }> }) => (
  <article data-chapter={stop.num} className="snap-start shrink-0 w-[78vw] sm:w-[19rem] lg:w-[20rem] min-h-[19rem] lg:min-h-[21rem] rounded-3xl border border-white/15 bg-white/[0.045] p-6 lg:p-7 flex flex-col">
    <div className="flex items-baseline justify-between">
      <span className="font-mono text-accent font-bold tabular-nums tracking-[0.15em] text-sm">
        פרק {pad(stop.num)}
      </span>
      <span className="text-[11px] text-white/45 font-semibold">חלק {stop.partId}</span>
    </div>
    <h4 className="mt-4 text-xl lg:text-[1.35rem] font-black text-white leading-snug tracking-[-0.01em]">
      {stop.title}
    </h4>
    {stop.lessons.length > 0 && (
      <div className="mt-6 pt-5 border-t border-white/10">
        <p className="text-[11px] text-white/50 font-semibold mb-3">בין השיעורים:</p>
        <ul className="space-y-2.5">
          {stop.lessons.map((l) => (
            <li key={l} className="flex items-start gap-2.5 text-sm text-white/85 leading-snug">
              <span className="mt-0.5 inline-flex w-5 h-5 rounded-full bg-accent/15 items-center justify-center shrink-0">
                <Check size={12} className="text-accent" aria-hidden />
              </span>
              {l}
            </li>
          ))}
        </ul>
      </div>
    )}
  </article>
);

/**
 * The syllabus as a route you travel. On desktop the section pins and the
 * vertical scroll drives the row of chapters sideways (RTL: the row moves
 * right, revealing what's to the left), with a progress rail that names
 * the part and chapter you're passing. On phones the same row is a native
 * swipe carousel with snap points — thumbs already know how to use it,
 * and a pinned 15-card track would be far too long on a small screen.
 * Under reduced motion the desktop row is also a plain scroller.
 *
 * Every chapter shows a few real lesson titles (moduleLessons in
 * curriculum.ts), so the syllabus reads as concrete skills.
 */
const SyllabusRoute = () => {
  const still = useStillMotion();
  const wrapRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [distance, setDistance] = useState(0);
  const dist = useMotionValue(0);
  const [at, setAt] = useState(0); // 0..1 along the route
  const [currentNum, setCurrentNum] = useState(1);
  /* Each chapter card's center, measured from the row's start (right) edge
     — offsetLeft ignores transforms, so this is stable while the row moves. */
  const centers = useRef<{ num: number; c: number }[]>([]);
  const vpWidth = useRef(0);
  const pick = (traveled: number) => {
    const target = traveled + vpWidth.current / 2;
    let best = centers.current[0];
    for (const k of centers.current) if (Math.abs(k.c - target) < Math.abs(best.c - target)) best = k;
    if (best) setCurrentNum(best.num);
  };

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const measure = () => {
      const row = rowRef.current;
      const vp = viewportRef.current;
      if (!row || !vp) return;
      const d = Math.max(0, row.scrollWidth - vp.clientWidth);
      vpWidth.current = vp.clientWidth;
      centers.current = [...row.querySelectorAll<HTMLElement>("[data-chapter]")].map((el) => ({
        num: Number(el.dataset.chapter),
        c: row.offsetWidth - (el.offsetLeft + el.offsetWidth / 2),
      }));
      setDistance(d);
      dist.set(d);
      setPinned(mq.matches);
    };
    measure();
    mq.addEventListener("change", measure);
    const ro = new ResizeObserver(measure);
    if (rowRef.current) ro.observe(rowRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => {
      mq.removeEventListener("change", measure);
      ro.disconnect();
    };
  }, [dist]);

  const live = pinned && !still;

  // The carousel may have snapped before the desktop layout took over; the
  // pinned row moves by transform only, so its scroll position must rest.
  useEffect(() => {
    if (live && viewportRef.current) viewportRef.current.scrollLeft = 0;
  }, [live]);

  // Desktop: vertical scroll → sideways travel.
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, dist], ([p, d]: number[]) => p * d);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!live) return;
    setAt(v);
    pick(v * dist.get());
  });

  // Phones (and still desktops): progress from the carousel's own scroll.
  // RTL scrollLeft runs 0 → negative in current browsers; abs() covers both.
  const onSwipe = () => {
    if (live) return;
    const vp = viewportRef.current;
    if (!vp) return;
    const max = vp.scrollWidth - vp.clientWidth;
    setAt(max > 0 ? Math.min(1, Math.abs(vp.scrollLeft) / max) : 0);
    pick(Math.abs(vp.scrollLeft));
  };

  const current = chapterStops.find((c) => c.num === currentNum) ?? chapterStops[0];
  const currentPart = courseParts.find((p) => p.id === current.partId) ?? courseParts[0];

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={live ? { height: `calc(100vh + ${Math.round(distance * SCROLL_PER_PX)}px)` } : undefined}
    >
      <div className={live ? "sticky top-0 h-screen overflow-hidden flex flex-col justify-center" : ""}>
        {/* Where you are on the route */}
        <div className="container mx-auto px-5 md:px-6 max-w-6xl mb-6 lg:mb-8">
          <div className="flex items-end justify-between gap-4 mb-3">
            <p className="text-sm text-white/70" aria-live="off">
              <span className="font-bold text-white">{currentPart.title}</span>
              <span className="text-white/40"> · </span>
              <span className="font-mono tabular-nums text-accent font-bold">
                פרק {pad(current.num)}
              </span>
              <span className="text-white/40 font-mono tabular-nums"> / {TOTAL_CHAPTERS}</span>
            </p>
            <p className="text-xs text-white/45 lg:hidden">החליקו לצד ←</p>
            <p className="text-xs text-white/45 hidden lg:block">{live ? "גללו — המסלול זז איתכם" : "גללו לצד ←"}</p>
          </div>
          <div className="relative h-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-accent origin-right"
              style={{ scaleX: live ? scrollYProgress : at }}
            />
          </div>
          {/* Part boundaries, proportional to their chapter counts */}
          <div className="flex mt-2 text-[11px] text-white/45 font-semibold">
            {courseParts.map((p) => (
              <span key={p.id} style={{ flexGrow: p.modules.length }} className="truncate">
                {p.title}
              </span>
            ))}
          </div>
        </div>

        {/* The row */}
        <div
          ref={viewportRef}
          onScroll={onSwipe}
          className={`relative ${
            live
              ? "overflow-hidden"
              : "overflow-x-auto snap-x snap-mandatory scroll-px-5 md:scroll-px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          }`}
        >
          <motion.div
            ref={rowRef}
            className="relative flex w-max gap-4 lg:gap-5 px-5 md:px-6 lg:px-[var(--route-pad)] pb-2"
            style={{
              x: live ? x : 0,
              // desktop: line the first card up with the page container
              ["--route-pad" as string]: "max(1.5rem, calc((100vw - 72rem) / 2 + 1.5rem))",
            }}
          >
            {stops.map((s) =>
              s.kind === "part" ? (
                <PartCard key={`p${s.part.id}`} part={s.part} />
              ) : (
                <ChapterCard key={`c${s.num}`} stop={s} />
              )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SyllabusRoute;
