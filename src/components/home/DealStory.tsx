import { useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowLeft, Check, FolderOpen, TriangleAlert } from "lucide-react";
import { Eyebrow } from "@/components/v2/Eyebrow";
import { SplitReveal, useScrubbed } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";
import { courseParts } from "@/data/curriculum";
import { CHAPTERS_LABEL } from "@/data/courseStats";
import { COURSE_PRICE } from "@/lib/constants";
import { formatILS as ils } from "@/lib/format";

/* ── The example deal ───────────────────────────────────────────────
   Illustrative numbers, labeled as such on the card and under the
   section — never a client result. Everything is derived from these few
   values, so the card, the price track and the copy can't disagree. */
const ASKING = 2_450_000;
const COMPS = [
  { what: "4 חד׳ · 93 מ״ר · קומה 2", when: "לפני 3 חודשים", price: 2_290_000 },
  { what: "4 חד׳ · 97 מ״ר · קומה 4", when: "לפני 5 חודשים", price: 2_330_000 },
  { what: "4 חד׳ · 95 מ״ר · קומה 1", when: "לפני 8 חודשים", price: 2_310_000 },
];
const MARKET = Math.round(COMPS.reduce((s, c) => s + c.price, 0) / COMPS.length / 10_000) * 10_000;
const GAP = ASKING - MARKET;
/* The course's "three numbers" (target / opening / ceiling), set before talking. */
const TARGET = MARKET;
const OPENING = TARGET - 50_000;
const CEILING = TARGET + 40_000;
/* The seller's counter lands just above the ceiling — so the buyer holds. */
const COUNTER = CEILING + 10_000;
const SIGNED = TARGET;

/* en-US grouping: identical on the server and in every browser, so the
   pre-rendered HTML always matches hydration. */

const Price = ({ n, className = "" }: { n: number; className?: string }) => (
  <span dir="ltr" className={`tabular-nums ${className}`}>
    {ils(n)}
  </span>
);

/* Lesson names from the course (checked against the Schooler syllabus on
   2026-09-28). Each list is tied to its chapter in curriculum.ts: if that
   chapter is renamed or dropped, its lessons stop being advertised here. */
const syllabus = new Set(courseParts.flatMap((p) => p.modules));
const lessons = (chapter: string, ...names: string[]) => (syllabus.has(chapter) ? names : []);
const NEGOTIATION = "מאסטר קלאס משא ומתן: כל השיטות והטיפים";
const COMMANDMENTS = "עשרת הדיברות: עשה ואל תעשה בעסקת נדל״ן";

const beats = [
  {
    stage: "המודעה",
    lead: "המחיר במודעה הוא",
    accent: "רק נקודת פתיחה.",
    body: (
      <>
        <Price n={ASKING} />, דירה יפה ומתווך שממהר. ב-2026 לא מעט מוכרים כבר הורידו את
        המחיר שביקשו — אבל אף מודעה לא תגיד לכם כמה. השאלה היחידה שחשובה: כמה הדירה הזאת
        באמת שווה?
      </>
    ),
    lessons: [...lessons(COMMANDMENTS, "לא תבנו על המודעה"), ...lessons(NEGOTIATION, "איסוף מודיעין")],
  },
  {
    stage: "הבדיקה",
    lead: "מחיר שוק לא מנחשים.",
    accent: "בודקים.",
    body: (
      <>
        עסקאות שנסגרו בפועל, בדירות דומות באותו רחוב, ושמאות מוקדמת לפני שמציעים שקל. שלוש
        עסקאות — והפער על השולחן: <Price n={GAP} />.
      </>
    ),
    lessons: lessons(NEGOTIATION, "שמאות מוקדמת", "איסוף מודיעין"),
  },
  {
    stage: "המשא ומתן",
    lead: "נכנסים למו״מ עם",
    accent: "שלושה מספרים.",
    body: (
      <>
        מחיר פתיחה, מחיר יעד ומחיר תקרה — נקבעים לפני השיחה, לא בתוכה. כשהמוכר חוזר עם{" "}
        <Price n={COUNTER} />, אתם כבר יודעים שזה מעל התקרה. ובשוק של 2026, עם מלאי גדול של
        דירות שלא נמכרו, כוח המיקוח עבר לקונים.
      </>
    ),
    lessons: lessons(NEGOTIATION, "שלושת המספרים: יעד · פתיחה · תקרה", "טכניקת העיגון", "הוויתור המותנה"),
  },
  {
    stage: "החתימה",
    lead: "חותמים על מה שהדירה",
    accent: "שווה.",
    body: (
      <>
        <Price n={SIGNED} /> — המחיר שבדקתם, לא המחיר שביקשו. <Price n={GAP} /> שנשארים אצלכם,
        ועורך דין, שמאי ויועץ משכנתאות שנכנסים בדיוק בזמן.
      </>
    ),
    lessons: [
      ...lessons(COMMANDMENTS, "לא חותמים"),
      ...lessons(NEGOTIATION, "לו״ז לשילוב גורמי המעטפת"),
    ],
  },
];

/* Where each stage starts, as a share of the pinned scroll. */
const BOUNDS = [0, 0.22, 0.48, 0.74, 1];
const stageAt = (v: number) => (v < BOUNDS[1] ? 0 : v < BOUNDS[2] ? 1 : v < BOUNDS[3] ? 2 : 3);

const ease = [0.16, 1, 0.3, 1] as const;

/* ── The price track ─────────────────────────────────────────────────
   A ruler from ₪2.2M to ₪2.5M (cheaper on the right, the RTL start).
   The markers are scrubbed by the scroll itself: the market price slides
   away from the asking price as the check runs, then the buyer's opening
   and the seller's counter walk toward each other and meet at the target.
   Each marker is a full-width layer translated by a share of its own
   width — a transform, so it never triggers layout while scrolling. */
const MIN = 2_200_000;
const MAX = 2_500_000;
const pct = (n: number) => ((n - MIN) / (MAX - MIN)) * 100;

/** A position on the track (0–100, from the right) → the layer's translateX. */
function useTrackX(mv: MotionValue<number>) {
  return useTransform(mv, (v) => `${-v}%`);
}

function useTrack(p: MotionValue<number>) {
  return {
    marketX: useTrackX(useScrubbed(p, [0.22, 0.4], [pct(ASKING), pct(MARKET)])),
    marketO: useScrubbed(p, [0.2, 0.25], [0, 1]),
    gapScale: useScrubbed(p, [0.22, 0.4], [0, 1]),
    gapLabelO: useScrubbed(p, [0.36, 0.42, 0.48, 0.52, 0.86, 0.92], [0, 1, 1, 0, 0, 1]),
    offerX: useTrackX(useScrubbed(p, [0.74, 0.9], [pct(OPENING), pct(SIGNED)])),
    offerO: useScrubbed(p, [0.46, 0.52], [0, 1]),
    sellerX: useTrackX(useScrubbed(p, [0.5, 0.66, 0.74, 0.9], [pct(ASKING), pct(COUNTER), pct(COUNTER), pct(SIGNED)])),
    sellerO: useScrubbed(p, [0.48, 0.54], [0, 1]),
    ceilO: useScrubbed(p, [0.5, 0.56, 0.74, 0.8], [0, 1, 1, 0]),
    signedO: useScrubbed(p, [0.86, 0.92], [0, 1]),
    /* once they meet, the three labels at the target give way to one */
    apart: useScrubbed(p, [0.84, 0.88], [1, 0]),
  };
}

/* Stillness: the same track, placed where each stage leaves it. */
const restTrack = (stage: number) => ({
  marketX: `${-(stage >= 1 ? pct(MARKET) : pct(ASKING))}%`,
  marketO: stage >= 1 ? 1 : 0,
  gapScale: stage >= 1 ? 1 : 0,
  gapLabelO: stage === 1 || stage === 3 ? 1 : 0,
  offerX: `${-(stage >= 3 ? pct(SIGNED) : pct(OPENING))}%`,
  offerO: stage >= 2 ? 1 : 0,
  sellerX: `${-(stage >= 3 ? pct(SIGNED) : pct(COUNTER))}%`,
  sellerO: stage >= 2 ? 1 : 0,
  ceilO: stage === 2 ? 1 : 0,
  signedO: stage >= 3 ? 1 : 0,
  apart: stage >= 3 ? 0 : 1,
});

const Marker = ({
  x,
  opacity,
  labelOpacity = 1,
  label,
  side,
  tone,
}: {
  x: MotionValue<string> | string;
  opacity: MotionValue<number> | number;
  labelOpacity?: MotionValue<number> | number;
  label: string;
  side: "above" | "below";
  tone: "ink" | "accent" | "muted";
}) => {
  const dot =
    tone === "accent" ? "bg-accent" : tone === "ink" ? "bg-foreground" : "bg-muted-foreground";
  return (
    <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ x, opacity }}>
      <span className={`absolute top-1/2 -right-1.5 w-3 h-3 -mt-1.5 rounded-full ring-2 ring-background ${dot}`} />
      <motion.span
        className={`absolute right-0 translate-x-1/2 whitespace-nowrap text-[10px] md:text-[11px] font-bold ${
          side === "above" ? "bottom-[calc(50%+10px)]" : "top-[calc(50%+10px)]"
        } ${tone === "accent" ? "text-[hsl(var(--accent-deep))]" : "text-muted-foreground"}`}
        style={{ opacity: labelOpacity }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
};

const PriceTrack = ({ t, stage }: { t: ReturnType<typeof useTrack> | ReturnType<typeof restTrack>; stage: number }) => (
  <div className="relative h-12 md:h-16 mx-2" aria-hidden>
    {/* the ruler */}
    <div className="absolute inset-x-0 top-1/2 h-px bg-border" />
    {/* what the asking price hides over the market — then what stays with you */}
    <motion.div
      className="absolute top-1/2 -mt-1.5 h-3 rounded-full bg-accent/25 origin-left"
      style={{ right: `${pct(MARKET)}%`, width: `${pct(ASKING) - pct(MARKET)}%`, scaleX: t.gapScale }}
    />
    <motion.span
      className="absolute bottom-[calc(50%+10px)] whitespace-nowrap text-[10px] md:text-[11px] font-black text-[hsl(var(--accent-deep))] translate-x-1/2"
      style={{ right: `${(pct(MARKET) + pct(ASKING)) / 2}%`, opacity: t.gapLabelO }}
    >
      {stage >= 3 ? (
        "נשאר אצלכם"
      ) : (
        <>
          פער <Price n={GAP} />
        </>
      )}
    </motion.span>
    <motion.span
      className="absolute top-1/2 -mt-2.5 h-5 w-px bg-muted-foreground/60"
      style={{ right: `${pct(CEILING)}%`, opacity: t.ceilO }}
    />
    <motion.span
      className="absolute top-[calc(50%+10px)] translate-x-1/2 text-[10px] md:text-[11px] font-semibold text-muted-foreground"
      style={{ right: `${pct(CEILING)}%`, opacity: t.ceilO }}
    >
      תקרה
    </motion.span>
    <Marker x={`${-pct(ASKING)}%`} opacity={1} label="מבוקש" side="above" tone="ink" />
    <Marker x={t.marketX} opacity={t.marketO} labelOpacity={t.apart} label="שוק" side="below" tone="accent" />
    <Marker x={t.sellerX} opacity={t.sellerO} labelOpacity={t.apart} label="המוכר" side="above" tone="muted" />
    <Marker x={t.offerX} opacity={t.offerO} labelOpacity={t.apart} label="אתם" side="below" tone="accent" />
    <motion.span
      className="absolute top-1/2 -mt-3 w-6 h-6 rounded-full border-2 border-accent translate-x-1/2"
      style={{ right: `${pct(SIGNED)}%`, opacity: t.signedO }}
    />
    <motion.span
      className="absolute top-[calc(50%+14px)] translate-x-1/2 whitespace-nowrap text-[10px] md:text-[11px] font-black text-[hsl(var(--accent-deep))]"
      style={{ right: `${pct(SIGNED)}%`, opacity: t.signedO }}
    >
      נחתם
    </motion.span>
  </div>
);

/* ── The card ───────────────────────────────────────────────────────── */

const LedgerRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-1 md:py-2">
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className="font-black h-8 flex items-center text-lg md:text-xl">{children}</dd>
  </div>
);

/** What changes between stages — everything else on the card stays put. */
const StageBody = ({ stage, still }: { stage: number; still: boolean }) => {
  const row = (i: number) => ({
    initial: still ? false : ({ opacity: 0, x: -8 } as const),
    animate: { opacity: 1, x: 0 },
    transition: { delay: still ? 0 : 0.08 + i * 0.07, duration: 0.35, ease },
  });

  if (stage === 0)
    return (
      <div className="rounded-2xl border-2 border-dashed border-accent/60 bg-accent/5 p-3.5 md:p-4">
        <p className="font-bold flex items-center gap-2">
          <TriangleAlert size={16} className="text-accent shrink-0" aria-hidden />
          ״המחיר נראה הגיוני.״
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
          לעומת מה? בלי עסקאות להשוות אליהן, כל מחיר נראה סביר.
        </p>
      </div>
    );

  if (stage === 1)
    return (
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-1.5">
          {COMPS.length} עסקאות שנסגרו באותו רחוב
        </p>
        <ul className="space-y-1">
          {COMPS.map((c, i) => (
            <motion.li key={c.what} {...row(i)} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate">
                {c.what}
                <span className="hidden md:inline text-muted-foreground"> · {c.when}</span>
              </span>
              <Price n={c.price} className="font-bold" />
            </motion.li>
          ))}
        </ul>
      </div>
    );

  if (stage === 2)
    return (
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">שלושת המספרים שלכם — לפני השיחה</p>
        <dl className="grid grid-cols-3 gap-2 text-center">
          {[
            { k: "פתיחה", v: OPENING },
            { k: "יעד", v: TARGET },
            { k: "תקרה", v: CEILING },
          ].map((n, i) => (
            <motion.div key={n.k} {...row(i)} className={`rounded-xl px-1 py-2 ${n.k === "יעד" ? "bg-accent/15" : "bg-secondary"}`}>
              <dt className="text-[11px] text-muted-foreground">{n.k}</dt>
              <dd className="font-black text-sm md:text-base">
                <Price n={n.v} />
              </dd>
            </motion.div>
          ))}
        </dl>
        <motion.p {...row(3)} className="mt-2 text-sm">
          <span className="font-bold">המוכר: </span>
          <Price n={COUNTER} className="font-bold" />
          <span className="text-muted-foreground"> — מעל התקרה. מחזיקים.</span>
        </motion.p>
      </div>
    );

  return (
    <div className="rounded-2xl bg-[hsl(var(--ink))] text-white p-3.5 md:p-5">
      <p className="text-eyebrow uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
        <Check size={14} className="text-accent" aria-hidden />
        נחתם · במחיר היעד
      </p>
      <p className="font-black leading-none mt-2 text-3xl md:text-4xl">
        <Price n={SIGNED} />
      </p>
      <motion.p
        {...row(1)}
        className="mt-3 inline-block rounded-full bg-accent text-accent-foreground px-3 py-1 text-sm font-bold"
      >
        <Price n={GAP} /> מתחת למבוקש
      </motion.p>
    </div>
  );
};

/**
 * One deal, one card — the Karnaf version of reddgrow.ai's evolving
 * answer card (docs/REDDGROW-ANALYSIS.md). The frame, the listing and the
 * asking price never move; the market price goes from a dashed "?" to a
 * number, the price track is scrubbed by the scroll, and only the body
 * under it swaps, crossfading in place so the card is never empty.
 */
const DealCard = ({
  stage,
  still,
  track,
  rail,
}: {
  stage: number;
  still: boolean;
  track: ReturnType<typeof useTrack> | ReturnType<typeof restTrack>;
  rail: (MotionValue<number> | number)[];
}) => {
  const checked = stage >= 1;
  const signed = stage === 3;
  const fade = { duration: still ? 0 : 0.35, ease };

  return (
    <div className="relative rounded-3xl bg-background text-foreground border border-border shadow-depth-4 overflow-hidden">
      <div className="p-4 md:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-muted-foreground font-bold">
            <FolderOpen size={14} aria-hidden />
            תיק עסקה
          </span>
          <span className="text-[0.7rem] font-semibold text-muted-foreground border border-dashed border-muted-foreground/50 rounded-full px-2.5 py-0.5">
            דוגמה להמחשה
          </span>
        </div>
        <p className="font-bold mt-1 md:mt-2 text-base md:text-lg">דירת 4 חדרים · 95 מ״ר · קומה 3</p>

        <dl className="border-y border-border divide-y divide-border my-2.5 md:my-4">
          <LedgerRow label="מחיר מבוקש">
            <span className="relative inline-block">
              <Price n={ASKING} className={`transition-colors duration-500 ${signed ? "text-muted-foreground" : ""}`} />
              {/* Struck through once the deal is signed below it */}
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-1/2 h-0.5 bg-accent origin-left"
                initial={false}
                animate={{ scaleX: signed ? 1 : 0 }}
                transition={fade}
              />
            </span>
          </LedgerRow>
          <LedgerRow label="מחיר שוק">
            {/* A fixed box with both states absolutely inside it: the swap is a
                pure crossfade, nothing in the layout moves (no CLS). */}
            <span className="relative inline-block w-[8.5rem] h-8">
              <AnimatePresence initial={false}>
                {checked ? (
                  <motion.span
                    key="known"
                    initial={still ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: still ? 0 : 0.15 } }}
                    transition={fade}
                    className="absolute inset-0 flex items-center justify-end text-accent"
                  >
                    <Price n={MARKET} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="unknown"
                    initial={still ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: still ? 0 : 0.15 } }}
                    transition={fade}
                    className="absolute inset-0 flex items-center justify-end"
                  >
                    <span className="inline-flex items-center justify-center w-full h-7 rounded-lg border-2 border-dashed border-accent/70 text-accent text-base">
                      ?
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </LedgerRow>
        </dl>

        <PriceTrack t={track} stage={stage} />

        {/* Fixed height for the tallest stage, with each stage absolutely
            inside it: the card never jumps and the swap causes no layout
            shift (popLayout's position flip counted as CLS). */}
        <div className="relative mt-1 md:mt-2 h-[7.75rem] md:h-[9rem]">
          <AnimatePresence initial={false}>
            <motion.div
              key={stage}
              className="absolute inset-x-0 top-0"
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                still
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }
              }
              transition={fade}
            >
              <StageBody stage={stage} still={still} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Where you are in the deal — each segment fills with the scroll */}
        <ol className="grid grid-cols-4 gap-2 mt-3 md:mt-4">
          {beats.map((b, i) => (
            <li key={b.stage} className="flex flex-col gap-1.5">
              <span className="h-1 rounded-full bg-border overflow-hidden">
                <motion.span className="block h-full bg-accent origin-right" style={{ scaleX: rail[i] }} />
              </span>
              <span
                className={`text-[11px] md:text-xs font-semibold transition-colors ${
                  i === stage ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {b.stage}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

/* ── The beat (text) ────────────────────────────────────────────────── */

const Beat = ({ i, still, finalCta }: { i: number; still: boolean; finalCta?: ReactNode }) => {
  const beat = beats[i];
  const last = i === beats.length - 1;
  return (
    <motion.div
      className="absolute inset-0 flex flex-col justify-end lg:justify-center"
      initial={still ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={still ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -14, transition: { duration: 0.2 } }}
      transition={{ duration: still ? 0 : 0.5, ease }}
    >
      <div aria-hidden>
      <div className="font-mono text-accent text-xs md:text-sm font-bold tabular-nums mb-2 md:mb-3 tracking-[0.2em]">
        0{i + 1} · {beat.stage}
      </div>
      <h3 className="text-[1.6rem] leading-[1.15] md:text-display-md text-white mb-2 md:mb-4 font-black tracking-[-0.02em]">
        {beat.lead} <span className="text-accent">{beat.accent}</span>
      </h3>
      <p className="text-[0.95rem] md:text-body-lg text-white/70 leading-[1.7] md:leading-[1.85] max-w-[46ch] [@media(max-height:700px)]:hidden">
        {beat.body}
      </p>
      {beat.lessons.length > 0 && (
        <div
          className={`mt-3 md:mt-5 flex flex-nowrap md:flex-wrap overflow-hidden items-center gap-1.5 md:gap-2 ${
            last ? "hidden md:flex" : "[@media(max-height:760px)]:hidden md:flex"
          }`}
        >
          <span className="text-xs text-white/50 font-semibold">בקורס:</span>
          {beat.lessons.map((m) => (
            <span key={m} className="shrink-0 text-[11px] md:text-xs text-white/80 border border-white/15 rounded-full px-2.5 md:px-3 py-0.5 md:py-1">
              {m}
            </span>
          ))}
        </div>
      )}
      </div>
      {last && finalCta && <div className="mt-4 md:mt-8">{finalCta}</div>}
      {last && !finalCta && (
        <div className="mt-4 md:mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link
            to="/course"
            className="group inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-6 md:px-7 py-3 md:py-4 min-h-[44px] transition-colors"
          >
            לומדים את השיטה בקורס · ₪{COURSE_PRICE.toLocaleString("en-US")}
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden />
          </Link>
          <Link
            to="/course#program"
            className="hidden md:inline-flex items-center gap-2 font-semibold text-white/75 hover:text-white underline-offset-4 hover:underline min-h-[44px]"
          >
            לסילבוס המלא — {CHAPTERS_LABEL}
          </Link>
        </div>
      )}
    </motion.div>
  );
};

/**
 * "Numbers, not feelings" shown on one apartment, as a pinned stage: the
 * section is several screens tall, the stage inside it stays on screen,
 * and the reader's scroll drives the deal — the beat text swaps in place,
 * the card fills in, the price track's markers slide and meet, the rail
 * fills, and the light warms from the listing to the signature. The same
 * stage runs on phones (text above the card), which is where most of the
 * traffic is — the reference site drops its story there.
 */
interface DealStoryProps {
  eyebrow?: string;
  title?: string;
  highlight?: string[];
  intro?: string;
  /** Replaces the default last-beat CTA (the course page sends it to checkout). */
  finalCta?: ReactNode;
}

const DealStory = ({
  eyebrow = "תיק עסקה",
  title = "ככה זה נראה על דירה אחת.",
  highlight = ["דירה", "אחת"],
  intro = "מהמודעה ועד החתימה, לפי השיטה שבקורס. גללו — והעסקה מתקדמת איתכם.",
  finalCta,
}: DealStoryProps = {}) => {
  const still = useStillMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState(0);

  // 0 → the stage pins, 1 → it is released.
  const { scrollYProgress: p } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  useMotionValueEvent(p, "change", (v) => setStage(stageAt(v)));

  // The card rises into place as the stage scrolls up to pin.
  const { scrollYProgress: arrive } = useScroll({ target: trackRef, offset: ["start end", "start start"] });
  const cardY = useScrubbed(arrive, [0, 1], [70, 0]);
  const cardScale = useScrubbed(arrive, [0, 1], [0.95, 1]);
  const warmth = useScrubbed(p, [0, 1], [0.08, 0.42]);

  const live = useTrack(p);
  const rail = [
    useScrubbed(p, [BOUNDS[0], BOUNDS[1]], [0, 1]),
    useScrubbed(p, [BOUNDS[1], BOUNDS[2]], [0, 1]),
    useScrubbed(p, [BOUNDS[2], BOUNDS[3]], [0, 1]),
    useScrubbed(p, [BOUNDS[3], BOUNDS[4] - 0.08], [0, 1]),
  ];

  return (
    <section className="relative bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))]" aria-labelledby="deal-story-title">
      <div className="absolute inset-0 grain-texture pointer-events-none" aria-hidden />

      <div className="relative container mx-auto px-5 md:px-6 max-w-6xl pt-section-lg pb-6">
        <div className="max-w-3xl">
          <Eyebrow className="mb-6">{eyebrow}</Eyebrow>
          <span id="deal-story-title" className="sr-only">
            תיק עסקה: דוגמה לקנייה של דירה אחת לפי מספרים
          </span>
          <SplitReveal
            text={title}
            highlight={highlight}
            className="text-display-md md:text-display-lg text-white mb-5"
          />
          <p className="text-body-lg text-white/70 leading-relaxed max-w-[60ch]">
            {intro}
          </p>
        </div>
      </div>

      {/* Screen readers get the whole story at once, not one scroll state */}
      <ol className="sr-only">
        {beats.map((b) => (
          <li key={b.stage}>
            {b.lead} {b.accent} {b.body}
          </li>
        ))}
        <li>
          מחיר מבוקש {ils(ASKING)}; מחיר שוק לפי {COMPS.length} עסקאות: {ils(MARKET)}; פתיחה {ils(OPENING)}, יעד{" "}
          {ils(TARGET)}, תקרה {ils(CEILING)}; הצעה נגדית {ils(COUNTER)}; נחתם ב-{ils(SIGNED)}. דוגמה להמחשה.
        </li>
      </ol>

      <div ref={trackRef} className="relative h-[430vh]">
        <div className="sticky top-0 h-[100svh] overflow-hidden">
          {/* The light warms as the deal closes */}
          <motion.div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(70% 55% at 20% 55%, hsl(24 80% 52% / 0.55) 0%, transparent 70%)",
              opacity: still ? 0.08 + 0.34 * (stage / 3) : warmth,
            }}
          />
          {/* Phones: the beat has a fixed height (text anchored to its bottom),
              so the card below it never moves between stages; the bottom
              padding keeps the rail clear of the floating buttons. */}
          <div className="relative h-full container mx-auto px-5 md:px-6 max-w-6xl flex flex-col lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 lg:items-center justify-center pt-14 pb-20 lg:py-0">
            <div className="relative shrink-0 h-[14.5rem] [@media(max-height:800px)]:h-[12.5rem] [@media(max-height:700px)]:h-[7.5rem] md:h-[13rem] lg:h-[26rem] mb-3 lg:mb-0">
              <AnimatePresence initial={false}>
                <Beat key={stage} i={stage} still={still} finalCta={finalCta} />
              </AnimatePresence>
            </div>
            <motion.div
              aria-hidden
              className="w-full max-w-md mx-auto lg:max-w-[30rem]"
              style={still ? { y: 0, scale: 1 } : { y: cardY, scale: cardScale }}
            >
              <DealCard
                stage={stage}
                still={still}
                track={still ? restTrack(stage) : live}
                rail={still ? rail.map((_, i) => (i <= stage ? 1 : 0)) : rail}
              />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="relative container mx-auto px-5 md:px-6 max-w-6xl pb-section-md">
        <p className="text-xs text-white/45">
          המספרים בדוגמה להמחשה בלבד ואינם תוצאה של לקוח. שמות השיעורים — מתוך הסילבוס של הקורס.
        </p>
      </div>
    </section>
  );
};

export default DealStory;
