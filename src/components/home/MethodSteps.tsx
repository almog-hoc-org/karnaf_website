import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { ArrowLeft, Check } from "lucide-react";
import { Eyebrow } from "@/components/v2/Eyebrow";
import { SplitReveal } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";
import { courseParts } from "@/data/curriculum";
import { CHAPTERS_LABEL } from "@/data/courseStats";

/* Only chapter names that exist in the syllabus survive — if curriculum.ts
   renames one, it drops out here instead of advertising a ghost chapter. */
const syllabus = new Set(courseParts.flatMap((p) => p.modules));
const chapters = (...names: string[]) => names.filter((n) => syllabus.has(n));

const steps = [
  {
    num: "01",
    title: "מבינים את המשחק",
    body: "לפני שמסתכלים על דירה אחת: סוגי העסקאות, התחדשות עירונית, משך ההשקעה והמושגים שכל רוכש חייב להכיר.",
    modules: chapters(
      "סוגי העסקאות",
      "מבינים התחדשות עירונית",
      "איך להגדיר משך השקעה",
      "השפה של הרווח: מושגי חובה"
    ),
  },
  {
    num: "02",
    title: "בונים תוכנית כסף",
    body: "כמה באמת אפשר לקנות, איך מממנים ומה עולה המס — עוד לפני שמתאהבים בנכס.",
    modules: chapters(
      "תכנון פיננסי חכם של עסקת נדל״ן",
      "יסודות המשכנתא: כך תנצחו את הבנק",
      "מיסוי נדל״ן — רק מה שצריך לדעת"
    ),
  },
  {
    num: "03",
    title: "מאתרים ומנתחים עסקה",
    body: "הדגמה של איתור וניתוח עסקה אמיתית, ומה בודקים כשיורדים לשטח — כדי לזהות עסקה טובה ולהתרחק מעסקה רעה.",
    modules: chapters(
      "הדגמת איתור וניתוח עסקה אמיתית",
      "יורדים לשטח — כל מה שצריך לדעת",
      "פינוי בינוי: ניתוח מהיר ויעיל"
    ),
  },
  {
    num: "04",
    title: "סוגרים נכון",
    body: "משא ומתן, בחירת אנשי המקצוע וניהולם, ועשרת הדיברות שחוסכות את הטעויות היקרות.",
    modules: chapters(
      "מאסטר קלאס משא ומתן: כל השיטות והטיפים",
      "נבחרת מנצחת: אנשי המקצוע ואיך לנהל אותם בחכמה",
      "עשרת הדיברות: עשה ואל תעשה בעסקת נדל״ן"
    ),
  },
];

type StepData = (typeof steps)[number];

/** One step of the text column; reports itself active while it crosses the viewport's middle. */
const StepText = ({
  step,
  active,
  onActive,
}: {
  step: StepData;
  active: boolean;
  onActive: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const centered = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (centered) onActive();
  }, [centered, onActive]);

  return (
    <div ref={ref} className="lg:min-h-[62vh] flex flex-col justify-center py-8 lg:py-0">
      <div
        className={`transition-opacity duration-500 ${active ? "lg:opacity-100" : "lg:opacity-30"}`}
      >
        <div className="font-mono text-accent text-lg font-bold tabular-nums mb-3">{step.num}</div>
        <h3 className="text-display-md text-foreground mb-4">{step.title}</h3>
        <p className="text-body-lg text-muted-foreground leading-[1.85] max-w-[46ch]">{step.body}</p>

        {/* Mobile: the chapters sit under their step (no sticky panel) */}
        <ul className="lg:hidden mt-5 flex flex-wrap gap-2">
          {step.modules.map((m) => (
            <li
              key={m}
              className="text-sm text-foreground bg-background border border-border rounded-full px-3 py-1.5"
            >
              {m}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

/**
 * The pinned panel — swaps to the active step's chapters.
 *
 * The panel itself never empties: `popLayout` lifts the outgoing content
 * out of flow while the incoming content is already fading in on top, so
 * the swap is a crossfade rather than exit-then-enter. With `mode="wait"`
 * the card sat blank for ~0.5s on every step — the 1:1 comparison with
 * reddgrow.ai (docs/REDDGROW-ANALYSIS.md) showed the reference keeps its
 * card solid and changes only what's inside. No blur either: it's costly
 * to paint and leaves the text unreadable mid-swap.
 */
const StepPanel = ({ step, still }: { step: StepData; still: boolean }) => (
  <div className="relative rounded-3xl overflow-hidden bg-[hsl(var(--ink))] text-[hsl(var(--ink-foreground))] p-8 xl:p-10 min-h-[26rem] shadow-depth-3">
    <div
      className="absolute inset-0 pointer-events-none"
      aria-hidden
      style={{
        background: "radial-gradient(70% 60% at 85% 0%, hsl(24 80% 52% / 0.22) 0%, transparent 70%)",
      }}
    />
    <div className="absolute inset-0 grain-texture pointer-events-none" aria-hidden />
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={step.num}
        className="relative"
        initial={still ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={
          still
            ? { opacity: 0, transition: { duration: 0 } }
            : { opacity: 0, y: -10, transition: { duration: 0.2, ease: [0.4, 0, 1, 1] } }
        }
        transition={{ duration: still ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex items-baseline justify-between mb-6">
          <span className="text-eyebrow uppercase tracking-[0.28em] text-white/55">
            פרקים בשלב הזה
          </span>
          <span
            aria-hidden
            className="font-black leading-none text-[5.5rem] tabular-nums text-transparent [-webkit-text-stroke:1.5px_hsl(24_80%_52%/0.8)]"
          >
            {step.num}
          </span>
        </div>
        <p className="text-2xl xl:text-3xl font-black text-white mb-6 tracking-[-0.02em]">{step.title}</p>
        <ul className="space-y-3">
          {step.modules.map((m, i) => (
            <motion.li
              key={m}
              className="flex items-start gap-3 text-white/85"
              initial={still ? false : { opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: still ? 0 : 0.12 + i * 0.07, duration: 0.4 }}
            >
              <span className="mt-0.5 inline-flex w-6 h-6 rounded-full bg-accent/15 items-center justify-center shrink-0">
                <Check size={14} className="text-accent" aria-hidden />
              </span>
              <span className="leading-snug">{m}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </AnimatePresence>
  </div>
);

/**
 * Scroll storytelling: the text column scrolls normally while the panel
 * beside it stays pinned and re-renders for whichever step is crossing
 * the middle of the screen. A rail on the text column fills with the
 * reader's progress through the four steps.
 */
const MethodSteps = () => {
  const still = useStillMotion();
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start center", "end center"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="relative py-section-lg bg-card border-y border-border">
      <div className="container mx-auto px-5 md:px-6 max-w-6xl">
        <div className="max-w-3xl mb-6 lg:mb-10">
          <Eyebrow className="mb-6">השיטה</Eyebrow>
          <SplitReveal
            text="מהשאלה הראשונה ועד המפתח."
            highlight={["המפתח"]}
            className="text-display-md md:text-display-lg text-foreground mb-5"
          />
          <p className="text-body-lg text-muted-foreground leading-relaxed max-w-[60ch]">
            ככה בנוי הקורס הדיגיטלי — ארבעה שלבים, בסדר שבו באמת קונים דירה.
            לומדים לבד, בקצב שלכם, ויוצאים עם תוכנית.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-start">
          {/* Steps (inline-start column) + progress rail */}
          <div ref={listRef} className="relative lg:ps-10">
            <div className="hidden lg:block absolute top-0 bottom-0 start-0 w-px bg-border" aria-hidden>
              <motion.div
                className="absolute inset-0 bg-accent origin-top"
                style={{ scaleY: still ? 1 : fill }}
              />
            </div>
            {steps.map((step, i) => (
              <StepText
                key={step.num}
                step={step}
                active={active === i}
                onActive={() => setActive(i)}
              />
            ))}
          </div>

          {/* Pinned panel (desktop) */}
          <div className="hidden lg:block sticky top-32">
            <StepPanel step={steps[active]} still={still} />
            <Link
              to="/course#program"
              className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:text-accent underline-offset-4 hover:underline min-h-[44px]"
            >
              לסילבוס המלא — {CHAPTERS_LABEL}
              <ArrowLeft size={16} aria-hidden />
            </Link>
          </div>
        </div>

        <div className="lg:hidden mt-4">
          <Link
            to="/course#program"
            className="inline-flex items-center gap-2 font-bold text-primary hover:text-accent underline-offset-4 hover:underline min-h-[44px]"
          >
            לסילבוס המלא — {CHAPTERS_LABEL}
            <ArrowLeft size={16} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MethodSteps;
