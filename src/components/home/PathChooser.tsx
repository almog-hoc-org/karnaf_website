import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import { GraduationCap, Users, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal, useScrubbed } from "@/components/v2/scroll";
import { useStillMotion } from "@/hooks/use-still-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { CHAPTERS_LABEL } from "@/data/courseStats";
import { COURSE_PRICE, COURSE_ACCESS_MONTHS, COURSE_ACCESS_LABEL, COURSE_INSTALLMENTS_LABEL } from "@/lib/constants";
import WebinarCapture from "@/components/WebinarCapture";

/**
 * The homepage's decision point — two doors, zero ambiguity.
 * Door A: the self-serve digital course (buy now, learn alone).
 * Door B: premium 1:1 investor guidance (free intro call, guided to a keys-in-hand deal).
 * Below: the free door — the webinar — for whoever is not ready for either.
 * (The research-subscription waitlist moved to /about.)
 */

const courseBullets = [
  `${CHAPTERS_LABEL} מקיפים — גישה מיידית לכולם`,
  "מסמכים, תבניות ובוחני ידע בכל פרק",
  `${COURSE_ACCESS_MONTHS} חודשי גישה — לגמרי בקצב שלכם`,
];

const premiumBullets = [
  "אנליסט אישי צמוד — אחד על אחד",
  "מהאסטרטגיה ועד חתימת החוזה",
  "שיחת היכרות ראשונית — חינם",
];

export const PathChooser = () => {
  const still = useStillMotion();
  const mobile = useIsMobile();
  const doorsRef = useRef<HTMLDivElement>(null);
  // The two doors slide in from opposite sides and meet as the pair
  // scrolls up to reading height — the choice assembles in front of you.
  // Stacked on phones, so there they simply rise instead.
  const { scrollYProgress } = useScroll({ target: doorsRef, offset: ["start end", "start 0.45"] });
  const reach = mobile ? 0 : 70;
  const xA = useScrubbed(scrollYProgress, [0, 1], [reach, 0]);
  const xB = useScrubbed(scrollYProgress, [0, 1], [-reach, 0]);
  const rA = useScrubbed(scrollYProgress, [0, 1], [mobile ? 0 : 2.5, 0]);
  const rB = useScrubbed(scrollYProgress, [0, 1], [mobile ? 0 : -2.5, 0]);
  const rise = useScrubbed(scrollYProgress, [0, 1], [mobile ? 40 : 0, 0]);
  const fade = useScrubbed(scrollYProgress, [0, 0.6], [0.25, 1]);
  // Explicit rest values (not `undefined`): stillness is known only after
  // mount, and dropping the style would leave the last inline values behind.
  const settled = { x: 0, y: 0, rotate: 0, opacity: 1 };

  return (
    <section className="py-section-lg bg-background overflow-x-clip" id="paths">
      <div className="container mx-auto px-5 md:px-6 max-w-6xl">
        <Reveal>
          <div className="text-center mb-12 lg:mb-16">
            <p className="text-eyebrow uppercase tracking-[0.28em] text-muted-foreground mb-4">
              שני מסלולים · מטרה אחת
            </p>
            <SplitReveal
              text="איך תרצו להגיע לדירה?"
              className="text-display-md md:text-display-lg text-foreground mb-4"
            />
            <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              לומדים לבד עם הקורס הדיגיטלי המקיף בישראל — או הולכים יחד, יד ביד,
              עם אנליסט אישי עד המפתח. בלי בלבול: זה כל מה שקרנף מציעה.
            </p>
          </div>
        </Reveal>

        <div ref={doorsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          {/* Door A — the self-serve digital course */}
          <motion.div style={still ? settled : { x: xA, y: rise, rotate: rA, opacity: fade }}>
            <article
              className="relative h-full rounded-3xl p-8 lg:p-10 flex flex-col overflow-hidden shadow-depth-3 transition-transform duration-300 hover:-translate-y-1"
              style={{ backgroundColor: "hsl(217 50% 8%)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(80% 60% at 85% 0%, hsl(24 80% 52% / 0.22) 0%, transparent 70%)",
                }}
              />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.18em] text-accent font-bold">
                    <GraduationCap size={16} />
                    עצמאי · דיגיטלי
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3 tracking-[-0.02em]">
                  המדריך המעשי לרכישת דירה — הקורס הדיגיטלי
                </h3>
                <p
                  className="text-base leading-relaxed mb-6"
                  style={{ color: "hsl(36 33% 95% / 0.75)" }}
                >
                  הקורס המקיף בישראל לרכישת דירה חכמה. לומדים לבד, בקצב שלכם —
                  עם כל הכלים לקבל החלטה מבוססת נתונים.
                </p>
                <ul className="space-y-3 mb-8">
                  {courseBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "hsl(36 33% 95% / 0.88)" }}
                    >
                      <Check size={16} className="text-accent mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {/* The price, up front — a cold visitor should not have to
                    click through to learn it costs less than a lawyer's hour. */}
                <div className="flex items-baseline gap-3 mb-6 mt-auto" dir="rtl">
                  <span className="text-display-sm text-white leading-none tabular-nums">
                    ₪{COURSE_PRICE.toLocaleString("he-IL")}
                  </span>
                  <span className="text-sm" style={{ color: "hsl(36 33% 95% / 0.65)" }}>
                    {COURSE_INSTALLMENTS_LABEL} · גישה מיידית ל-{COURSE_ACCESS_LABEL}
                  </span>
                </div>
                <Link to="/course" className="block">
                  <Button
                    size="lg"
                    className="group w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-full gap-2 transition-all"
                  >
                    לפרטים ולרכישה
                    <span
                      aria-hidden
                      className="inline-block transition-transform group-hover:-translate-x-1"
                    >
                      ←
                    </span>
                  </Button>
                </Link>
              </div>
            </article>
          </motion.div>

          {/* Door B — premium 1:1 investor guidance */}
          <motion.div style={still ? settled : { x: xB, y: rise, rotate: rB, opacity: fade }}>
            <article className="relative h-full rounded-3xl p-8 lg:p-10 flex flex-col overflow-hidden bg-card border border-border shadow-depth-2 transition-transform duration-300 hover:-translate-y-1">
              <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
              <div className="relative flex flex-col h-full">
                <div className="flex items-center justify-between mb-6">
                  <span className="inline-flex items-center gap-2 text-eyebrow uppercase tracking-[0.18em] text-primary font-bold">
                    <Users size={16} />
                    אישי · 1:1
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3 tracking-[-0.02em]">
                  ליווי משקיעים פרימיום
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  אנליסט אישי שעובר איתכם את כל הדרך — אסטרטגיה, איתור עסקאות,
                  בדיקות ומשא ומתן — עד שאתם חותמים על נכס משלכם.
                </p>
                <ul className="space-y-3 mb-8">
                  {premiumBullets.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-foreground"
                    >
                      <Check size={16} className="text-primary mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-baseline gap-3 mb-6 mt-auto" dir="rtl">
                  <span className="text-display-sm text-foreground leading-none">
                    בסוף התהליך — דירה.
                  </span>
                </div>
                <Link to="/premium" className="block">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group w-full border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-bold text-base px-8 py-6 rounded-full gap-2 transition-all"
                  >
                    לתיאום שיחת היכרות — חינם
                    <ArrowLeft
                      size={16}
                      className="transition-transform group-hover:-translate-x-1"
                    />
                  </Button>
                </Link>
              </div>
            </article>
          </motion.div>
        </div>

        {/* The free door — for whoever is not ready for either track yet */}
        <Reveal delay={0.18}>
          <div className="mt-8 lg:mt-10">
            <WebinarCapture source="home-paths" />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
