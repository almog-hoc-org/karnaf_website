import { Head } from "vite-react-ssg";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Check, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroCity from "@/assets/hero-city.jpg";
import heroCityAvif from "@/assets/hero-city.avif";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import { SplitReveal } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";
import { courseParts } from "@/data/curriculum";
import { TOTAL_CHAPTERS, CHAPTERS_LABEL, LESSON_MINUTES } from "@/data/courseStats";
import { COURSE_PRICE, COURSE_ACCESS_LABEL } from "@/lib/constants";
import {
  ACTIVE_SINCE,
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

/* The chapter the preview window "plays" — a real module from the syllabus. */
const FEATURED_PART = courseParts[1];
const FEATURED_MODULE = FEATURED_PART.modules[0];

/**
 * A window into the course, built from the real syllabus (curriculum.ts) —
 * never a dashboard with invented metrics (PRODUCT.md anti-reference).
 * It starts leaning back in 3D and settles flat as the visitor scrolls: the
 * page's first scroll gesture is rewarded with "the product opens up".
 */
const CourseWindow = () => (
  <div
    role="img"
    aria-label={`תצוגה מקדימה של הקורס הדיגיטלי — ${courseParts.length} חלקים, ${CHAPTERS_LABEL}`}
    className="relative rounded-[1.75rem] p-2 md:p-3 bg-[hsl(36_33%_95%/0.06)] border border-white/10 shadow-[0_40px_120px_-20px_hsl(217_50%_3%/0.9)]"
  >
    <div className="rounded-[1.25rem] overflow-hidden bg-[hsl(217_45%_11%)] border border-white/10">
      {/* Window chrome */}
      <div className="flex items-center justify-between gap-4 px-4 md:px-5 h-11 border-b border-white/10">
        <div className="flex items-center gap-1.5" dir="ltr" aria-hidden>
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/15" />
          <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
        </div>
        <span className="text-xs md:text-sm font-bold text-white/80 truncate">
          המדריך המעשי לרכישת דירה
        </span>
        <span className="hidden sm:inline-flex text-[11px] font-bold text-accent border border-accent/40 rounded-full px-2.5 py-0.5 tabular-nums">
          {CHAPTERS_LABEL}
        </span>
      </div>

      <div className="grid md:grid-cols-[17rem_1fr] lg:grid-cols-[19rem_1fr]">
        {/* Syllabus sidebar (inline-start = right in RTL) */}
        <div className="hidden md:block border-e border-white/10 p-4 lg:p-5 space-y-4 text-right">
          {courseParts.map((part) => {
            const open = part.id === FEATURED_PART.id;
            return (
              <div key={part.id}>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`text-sm font-bold ${open ? "text-white" : "text-white/60"}`}>
                    <span className="text-accent tabular-nums me-1.5">0{part.id}</span>
                    {part.title}
                  </span>
                  <span className="text-[11px] text-white/40 tabular-nums">{part.modules.length} פרקים</span>
                </div>
                {open && (
                  <ul className="space-y-1">
                    {part.modules.slice(0, 5).map((m) => {
                      const active = m === FEATURED_MODULE;
                      return (
                        <li
                          key={m}
                          className={`flex items-start gap-2 rounded-lg px-2.5 py-1.5 text-[13px] leading-snug ${
                            active ? "bg-accent/15 text-white" : "text-white/55"
                          }`}
                        >
                          {active ? (
                            <PlayCircle size={14} className="text-accent mt-0.5 shrink-0" aria-hidden />
                          ) : (
                            <Check size={14} className="text-white/30 mt-0.5 shrink-0" aria-hidden />
                          )}
                          <span className="line-clamp-1">{m}</span>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* "Now playing" pane */}
        <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[26rem] overflow-hidden">
          <picture>
            <source srcSet={heroCityAvif} type="image/avif" />
            <img
              src={heroCity}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
              decoding="async"
              {...{ fetchpriority: "high" }}
            />
          </picture>
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, hsl(217 50% 8% / 0.15) 0%, hsl(217 50% 8% / 0.35) 45%, hsl(217 50% 8% / 0.92) 100%)",
            }}
          />
          <div className="absolute inset-x-0 bottom-0 p-5 md:p-8 text-right">
            <span className="inline-flex items-center gap-2 text-[11px] md:text-xs font-bold text-accent bg-[hsl(217_50%_8%/0.6)] border border-accent/30 rounded-full px-3 py-1 mb-3">
              חלק 0{FEATURED_PART.id} · {FEATURED_PART.title}
            </span>
            <p className="text-lg md:text-3xl font-black text-white leading-tight tracking-[-0.02em] max-w-[22ch]">
              {FEATURED_MODULE}
            </p>
            <p className="mt-2 text-xs md:text-sm text-white/70">
              שיעורים של {LESSON_MINUTES.replace("-", "–")} דקות · צפייה בקצב שלכם · גישה ל-{COURSE_ACCESS_LABEL}
            </p>
            {/* Player rail — decoration, deliberately without numbers */}
            <div className="mt-4 md:mt-6 h-1 rounded-full bg-white/15 overflow-hidden" aria-hidden>
              <div className="h-full w-2/5 bg-accent rounded-full ms-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Hero = () => {
  const still = useStillMotion();
  const { scrollY } = useScroll();
  const rotateX = useTransform(scrollY, [0, 520], [24, 0]);
  const scale = useTransform(scrollY, [0, 520], [0.9, 1]);
  const windowY = useTransform(scrollY, [0, 520], [0, -24]);
  const glow = useTransform(scrollY, [0, 420], [0.35, 0.8]);
  const mascotY = useTransform(scrollY, [0, 700], [60, -30]);
  const copyFade = useTransform(scrollY, [120, 520], [1, 0.25]);

  return (
    <section className="relative overflow-hidden bg-[hsl(var(--ink))] pt-28 md:pt-36 pb-10 md:pb-16">
      {/* Preload the image the window shows above the fold */}
      <Head>
        <link rel="preload" as="image" href={heroCityAvif} type="image/avif" />
      </Head>

      {/* Backdrop: drafting grid + warm light from above + grain */}
      <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 h-[70%] pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(55% 60% at 50% 0%, hsl(24 80% 52% / 0.22) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" aria-hidden />

      <div className="relative container mx-auto px-5 md:px-6">
        {/* Copy */}
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ opacity: still ? 1 : copyFade }}
        >
          <div
            className="rise-in inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.04] px-4 py-1.5 mb-7 text-sm text-white/75"
            style={{ ["--d" as string]: "0s" }}
          >
            <span className="relative flex w-2 h-2" aria-hidden>
              <span className="absolute inset-0 rounded-full bg-accent live-ping" />
              <span className="relative w-2 h-2 rounded-full bg-accent" />
            </span>
            נדל״ן לפי מספרים · מאז {ACTIVE_SINCE}
          </div>

          <SplitReveal
            as="h1"
            trigger="load"
            delay={0.08}
            stagger={0.07}
            text="לקנות דירה בלי לשלם יותר מדי."
            highlight={["בלי", "לשלם", "יותר", "מדי"]}
            className="text-display-lg md:text-display-xl text-white mb-6"
          />

          <p
            className="rise-in text-display-sm md:text-[2rem] font-bold leading-snug text-[hsl(36_33%_95%/0.92)] mb-4"
            style={{ ["--d" as string]: "0.45s" }}
          >
            ב-2026 כוח המיקוח עבר לקונים — אבל רק למי שיודע לבדוק מחיר.
          </p>
          <p
            className="rise-in text-body-lg leading-relaxed max-w-[56ch] mx-auto mb-9 text-[hsl(36_33%_95%/0.72)]"
            style={{ ["--d" as string]: "0.55s" }}
          >
            מחיר במודעה, מבצע 20/80 של קבלן, הצעה של הבנק — כל אחד מהם יכול לעלות
            לכם עשרות אלפי שקלים. המדריך המעשי לרכישת דירה מלמד אתכם לבדוק כל
            מספר בעצמכם, שלב אחר שלב, מהתקציב ועד החתימה.
          </p>

          <div
            className="rise-in flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7"
            style={{ ["--d" as string]: "0.65s" }}
          >
            {/* One primary door; the second track is one quiet link away. */}
            <Link to="/course" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full w-full sm:w-auto shadow-glow-accent"
              >
                לתוכנית הדיגיטלית — ₪{COURSE_PRICE.toLocaleString("he-IL")}
                <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
                  ←
                </span>
              </Button>
            </Link>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 text-white/85 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
            >
              מחפשים ליווי אישי 1:1 למשקיעים?
              <span aria-hidden>←</span>
            </Link>
          </div>

          {/* Proof as a quiet line, not a big-number template */}
          <p
            className="rise-in mt-8 text-sm text-white/55 flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            style={{ ["--d" as string]: "0.75s" }}
          >
            <span>
              <strong className="text-white/85 tabular-nums">{TOTAL_CLIENTS_STAT}</strong> {TOTAL_CLIENTS_LABEL}
            </span>
            <span aria-hidden className="text-accent">·</span>
            <span>
              <strong className="text-white/85 tabular-nums">{TOTAL_CHAPTERS}</strong> פרקים בקורס
            </span>
            <span aria-hidden className="text-accent">·</span>
            <span>
              <strong className="text-white/85 tabular-nums">{YEARS_EXPERIENCE_STAT}</strong> {YEARS_EXPERIENCE_LABEL}
            </span>
          </p>
        </motion.div>

        {/* The window — tilts flat on scroll */}
        <div
          className="rise-in relative mt-14 md:mt-20 max-w-6xl mx-auto"
          style={{ perspective: "1400px", ["--d" as string]: "0.5s" }}
        >
          {/* Amber pool of light the window rises out of */}
          <motion.div
            aria-hidden
            className="absolute -inset-x-10 top-1/4 bottom-0 pointer-events-none blur-3xl"
            style={{
              background: "radial-gradient(50% 50% at 50% 50%, hsl(24 80% 52% / 0.35), transparent 70%)",
              opacity: still ? 0.6 : glow,
            }}
          />
          <motion.div
            className="relative will-change-transform"
            style={
              still
                ? { rotateX: 0, scale: 1, y: 0 }
                : { rotateX, scale, y: windowY, transformOrigin: "50% 0%" }
            }
          >
            <Link to="/course#program" aria-label="לסילבוס המלא של הקורס" className="block">
              <CourseWindow />
            </Link>
          </motion.div>

          {/* Mascot peeks from the window's edge (desktop) */}
          <motion.img
            src={mascotWelcome}
            alt=""
            aria-hidden
            width={362}
            height={500}
            loading="lazy"
            decoding="async"
            className="hidden lg:block absolute -left-24 xl:-left-32 bottom-6 h-[300px] xl:h-[340px] w-auto pointer-events-none drop-shadow-[0_30px_60px_rgba(0,0,0,0.55)]"
            style={{ y: still ? 0 : mascotY }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
