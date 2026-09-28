import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ArrowLeft, Check, FolderOpen, TriangleAlert } from "lucide-react";
import { Eyebrow } from "@/components/v2/Eyebrow";
import { SplitReveal } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";
import { courseParts } from "@/data/curriculum";
import { COURSE_PRICE } from "@/lib/constants";

/* ── The example deal ───────────────────────────────────────────────
   Illustrative numbers, labeled as such on the card and under the
   section — never a client result. Everything the card shows is derived
   from these few values, so the story can't contradict itself. */
const ASKING = 2_450_000;
const COMPS = [
  { what: "4 חד׳ · 93 מ״ר · קומה 2", when: "לפני 3 חודשים", price: 2_290_000 },
  { what: "4 חד׳ · 97 מ״ר · קומה 4", when: "לפני 5 חודשים", price: 2_330_000 },
  { what: "4 חד׳ · 95 מ״ר · קומה 1", when: "לפני 8 חודשים", price: 2_310_000 },
];
const MARKET = Math.round(COMPS.reduce((s, c) => s + c.price, 0) / COMPS.length / 10_000) * 10_000;
const GAP = ASKING - MARKET;
const OFFER = MARKET - 50_000;
const COUNTER = MARKET + 50_000;
const SIGNED = MARKET;

/* Only chapter names that exist in the syllabus survive (same guard as MethodSteps). */
const syllabus = new Set(courseParts.flatMap((p) => p.modules));
const chapters = (...names: string[]) => names.filter((n) => syllabus.has(n));

/* en-US grouping: identical on the server and in every browser, so the
   pre-rendered HTML always matches hydration. */
const ils = (n: number) => `₪${n.toLocaleString("en-US")}`;

const Price = ({ n, className = "" }: { n: number; className?: string }) => (
  <span dir="ltr" className={`tabular-nums ${className}`}>
    {ils(n)}
  </span>
);

const beats = [
  {
    stage: "מחפשים",
    lead: "הדירה נראית מושלמת.",
    accent: "והמחיר?",
    body: (
      <>
        מודעה יפה, סיור נעים, מחיר מבוקש של <Price n={ASKING} />. רק שאלה אחת נשארת
        בלי תשובה — כמה הדירה הזאת באמת שווה.
      </>
    ),
    modules: chapters("השפה של הרווח: מושגי חובה"),
  },
  {
    stage: "בודקים",
    lead: "בודקים מה נסגר",
    accent: "באותו רחוב.",
    body: (
      <>
        עסקאות שנסגרו בפועל, בדירות דומות, באותו רחוב. שלוש עסקאות — והפער מתגלה:
        המבוקש גבוה ב-<Price n={GAP} /> ממחיר השוק.
      </>
    ),
    modules: chapters("הדגמת איתור וניתוח עסקה אמיתית", "יורדים לשטח — כל מה שצריך לדעת"),
  },
  {
    stage: "מתמקחים",
    lead: "נכנסים למו״מ",
    accent: "עם נתונים.",
    body: (
      <>
        ההצעה שלכם לא נשלפת מהבטן — היא נשענת על שלוש עסקאות שאפשר להניח על השולחן.
        קשה להתווכח עם מספרים.
      </>
    ),
    modules: chapters("מאסטר קלאס משא ומתן: כל השיטות והטיפים"),
  },
  {
    stage: "חותמים",
    lead: "חותמים על מה שהדירה",
    accent: "שווה.",
    body: (
      <>
        לא על המחיר שביקשו — על המחיר שבדקתם בעצמכם. זה ההבדל בין לקנות דירה לבין
        לקנות נכון.
      </>
    ),
    modules: chapters(
      "נבחרת מנצחת: אנשי המקצוע ואיך לנהל אותם בחכמה",
      "עשרת הדיברות: עשה ואל תעשה בעסקת נדל״ן"
    ),
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

/* ── The card ───────────────────────────────────────────────────────── */

const LedgerRow = ({ label, compact, children }: { label: string; compact: boolean; children: ReactNode }) => (
  <div className={`flex items-center justify-between gap-4 ${compact ? "py-1.5" : "py-2.5"}`}>
    <dt className="text-sm text-muted-foreground">{label}</dt>
    <dd className={`font-black h-8 flex items-center ${compact ? "text-lg" : "text-xl"}`}>{children}</dd>
  </div>
);

/** What changes between stages — everything else on the card stays put. */
const StageBody = ({ stage, compact, still }: { stage: number; compact: boolean; still: boolean }) => {
  const row = (i: number) => ({
    initial: still ? false : ({ opacity: 0, x: -8 } as const),
    animate: { opacity: 1, x: 0 },
    transition: { delay: still ? 0 : 0.1 + i * 0.08, duration: 0.35, ease },
  });

  if (stage === 0)
    return (
      <div className="rounded-2xl border-2 border-dashed border-accent/60 bg-accent/5 p-4">
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
        <p className="text-xs font-semibold text-muted-foreground mb-2">
          {COMPS.length} עסקאות שנסגרו באותו רחוב
        </p>
        <ul className={compact ? "space-y-1" : "space-y-1.5"}>
          {COMPS.map((c, i) => (
            <motion.li key={c.what} {...row(i)} className="flex items-baseline justify-between gap-3 text-sm">
              <span className="truncate">
                {c.what}
                {!compact && <span className="text-muted-foreground"> · {c.when}</span>}
              </span>
              <Price n={c.price} className="font-bold" />
            </motion.li>
          ))}
        </ul>
        <motion.p
          {...row(COMPS.length)}
          className="mt-3 inline-block rounded-full bg-accent/15 text-[hsl(var(--accent-deep))] px-3 py-1 text-sm font-bold"
        >
          המבוקש גבוה ב-<Price n={GAP} /> ממחיר השוק
        </motion.p>
      </div>
    );

  if (stage === 2) {
    const rung = `flex items-center justify-between gap-3 rounded-xl px-3.5 ${compact ? "py-1.5" : "py-2.5"}`;
    return (
      <ol className="space-y-2">
        <motion.li {...row(0)} className={`${rung} bg-secondary`}>
          <span>
            <span className="font-bold block">ההצעה שלכם</span>
            <span className="text-xs text-muted-foreground">מבוססת {COMPS.length} עסקאות</span>
          </span>
          <Price n={OFFER} className="font-black text-lg" />
        </motion.li>
        <motion.li {...row(1)} className={`${rung} border border-border`}>
          <span>
            <span className="font-bold block">הצעה נגדית</span>
            <span className="text-xs text-muted-foreground">
              המוכר ירד <Price n={ASKING - COUNTER} />
            </span>
          </span>
          <Price n={COUNTER} className="font-black text-lg" />
        </motion.li>
      </ol>
    );
  }

  return (
    <div className="rounded-2xl bg-[hsl(var(--ink))] text-white p-4 md:p-5">
      <p className="text-eyebrow uppercase tracking-[0.2em] text-white/60 flex items-center gap-2">
        <Check size={14} className="text-accent" aria-hidden />
        נחתם
      </p>
      <p className={`font-black leading-none mt-2 ${compact ? "text-3xl" : "text-4xl"}`}>
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
 * One deal, one card, filling in as the reader scrolls — the Karnaf
 * version of reddgrow.ai's evolving answer card (docs/REDDGROW-ANALYSIS.md).
 * The frame, the listing and the asking price never move; the market
 * price slot goes from a dashed "?" to a number, and only the body under
 * the ledger swaps, crossfading in place so the card is never empty.
 */
const DealCard = ({ stage, still, compact = false }: { stage: number; still: boolean; compact?: boolean }) => {
  const checked = stage >= 1;
  const signed = stage === 3;
  const fade = { duration: still ? 0 : 0.35, ease };

  return (
    <div className="relative rounded-3xl bg-background text-foreground border border-border shadow-depth-4 overflow-hidden">
      <div className={compact ? "p-4" : "p-6 xl:p-7"}>
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.2em] text-muted-foreground font-bold">
            <FolderOpen size={14} aria-hidden />
            תיק עסקה
          </span>
          <span className="text-[0.7rem] font-semibold text-muted-foreground border border-dashed border-muted-foreground/50 rounded-full px-2.5 py-0.5">
            דוגמה להמחשה
          </span>
        </div>
        <p className={`font-bold ${compact ? "text-base mt-1" : "text-lg mt-2"}`}>
          דירת 4 חדרים · 95 מ״ר · קומה 3
        </p>

        <dl className={`border-y border-border divide-y divide-border ${compact ? "my-3" : "my-4"}`}>
          <LedgerRow label="מחיר מבוקש" compact={compact}>
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
          <LedgerRow label="מחיר שוק" compact={compact}>
            <span className="relative inline-flex justify-end min-w-[8.5rem]">
              <AnimatePresence mode="popLayout" initial={false}>
                {checked ? (
                  <motion.span
                    key="known"
                    initial={still ? false : { opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, transition: { duration: still ? 0 : 0.15 } }}
                    transition={fade}
                    className="text-accent"
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
                    className="inline-flex items-center justify-center w-[8.5rem] h-7 rounded-lg border-2 border-dashed border-accent/70 text-accent text-base"
                  >
                    ?
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </LedgerRow>
        </dl>

        {/* Fixed height for the tallest stage, so the card never jumps */}
        <div className={`relative ${compact ? "min-h-[8.5rem]" : "min-h-[11.5rem]"}`}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={stage}
              initial={still ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={
                still
                  ? { opacity: 0, transition: { duration: 0 } }
                  : { opacity: 0, y: -8, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }
              }
              transition={fade}
            >
              <StageBody stage={stage} compact={compact} still={still} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Where you are in the deal */}
        <ol className={`grid grid-cols-4 gap-2 ${compact ? "mt-3" : "mt-5"}`}>
          {beats.map((b, i) => (
            <li key={b.stage} className="flex flex-col gap-1.5">
              <span className="h-1 rounded-full bg-border overflow-hidden">
                <motion.span
                  className="block h-full bg-accent origin-right"
                  initial={false}
                  animate={{ scaleX: i <= stage ? 1 : 0 }}
                  transition={fade}
                />
              </span>
              <span
                className={`text-xs font-semibold transition-colors ${
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

/* ── The text beats ─────────────────────────────────────────────────── */

type Beat = (typeof beats)[number];

const BeatText = ({
  beat,
  index,
  active,
  onActive,
  last,
}: {
  beat: Beat;
  index: number;
  active: boolean;
  onActive: () => void;
  last: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  // A band just under the middle of the screen: on phones the card is
  // pinned over the top ~40%, so the beat takes over while still in view.
  const inBand = useInView(ref, { margin: "-50% 0px -40% 0px" });

  useEffect(() => {
    if (inBand) onActive();
  }, [inBand, onActive]);

  return (
    <div
      ref={ref}
      className={`flex flex-col pt-8 lg:pt-0 lg:justify-center ${
        last ? "min-h-[40vh] lg:min-h-[70vh]" : "min-h-[55vh] lg:min-h-[70vh]"
      }`}
    >
      <div className={`transition-opacity duration-500 ${active ? "lg:opacity-100" : "lg:opacity-30"}`}>
        <div className="font-mono text-accent text-sm font-bold tabular-nums mb-3 tracking-[0.2em]">
          0{index + 1} · {beat.stage}
        </div>
        <h3 className="text-display-md text-white mb-4">
          {beat.lead} <span className="text-accent">{beat.accent}</span>
        </h3>
        <p className="text-body-lg text-white/70 leading-[1.85] max-w-[46ch]">{beat.body}</p>
        {beat.modules.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs text-white/50 font-semibold">בקורס:</span>
            {beat.modules.map((m) => (
              <span key={m} className="text-xs text-white/80 border border-white/15 rounded-full px-3 py-1">
                {m}
              </span>
            ))}
          </div>
        )}
        {last && (
          <Link
            to="/course"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold px-7 py-4 min-h-[44px] transition-colors"
          >
            לומדים את השיטה בקורס · ₪{COURSE_PRICE.toLocaleString("en-US")}
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden />
          </Link>
        )}
      </div>
    </div>
  );
};

/**
 * "Numbers, not feelings" shown on one apartment. Right after the
 * manifesto says it, this section does it: the text beats scroll while
 * the deal card stays pinned and fills in — asking price, market price,
 * offer, signature. On phones the card pins to the top of the screen
 * and the beats scroll beneath it, so the story survives on mobile
 * (the reference site drops it there).
 */
const DealStory = () => {
  const still = useStillMotion();
  const [stage, setStage] = useState(0);

  return (
    <section className="relative py-section-lg bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))]">
      {/* Desktop only: on phones the pinned card's solid backing would cut a seam through it */}
      <div
        className="hidden lg:block absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background: "radial-gradient(60% 45% at 15% 20%, hsl(24 80% 52% / 0.16) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" aria-hidden />

      <div className="relative container mx-auto px-5 md:px-6 max-w-6xl">
        <div className="max-w-3xl mb-6 lg:mb-4">
          <Eyebrow className="mb-6">תיק עסקה</Eyebrow>
          <SplitReveal
            text="ככה זה נראה על דירה אחת."
            highlight={["דירה", "אחת"]}
            className="text-display-md md:text-display-lg text-white mb-5"
          />
          <p className="text-body-lg text-white/70 leading-relaxed max-w-[60ch]">
            מהמודעה ועד החתימה. גללו — והתיק מתמלא, שלב אחרי שלב.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          <div className="relative">
            {/* Phones: the card pins to the top and the beats scroll under it */}
            <div className="lg:hidden sticky top-0 z-10 -mx-5 px-5 pt-3 pb-4 bg-[hsl(var(--ink))]">
              <DealCard stage={stage} still={still} compact />
              <div
                aria-hidden
                className="absolute inset-x-0 top-full h-8 bg-gradient-to-b from-[hsl(var(--ink))] to-transparent pointer-events-none"
              />
            </div>
            {beats.map((beat, i) => (
              <BeatText
                key={beat.stage}
                beat={beat}
                index={i}
                active={stage === i}
                onActive={() => setStage(i)}
                last={i === beats.length - 1}
              />
            ))}
          </div>

          {/* Desktop: pinned beside the beats */}
          <div className="hidden lg:block sticky top-28">
            <DealCard stage={stage} still={still} />
          </div>
        </div>

        <p className="mt-10 text-xs text-white/45">
          המספרים בדוגמה להמחשה בלבד ואינם תוצאה של לקוח.
        </p>
      </div>
    </section>
  );
};

export default DealStory;
