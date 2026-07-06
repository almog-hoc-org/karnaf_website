// Suez One is used only on this page — load it with this route's chunk.
import "@fontsource/suez-one/hebrew.css";
import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Calculator,
  MessageCircle,
  Mail,
  Check,
  ArrowLeft,
} from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { WHATSAPP_NUMBER, EMAIL } from "@/lib/constants";

import starsBg from "@/assets/program/stars.jpg";
import rhinoKeys from "@/assets/program/rhino-keys.png";
import keysImg from "@/assets/program/keys.png";
import balloonImg from "@/assets/program/balloon.png";
import telescopeImg from "@/assets/program/telescope.png";
import calcPortal from "@/assets/program/calc-portal.png";
import phoneCall from "@/assets/program/phone-call.png";
import foundersImg from "@/assets/program/founders.png";

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי! ראיתי את תכנית הדרך לדירה ואשמח לפרטים"
)}`;

/* Three pillars of the program */
const pillars = [
  {
    icon: GraduationCap,
    title: "לומדים",
    tag: "קורס ידע מקצועי",
    body: "יותר מ-52 שיעורים דיגיטליים שהופכים את רכישת הדירה הראשונה לתהליך ברור, מסודר ופשוט להבנה.",
  },
  {
    icon: Calculator,
    title: "מחשבים",
    tag: "כלים לקבלת החלטות",
    body: "פורטל מחשבונים וכלי השוואה מתקדמים — כל הבדיקות שאתם צריכים במקום אחד, מבוססות נתונים ולא תחושות בטן.",
  },
  {
    icon: MessageCircle,
    title: "מתייעצים",
    tag: "ליווי אישי של אנליסט נדל״ן",
    body: "לא צ'אטבוט ולא תשובות גנריות — אנליסט נדל״ן אנושי שזמין בוואטסאפ לאורך כל הדרך. מתלבטים? שואלים.",
  },
];

/* The full syllabus, color-coded as in the printed folder */
const syllabus = [
  {
    key: "theory",
    label: "תיאוריה",
    tint: "theory",
    items: [
      "למה נדל״ן?",
      "תשואה הונית ופירותית",
      "סוגי עסקאות",
      "משך ההשקעה",
      "התחדשות עירונית",
    ],
  },
  {
    key: "practice",
    label: "פרקטיקה",
    tint: "practice",
    items: [
      "אנשי מקצוע",
      "Case Study",
      "תכנון פיננסי",
      "מו״מ — בסיס ועקרונות",
      "מו״מ — טכניקות מרכזיות",
      "מו״מ — פרקטיקה",
      "מו״מ — גורמי מעטפת",
      "יורדים לשטח",
      "עשרת הדיברות",
    ],
  },
  {
    key: "bonus",
    label: "מיני קורסים",
    sub: "בונוס",
    tint: "bonus",
    items: [
      "מיסוי נדל״ן",
      "משכנתא ומימון",
      "פינוי בינוי",
      "קרקעות לאנשי מילואים",
    ],
  },
];

const tintStyles: Record<
  string,
  { chip: string; rail: string; label: string }
> = {
  theory: {
    chip: "bg-[hsl(36_55%_88%)] text-[hsl(28_45%_28%)] border-[hsl(36_45%_75%)]",
    rail: "bg-[hsl(36_70%_55%)]",
    label: "text-[hsl(30_60%_40%)]",
  },
  practice: {
    chip: "bg-[hsl(14_55%_90%)] text-[hsl(10_50%_34%)] border-[hsl(14_50%_80%)]",
    rail: "bg-[hsl(12_65%_55%)]",
    label: "text-[hsl(10_55%_45%)]",
  },
  bonus: {
    chip: "bg-[hsl(214_35%_90%)] text-[hsl(215_40%_32%)] border-[hsl(214_30%_80%)]",
    rail: "bg-[hsl(215_45%_45%)]",
    label: "text-[hsl(215_45%_40%)]",
  },
};

const Reveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

const ProgramPage = () => {
  const reduce = useReducedMotion();

  return (
    <main dir="rtl" className="program-scope bg-background text-foreground overflow-x-hidden">
      <SEOHead
        title="הדרך לדירה ראשונה — תכנית הליווי של קרנף נדל״ן"
        description="תכנית ליווי מקיפה לרוכשי דירה ראשונה: 52+ שיעורים, פורטל מחשבונים וליווי אישי של אנליסט נדל״ן אנושי. לומדים, מחשבים, מתייעצים."
        path="/program"
        image="https://www.karnafnadlan.com/program-og.jpg"
        noindex
      />

      {/* ===================== HERO ===================== */}
      <section className="relative min-h-[100svh] flex flex-col justify-center overflow-hidden bg-[#0A1230]">
        <div className="absolute inset-0">
          <img
            src={starsBg}
            alt=""
            className="w-full h-full object-cover opacity-70"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: "high" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 80% at 50% 0%, transparent 30%, #0A1230 88%), linear-gradient(180deg, rgba(10,18,48,0.4) 0%, rgba(10,18,48,0.85) 100%)",
            }}
          />
        </div>

        {/* Decorative floating spot illustrations */}
        <motion.img
          src={balloonImg}
          alt=""
          aria-hidden
          className="absolute right-4 top-24 w-16 md:w-24 opacity-90 pointer-events-none"
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={telescopeImg}
          alt=""
          aria-hidden
          className="absolute left-4 bottom-28 w-16 md:w-24 opacity-90 pointer-events-none"
          animate={reduce ? undefined : { y: [0, 12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <img
          src={keysImg}
          alt=""
          aria-hidden
          className="absolute left-6 top-28 w-12 md:w-16 opacity-80 -rotate-12 pointer-events-none hidden sm:block"
        />

        <div className="relative z-10 container mx-auto px-5 md:px-6 py-28 text-center flex flex-col items-center">
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6"
          >
            <img
              src={rhinoKeys}
              alt="קרנף נדל״ן"
              className="h-40 md:h-52 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5"
          >
            תכנית הליווי מבית קרנף נדל״ן
          </motion.p>

          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-lg md:text-display-xl text-white leading-[1.05] max-w-[20ch]"
          >
            הדרך לדירה <span className="text-accent">ראשונה</span>
          </motion.h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-body-lg md:text-xl text-white/80 leading-relaxed max-w-[44ch] mt-6 mb-10"
          >
            ידע, כלים וליווי אישי שיעזרו לכם לקבל החלטות נכונות ובטוחות —
            לאורך כל הדרך לדירה הראשונה שלכם.
          </motion.p>

          <motion.a
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 active:scale-[0.98] text-accent-foreground font-bold text-base md:text-lg pr-8 pl-3 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_12px_32px_-8px_hsl(var(--accent)/0.5)] min-h-[56px]"
          >
            <MessageCircle size={20} strokeWidth={1.75} />
            דברו איתנו והתחילו עוד היום
            <span aria-hidden className="btn-nested-icon">←</span>
          </motion.a>
        </div>
      </section>

      {/* ===================== FLAGSHIP INTRO ===================== */}
      <section className="py-section-md md:py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
          <Reveal>
            <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-5">
              תוכנית הדגל שלנו
            </p>
            <h2 className="text-display-md md:text-display-lg text-foreground leading-tight mb-6">
              תכנית ליווי מקיפה לרוכשי{" "}
              <span className="text-accent">דירה ראשונה</span>
            </h2>
            <p className="text-body-lg text-muted-foreground leading-[1.85] max-w-[52ch] mx-auto">
              המשלבת ידע, כלים וליווי אישי שיעזרו לכם לקבל החלטות נכונות
              ובטוחות לאורך כל הדרך — מהצעד הראשון ועד קבלת המפתח.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===================== THREE PILLARS ===================== */}
      <section className="pb-section-md md:pb-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <Reveal className="mb-10 md:mb-14 text-center">
            <h2 className="text-display-sm md:text-display-md text-foreground">
              שלוש הרגליים של התכנית
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-5 lg:gap-7">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <article className="bezel-outer-light h-full">
                  <div className="bezel-inner blueprint-corners bg-card h-full p-7 lg:p-8 flex flex-col">
                    <span className="inline-flex w-14 h-14 rounded-2xl bg-accent/10 text-accent items-center justify-center mb-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
                      <p.icon size={26} strokeWidth={1.5} />
                    </span>
                    <h3 className="text-2xl font-bold text-foreground mb-1">
                      {p.title}
                    </h3>
                    <p className="text-eyebrow uppercase tracking-[0.16em] text-accent mb-4">
                      {p.tag}
                    </p>
                    <p className="text-muted-foreground leading-[1.8]">{p.body}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SYLLABUS ===================== */}
      <section className="py-section-md md:py-section-lg bg-[#0A1230] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `url(${starsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-5 md:px-6 max-w-5xl relative">
          <Reveal className="mb-10 md:mb-14 text-center">
            <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4">
              52+ שיעורים דיגיטליים
            </p>
            <h2 className="text-display-md md:text-display-lg text-white">
              הסילבוס המלא
            </h2>
          </Reveal>

          <div className="space-y-5">
            {syllabus.map((group, gi) => {
              const t = tintStyles[group.tint];
              return (
                <Reveal key={group.key} delay={gi * 0.08}>
                  <div className="bg-white/[0.06] border border-white/10 rounded-2xl p-5 md:p-7 flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-3 md:w-44 md:flex-shrink-0">
                      <span className={`block w-1.5 h-10 rounded-full ${t.rail}`} />
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-none">
                          {group.label}
                        </h3>
                        {group.sub && (
                          <span className="text-eyebrow uppercase tracking-[0.16em] text-accent">
                            {group.sub}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2.5 flex-1">
                      {group.items.map((item) => (
                        <span
                          key={item}
                          className={`inline-flex items-center text-sm font-medium px-3.5 py-2 rounded-lg border ${t.chip}`}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===================== CALCULATOR PORTAL ===================== */}
      <section className="py-section-md md:py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4">
                פורטל המחשבונים
              </p>
              <h2 className="text-display-md md:text-display-lg text-foreground leading-tight mb-6">
                החלטות חכמות,{" "}
                <span className="text-accent">מבוססות נתונים</span>
              </h2>
              <p className="text-body-lg text-muted-foreground leading-[1.85] mb-6">
                פורטל מחשבונים וכלי עזר מתקדמים שיעזרו לכם לקבל החלטות נדל״ן
                חכמות — המבוססות על נתונים, ולא על תחושות בטן. כל המחשבונים,
                כלי ההשוואה והבדיקות שאתם צריכים, במקום אחד.
              </p>
              <ul className="space-y-3">
                {[
                  "מחשבון עסקת נדל״ן ומיסוי",
                  "מחשבון משכנתא וכדאיות",
                  "צ׳קליסט ביקור בנכס",
                  "כלי השוואה בין עסקאות",
                ].map((f) => (
                  <li key={f} className="flex items-start gap-3 text-foreground">
                    <Check size={18} strokeWidth={1.75} className="text-accent mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.12}>
              {/* Real product screenshot, framed in a browser chrome */}
              <div className="rounded-2xl overflow-hidden bg-[#0A1230] border border-border shadow-depth-3">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                  <span className="w-2.5 h-2.5 rounded-full bg-white/25" />
                </div>
                <img
                  src={calcPortal}
                  alt="פורטל המחשבונים של קרנף נדל״ן"
                  className="w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== PERSONAL GUIDANCE ===================== */}
      <section className="py-section-md md:py-section-lg bg-secondary/40">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <Reveal className="order-2 lg:order-1 flex justify-center">
              <img
                src={phoneCall}
                alt="ליווי אישי בוואטסאפ עם אנליסט נדל״ן"
                className="w-64 md:w-80 object-contain drop-shadow-[0_24px_48px_rgba(20,20,40,0.25)]"
                loading="lazy"
                decoding="async"
              />
            </Reveal>
            <Reveal delay={0.1} className="order-1 lg:order-2">
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4">
                ליווי אישי אנושי
              </p>
              <h2 className="text-display-md md:text-display-lg text-foreground leading-tight mb-6">
                לא צ'אטבוט.{" "}
                <span className="text-accent">אדם.</span>
              </h2>
              <p className="text-body-lg text-muted-foreground leading-[1.85] mb-5">
                ליווי אישי לאורך כל הדרך, עם מענה לשאלות, התלבטויות ודילמות
                שעולות במהלך תהליך רכישת הדירה. לא תשובות גנריות — אנליסט נדל״ן
                אנושי שמכיר אתכם ואת העסקה שלכם.
              </p>
              <p className="text-lg font-semibold text-foreground leading-relaxed">
                מתלבטים? שואלים. בוחנים עסקה? מתייעצים. הליווי בוואטסאפ נותן לכם
                כתובת מקצועית לאורך כל הדרך.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== FOUNDERS (real photo) ===================== */}
      <section className="py-section-md md:py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <div className="grid sm:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
            <Reveal className="flex justify-center">
              <div className="w-52 md:w-60 aspect-square rounded-2xl bg-secondary/60 border border-border overflow-hidden flex items-end justify-center shadow-depth-2">
                <img
                  src={foundersImg}
                  alt="איתמר נחליאל ואלמוג חכמה — מייסדי קרנף נדל״ן"
                  className="w-[88%] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-eyebrow uppercase tracking-[0.28em] text-accent mb-4">
                מי עומד מאחורי התכנית
              </p>
              <h2 className="text-display-sm md:text-display-md text-foreground mb-4">
                איתמר נחליאל &amp; אלמוג חכמה
              </h2>
              <p className="text-body-lg text-muted-foreground leading-[1.85]">
                שני יזמי נדל״ן עם מעל 8 שנות ניסיון, מחקר וליווי של מאות עסקאות.
                הקמנו את קרנף נדל״ן כדי לתת לכל אחד את הכלים והידע לרכוש דירה
                בצורה חכמה ובטוחה.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===================== HOW TO JOIN (CTA) ===================== */}
      <section className="relative py-section-lg bg-[#0A1230] overflow-hidden">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            backgroundImage: `url(${starsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center relative">
          <Reveal>
            <h2 className="text-display-md md:text-display-xl text-white leading-tight mb-5">
              איך <span className="text-accent">מצטרפים?</span>
            </h2>
            <p className="text-body-lg text-white/80 leading-relaxed mb-10 max-w-[42ch] mx-auto">
              דברו איתנו והתחילו עוד היום את הדרך לרכישת הדירה שלכם.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent/90 active:scale-[0.98] text-accent-foreground font-bold text-lg pr-8 pl-3 py-4 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-[0_12px_32px_-8px_hsl(var(--accent)/0.55)] min-h-[56px]"
              >
                <MessageCircle size={20} strokeWidth={1.75} />
                וואטסאפ
                <span aria-hidden className="btn-nested-icon">←</span>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 border border-white/30 text-white hover:bg-white hover:text-[#0A1230] font-semibold text-lg px-8 py-4 rounded-full transition-colors duration-300 min-h-[56px]"
              >
                <Mail size={20} strokeWidth={1.75} />
                מייל
              </a>
            </div>

            <a
              href="https://www.karnafnadlan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mt-8 transition-colors"
            >
              לאתר המלא של קרנף נדל״ן
              <ArrowLeft size={14} />
            </a>
          </Reveal>
        </div>
      </section>

      {/* minimal footer */}
      <footer className="py-7 bg-[#070d22] text-center">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-white/45">
          © {new Date().getFullYear()} קרנף נדל״ן · הדרך לדירה
        </p>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="דברו איתנו בוואטסאפ"
        className="fixed bottom-5 left-5 z-50 inline-flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(var(--whatsapp))] text-white shadow-[0_8px_24px_-6px_hsl(var(--whatsapp)/0.6)] hover:scale-105 active:scale-95 transition-transform"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <MessageCircle size={26} />
      </a>
    </main>
  );
};

export default ProgramPage;
