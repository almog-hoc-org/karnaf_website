import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TOC = [
  { num: "01", title: "מספרים ולא תחושות", note: "8 שנות מחקר" },
  { num: "02", title: "השיטה — הדרך לדירה", note: "תוכנית ליווי" },
  { num: "03", title: "הצוות שמלווה אתכם", note: "איתמר ואלמוג" },
  { num: "04", title: "לקוחות מספרים", note: "375+ עסקאות" },
  { num: "05", title: "הצעד הבא", note: "וובינר חינם" },
];

const METHOD = [
  {
    num: "01",
    title: "מיפוי הצרכים",
    lead:
      "פגישת אבחון של 90 דקות. אנחנו ממפים מה שיא התקציב, מה האזור המתאים ומה רמת הסיכון שאתם מוכנים להחזיק.",
    bullets: [
      "אבחון פיננסי מלא",
      "מיפוי שכונות מועדפות",
      "תרחישי משכנתא",
    ],
  },
  {
    num: "02",
    title: "ניתוח עסקאות",
    lead:
      "כל עסקה שאתם בוחנים עוברת אצלנו ניתוח דאטה: מחיר למ״ר היסטורי, פוטנציאל השבחה, סיכונים משפטיים, ROI.",
    bullets: [
      "מחשבון עסקת נדל״ן",
      "ניתוח שכונה לעומק",
      "צ׳קליסט ביקור בנכס",
    ],
  },
  {
    num: "03",
    title: "ליווי עד החתימה",
    lead:
      "אנליסט נדל״ן צמוד בוואטסאפ — שאלה, תשובה תוך שעה. מהמשא ומתן ועד החתימה אצל עו״ד, אתם לא לבד.",
    bullets: [
      "ליווי וואטסאפ צמוד",
      "תמיכה במשא ומתן",
      "ליווי משפטי",
    ],
  },
];

const FloorPlanSVG = () => (
  <svg
    viewBox="0 0 480 620"
    fill="none"
    stroke="hsl(var(--primary))"
    strokeWidth="1.5"
    className="w-full max-w-[480px] mx-auto"
    aria-hidden="true"
  >
    {/* outer wall */}
    <rect x="30" y="40" width="420" height="540" stroke="hsl(var(--primary))" strokeWidth="2" />
    {/* interior walls */}
    <line x1="30" y1="250" x2="290" y2="250" />
    <line x1="290" y1="40" x2="290" y2="250" />
    <line x1="180" y1="250" x2="180" y2="420" />
    <line x1="30" y1="420" x2="450" y2="420" />
    {/* door arcs */}
    <path d="M 70 250 A 30 30 0 0 1 100 280" />
    <path d="M 200 420 A 30 30 0 0 1 230 450" />
    <path d="M 320 420 A 30 30 0 0 1 350 450" />
    {/* window cuts on outer wall */}
    <line x1="110" y1="40" x2="200" y2="40" stroke="hsl(var(--background))" strokeWidth="4" />
    <line x1="110" y1="42" x2="200" y2="42" stroke="hsl(var(--primary))" strokeWidth="0.75" />
    <line x1="110" y1="38" x2="200" y2="38" stroke="hsl(var(--primary))" strokeWidth="0.75" />
    <line x1="320" y1="40" x2="410" y2="40" stroke="hsl(var(--background))" strokeWidth="4" />
    <line x1="320" y1="42" x2="410" y2="42" stroke="hsl(var(--primary))" strokeWidth="0.75" />
    <line x1="320" y1="38" x2="410" y2="38" stroke="hsl(var(--primary))" strokeWidth="0.75" />
    {/* room labels (Hebrew right-aligned via SVG text-anchor end + dir) */}
    <g fill="hsl(var(--primary))" stroke="none" fontSize="13" fontWeight="500" textAnchor="middle">
      <text x="160" y="150">סלון</text>
      <text x="370" y="150">חדר עבודה</text>
      <text x="105" y="335">חדר שינה</text>
      <text x="320" y="335">חדר ילד</text>
      <text x="240" y="505">מטבח</text>
    </g>
    {/* dim annotations */}
    <g stroke="hsl(var(--accent))" strokeDasharray="3 3" strokeWidth="1">
      <line x1="30" y1="600" x2="450" y2="600" />
      <line x1="30" y1="595" x2="30" y2="605" />
      <line x1="450" y1="595" x2="450" y2="605" />
    </g>
    <text x="240" y="615" textAnchor="middle" fontSize="11" fill="hsl(var(--accent))" stroke="none" fontWeight="600">
      8.40 מ׳
    </text>
    {/* metadata corner */}
    <g fill="hsl(var(--primary))" stroke="none" fontSize="10" letterSpacing="2" fontWeight="500">
      <text x="30" y="22">DRAWING · 04 / 2026</text>
      <text x="450" y="22" textAnchor="end">SCALE 1:50</text>
    </g>
  </svg>
);

const PreviewDossier = () => {
  return (
    <div
      className="min-h-screen text-foreground"
      style={{
        backgroundColor: "hsl(36 38% 95%)",
        backgroundImage:
          "radial-gradient(hsl(var(--primary) / 0.07) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }}
    >
      {/* Issue meta bar */}
      <div className="border-b border-primary/20">
        <div className="container mx-auto px-6 py-3 flex items-center justify-between text-eyebrow uppercase text-primary/70">
          <span className="tracking-[0.18em]">קרנף נדל״ן · גליון 04 · מאי 2026</span>
          <span className="hidden sm:block tracking-[0.18em]">תיק לקוח · גרסה ציבורית</span>
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-16 lg:pt-24 pb-20 lg:pb-32 grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-12 lg:gap-20 items-center">
        <div>
          <div className="text-eyebrow uppercase text-accent mb-6 tracking-[0.22em]">
            פרק 01 · המקרה
          </div>

          <h1 className="font-black leading-[0.92] mb-6">
            <span className="block text-display-lg md:text-display-xl text-primary">
              לקנות דירה
            </span>
            <span className="block text-display-md md:text-display-lg text-primary/60 italic font-light mt-2">
              זאת לא הימור.
            </span>
            <span className="block text-display-lg md:text-display-xl text-primary mt-1">
              זה <span className="text-accent">תהליך</span>.
            </span>
          </h1>

          {/* drop-cap lead */}
          <p className="text-body-lg text-primary/80 leading-[1.7] max-w-[44ch] mb-8">
            <span className="float-right text-display-lg leading-[0.85] me-2 text-accent font-black">״</span>
            כשהבית הראשון שלנו עלה לנו 60,000 ₪ בטעות אחת, הבנו ששיטה צריך להחליף תחושת בטן. שמונה שנות מחקר אחר כך — קרנף נדל״ן הוא התיק שאנחנו עצמנו היינו שמחים לקבל ביום הראשון.
          </p>

          {/* byline */}
          <div className="flex items-center gap-4 mb-10 pt-6 border-t border-primary/20">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
              א•א
            </div>
            <div className="text-sm text-primary/70 leading-tight">
              <div className="font-bold text-primary">איתמר נחליאל ואלמוג חכמה</div>
              <div className="text-eyebrow uppercase tracking-[0.18em] mt-0.5">
                מייסדים · 8 שנות מחקר · 375 עסקאות מלוות
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/course">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 rounded-none"
              >
                להתחיל את התיק שלכם ←
              </Button>
            </Link>
            <a
              href="#toc"
              className="inline-flex items-center text-primary/70 hover:text-accent transition-colors text-base font-semibold underline-offset-4 hover:underline self-center"
            >
              לתוכן הגליון
            </a>
          </div>
        </div>

        {/* Floor plan illustration */}
        <div className="relative">
          <div className="absolute -top-3 right-0 text-eyebrow uppercase tracking-[0.22em] text-primary/50">
            איור 01
          </div>
          <FloorPlanSVG />
          <p className="text-eyebrow uppercase tracking-[0.22em] text-primary/50 text-center mt-4">
            תוכנית טיפוסית · דירת 4 חדרים · קומה 3
          </p>
        </div>
      </section>

      {/* TOC bar */}
      <section id="toc" className="border-y border-primary/20 bg-primary/[0.03]">
        <div className="container mx-auto px-6 py-10">
          <div className="text-eyebrow uppercase text-accent mb-6 tracking-[0.22em]">
            תוכן עניינים
          </div>
          <ol className="grid md:grid-cols-5 gap-6 md:gap-4">
            {TOC.map((row) => (
              <li key={row.num} className="border-t border-primary pt-3 group cursor-default">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-mono text-accent text-sm font-bold">{row.num}</span>
                  <span className="font-bold text-primary group-hover:text-accent transition-colors">
                    {row.title}
                  </span>
                </div>
                <span className="text-eyebrow uppercase tracking-[0.18em] text-primary/55">
                  {row.note}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Method spread */}
      <section className="container mx-auto px-6 py-section-md">
        <div className="text-eyebrow uppercase text-accent mb-3 tracking-[0.22em]">
          פרק 02
        </div>
        <h2 className="text-display-md md:text-display-lg font-black text-primary mb-12 leading-[1] max-w-2xl">
          השיטה — הדרך לדירה הנכונה.
        </h2>

        <div className="grid lg:grid-cols-3 gap-10 lg:gap-14">
          {METHOD.map((item) => (
            <article key={item.num} className="border-t border-primary pt-6">
              <div className="font-mono text-display-lg font-black text-accent leading-[0.85] mb-4">
                {item.num}
              </div>
              <h3 className="text-display-sm font-bold text-primary mb-3 leading-tight">
                {item.title}
              </h3>
              <p className="text-body text-primary/75 leading-[1.7] mb-6">
                {item.lead}
              </p>
              <ul className="space-y-2 text-sm text-primary/70">
                {item.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2">
                    <span className="text-accent mt-1">·</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Footer note */}
      <section className="border-t border-primary/20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-16 grid md:grid-cols-[1.5fr_1fr] gap-10 items-end">
          <div>
            <div className="text-eyebrow uppercase tracking-[0.22em] text-accent mb-4">
              צעד הבא · פרק 05
            </div>
            <h2 className="text-display-md md:text-display-lg font-black mb-4 leading-[1]">
              קבעו פגישת אבחון של 30 דקות. ללא תשלום.
            </h2>
            <p className="text-primary-foreground/70 text-body-lg max-w-md mb-6">
              אנחנו מאזינים, ממפים, מציעים. אם זה לא מתאים — אומרים את זה ישר.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold rounded-none px-8 py-6"
              >
                לקבוע פגישה ←
              </Button>
            </Link>
          </div>
          <div className="text-eyebrow uppercase tracking-[0.22em] text-primary-foreground/50 text-end">
            <div>קרנף נדל״ן</div>
            <div className="mt-1">est. 2018 · ת״א</div>
            <div className="mt-1">סוף פרק 01</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviewDossier;
