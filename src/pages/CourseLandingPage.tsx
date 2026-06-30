import { motion, useReducedMotion } from "framer-motion";
import {
  GraduationCap,
  Calculator,
  MessageCircle,
  Mail,
  Check,
  ShieldCheck,
  Instagram,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { WHATSAPP_NUMBER, EMAIL, socialLinks } from "@/lib/constants";

import starsBg from "@/assets/program/stars.jpg";
import heroRhinoKey from "@/assets/derech/hero-rhino-key.png";
import decoKeys from "@/assets/derech/deco-keys.png";
import decoPlane from "@/assets/derech/deco-plane.png";
import decoBalloon from "@/assets/derech/deco-balloon.png";
import decoTelescope from "@/assets/derech/deco-telescope.png";
import portalCouch from "@/assets/derech/portal-couch.png";
import supportPhone from "@/assets/derech/support-phone.png";
import pillarConsult from "@/assets/derech/pillar-consult.png";
import pillarCalc from "@/assets/derech/pillar-calc.png";
import pillarLearn from "@/assets/derech/pillar-learn.png";
import syllabusRhino from "@/assets/derech/syllabus-rhino.png";
import dancingRhino from "@/assets/derech/dancing-rhino.png";
import jumpingRhino from "@/assets/derech/jumping-rhino.png";

/* ────────────────────────────────────────────────────────────
   תשלום — מוכן לחיבור.
   להדביק כאן קישור תשלום מספק סליקה (Grow / Cardcom / PayPlus וכו').
   כל עוד ריק — כפתור התשלום נופל חזרה לוואטסאפ.
   ──────────────────────────────────────────────────────────── */
const PAYMENT_LINK = "";
const PRICE = 4950;

/* רקע העמוד — קרם חם */
const PAGE_CREAM = "hsl(37 41% 90%)";
/* גווני פאנלים מתחלפים */
const TINT_WARM = "hsl(41 47% 89%)";
const TINT_BLUE = "hsl(208 40% 89%)";
const TINT_CREAM = "hsl(40 44% 92%)";
const TINT_TEAL = "hsl(150 44% 86%)";

const WA_BUY = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי! אני רוצה להצטרף לתכנית הדרך לדירה"
)}`;
const checkoutHref = PAYMENT_LINK || WA_BUY;

const INSTAGRAM_URL =
  socialLinks.find((s) => s.label === "Instagram")?.href ??
  "https://www.instagram.com/karnaf_nadlan/";

/* לוגו וואטסאפ (ל-lucide אין אייקון מותג) */
const WhatsAppIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.967-.94 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* שלוש הרגליים — סדר RTL: לומדים (ימין) · מחשבים · מתייעצים (שמאל) */
const pillars = [
  {
    img: pillarLearn,
    icon: GraduationCap,
    title: "לומדים",
    tag: "קורס ידע מקצועי",
    body: "יותר מ-50 שיעורים דיגיטליים שהופכים את רכישת הדירה הראשונה לתהליך ברור, מסודר ופשוט להבנה.",
  },
  {
    img: pillarCalc,
    icon: Calculator,
    title: "מחשבים",
    tag: "כלים לקבלת החלטות",
    body: "פורטל מחשבונים וכלי השוואה מתקדמים — כל הבדיקות שאתם צריכים במקום אחד, מבוססות נתונים ולא תחושות בטן.",
  },
  {
    img: pillarConsult,
    icon: MessageCircle,
    title: "מתייעצים",
    tag: "ליווי אישי של אנליסט נדל״ן",
    body: "לא צ׳אטבוט ולא תשובות גנריות — אנליסט נדל״ן אנושי שזמין בוואטסאפ לאורך כל הדרך. מתלבטים? שואלים.",
  },
];

/* הסילבוס — לפי "סילבוס הקורס מעודכן" (נושאים גדולים בחלק המעשי = מלבנים על כל השורה) */
type SyllabusItem = string | { label: string; wide: boolean };
const syllabus: {
  key: string;
  label: string;
  sub?: string;
  tint: string;
  items: SyllabusItem[];
}[] = [
  {
    key: "theory",
    label: "נדל״ן: היסודות",
    tint: "theory",
    items: [
      "היתרונות של רכישת נדל״ן בישראל",
      "איך להגדיר משך השקעה",
      "סוגי העסקאות",
      "השפה של הרווח: מושגי חובה",
      "מבינים התחדשות עירונית",
    ],
  },
  {
    key: "practice",
    label: "החלק המעשי",
    tint: "practice",
    items: [
      "הדגמת איתור וניתוח עסקה אמיתית",
      "יורדים לשטח — כל מה שצריך לדעת",
      "תכנון פיננסי חכם של עסקת נדל״ן",
      { label: "מאסטר קלאס משא ומתן: כל השיטות והטיפים", wide: true },
      { label: "נבחרת מנצחת: אנשי המקצוע ואיך לנהל אותם בחכמה", wide: true },
      { label: "עשרת הדיברות: עשה ואל תעשה בעסקת נדל״ן", wide: true },
    ],
  },
  {
    key: "bonus",
    label: "כספת הידע — מיני קורסים",
    tint: "bonus",
    items: [
      "מיסוי נדל״ן — רק מה שצריך לדעת",
      "פינוי בינוי: ניתוח מהיר ויעיל",
      "יסודות המשכנתא: כך תנצחו את הבנק",
      "קרקעות ומכרזים לאנשי מילואים (ולא רק!)",
    ],
  },
];

const tintStyles: Record<
  string,
  { head: string; chip: string; sub: string }
> = {
  theory: {
    head: "bg-[hsl(36_80%_62%)] text-[hsl(28_55%_20%)]",
    chip: "bg-[hsl(36_82%_85%)] text-[hsl(28_52%_26%)]",
    sub: "text-[hsl(28_55%_22%)]/75",
  },
  practice: {
    head: "bg-[hsl(12_70%_60%)] text-white",
    chip: "bg-[hsl(12_78%_89%)] text-[hsl(10_52%_30%)]",
    sub: "text-white/85",
  },
  bonus: {
    head: "bg-[hsl(212_46%_52%)] text-white",
    chip: "bg-[hsl(210_58%_88%)] text-[hsl(214_45%_30%)]",
    sub: "text-white/85",
  },
};

/* Scroll-reveal — fade-up עדין עם blur */
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
      initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
};

/* כותרת סקשן — אייקון בעיגול + טקסט דו-גוני */
const iconToneClass: Record<string, string> = {
  accent: "bg-accent/15 text-accent",
  blue: "bg-[hsl(208_50%_80%)] text-[hsl(208_65%_32%)]",
  navy: "bg-primary/12 text-primary",
  mustard: "bg-[hsl(43_80%_85%)] text-[hsl(38_72%_42%)]",
  teal: "bg-[hsl(150_44%_78%)] text-[hsl(152_56%_24%)]",
};

const SectionHeading = ({
  icon: Icon,
  align = "center",
  iconTone = "accent",
  size = "md",
  glow = false,
  children,
}: {
  icon?: LucideIcon;
  align?: "center" | "start";
  iconTone?: "accent" | "blue" | "navy" | "mustard" | "teal";
  size?: "md" | "lg";
  glow?: boolean;
  children: React.ReactNode;
}) => (
  <div
    className={`flex flex-col gap-4 ${
      align === "start" ? "items-start text-right" : "items-center text-center"
    }`}
  >
    {Icon && (
      <span
        className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] ${iconToneClass[iconTone]}`}
      >
        <Icon size={24} strokeWidth={1.9} />
      </span>
    )}
    <h2
      className={`leading-tight text-primary ${
        size === "lg"
          ? "text-display-lg md:text-display-xl"
          : "text-display-md md:text-display-lg"
      }`}
      style={glow ? { textShadow: "0 4px 14px rgba(35,45,65,0.22)" } : undefined}
    >
      {children}
    </h2>
  </div>
);

const Orange = ({ children }: { children: React.ReactNode }) => (
  <span className="text-accent">{children}</span>
);

/* וילון פתיחה — נפתח מלמעלה למטה וחושף את העמוד (כמו האתר, אנכי) */
const PageCurtain = () => {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
      style={{
        transformOrigin: "center top",
        background:
          "linear-gradient(to bottom, #0A1230 0%, #0A1230 55%, rgba(10,18,48,0.65) 80%, rgba(10,18,48,0) 100%)",
      }}
    />
  );
};

/* כותרת בקשת — טקסט מעוקל ב-SVG */
const ArcTitle = () => (
  <svg
    viewBox="0 -48 600 240"
    className="mx-auto w-full max-w-[60rem]"
    role="img"
    aria-label="הדרך לדירה ראשונה"
  >
    <defs>
      <path id="arc-path" d="M 12 178 A 365 365 0 0 1 588 178" fill="none" />
    </defs>
    <text
      style={{ fontFamily: "'Rubik', system-ui, sans-serif", fontWeight: 800 }}
      fontSize="68"
      letterSpacing="0.5"
    >
      <textPath href="#arc-path" startOffset="50%" textAnchor="middle">
        <tspan fill="#ffffff">הדרך לדירה </tspan>
        <tspan fill="hsl(20 90% 58%)">ראשונה</tspan>
      </textPath>
    </text>
  </svg>
);

const CourseLandingPage = () => {
  const reduce = useReducedMotion();

  return (
    <main
      dir="rtl"
      className="program-scope derech-page text-foreground overflow-x-hidden"
      style={{ backgroundColor: PAGE_CREAM }}
    >
      <SEOHead
        title="הדרך לדירה ראשונה — תכנית הליווי של קרנף נדל״ן"
        description="תכנית ליווי מקיפה לרוכשי דירה ראשונה: 50+ שיעורים, פורטל מחשבונים וליווי אישי של אנליסט נדל״ן אנושי. לומדים, מחשבים, מתייעצים."
        path="/derech-ladira"
        image="https://karnafpreviewredesign.vercel.app/derech-og.jpg"
        noindex
      />

      {/* וילון פתיחה אנכי */}
      <PageCurtain />

      {/* film-grain קבוע */}
      <div
        aria-hidden
        className="grain-texture pointer-events-none fixed inset-0 z-[60] opacity-[0.04]"
      />

      {/* ===================== HERO — שמי לילה ===================== */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#0A1230]">
        <div className="absolute inset-0">
          <img
            src={starsBg}
            alt=""
            className="h-full w-full object-cover opacity-70"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: "high" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 70% at 50% 38%, transparent 40%, rgba(10,18,48,0.5) 90%)",
            }}
          />
        </div>

        {/* קישוטים מרחפים — בפינות הסקשן */}
        <motion.img
          src={decoKeys}
          alt=""
          aria-hidden
          className="absolute left-[6%] top-[13%] z-[6] hidden w-24 object-contain sm:block md:w-32"
          animate={reduce ? undefined : { y: [0, -16, 0], rotate: [0, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={decoPlane}
          alt=""
          aria-hidden
          className="absolute right-[5%] top-[10%] z-[6] hidden w-40 object-contain sm:block md:w-56"
          animate={reduce ? undefined : { y: [0, -12, 0], x: [0, 8, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={decoBalloon}
          alt=""
          aria-hidden
          className="absolute bottom-[31%] -left-14 z-[6] hidden w-28 object-contain sm:block md:-left-20 md:w-40"
          animate={reduce ? undefined : { y: [0, 16, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.img
          src={decoTelescope}
          alt=""
          aria-hidden
          className="absolute bottom-[28%] right-[5%] z-[6] hidden w-32 object-contain sm:block md:w-44"
          animate={reduce ? undefined : { y: [0, 13, 0], rotate: [0, 3, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* fade רך לתוך גוף העמוד (קרם חם) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[7] h-72"
          style={{
            background:
              "linear-gradient(to bottom, hsl(37 41% 90% / 0) 0%, hsl(37 41% 90% / 0) 34%, hsl(37 41% 90% / 0.32) 60%, hsl(37 41% 90% / 0.72) 82%, hsl(37 41% 90%) 100%)",
          }}
        />

        <div className="relative z-10 w-full -translate-y-10 md:-translate-y-16">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center px-5 py-24 text-center md:px-6">
            {/* כותרת בקשת — הדבר המרכזי */}
            <div className="mt-6 w-full md:mt-10">
              <ArcTitle />
            </div>

            {/* קרנף-מפתח — נכנס לתוך הקשת, עם הצללה בהירה מתחתיו */}
            <div className="relative z-10 -mt-14 md:-mt-24">
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-3 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-[50%] blur-2xl md:h-20"
                style={{
                  background:
                    "radial-gradient(ellipse at center, hsl(40 80% 84% / 0.55) 0%, hsl(40 72% 80% / 0.18) 48%, transparent 72%)",
                }}
              />
              <img
                src={heroRhinoKey}
                alt="קרנף נדל״ן מחזיק מפתח לדירה"
                className="relative z-10 w-52 object-contain md:w-[17.5rem]"
                loading="eager"
                decoding="async"
                style={{
                  filter:
                    "drop-shadow(0 18px 26px rgba(0,0,0,0.4)) drop-shadow(0 14px 12px hsl(40 78% 80% / 0.4))",
                }}
              />
            </div>

            {/* תת-כותרת — בולד וגדולה כמו הכותרת */}
            <p className="mt-8 text-3xl font-extrabold tracking-wide text-accent md:mt-12 md:text-4xl">
              תכנית הליווי מבית קרנף נדל״ן
            </p>
          </div>
        </div>
      </section>

      {/* ===================== תוכנית הדגל ===================== */}
      <section className="py-section-md md:py-section-lg">
        <div className="container mx-auto max-w-4xl px-5 md:px-6">
          <Reveal>
            <div
              className="karnaf-panel px-6 py-12 text-center md:px-12 md:py-16"
              style={{ backgroundColor: TINT_WARM }}
            >
              <SectionHeading size="lg" glow>
                תוכנית הדגל <Orange>שלנו</Orange>
              </SectionHeading>
              <p className="text-body-lg mx-auto mt-6 max-w-[54ch] leading-[1.9] text-foreground/75">
                תכנית ליווי מקיפה לרוכשי דירה ראשונה, המשלבת ידע, כלים וליווי
                אישי שיעזרו לכם לקבל החלטות נכונות ובטוחות לאורך כל הדרך —
                מהצעד הראשון ועד קבלת המפתח.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== שלוש הרגליים ===================== */}
      <section className="pb-section-md md:pb-section-lg">
        <div className="container mx-auto max-w-6xl px-5 md:px-6">
          <div
            className="karnaf-panel px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: TINT_BLUE }}
          >
            <Reveal className="mb-10 md:mb-14">
              <SectionHeading>
                שלוש הרגליים <Orange>של התכנית</Orange>
              </SectionHeading>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 0.1}>
                  <motion.article
                    className="bezel-outer-light h-full"
                    whileHover={reduce ? undefined : { y: [0, -8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="bezel-inner blueprint-corners flex h-full flex-col items-center bg-card p-7 text-center lg:p-8">
                      <div className="mb-5 flex h-48 items-end justify-center">
                        <img
                          src={p.img}
                          alt={p.title}
                          className="max-h-48 w-auto object-contain drop-shadow-[0_14px_24px_rgba(20,30,60,0.18)]"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                      <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary text-[hsl(36_55%_92%)] shadow-[0_6px_16px_-6px_hsl(208_44%_21%/0.6)]">
                        <p.icon size={22} strokeWidth={1.75} />
                      </span>
                      <h3 className="mb-1 text-2xl font-bold text-primary">
                        {p.title}
                      </h3>
                      <p className="text-eyebrow mb-4 uppercase tracking-[0.16em] text-accent">
                        {p.tag}
                      </p>
                      <p className="leading-[1.8] text-foreground/70">{p.body}</p>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== הסילבוס ===================== */}
      <section className="pb-section-md md:pb-section-lg">
        <div className="container mx-auto max-w-5xl px-5 md:px-6">
          <div
            className="karnaf-panel relative px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: TINT_CREAM }}
          >
            {/* קרנף נשען על הגבול הימני, מחוץ לפאנל */}
            <img
              src={syllabusRhino}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-full z-0 hidden w-52 -translate-x-10 object-contain xl:block xl:w-60"
              loading="lazy"
              decoding="async"
            />
            <Reveal className="mb-10 text-center md:mb-12">
              <SectionHeading icon={GraduationCap}>
                הקורס — <Orange>הסילבוס המלא</Orange>
              </SectionHeading>
              <p className="text-body-lg mx-auto mt-5 max-w-[48ch] leading-[1.7] text-foreground/70">
                יותר מ-50 שיעורים דיגיטליים שנבנו כדי להפוך את רכישת הדירה
                הראשונה לתהליך ברור, מסודר ופשוט להבנה.
              </p>
            </Reveal>

            <div className="relative z-10 space-y-8">
              {syllabus.map((group, gi) => {
                const t = tintStyles[group.tint];
                return (
                  <Reveal key={group.key} delay={gi * 0.08}>
                    {/* מלבן כותרת עצמאי, ממורכז */}
                    <div
                      className={`flex items-center justify-center gap-3 rounded-xl px-6 py-3.5 shadow-[0_10px_28px_-18px_rgba(20,30,60,0.5)] ${t.head}`}
                    >
                      <h3 className="text-xl font-black leading-none md:text-2xl">
                        {group.label}
                      </h3>
                      {group.sub && (
                        <span
                          className={`rounded-full bg-white/25 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${t.sub}`}
                        >
                          {group.sub}
                        </span>
                      )}
                    </div>
                    {/* מלבני שיעורים נפרדים — ממלאים את רוחב השורה; נושאים גדולים = שורה מלאה */}
                    <div className="mt-3 flex flex-wrap gap-3">
                      {group.items.map((it) => {
                        const label = typeof it === "string" ? it : it.label;
                        const wide = typeof it === "object" && it.wide;
                        return (
                          <span
                            key={label}
                            className={`inline-flex items-center justify-center rounded-xl px-4 py-3 text-center text-base font-semibold shadow-[0_2px_8px_-4px_rgba(20,30,60,0.3)] ${
                              wide ? "w-full basis-full" : "min-w-[150px] flex-1"
                            } ${t.chip}`}
                          >
                            {label}
                          </span>
                        );
                      })}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== פורטל המחשבונים ===================== */}
      <section className="pb-section-md md:pb-section-lg">
        <div className="container mx-auto max-w-6xl px-5 md:px-6">
          <div
            className="karnaf-panel relative overflow-hidden px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: TINT_BLUE }}
          >
            {/* תמונה צמודה לפינה הימנית-תחתונה, מגיעה עד מרכז הפאנל (דסקטופ) */}
            <img
              src={portalCouch}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 right-0 z-0 hidden rounded-tl-[2rem] object-cover lg:block lg:w-1/2"
              loading="lazy"
              decoding="async"
            />
            <div className="relative z-10">
              {/* כותרת ואייקון — ממורכזים אופקית */}
              <Reveal>
                <SectionHeading icon={Calculator} iconTone="blue">
                  פורטל <Orange>המחשבונים</Orange>
                </SectionHeading>
              </Reveal>
              {/* טקסט — בחצי השמאלי, ממורכז ומיושר לגובה ראש התמונה */}
              <Reveal delay={0.12} className="lg:pr-[50%] lg:pt-20">
                <div className="lg:mx-auto lg:max-w-sm lg:text-center">
                  <p className="text-body-lg mt-6 leading-[1.85] text-foreground/75 lg:mt-0">
                    פורטל מחשבונים וכלי עזר מתקדמים שיעזרו לכם לקבל החלטות נדל״ן
                    חכמות — המבוססות על נתונים, ולא על תחושות בטן. כל המחשבונים,
                    כלי ההשוואה והבדיקות שאתם צריכים, במקום אחד.
                  </p>
                  <ul className="mx-auto mt-5 w-fit space-y-3 text-right">
                    {[
                      "מחשבון עסקת נדל״ן ומיסוי",
                      "מחשבון משכנתא וכדאיות",
                      "צ׳קליסט ביקור בנכס",
                      "כלי השוואה בין עסקאות",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-foreground">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check size={15} strokeWidth={2.4} />
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
              {/* תמונה — מובייל בלבד */}
              <Reveal delay={0.2} className="mt-8 lg:hidden">
                <img
                  src={portalCouch}
                  alt="זוג בוחן את פורטל המחשבונים של קרנף נדל״ן"
                  className="w-full rounded-[1.5rem] object-cover shadow-[0_24px_56px_-28px_rgba(20,30,60,0.55)]"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== ליווי אישי ===================== */}
      <section className="pb-section-md md:pb-section-lg">
        <div className="container mx-auto max-w-6xl px-5 md:px-6">
          <div
            className="karnaf-panel relative overflow-hidden px-6 py-12 md:px-12 md:py-16"
            style={{ backgroundColor: TINT_TEAL }}
          >
            {/* תמונה צמודה לפינה השמאלית-תחתונה (דסקטופ) */}
            <img
              src={supportPhone}
              alt=""
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 z-0 hidden w-80 object-contain lg:block xl:w-96"
              loading="lazy"
              decoding="async"
            />
            <div className="relative z-10">
              {/* טקסט — ממורכז במרחב שמימין לתמונה */}
              <Reveal className="lg:pl-[34%] xl:pl-[40%]">
                <div className="lg:mx-auto lg:max-w-lg lg:text-center">
                  <SectionHeading icon={MessageCircle} iconTone="teal">
                    ליווי אישי <Orange>אנושי</Orange>
                  </SectionHeading>
                  <p className="text-body-lg mb-5 mt-6 leading-[1.85] text-foreground/75">
                    לא צ׳אטבוט — אדם. ליווי אישי לאורך כל הדרך, עם מענה לשאלות,
                    התלבטויות ודילמות שעולות במהלך תהליך רכישת הדירה. לא תשובות
                    גנריות — אנליסט נדל״ן אנושי שמכיר אתכם ואת העסקה שלכם.
                  </p>
                  <p className="text-lg font-semibold leading-relaxed text-primary">
                    מתלבטים? שואלים. בוחנים עסקה? מתייעצים. אנחנו הכתובת המקצועית
                    שלכם לכל דבר.
                  </p>
                </div>
              </Reveal>
              {/* תמונה — מובייל בלבד */}
              <Reveal delay={0.12} className="mt-8 flex justify-center lg:hidden">
                <img
                  src={supportPhone}
                  alt="ליווי אישי בוואטסאפ עם אנליסט נדל״ן"
                  className="w-64 object-contain drop-shadow-[0_24px_48px_rgba(20,30,60,0.28)] md:w-80"
                  loading="lazy"
                  decoding="async"
                />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== הצטרפות / תשלום ===================== */}
      <section
        id="pricing"
        className="pb-section-md md:pb-section-lg relative overflow-hidden"
      >
        {/* קרנף רוקד — משמאל לפאנל */}
        <img
          src={dancingRhino}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-28 left-[8%] z-0 hidden w-36 object-contain lg:bottom-40 lg:block xl:w-44"
          loading="lazy"
          decoding="async"
        />
        {/* קרנפית קופצת — מימין לפאנל */}
        <img
          src={jumpingRhino}
          alt=""
          aria-hidden
          className="pointer-events-none absolute bottom-28 right-[10%] z-0 hidden w-32 object-contain lg:bottom-40 lg:block xl:w-40"
          loading="lazy"
          decoding="async"
        />
        <div className="container relative z-10 mx-auto max-w-2xl px-5 md:px-6">
          <Reveal className="mb-8 text-center">
            <SectionHeading size="lg" glow>
              איך <Orange>מצטרפים?</Orange>
            </SectionHeading>
            <p className="text-body-lg mt-5 text-foreground/70">
              מתחילים את הדרך היום.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="karnaf-panel relative overflow-hidden bg-card p-8 md:p-12">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
              <div className="text-center">
                <div className="mb-1 flex items-end justify-center gap-1">
                  <span className="text-display-md md:text-display-lg font-black leading-none tabular-nums text-primary">
                    {new Intl.NumberFormat("he-IL").format(PRICE)}
                  </span>
                  <span className="mb-0.5 text-2xl font-black text-primary md:text-3xl">
                    ₪
                  </span>
                </div>
                <p className="mb-8 text-foreground/70">
                  תשלום חד-פעמי · גישה מלאה ל-12 חודשים
                </p>

                <div className="mx-auto mb-9 max-w-sm space-y-3 text-right">
                  {[
                    "50+ שיעורים דיגיטליים",
                    "פורטל מחשבונים וכלים מתקדמים",
                    "ליווי צמוד של אנליסט בוואטסאפ",
                    "גישה מלאה ל-12 חודשים",
                    "קהילת בוגרים פעילה",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                        <Check size={15} strokeWidth={2.4} />
                      </span>
                      <span className="text-foreground">{item}</span>
                    </div>
                  ))}
                </div>

                <a
                  href={checkoutHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex min-h-[60px] w-full items-center justify-center gap-3 rounded-full bg-accent py-5 pl-3 pr-8 text-lg font-bold text-accent-foreground shadow-[0_16px_38px_-10px_hsl(var(--accent)/0.6)] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-accent/90 active:scale-[0.98]"
                >
                  <ShieldCheck size={20} strokeWidth={1.9} />
                  לתשלום מאובטח
                  <span aria-hidden className="btn-nested-icon">←</span>
                </a>

                {!PAYMENT_LINK && (
                  <p className="mt-3 text-xs text-foreground/60">
                    כפתור התשלום יחובר לסליקה מאובטחת. בינתיים נסגור הצטרפות
                    בוואטסאפ.
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===================== רוצים לשמוע עוד? (שמיים full-bleed) ===================== */}
      <section className="py-section-md relative overflow-hidden bg-[#0A1230]">
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url(${starsBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="grain-texture pointer-events-none absolute inset-0" />
        <div className="container relative mx-auto max-w-3xl px-5 text-center md:px-6">
          <Reveal>
            <h2 className="text-display-md md:text-display-xl mb-4 leading-tight text-white">
              רוצים לשמוע <span className="text-accent">עוד?</span>
            </h2>
            <p className="text-body-lg mx-auto mb-10 max-w-[44ch] leading-relaxed text-white/80">
              דברו עם נציג אנושי לכל שאלה שיש לכם על התכנית.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              {/* וואטסאפ — ירוק */}
              <a
                href={WA_BUY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[hsl(var(--whatsapp))] px-7 py-4 text-lg font-bold text-white shadow-[0_14px_34px_-8px_hsl(var(--whatsapp)/0.6)] transition-all duration-300 hover:bg-[hsl(var(--whatsapp-deep))] active:scale-[0.98] sm:w-auto"
              >
                <WhatsAppIcon className="h-6 w-6" />
                וואטסאפ
              </a>
              {/* מייל — תכלת */}
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full bg-[hsl(202_80%_56%)] px-7 py-4 text-lg font-bold text-white shadow-[0_14px_34px_-8px_hsl(202_80%_56%/0.6)] transition-all duration-300 hover:bg-[hsl(202_80%_50%)] active:scale-[0.98] sm:w-auto"
              >
                <Mail size={20} strokeWidth={2} />
                מייל
              </a>
              {/* אינסטגרם — גרדיאנט */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-full px-7 py-4 text-lg font-bold text-white shadow-[0_14px_34px_-10px_rgba(214,41,118,0.7)] transition-all duration-300 hover:opacity-90 active:scale-[0.98] sm:w-auto"
                style={{
                  background:
                    "linear-gradient(45deg, #feda75 0%, #fa7e1e 28%, #d62976 58%, #962fbf 80%, #4f5bd5 100%)",
                }}
              >
                <Instagram size={22} strokeWidth={2} />
                אינסטגרם
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* מיני-פוטר */}
      <footer className="bg-[#070d22] py-7 text-center">
        <p className="text-eyebrow uppercase tracking-[0.18em] text-white/45">
          © {new Date().getFullYear()} קרנף נדל״ן · הדרך לדירה
        </p>
      </footer>

    </main>
  );
};

export default CourseLandingPage;
