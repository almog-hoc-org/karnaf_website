import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import {
  GraduationCap,
  CheckCircle,
  XCircle,
  Star,
  Users,
  BookOpen,
  Calculator,
  Headphones,
  Check,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import FitQuiz from "@/components/rich-media/FitQuiz";
import CurriculumAccordion from "@/components/rich-media/CurriculumAccordion";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { faqData } from "@/data/faq";
import { curriculum } from "@/data/curriculum";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import BigCTA from "@/components/BigCTA";
import { Reveal } from "@/components/v2/Reveal";
import { SectionDark } from "@/components/v2/Section";
import { MortgageCalculator } from "@/components/v2/MortgageCalculator";
import { StampDutyCalculator } from "@/components/v2/StampDutyCalculator";
import { CapitalGainsCalculator } from "@/components/v2/CapitalGainsCalculator";
import { RoiCalculator } from "@/components/v2/RoiCalculator";
import { AreaCompare } from "@/components/v2/AreaCompare";
import { TransactionLifecycle } from "@/components/v2/TransactionLifecycle";
import heroCity from "@/assets/hero-city.jpg";

const courseTestimonials = testimonials;

const highlights = [
  { icon: BookOpen, value: "50+", label: "שיעורים" },
  { icon: Users, value: "300+", label: "בוגרים" },
  { icon: Calculator, value: "6+", label: "כלים מתקדמים" },
];

const problems = [
  "משלמים עשרות אלפי שקלים מעל למחיר השוק",
  "חותמים על חוזה בלי להבין מה כתוב",
  "לוקחים משכנתא שלא מתאימה להם",
  "מפספסים הזדמנויות כי לא יודעים לזהות אותן",
];

const solutions = [
  "מבינים כל שלב בתהליך לפני שמתחילים",
  "יודעים לנתח עסקה ולזהות הזדמנות אמיתית",
  "נכנסים למשא ומתן עם כלים וביטחון",
  "מגובים בליווי צמוד של אנליסט נדל״ן",
];

const programCards = [
  {
    num: "01",
    icon: BookOpen,
    title: "עיקרי התוכנית",
    description:
      "שיעורים דיגיטליים מובנים צעד אחר צעד — מיסודות השוק ועד חתימת חוזה. לומדים בקצב שלכם עם תוכן בלעדי ומדויק.",
    features: [
      "תיאוריה מקצועית ויסודות נדל״ן",
      "התחדשות עירונית ואסטרטגיות השקעה",
      "משא ומתן וטכניקות מתקדמות",
      "דוגמאות לעסקאות אמיתיות",
    ],
  },
  {
    num: "02",
    icon: Calculator,
    title: "מחשבונים וכלים",
    description:
      "פורטל כלים מתקדם שיעזור לכם לנתח כל עסקה בצורה מדויקת ומבוססת נתונים.",
    features: [
      "מחשבון עסקת נדל״ן ומיסוי",
      "מחשבון משכנתא וכדאיות",
      "צ׳קליסט ביקור בנכס",
      "אנליסט AI למענה על שאלות",
    ],
    badge: "הלב של התוכנית",
  },
  {
    num: "03",
    icon: Headphones,
    title: "ליווי מקצועי",
    description:
      "ליווי צמוד בוואטסאפ של אנליסט נדל״ן שעונה על שאלות, מכוון ועוזר לכם בכל שלב בדרך.",
    features: [
      "ליווי צמוד של אנליסט בוואטסאפ",
      "מענה לשאלות בזמן אמת",
      "גישה לקהילת תלמידים",
      "הרחבות מקצועיות ועדכונים",
    ],
  },
];

const VIDEO_URL = "";
const isPlaceholderVideo = !VIDEO_URL || VIDEO_URL.includes("dQw4w9WgXcQ");

const totalModules = curriculum.length;
const totalLessons = curriculum.reduce(
  (sum, mod) => sum + mod.lessons.length,
  0
);

const scrollToPricing = () =>
  document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" });

type CalcTab = "mortgage" | "stamp" | "shevach" | "roi" | "areas";

const CALC_TABS: { key: CalcTab; label: string }[] = [
  { key: "mortgage", label: "משכנתא" },
  { key: "stamp",    label: "מס רכישה" },
  { key: "shevach",  label: "מס שבח" },
  { key: "roi",      label: "תשואה" },
  { key: "areas",    label: "השוואת אזורים" },
];

const CalcTabs = () => {
  const [tab, setTab] = useState<CalcTab>("mortgage");
  return (
    <div className="space-y-6">
      <div
        role="tablist"
        aria-label="בחר מחשבון"
        className="inline-flex flex-wrap items-center gap-1 p-1 rounded-full"
        style={{
          backgroundColor: "hsl(36 33% 95% / 0.06)",
          border: "1px solid hsl(36 33% 95% / 0.10)",
        }}
      >
        {CALC_TABS.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.key)}
              className="px-5 py-2.5 text-sm font-bold rounded-full transition-colors"
              style={{
                backgroundColor: active ? "hsl(var(--accent))" : "transparent",
                color: active
                  ? "hsl(var(--accent-foreground))"
                  : "hsl(36 33% 95% / 0.7)",
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
      {tab === "mortgage" && (
        <MortgageCalculator description="זה מסך אחד מתוך פורטל הכלים בתוכנית — מס רכישה, מס שבח, ROI שנתי, השוואת אזורים ועוד." />
      )}
      {tab === "stamp" && <StampDutyCalculator />}
      {tab === "shevach" && <CapitalGainsCalculator />}
      {tab === "roi" && <RoiCalculator />}
      {tab === "areas" && <AreaCompare />}
    </div>
  );
};

const CoursePage = () => {
  return (
    <>
      <Helmet>
        <title>הדרך לדירה — קורס נדל"ן דיגיטלי | קרנף נדל"ן</title>
        <meta
          name="description"
          content="קורס נדל&quot;ן דיגיטלי מקיף לרוכשי דירות ראשונות ומשקיעים — 50+ שיעורים, מחשבונים, כלים וליווי צמוד של אנליסט נדל&quot;ן."
        />
        <link rel="canonical" href="https://www.karnafnadlan.com/course" />
      </Helmet>

      {/* 1. Cinematic Hero */}
      <section
        className="relative min-h-[70svh] flex items-end overflow-hidden"
        style={{ backgroundColor: "hsl(217 50% 8%)" }}
      >
        <div className="absolute inset-0">
          <img src={heroCity} alt="" className="w-full h-full object-cover" loading="eager" decoding="async" fetchPriority="high" />
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

        <div className="relative z-10 container mx-auto px-5 md:px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
          <div className="max-w-4xl">
            <Reveal>
              <p
                className="text-body-lg lg:text-xl mb-6 max-w-2xl"
                style={{ color: "hsl(36 33% 95% / 0.7)" }}
              >
                רוב הישראלים קונים את הנכס היקר בחייהם — בלי שום הכנה.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="text-display-lg md:text-display-xl font-black text-white mb-6 leading-[0.95] tracking-tight">
                הדרך <span className="text-accent">לדירה</span>
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p
                className="text-display-sm md:text-display-md font-bold leading-snug max-w-3xl mb-8"
                style={{ color: "hsl(36 33% 95% / 0.85)" }}
              >
                תוכנית הליווי המקצועית שמלמדת אתכם לקנות דירה חכם — מא׳ ועד ת׳.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-bold text-sm px-5 py-2 rounded-full mb-8 backdrop-blur-sm">
                50+ שיעורים · 6+ כלים מתקדמים · ליווי צמוד
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <Button
                size="lg"
                onClick={scrollToPricing}
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.45)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.65)] transition-all"
              >
                גלו את התוכנית
                <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              </Button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2. Trust bar */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 0.08}>
                <div className="text-center">
                  <p className="text-display-md font-black text-foreground tabular-nums leading-none mb-2">
                    {h.value}
                  </p>
                  <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                    {h.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Problem vs Solution */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 lg:mb-16 leading-[0.98] tracking-tight text-center">
              בלי הכנה? <span className="text-accent">זה עולה ביוקר.</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            <Reveal>
              <div className="rounded-2xl p-6 md:p-8 bg-destructive/5 border border-destructive/15 h-full">
                <h3 className="text-xl font-bold text-foreground mb-5">
                  בלי התוכנית
                </h3>
                <ul className="space-y-3">
                  {problems.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <XCircle size={18} className="text-destructive mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl p-6 md:p-8 bg-accent/5 border border-accent/30 shadow-depth-2 h-full">
                <h3 className="text-xl font-bold text-foreground mb-5">
                  עם התוכנית
                </h3>
                <ul className="space-y-3">
                  {solutions.map((s) => (
                    <li key={s} className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground leading-relaxed">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. Trailer + Live calculator */}
      <SectionDark size="lg" glow="bottom">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-4 leading-[0.98] tracking-tight text-center">
              ראו <span className="text-accent">בעצמכם</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-body-lg mb-12 leading-relaxed text-center max-w-2xl mx-auto"
              style={{ color: "hsl(36 33% 95% / 0.72)" }}
            >
              דוגמה חיה לאחד הכלים בתוכנית — מחשבון משכנתא. הזיזו את ה-sliders
              והרגישו איך כל פרמטר משפיע על העסקה.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <CalcTabs />
          </Reveal>
          {!isPlaceholderVideo && (
            <Reveal delay={0.22}>
              <div className="mt-14 rounded-2xl overflow-hidden border border-white/10 shadow-depth-3">
                <VideoPlayer url={VIDEO_URL} title="טריילר — הדרך לדירה" />
              </div>
            </Reveal>
          )}
        </div>
      </SectionDark>

      {/* 5. Program cards */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-12 lg:mb-16 leading-[0.98] tracking-tight">
              מה <span className="text-accent">בתוכנית?</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {programCards.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12}>
                <article
                  className="relative h-full p-6 lg:p-8 rounded-2xl flex flex-col group transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: "hsl(36 33% 95% / 0.04)",
                    border: "1px solid hsl(36 33% 95% / 0.12)",
                  }}
                >
                  {card.badge && (
                    <div className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                      {card.badge}
                    </div>
                  )}
                  <div className="font-mono text-display-md font-black text-accent leading-none mb-5">
                    {card.num}
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                    {card.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-6"
                    style={{ color: "hsl(36 33% 95% / 0.72)" }}
                  >
                    {card.description}
                  </p>
                  <ul
                    className="space-y-3 flex-1 pt-5 border-t"
                    style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}
                  >
                    {card.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                        style={{ color: "hsl(36 33% 95% / 0.85)" }}
                      >
                        <Check size={16} className="text-accent mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Curriculum */}
          <div className="max-w-3xl mx-auto mt-16 lg:mt-24">
            <Reveal>
              <div
                className="flex items-center justify-center gap-6 mb-8 text-eyebrow uppercase tracking-[0.18em]"
                style={{ color: "hsl(36 33% 95% / 0.7)" }}
              >
                <span>
                  <strong className="text-accent text-base font-mono tabular-nums">{totalModules}</strong>{" "}
                  מודולים
                </span>
                <span style={{ color: "hsl(36 33% 95% / 0.3)" }}>·</span>
                <span>
                  <strong className="text-accent text-base font-mono tabular-nums">{totalLessons}</strong>{" "}
                  שיעורים
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <CurriculumAccordion />
            </Reveal>
          </div>

          {/* Transaction lifecycle visualization */}
          <div className="mt-20 lg:mt-28 max-w-5xl mx-auto">
            <Reveal>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 text-center leading-tight">
                ששה שלבים <span className="text-accent">מהשיחה הראשונה ועד החתימה</span>
              </h3>
            </Reveal>
            <Reveal delay={0.08}>
              <p
                className="text-base mb-12 text-center max-w-2xl mx-auto leading-relaxed"
                style={{ color: "hsl(36 33% 95% / 0.65)" }}
              >
                בכל שלב — כלי, חומר וליווי שמותאמים בדיוק לאן שאתם בדרך.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <TransactionLifecycle />
            </Reveal>
          </div>
        </div>
      </SectionDark>

      {/* 6. Fit Quiz */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-4 leading-[0.98] tracking-tight text-center">
              האם התוכנית <span className="text-accent">מתאימה לי?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-10 lg:mb-14 leading-relaxed text-center max-w-2xl mx-auto">
              ענו על מספר שאלות קצרות וגלו עד כמה התוכנית מתאימה בדיוק בשבילכם.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <FitQuiz />
          </Reveal>
          <Reveal delay={0.22}>
            <div className="text-center mt-10">
              <Button
                variant="outline"
                onClick={scrollToPricing}
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground rounded-full px-7 py-5 font-bold"
              >
                צפו בתוכנית המלאה
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. Pricing */}
      <section id="pricing" className="py-section-lg bg-card">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Compare */}
          <Reveal>
            <div className="grid md:grid-cols-2 gap-4 mb-12 max-w-2xl mx-auto text-right">
              <div className="rounded-2xl p-5 bg-destructive/5 border border-destructive/15">
                <h4 className="font-bold text-foreground mb-3 text-center">בלי הקורס</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "משלמים יותר על הדירה",
                    "משכנתא לא מותאמת",
                    "מפספסים עסקאות",
                    "לומדים מטעויות יקרות",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <XCircle size={14} className="text-destructive flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl p-5 bg-accent/5 border border-accent/30 shadow-depth-1">
                <h4 className="font-bold text-foreground mb-3 text-center">עם הקורס</h4>
                <ul className="space-y-2 text-sm text-foreground">
                  {[
                    "חוסכים עשרות אלפי ₪",
                    "תמהיל משכנתא אופטימלי",
                    "מזהים עסקאות לפני כולם",
                    "ליווי מקצועי בכל שלב",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle size={14} className="text-accent flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="bg-background border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-2xl mx-auto shadow-depth-3">
              <div
                className="absolute top-0 right-0 w-40 h-40 pointer-events-none -z-0"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(50% 50% at 100% 0%, hsl(24 80% 52% / 0.15) 0%, transparent 70%)",
                }}
              />
              <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
              <div className="text-center relative z-10">
                <GraduationCap size={36} className="text-accent mx-auto mb-4" />
                <h3 className="text-display-sm md:text-display-md font-black text-foreground mb-2">
                  הצטרפו לתוכנית
                </h3>
                <p className="text-muted-foreground mb-8">
                  הצטרפו ל-300+ בוגרים שכבר רכשו דירה בצורה חכמה.
                </p>

                <div className="text-display-md md:text-display-lg font-black text-accent mb-10 tabular-nums">
                  {new Intl.NumberFormat("he-IL", {
                    style: "currency",
                    currency: "ILS",
                    maximumFractionDigits: 0,
                  }).format(5490)}
                </div>

                <div className="text-right max-w-sm mx-auto space-y-3 mb-10">
                  {[
                    "50+ שיעורים דיגיטליים",
                    "6+ כלים ומחשבונים מתקדמים",
                    "ליווי צמוד של אנליסט בוואטסאפ",
                    "גישה מלאה ל-12 חודשים",
                    "קהילת בוגרים פעילה",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle size={18} className="text-accent flex-shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "היי! אני רוצה לרכוש את תוכנית הדרך לדירה"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    size="lg"
                    className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 w-full sm:w-auto gap-3 mb-4 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.45)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.65)] transition-all"
                  >
                    לרכישה מאובטחת
                    <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                  </Button>
                </a>

                <div>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "היי! אני מעוניין/ת בתוכנית הדרך לדירה"
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline"
                  >
                    יש שאלות? דברו איתנו בוואטסאפ ←
                  </a>
                </div>

                <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-border flex-wrap">
                  {["תשלום מאובטח", "גישה מיידית", "ליווי צמוד"].map((badge) => (
                    <span
                      key={badge}
                      className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground flex items-center gap-2"
                    >
                      <Shield size={12} className="text-accent" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Testimonials */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 leading-[0.98] tracking-tight text-center">
              מה הבוגרים <span className="text-accent">אומרים?</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {courseTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <TestimonialVideoCard testimonial={t} index={i} />
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.4}>
            <div className="text-center mt-10">
              <Link to="/testimonials">
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground gap-2 rounded-full px-7 py-5 font-bold"
                >
                  כל סיפורי ההצלחה
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. FAQ */}
      <section className="py-section-lg bg-card">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 leading-[0.98] tracking-tight text-center">
              שאלות <span className="text-accent">נפוצות</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faqData.course.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-background"
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

      <BigCTA />
    </>
  );
};

export default CoursePage;
