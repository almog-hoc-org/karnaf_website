import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import heroCity from "@/assets/hero-city.jpg";
import founders from "@/assets/team/itamar-almog-about.png";

/* ----------------------------- shared bits ----------------------------- */

const Eyebrow = ({
  children,
  invert = false,
}: {
  children: React.ReactNode;
  invert?: boolean;
}) => (
  <div
    className={`inline-flex items-center gap-3 text-eyebrow uppercase tracking-[0.22em] mb-4 ${
      invert ? "text-accent" : "text-accent"
    }`}
  >
    <span className="block w-10 h-px bg-accent" />
    <span>{children}</span>
  </div>
);

const Reveal = ({
  children,
  delay = 0,
  y = 28,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setShown(true);
                  io?.disconnect();
                }
              });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
          )
        : null;
    io?.observe(el);
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y }}
      animate={shown ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{
        duration: reduce ? 0 : 0.9,
        delay: reduce ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

const ClipImage = ({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/5]",
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
}) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            (entries) => {
              entries.forEach((e) => {
                if (e.isIntersecting) {
                  setShown(true);
                  io?.disconnect();
                }
              });
            },
            { rootMargin: "0px 0px -10% 0px", threshold: 0.01 }
          )
        : null;
    io?.observe(el);
    const t = window.setTimeout(() => setShown(true), 2500);
    return () => {
      window.clearTimeout(t);
      io?.disconnect();
    };
  }, [reduce]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${ratio} ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover"
        initial={reduce ? false : { scale: 1.15, opacity: 0 }}
        animate={shown ? { scale: 1, opacity: 1 } : { scale: 1.15, opacity: 0 }}
        transition={{ duration: reduce ? 0 : 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
};

/* --------------------------- Cold-open Hero ---------------------------- */

const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end overflow-hidden"
      style={{ backgroundColor: "hsl(217 50% 8%)" }}
    >
      {/* ambient photo background */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        aria-hidden="true"
      >
        <img
          src={heroCity}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </motion.div>

      {/* layered cinematic gradient — readable, mature */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, hsl(217 50% 8% / 0.55) 0%, hsl(217 50% 8% / 0.25) 35%, hsl(217 50% 8% / 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(70% 80% at 70% 30%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      {/* content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20 lg:pb-28 pt-32"
        style={reduce ? undefined : { opacity: fade }}
      >
        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-20 items-end">
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-eyebrow uppercase tracking-[0.32em] mb-6"
              style={{ color: "hsl(36 33% 95% / 0.7)" }}
            >
              <span className="text-accent">●</span>{" "}
              סטודיו ליווי לרכישת דירה ראשונה · ת״א
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-lg md:text-display-xl font-black text-white leading-[0.95] tracking-tight max-w-[20ch] mb-6"
            >
              הדירה הראשונה שלכם.
              <br />
              <span className="text-accent">בלי טעויות יקרות.</span>
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="text-body-lg lg:text-xl leading-relaxed max-w-[52ch] mb-10"
              style={{ color: "hsl(36 33% 95% / 0.78)" }}
            >
              אנליסטי נדל״ן ב-WhatsApp. ניתוח דאטה לפני שאתם חותמים.
              שיטה שתפעל גם בלי הקרנף — אבל נעים יותר איתו.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to="/contact">
                <button className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 py-5 rounded-full transition-all">
                  להזמין ניתוח חינם
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </button>
              </Link>
              <Link
                to="/course"
                className="text-base font-semibold text-white/85 hover:text-accent transition-colors underline-offset-4 hover:underline"
              >
                או — מה זאת השיטה?
              </Link>
            </motion.div>
          </div>

          {/* trust meta column */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1 }}
            className="text-sm leading-relaxed border-t border-white/15 pt-6 grid grid-cols-3 gap-4"
            style={{ color: "hsl(36 33% 95% / 0.65)" }}
          >
            <div>
              <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
                375
              </div>
              <div className="text-eyebrow uppercase tracking-[0.18em]">
                עסקאות מלוות
              </div>
            </div>
            <div>
              <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
                8
              </div>
              <div className="text-eyebrow uppercase tracking-[0.18em]">
                שנות מחקר
              </div>
            </div>
            <div>
              <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
                50+
              </div>
              <div className="text-eyebrow uppercase tracking-[0.18em]">
                שיעורים בקורס
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-eyebrow uppercase tracking-[0.32em] flex flex-col items-center gap-2"
        style={{ color: "hsl(36 33% 95% / 0.5)" }}
        aria-hidden
      >
        <span>גלילה</span>
        <span className="block w-px h-10 bg-white/30 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-3 bg-accent scroll-cue-dot" />
        </span>
      </motion.div>
    </section>
  );
};

/* --------------------------- Chapter 1: Crisis ------------------------- */

const MISTAKES = [
  {
    num: "01",
    title: "להאמין למתווך",
    body:
      "המתווך מקבל עמלה אם תחתמו. השיקול שלו לא תמיד שלכם. רוב הרוכשים לא יודעים את זה ולא בודקים את הנתונים בעצמם.",
  },
  {
    num: "02",
    title: "להתעלם ממיסוי",
    body:
      "מס רכישה, מס שבח, ארנונה, שיפוצים — לעיתים זה 8% מערך הדירה. רוב הרוכשים מחשבים רק את המחיר על השלט.",
  },
  {
    num: "03",
    title: "להחמיץ את הסביבה",
    body:
      "פיתוחים עתידיים, איכות בית הספר, גישה לתחבורה — אלה משפיעים על השווי יותר מצבע הקירות. נתונים שדורשים מחקר אמיתי.",
  },
];

const Crisis = () => (
  <section
    className="py-section-lg bg-background relative"
    style={{ color: "hsl(217 50% 8%)" }}
  >
    <div className="container mx-auto px-6">
      <div className="max-w-3xl">
        <Eyebrow>פרק 01 · המשבר</Eyebrow>
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black leading-[0.98] tracking-tight mb-6">
            בכל עסקה, יש{" "}
            <span className="text-accent">3 דרכים יקרות לטעות</span>.
            <br />
            רובן בלתי-נראות עד שמאוחר מדי.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-lg max-w-[58ch] text-muted-foreground leading-[1.85]">
            אנחנו לא מוכרים פחד. אנחנו מציגים את מה שראינו ב-375 עסקאות שהובלנו
            ב-8 השנים האחרונות. הטעויות חוזרות. הן מאפיינות.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 lg:mt-24 grid md:grid-cols-3 gap-10 lg:gap-12">
        {MISTAKES.map((m, i) => (
          <Reveal key={m.num} delay={i * 0.12}>
            <article className="border-t border-primary pt-6">
              <div className="font-mono text-display-md font-black text-accent leading-none mb-5">
                {m.num}
              </div>
              <h3 className="text-2xl font-bold text-primary mb-3 leading-snug">
                {m.title}
              </h3>
              <p className="text-body text-muted-foreground leading-[1.85]">
                {m.body}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* --------------------------- Chapter 2: Method ------------------------- */

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", {
    maximumFractionDigits: 0,
  }).format(Math.round(n));

const Method = () => {
  // simple sliders
  const [price, setPrice] = useState(2_400_000);
  const [equity, setEquity] = useState(720_000);
  const [years, setYears] = useState(25);

  const rate = 0.045; // 4.5% annual
  const calc = useMemo(() => {
    const principal = Math.max(0, price - equity);
    const monthlyRate = rate / 12;
    const months = years * 12;
    const monthly =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    const totalPaid = monthly * months;
    const interest = totalPaid - principal;
    const ltv = principal / price;
    return { principal, monthly, totalPaid, interest, ltv };
  }, [price, equity, years]);

  return (
    <section
      className="py-section-lg relative overflow-hidden"
      style={{
        backgroundColor: "hsl(217 50% 8%)",
        color: "hsl(36 33% 95%)",
      }}
    >
      {/* background ambient */}
      <div
        className="absolute inset-0 opacity-50 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(60% 80% at 80% 20%, hsl(24 80% 52% / 0.12) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      <div className="container mx-auto px-6 relative">
        <div className="max-w-3xl mb-14 lg:mb-20">
          <Eyebrow>פרק 02 · השיטה</Eyebrow>
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black leading-[0.98] tracking-tight mb-6">
              אנחנו לא ממליצים.
              <br />
              <span className="text-accent">אנחנו מנתחים.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="text-body-lg leading-[1.85] max-w-[60ch]"
              style={{ color: "hsl(36 33% 95% / 0.72)" }}
            >
              לפני שיוצאים לשטח, אתם רואים את התמונה הפיננסית של העסקה — בעצמכם,
              במחשבון שלנו. הזיזו את ה-sliders והרגישו איך כל פרמטר זז.
            </p>
          </Reveal>
        </div>

        {/* Calculator */}
        <Reveal delay={0.15}>
          <div
            className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 rounded-2xl p-6 md:p-10 backdrop-blur-sm"
            style={{
              backgroundColor: "hsl(36 33% 95% / 0.04)",
              border: "1px solid hsl(36 33% 95% / 0.12)",
            }}
          >
            {/* inputs */}
            <div className="space-y-8">
              <div className="text-eyebrow uppercase tracking-[0.22em] text-accent">
                מחשבון משכנתא · live
              </div>

              <CalcSlider
                label="מחיר הדירה"
                value={price}
                min={800_000}
                max={6_000_000}
                step={50_000}
                onChange={setPrice}
                format={(v) => `${formatILS(v)} ₪`}
              />
              <CalcSlider
                label="הון עצמי"
                value={equity}
                min={200_000}
                max={Math.min(price, 4_000_000)}
                step={20_000}
                onChange={(v) => setEquity(Math.min(v, price - 100_000))}
                format={(v) => `${formatILS(v)} ₪`}
              />
              <CalcSlider
                label="תקופת המשכנתא"
                value={years}
                min={10}
                max={30}
                step={1}
                onChange={setYears}
                format={(v) => `${v} שנים`}
              />

              <div
                className="text-xs font-mono uppercase tracking-[0.18em]"
                style={{ color: "hsl(36 33% 95% / 0.5)" }}
              >
                * ריבית קבועה משוערת 4.5% · להמחשה בלבד
              </div>
            </div>

            {/* outputs */}
            <div
              className="rounded-xl p-6 lg:p-8 flex flex-col justify-between"
              style={{
                backgroundColor: "hsl(217 50% 5%)",
                border: "1px solid hsl(36 33% 95% / 0.10)",
              }}
            >
              <div className="space-y-6">
                <ResultRow
                  label="תשלום חודשי משוער"
                  value={`${formatILS(calc.monthly)} ₪`}
                  big
                  highlight
                />
                <div className="grid grid-cols-2 gap-6">
                  <ResultRow
                    label="קרן (משכנתא)"
                    value={`${formatILS(calc.principal)} ₪`}
                  />
                  <ResultRow
                    label={`יחס מינוף (LTV)`}
                    value={`${(calc.ltv * 100).toFixed(0)}%`}
                  />
                  <ResultRow
                    label="סך ריבית לאורך התקופה"
                    value={`${formatILS(calc.interest)} ₪`}
                  />
                  <ResultRow
                    label="סך תשלום לבנק"
                    value={`${formatILS(calc.totalPaid)} ₪`}
                  />
                </div>

                {/* mini visual: principal vs interest */}
                <PrincipalInterestBar
                  principal={calc.principal}
                  interest={calc.interest}
                />
              </div>

              <div
                className="mt-8 pt-6 border-t flex items-start gap-3"
                style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}
              >
                <div
                  className="w-2 h-2 rounded-full mt-2"
                  style={{ backgroundColor: "hsl(var(--accent))" }}
                />
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "hsl(36 33% 95% / 0.7)" }}
                >
                  זה מסך אחד. בקורס מחכים לכם 7 מחשבונים נוספים — מס רכישה, מס שבח,
                  שכר דירה אלטרנטיבי, פוטנציאל השבחה, ROI שנתי, נקודת איזון, יחס
                  כיסוי. כל מה שאנליסט שלנו רואה לפני חתימה.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const CalcSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) => (
  <div>
    <div className="flex items-baseline justify-between mb-3">
      <span
        className="text-eyebrow uppercase tracking-[0.18em]"
        style={{ color: "hsl(36 33% 95% / 0.7)" }}
      >
        {label}
      </span>
      <span className="font-mono tabular-nums text-lg font-bold text-accent">
        {format(value)}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-1 rounded-full appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(217_50%_8%)]"
      style={{
        background: `linear-gradient(to left, hsl(var(--accent)) 0%, hsl(var(--accent)) ${
          ((value - min) / (max - min)) * 100
        }%, hsl(36 33% 95% / 0.15) ${
          ((value - min) / (max - min)) * 100
        }%, hsl(36 33% 95% / 0.15) 100%)`,
      }}
    />
  </div>
);

const ResultRow = ({
  label,
  value,
  big = false,
  highlight = false,
}: {
  label: string;
  value: string;
  big?: boolean;
  highlight?: boolean;
}) => (
  <div>
    <div
      className="text-eyebrow uppercase tracking-[0.18em] mb-1"
      style={{ color: "hsl(36 33% 95% / 0.55)" }}
    >
      {label}
    </div>
    <div
      className={`font-mono tabular-nums font-black leading-none ${
        big ? "text-4xl md:text-5xl" : "text-xl md:text-2xl"
      } ${highlight ? "text-accent" : "text-white"}`}
    >
      {value}
    </div>
  </div>
);

const PrincipalInterestBar = ({
  principal,
  interest,
}: {
  principal: number;
  interest: number;
}) => {
  const total = principal + interest;
  const principalPct = total ? (principal / total) * 100 : 0;
  return (
    <div>
      <div
        className="flex h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "hsl(36 33% 95% / 0.10)" }}
      >
        <span
          className="block transition-[width] duration-300"
          style={{
            width: `${principalPct}%`,
            backgroundColor: "hsl(36 33% 95% / 0.65)",
          }}
        />
        <span
          className="block transition-[width] duration-300"
          style={{
            width: `${100 - principalPct}%`,
            backgroundColor: "hsl(var(--accent))",
          }}
        />
      </div>
      <div
        className="flex items-center justify-between mt-2 text-xs font-mono uppercase tracking-[0.14em]"
        style={{ color: "hsl(36 33% 95% / 0.55)" }}
      >
        <span>קרן {principalPct.toFixed(0)}%</span>
        <span>ריבית {(100 - principalPct).toFixed(0)}%</span>
      </div>
    </div>
  );
};

/* --------------------------- Chapter 3: Proof -------------------------- */

const CASES = [
  {
    addr: "ת״א · רוטשילד",
    type: "דירת 3 חדרים · קומה 4",
    price: "2.85 מ׳ ₪",
    saved: "78,000 ₪",
    note: "זוהה בעיית רעש לפני חתימה. הוצאות שיפוץ צמצמו את המחיר ב-3.4%.",
  },
  {
    addr: "חיפה · כרמל",
    type: "דירת 4 חדרים · גן",
    price: "1.62 מ׳ ₪",
    saved: "42,000 ₪",
    note: "מתחם פיתוח עירוני בעוד 2 שנים. שווי משוער עולה ב-12% עד 2028.",
  },
  {
    addr: "רמת גן · מרום נווה",
    type: "פנטהאוז 5 חדרים",
    price: "2.10 מ׳ ₪",
    saved: "61,000 ₪",
    note: "השוואת מימון מ-3 בנקים. ירידת ריבית של 0.4% פרושה 61K לאורך משכנתא.",
  },
];

const Proof = () => (
  <section className="py-section-lg bg-background">
    <div className="container mx-auto px-6">
      <div className="max-w-3xl mb-12 lg:mb-16">
        <Eyebrow>פרק 03 · הוכחה</Eyebrow>
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black text-primary leading-[0.98] tracking-tight">
            עסקאות מהחודש האחרון.
            <br />
            <span className="text-accent">לא testimonial — ניתוח.</span>
          </h2>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {CASES.map((c, i) => (
          <Reveal key={c.addr} delay={i * 0.12}>
            <article
              className="h-full p-6 lg:p-8 bg-card rounded-2xl shadow-depth-2 border border-border/40 flex flex-col"
            >
              <div className="text-eyebrow uppercase tracking-[0.18em] text-accent mb-2 font-mono">
                CASE #{(i + 1).toString().padStart(2, "0")}
              </div>
              <div className="text-xl font-bold text-primary mb-1">{c.addr}</div>
              <div className="text-sm text-muted-foreground mb-6">{c.type}</div>

              <dl className="grid grid-cols-2 gap-4 mb-6 pt-6 border-t border-border">
                <div>
                  <dt className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    מחיר עסקה
                  </dt>
                  <dd className="font-mono tabular-nums text-lg font-bold text-primary">
                    {c.price}
                  </dd>
                </div>
                <div>
                  <dt className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-1">
                    חיסכון
                  </dt>
                  <dd className="font-mono tabular-nums text-lg font-bold text-accent">
                    {c.saved}
                  </dd>
                </div>
              </dl>

              <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                {c.note}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

/* --------------------------- Founders / About -------------------------- */

const Founders = () => (
  <section
    className="py-section-lg relative overflow-hidden"
    style={{ backgroundColor: "hsl(36 33% 95%)" }}
  >
    <div className="container mx-auto px-6 grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">
      <Reveal>
        <ClipImage
          src={founders}
          alt="איתמר נחליאל ואלמוג חכמה — מייסדי קרנף נדל״ן"
          ratio="aspect-[4/5]"
          className="rounded-2xl shadow-depth-3 max-w-md"
        />
      </Reveal>

      <div>
        <Eyebrow>פרק 04 · הצוות</Eyebrow>
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black text-primary leading-[0.98] tracking-tight mb-6">
            איתמר ואלמוג.
            <br />
            <span className="text-accent">הקרנף שמאחורי הקרנף.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-body-lg text-muted-foreground leading-[1.85] mb-6 max-w-[52ch]">
            8 שנים. שתי דירות שעלו לנו 60K בטעויות. המון לילות בקריאת תיק נכס.
            ההבטחה שלנו פשוטה — אנליסט שלנו עונה לכם תוך שעה ביום עסקים. גם בערב
            של יום שבת.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="flex items-baseline gap-6 pt-6 border-t border-primary/15">
            <div>
              <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-1">
                איתמר נחליאל
              </div>
              <div className="text-sm text-primary/70">אנליסט נדל״ן · משא ומתן</div>
            </div>
            <div>
              <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-1">
                אלמוג חכמה
              </div>
              <div className="text-sm text-primary/70">ניתוח שוק · דאטה</div>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  </section>
);

/* --------------------------- Final CTA Block --------------------------- */

const FinalCTA = () => (
  <section
    className="py-section-lg relative overflow-hidden"
    style={{ backgroundColor: "hsl(217 50% 8%)", color: "hsl(36 33% 95%)" }}
  >
    <div
      className="absolute inset-0 pointer-events-none opacity-50"
      aria-hidden="true"
      style={{
        background:
          "radial-gradient(60% 80% at 50% 100%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
      }}
    />
    <div className="absolute inset-0 grain-texture pointer-events-none" />

    <div className="relative container mx-auto px-6 text-center max-w-3xl">
      <Eyebrow>פרק 05 · הצעד הבא</Eyebrow>
      <Reveal>
        <h2 className="text-display-md md:text-display-xl font-black leading-[0.98] tracking-tight mb-6">
          30 דקות.
          <br />
          <span className="text-accent">אבחון חינם.</span>
          <br />
          אם השיטה לא מתאימה — אומרים לכם ישר.
        </h2>
      </Reveal>
      <Reveal delay={0.12}>
        <p
          className="text-body-lg max-w-[52ch] mx-auto mb-10 leading-relaxed"
          style={{ color: "hsl(36 33% 95% / 0.72)" }}
        >
          תשובה תוך שעה ביום עסקים. בלי טפסים מתישים, בלי דחיפויות מזויפות.
        </p>
      </Reveal>
      <Reveal delay={0.18}>
        <div className="inline-flex flex-col sm:flex-row gap-3 sm:gap-5 items-center">
          <Link to="/contact">
            <button className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-5 rounded-full transition-all">
              להזמין ניתוח חינם
              <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
                ←
              </span>
            </button>
          </Link>
          <a
            href="https://wa.me/972559966175"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold transition-colors underline-offset-4 hover:underline"
            style={{ color: "hsl(36 33% 95% / 0.85)" }}
          >
            או — WhatsApp ישירות
          </a>
        </div>
      </Reveal>
    </div>
  </section>
);

/* --------------------------- Sticky Bottom CTA -------------------------- */

const StickyCTA = () => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setVisible(v > 0.3 && v < 0.95));
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
    >
      {/* progress fill */}
      <div className="h-px bg-white/15">
        <motion.div
          className="h-full bg-accent origin-right"
          style={{ scaleX: smooth }}
        />
      </div>

      <div
        className="pointer-events-auto"
        style={{
          backgroundColor: "hsl(217 50% 8% / 0.92)",
          color: "hsl(36 33% 95%)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span
              aria-hidden
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "hsl(var(--accent))" }}
            />
            <span className="text-eyebrow uppercase tracking-[0.18em] text-white/75">
              30 דקות · חינם · ללא התחייבות
            </span>
          </div>
          <div className="md:hidden text-sm font-semibold text-white/85">
            ניתוח חינם · 30 דקות
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/972559966175"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-sm font-semibold text-white/80 hover:text-accent transition-colors px-3 py-2"
            >
              WhatsApp
            </a>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm md:text-base px-5 md:px-7 py-2.5 md:py-3 rounded-full hover:bg-accent/90 transition-colors">
                להזמין ניתוח
                <span aria-hidden>←</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ------------------------------- Page --------------------------------- */

const PreviewV2 = () => {
  return (
    <div className="bg-background text-foreground">
      <Hero />
      <Crisis />
      <Method />
      <Proof />
      <Founders />
      <FinalCTA />
      <StickyCTA />
    </div>
  );
};

export default PreviewV2;
