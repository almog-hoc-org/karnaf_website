import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SEOHead, {
  courseSchema,
  organizationSchema,
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/SEOHead";
import { Head } from "vite-react-ssg";
import { BookOpen, Calculator, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VimeoEmbed from "@/components/course/VimeoEmbed";
import FitQuiz from "@/components/rich-media/FitQuiz";
import CurriculumAccordion from "@/components/rich-media/CurriculumAccordion";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { faqData } from "@/data/faq";
import { TOTAL_PARTS, TOTAL_CHAPTERS } from "@/data/courseStats";
import { COURSE_PRICE, CHECKOUT_URL } from "@/lib/constants";
import { buildCheckoutUrl } from "@/lib/checkout";
import PricingCard from "@/components/course/PricingCard";
import PriceContext from "@/components/course/PriceContext";
import MistakeCards from "@/components/course/MistakeCards";
import NotYourFault from "@/components/course/NotYourFault";
import ToolsShowcase from "@/components/course/ToolsShowcase";
import AssuranceBlock from "@/components/course/AssuranceBlock";
import FinalClose from "@/components/course/FinalClose";
import CoursePriceBar from "@/components/course/CoursePriceBar";
import { Reveal } from "@/components/v2/Reveal";
import { SectionDark } from "@/components/v2/Section";
import { TransactionLifecycle, type LifecycleStep } from "@/components/v2/TransactionLifecycle";
import { useSectionView } from "@/hooks/use-section-view";
import {
  gaFaqOpen,
  gaBeginCheckout,
  type CheckoutCtaLocation,
} from "@/lib/analytics";
import { trackInitiateCheckout } from "@/lib/pixel";
import heroCity from "@/assets/hero-city.jpg";
import heroCityAvif from "@/assets/hero-city.avif";
import foundersImg from "@/assets/team/itamar-almog-about.webp";

/*
 * Sales page — one emotional spine, 13 beats:
 * recognition → amplification (cost of the mistake) → empathy+authority
 * (founders' story) → future pacing → the vehicle (curriculum, tools) →
 * belief (proof) → self-selection (quiz) → price choreography → safety →
 * objections → the keys. Every section closes the loop the previous one
 * opened. "מספרים, לא תחושות" is the texture of every emotional beat.
 */

/** Vimeo id of the program explainer shown right under the hero. */
const COURSE_VIDEO_ID = "1213042212";

/* Advertised numbers — single source of truth in courseStats.ts */

/* S2 — authority stats: the guide's credentials, not the product's specs. */
const authorityStats = [
  { value: "375+", label: "עסקאות מלוות" },
  { value: "8+", label: "שנות מחקר שוק" },
  { value: "328", label: "לקוחות בקורסים השונים" },
  { value: "2017", label: "פועלים מאז" },
];

/* S5 — the same journey, replayed with the prepared version of you. */
const preparedSteps: LifecycleStep[] = [
  { num: "01", label: "תקציב", duration: "יודעים בדיוק כמה" },
  { num: "02", label: "חיפוש", duration: "קוראים שכונה ב-20 דקות" },
  { num: "03", label: "ביקור בנכס", duration: "צ׳קליסט ביד" },
  { num: "04", label: "ניתוח", duration: "כדאי או לא — במספרים" },
  { num: "05", label: "משא ומתן", duration: "עם נתונים, לא תחושות" },
  { num: "06", label: "חתימה", duration: "רגועים. מבינים כל סעיף" },
];

/* Program section — compact feature strip. */
const featureStrip = [
  { icon: BookOpen, text: "שיעורים קצרים וחדים של 3-10 דקות, צעד אחר צעד — מהתקציב ועד המפתח" },
  { icon: Calculator, text: "6+ מחשבונים וכלים שהופכים כל החלטה למספרים" },
  { icon: Sparkles, text: "קהילת תלמידים ובוגרים פעילה — לומדים לבד, לא בודדים" },
];

const courseTestimonials = testimonials.filter((t) => t.service === "course");
const premiumTestimonials = testimonials.filter((t) => t.service === "premium");

/**
 * Every in-page CTA goes straight to the hosted checkout (owner decision).
 * The href starts as the plain checkout URL so the button works before
 * React hydrates, then upgrades to the attribution-enriched URL. Each one
 * reports its own position so we can still see which section closes.
 */
const CheckoutCta = ({
  label,
  location,
}: {
  label: string;
  location: CheckoutCtaLocation;
}) => {
  const [href, setHref] = useState(CHECKOUT_URL);

  useEffect(() => {
    setHref(buildCheckoutUrl());
  }, []);

  return (
    <div className="text-center mt-8">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block w-full sm:w-auto"
        onClick={() => {
          trackInitiateCheckout(location);
          gaBeginCheckout(location);
        }}
      >
        <Button
          size="lg"
          className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-full gap-2 transition-all w-full sm:w-auto active:scale-[0.98]"
        >
          {label}
          <span
            aria-hidden
            className="inline-block transition-transform group-hover:-translate-x-1"
          >
            ←
          </span>
        </Button>
      </a>
    </div>
  );
};

const CoursePage = () => {
  // Hero CTA: plain URL for the pre-hydration render, enriched after.
  const [heroCheckoutHref, setHeroCheckoutHref] = useState(CHECKOUT_URL);
  useEffect(() => {
    setHeroCheckoutHref(buildCheckoutUrl());
  }, []);

  const mistakeRef = useSectionView<HTMLElement>("mistake");
  const notYourFaultRef = useSectionView<HTMLElement>("not_your_fault");
  const storyRef = useSectionView<HTMLElement>("story");
  const transformationRef = useSectionView<HTMLElement>("transformation");
  const curriculumRef = useSectionView<HTMLElement>("curriculum");
  const toolsRef = useSectionView<HTMLElement>("tools");
  const testimonialsRef = useSectionView<HTMLElement>("testimonials");
  const quizRef = useSectionView<HTMLElement>("quiz");
  const priceRef = useSectionView<HTMLElement>("price_context");
  const closeRef = useSectionView<HTMLElement>("final_close");

  return (
    <>
      <SEOHead
        title="המדריך המעשי לרכישת דירה — הקורס הדיגיטלי המקיף בישראל | קרנף נדל״ן"
        description="הקורס הדיגיטלי המקיף בישראל לרכישת דירה: 3 חלקים ו-15 פרקים שמכסים את כל הדרך, בשיעורים קצרים של 3-10 דקות, עם 6+ מחשבונים מתקדמים (משכנתא, מס רכישה, מס שבח, תשואה על הון). ₪950, גישה מיידית ל-12 חודשים — לגמרי בקצב שלכם."
        path="/course"
        keywords="קורס נדל״ן, קורס נדל״ן דיגיטלי, המדריך המעשי לרכישת דירה, הדרך לדירה, דירה ראשונה, מחשבון משכנתא, מס רכישה, השקעה בנדל״ן"
        jsonLd={[
          organizationSchema,
          courseSchema,
          serviceSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "המדריך המעשי לרכישת דירה", url: "/course" },
          ]),
          faqPageSchema(faqData.course),
        ]}
      />

      <Head>
        <link rel="preload" as="image" href={heroCityAvif} type="image/avif" />
      </Head>

      {/* S1 — Hero: name the moment they're living in, not the product */}
      <section
        className="relative min-h-[80svh] flex items-end overflow-hidden"
        style={{ backgroundColor: "hsl(217 50% 8%)" }}
      >
        <div className="absolute inset-0">
          <picture>
            <source srcSet={heroCityAvif} type="image/avif" />
            <img src={heroCity} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" {...{ fetchpriority: "high" }} />
          </picture>
        </div>
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, hsl(217 50% 8% / 0.65) 0%, hsl(217 50% 8% / 0.35) 35%, hsl(217 50% 8% / 0.92) 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(70% 80% at 70% 30%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
          }}
        />
        <div className="absolute inset-0 grain-texture pointer-events-none" />

        <div className="relative z-10 container mx-auto px-5 md:px-6 pt-32 pb-16 lg:pt-40 lg:pb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Reveal>
              <p
                className="text-eyebrow uppercase tracking-[0.32em] mb-6 flex items-center justify-center gap-3"
                style={{ color: "hsl(36 33% 95% / 0.7)" }}
              >
                <span className="block w-10 h-px bg-accent" aria-hidden />
                המדריך המעשי לרכישת דירה · הקורס המקיף של קרנף נדל״ן
                <span className="block w-10 h-px bg-accent" aria-hidden />
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              {/* One approved headline — each line nowrap so the split stays
                  exactly two lines; the narrow-viewport size guard keeps the
                  longer first line on one row. */}
              <h1 className="text-display-lg max-[380px]:text-[2rem] md:text-display-xl font-black text-white mb-6 leading-[0.98] tracking-tight">
                <span className="whitespace-nowrap">לעסקה הגדולה בחיים</span>
                <br />
                <span className="text-accent whitespace-nowrap">מגיעים מוכנים</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="text-body-lg lg:text-xl leading-relaxed max-w-2xl mx-auto mb-8"
                style={{ color: "hsl(36 33% 95% / 0.82)" }}
              >
                רוב הישראלים נכנסים לעסקה הגדולה בחייהם בלי הכנה, ומגלים את המחיר
                של זה שנים אחר כך. ״המדריך המעשי לרכישת דירה״ מכניס אתכם לחדר עם
                הידע, הכלים והביטחון של הצד שהגיע מוכן.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
                3 חלקים · 15 פרקים · 6+ כלים · גישה מיידית
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <div>
                <a
                  href={heroCheckoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block w-full sm:w-auto"
                  onClick={() => {
                    trackInitiateCheckout("hero");
                    gaBeginCheckout("hero");
                  }}
                >
                  <Button
                    size="lg"
                    className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full transition-all w-full sm:w-auto active:scale-[0.98]"
                  >
                    קחו אותי לתוכנית
                    <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                  </Button>
                </a>
                <p className="text-sm mt-3" style={{ color: "hsl(36 33% 95% / 0.6)" }}>
                  {COURSE_PRICE.toLocaleString("he-IL")}&nbsp;₪ · גישה מלאה ל-12 חודשים
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* S1.5 — the explainer video, in the classic VSL position right
          under the hero. Click-to-play facade: nothing loads from Vimeo
          until the visitor asks for it. */}
      <SectionDark size="sm" glow="none">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-3">
              רגע לפני שממשיכים — צפו בזה
            </h2>
            <p
              className="text-center mb-8 leading-relaxed"
              style={{ color: "hsl(36 33% 95% / 0.7)" }}
            >
              שתי דקות על התוכנית: מה יש בפנים, איך היא בנויה ולמי היא מתאימה.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <VimeoEmbed videoId={COURSE_VIDEO_ID} title="המדריך המעשי לרכישת דירה — הסבר על התוכנית" />
          </Reveal>
        </div>
      </SectionDark>

      {/* Program — what's inside: structure + open syllabus, right under
          the video (id="program" is the hero CTA's anchor target). */}
      <SectionDark id="program" size="md" glow="top-end">
        <div ref={curriculumRef} className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-5 leading-[0.98] tracking-tight text-center">
              <span className="whitespace-nowrap">{TOTAL_PARTS} חלקים.</span>{" "}
              <span className="whitespace-nowrap">{TOTAL_CHAPTERS} פרקים.</span>
              <br />
              כל הדרך — בלי לדלג על שלב.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-body-lg mb-10 leading-relaxed text-center max-w-2xl mx-auto"
              style={{ color: "hsl(36 33% 95% / 0.72)" }}
            >
              כל שלב בדרך מכוסה לעומק — מהתקציב, דרך החיפוש, הבדיקות והמשא
              ומתן, ועד המפתח — בשיעורים קצרים וחדים של 3 עד 10 דקות.
              מתקדמים צעד־צעד, בלי עומס, ותמיד יודעים מה הצעד הבא.
            </p>
          </Reveal>

          {/* Compact feature strip */}
          <Reveal delay={0.12}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-10">
              {featureStrip.map((f) => (
                <div
                  key={f.text}
                  className="flex flex-col items-center text-center gap-3 rounded-xl px-4 py-4 border text-sm leading-snug"
                  style={{
                    backgroundColor: "hsl(36 33% 95% / 0.04)",
                    borderColor: "hsl(36 33% 95% / 0.12)",
                    color: "hsl(36 33% 95% / 0.85)",
                  }}
                >
                  <f.icon size={18} className="text-accent shrink-0" />
                  <span>{f.text}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="max-w-3xl mx-auto">
            <Reveal delay={0.16}>
              <p
                className="text-center text-sm mb-8"
                style={{ color: "hsl(36 33% 95% / 0.6)" }}
              >
                בפנים, בין השאר: ״מאסטר קלאס משא ומתן״, ״עשרת הדיברות
                בעסקת נדל״ן״ ו״יסודות המשכנתא: כך תנצחו את הבנק״.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <CurriculumAccordion />
            </Reveal>
          </div>
          <CheckoutCta label="פותחים גישה לכל השיעורים" location="curriculum" />
        </div>
      </SectionDark>

      {/* S7 — the tools. Follows another dark section, so it uses the
          small rhythm: two stacked dark sections must not leave a dead gap. */}
      <SectionDark size="sm" glow="none">
        <div ref={toolsRef} className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-5 leading-[0.98] tracking-tight text-center max-w-3xl mx-auto">
              כל החלטה בעסקה —
              <br />
              <span className="text-accent">הופכת למספר.</span>
            </h2>
          </Reveal>
          <div className="mt-10">
            <ToolsShowcase />
          </div>
        </div>
      </SectionDark>

      {/* S3 — the price of the mistake (the emotional engine) */}
      <section ref={mistakeRef} className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-5 leading-[0.98] tracking-tight text-center max-w-3xl mx-auto">
              טעות בדירה לא מרגישים ביום&nbsp;החתימה.
              <br />
              <span className="text-accent">מרגישים אותה עשר שנים.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed text-center max-w-2xl mx-auto">
              אף אחד לא מתכנן לשלם 100,000&nbsp;₪ מיותרים. זה פשוט קורה — למי שלא
              ידע מה לבדוק.
            </p>
          </Reveal>
          <MistakeCards />
        </div>
      </section>

      {/* S3.5 — relief: nobody taught you this; buying right is a
          learnable skill. The bridge from fear to agency. */}
      <section
        ref={notYourFaultRef}
        className="py-section-sm bg-card border-y border-border"
      >
        <div className="container mx-auto px-6 max-w-3xl">
          <NotYourFault />
        </div>
      </section>

      {/* S4 — the founders' story: empathy that earns authority */}
      <SectionDark size="md" glow="bottom">
        <div ref={storyRef} className="container mx-auto px-6 max-w-3xl text-center">
          <Reveal>
            <p
              className="text-eyebrow uppercase tracking-[0.32em] mb-4"
              style={{ color: "hsl(36 33% 95% / 0.6)" }}
            >
              למה קרנף בכלל קיים
            </p>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-6 leading-[0.98] tracking-tight">
              את הניסיון הזה צברנו בשטח — עסקה אחרי&nbsp;עסקה.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="text-body-lg leading-relaxed mb-6 max-w-2xl mx-auto"
              style={{ color: "hsl(36 33% 95% / 0.78)" }}
            >
              אנחנו בתוך שוק הנדל״ן מאז 2017 — מהעסקה הראשונה שעשינו בעצמנו
              ועד 375+ העסקאות שליווינו. אחרי מאות עסקאות לומדים לזהות מהר
              מחיר מנופח, תמהיל שגוי וסעיף בעייתי בחוזה — ולדעת בדיוק מה
              בודקים לפני שחותמים. את כל הניסיון הזה ארזנו לשיטה אחת
              שמבוססת על נתונים, לא על תחושות בטן — והיא כולה בתוך
              ״המדריך המעשי לרכישת דירה״.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="text-lg font-bold text-accent mb-10 max-w-2xl mx-auto">
              ולמה דווקא קרנף? עור עבה, רגליים יציבות על הקרקע, וקרן
              אחת שמכוונת רק קדימה. מאיים למי שמולו — הגנה למי שלצידו.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <figure className="max-w-sm mx-auto">
              <img
                src={foundersImg}
                alt="איתמר נחליאל ואלמוג חכמה, מייסדי קרנף נדל״ן"
                width={1080}
                height={1350}
                className="rounded-2xl w-full h-auto shadow-depth-3"
                loading="lazy"
                decoding="async"
              />
              <figcaption
                className="text-center text-sm mt-3"
                style={{ color: "hsl(36 33% 95% / 0.6)" }}
              >
                איתמר נחליאל ואלמוג חכמה, מייסדי קרנף נדל״ן
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </SectionDark>

      {/* S5 — future pacing: the same deal, with the prepared you */}
      <section ref={transformationRef} className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-5 leading-[0.98] tracking-tight text-center max-w-3xl mx-auto">
              עכשיו דמיינו את אותו&nbsp;תהליך&nbsp;—
              <br />
              <span className="text-accent">כשאתם הצד המוכן.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed text-center max-w-2xl mx-auto">
              אותה דירה, אותו מוכר, אותו בנקאי — רק שהפעם אתם מגיעים עם נתונים ביד.
            </p>
          </Reveal>
          {/* Dark card wrapper — the lifecycle component is styled for dark surfaces */}
          <Reveal delay={0.14}>
            <div
              className="rounded-3xl px-6 py-10 md:px-10 md:py-12"
              style={{ backgroundColor: "hsl(217 50% 8%)" }}
            >
              <TransactionLifecycle steps={preparedSteps} />
            </div>
          </Reveal>
          <CheckoutCta label="אני רוצה להגיע ככה לעסקה" location="transformation" />
        </div>
      </section>

      {/* Authority strip — the proof numbers, placed right before the
          human proof (testimonials) per the owner's direction. */}
      <section className="py-section-sm bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {authorityStats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.06}>
                <div className="text-center">
                  <p className="text-display-md font-black text-foreground tabular-nums leading-none mb-2">
                    {stat.value}
                  </p>
                  <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="text-center text-sm font-bold text-muted-foreground mt-8 tracking-wide">
            מספרים, לא תחושות.
          </p>
        </div>
      </section>

      {/* S8 — proof */}
      <section ref={testimonialsRef} className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-4 leading-[0.98] tracking-tight text-center">
              הם היו בדיוק במקום שלכם.
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed text-center max-w-xl mx-auto">
              בוגרי התוכנית, במילים שלהם.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courseTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>

          {/* Honesty guard — accompaniment outcomes are labeled as such and
              never presented as results of the self-serve course. */}
          <Reveal delay={0.12}>
            <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground text-center mt-10 mb-6">
              ומהלקוחות שליווינו יד ביד בליווי האישי:
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumTestimonials.map((t, i) => (
              <TestimonialVideoCard key={t.name} testimonial={t} index={i} />
            ))}
          </div>
          <CheckoutCta label="מצטרפים לבוגרים" location="testimonials" />
        </div>
      </section>

      {/* S9 — self-selection: quiz + who it's NOT for */}
      <section ref={quizRef} className="py-section-md bg-card border-y border-border">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-4 leading-[0.98] tracking-tight text-center">
              התוכנית מתאימה לכם עכשיו?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed text-center max-w-2xl mx-auto">
              ארבע שאלות, חצי דקה. בסוף תקבלו תשובה כנה — גם אם היא ״עוד מוקדם לכם״.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div data-quiz-root>
              <FitQuiz />
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="max-w-2xl mx-auto mt-10 rounded-2xl border border-dashed border-border bg-background p-6 text-center">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-bold text-foreground">למי זה לא מתאים:</span>{" "}
                אם אתם לא מתכננים לקנות בשנתיים הקרובות — תעקבו אחרינו בינתיים,
                זה מספיק. ואם אתם מעדיפים שמישהו יעשה את הדרך בשבילכם —{" "}
                <Link
                  to="/premium"
                  className="font-bold text-primary underline-offset-4 hover:underline inline-flex items-center gap-1"
                >
                  בשביל זה בדיוק יש את ליווי הפרימיום שלנו
                  <ArrowLeft size={12} />
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* S10 — the price: choreographed reveal */}
      <section id="pricing" ref={priceRef} className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <PriceContext />
          <Reveal delay={0.1}>
            <PricingCard />
          </Reveal>
        </div>
      </section>

      {/* S11 — safety strip */}
      <section className="py-section-md bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <AssuranceBlock />
        </div>
      </section>

      {/* S12 — FAQ */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-10 leading-[0.98] tracking-tight text-center">
              שאלות נפוצות
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion
              type="single"
              collapsible
              className="space-y-3"
              onValueChange={(value) => {
                if (!value) return;
                const idx = Number(value.replace("faq-", ""));
                const item = faqData.course[idx];
                if (item) gaFaqOpen(item.question);
              }}
            >
              {faqData.course.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline hover:text-accent">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* S13 — the keys */}
      <div ref={closeRef}>
        <FinalClose />
      </div>
      <CoursePriceBar />
    </>
  );
};

export default CoursePage;
