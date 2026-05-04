import { Link } from "react-router-dom";

const STATS = [
  { value: "8", label: "שנות מחקר" },
  { value: "375", label: "עסקאות מלוות" },
  { value: "50", label: "שיעורים בתוכנית" },
];

const PRINCIPLES = [
  {
    num: "I.",
    title: "השקט מלפני העסקה",
    body:
      "אי-החלטה היא החלטה. השיטה שלנו מסירה את הרעש מהדרך — מה לבדוק, מה להתעלם, מתי לוותר. בלי דחיפות מזויפות, בלי אינטואיציה.",
  },
  {
    num: "II.",
    title: "מחיר אמיתי, לא רק תווית",
    body:
      "כל עסקה עוברת אצלנו ניתוח של עלות מול שווי לאורך עשור. נתונים היסטוריים, פוטנציאל השבחה, סיכונים נסתרים. מה שנשאר אחרי שמורידים את ההייפ.",
  },
  {
    num: "III.",
    title: "ליווי בקול שקט",
    body:
      "לא צוות מכירות. אנליסט אחד, צמוד, בוואטסאפ. שואל שאלות שמנפות, ולא מנסה למכור — מנסה להבין.",
  },
];

const BuildingSilhouette = () => (
  <svg
    viewBox="0 0 280 720"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className="w-full max-w-[280px] mx-auto text-primary"
    aria-hidden="true"
  >
    {/* ground line */}
    <line x1="0" y1="700" x2="280" y2="700" strokeWidth="0.75" />
    {/* base plinth */}
    <rect x="20" y="660" width="240" height="40" strokeWidth="0.75" />
    {/* main tower */}
    <rect x="50" y="120" width="180" height="540" strokeWidth="1.25" />
    {/* setback top */}
    <rect x="70" y="60" width="140" height="60" strokeWidth="1.25" />
    {/* spire */}
    <rect x="135" y="20" width="10" height="40" strokeWidth="1" />
    {/* horizontal floor bands */}
    {[60, 120, 180, 240, 300, 360, 420, 480, 540, 600].map((y) => (
      <line key={y} x1="50" y1={y} x2="230" y2={y} strokeWidth="0.4" opacity="0.5" />
    ))}
    {/* window grid: 4 columns × 8 rows */}
    {Array.from({ length: 9 }).map((_, row) => (
      Array.from({ length: 4 }).map((__, col) => (
        <rect
          key={`${row}-${col}`}
          x={70 + col * 40}
          y={140 + row * 56}
          width="22"
          height="28"
          strokeWidth="0.55"
        />
      ))
    ))}
    {/* entrance */}
    <rect x="125" y="630" width="30" height="30" strokeWidth="1" />
    <line x1="140" y1="630" x2="140" y2="660" strokeWidth="0.5" />
    {/* gold thin marker — horizon line */}
    <line x1="0" y1="700" x2="280" y2="700" stroke="hsl(var(--accent))" strokeWidth="0.5" />
  </svg>
);

const PreviewAtelier = () => {
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "hsl(36 30% 92%)",
        color: "hsl(217 50% 8%)",
      }}
    >
      {/* Top hairline + monogram */}
      <header className="border-b" style={{ borderColor: "hsl(217 50% 8% / 0.15)" }}>
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="text-eyebrow uppercase tracking-[0.32em]" style={{ color: "hsl(217 50% 8% / 0.7)" }}>
            ק · קרנף נדל״ן
          </div>
          <div className="text-eyebrow uppercase tracking-[0.32em]" style={{ color: "hsl(217 50% 8% / 0.5)" }}>
            est. 2018
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-6 pt-24 lg:pt-40 pb-32 lg:pb-44 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-16 lg:gap-24">
        <div className="lg:col-start-1 lg:row-start-1">
          {/* eyebrow with thin gold rule */}
          <div className="flex items-center gap-4 mb-12">
            <span className="block w-12 h-px" style={{ backgroundColor: "hsl(var(--accent))" }} />
            <span className="text-eyebrow uppercase tracking-[0.32em]" style={{ color: "hsl(var(--accent))" }}>
              ליווי נדל״ן · ת״א
            </span>
          </div>

          <h1
            className="font-bold leading-[0.98] mb-12 max-w-[14ch]"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 5.75rem)",
              letterSpacing: "-0.025em",
            }}
          >
            דירה אחת, פעם בחיים.
            <br />
            <span style={{ color: "hsl(217 50% 8% / 0.55)" }}>
              לא מקום לטעות.
            </span>
          </h1>

          <p
            className="text-body-lg max-w-[48ch] leading-[1.85] mb-16"
            style={{ color: "hsl(217 50% 8% / 0.72)" }}
          >
            מאז 2018 ליווינו 375 משפחות בעסקה הגדולה של חייהן. בלי קסמים. שיטה שקטה, ניתוח קר, וליווי שמבוסס על דאטה — לא על תחושת בטן.
          </p>

          <div className="flex items-center gap-8 flex-wrap">
            <Link to="/course">
              <button
                className="text-base font-semibold px-10 py-4 transition-colors"
                style={{
                  backgroundColor: "hsl(217 50% 8%)",
                  color: "hsl(36 30% 92%)",
                  borderRadius: 0,
                }}
              >
                לקבוע פגישה ←
              </button>
            </Link>
            <a
              href="#principles"
              className="text-base font-semibold transition-colors hover:opacity-70 underline-offset-[6px] hover:underline"
              style={{ color: "hsl(217 50% 8%)" }}
            >
              שלוש העקרונות שלנו
            </a>
          </div>
        </div>

        {/* Building silhouette */}
        <div className="lg:col-start-2 lg:row-start-1 flex items-end justify-center">
          <BuildingSilhouette />
        </div>
      </section>

      {/* Stats — quiet ink section */}
      <section
        className="py-section-lg"
        style={{
          backgroundColor: "hsl(217 50% 8%)",
          color: "hsl(36 30% 92%)",
        }}
      >
        <div className="container mx-auto px-6">
          <div
            className="text-eyebrow uppercase tracking-[0.32em] mb-16 text-center"
            style={{ color: "hsl(var(--accent))" }}
          >
            הוכחה · בלי שיווק
          </div>
          <div className="grid md:grid-cols-3 gap-16 md:gap-8 max-w-5xl mx-auto">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div
                  className="font-bold tabular-nums leading-none mb-6"
                  style={{
                    fontSize: "clamp(4rem, 9vw, 8rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.value}
                </div>
                <div
                  className="block w-12 h-px mx-auto mb-6"
                  style={{ backgroundColor: "hsl(var(--accent))" }}
                />
                <div className="text-eyebrow uppercase tracking-[0.32em]" style={{ color: "hsl(36 30% 92% / 0.7)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles — three calm cards, no decoration */}
      <section id="principles" className="container mx-auto px-6 py-section-lg">
        <div className="flex items-center gap-4 mb-10">
          <span className="block w-12 h-px" style={{ backgroundColor: "hsl(var(--accent))" }} />
          <span className="text-eyebrow uppercase tracking-[0.32em]" style={{ color: "hsl(var(--accent))" }}>
            שלוש עקרונות
          </span>
        </div>
        <h2
          className="font-bold leading-[1] mb-20 max-w-[18ch]"
          style={{ fontSize: "clamp(2rem, 4vw, 3.75rem)", letterSpacing: "-0.02em" }}
        >
          לא מהירים. <span style={{ color: "hsl(217 50% 8% / 0.55)" }}>נכונים.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-16 md:gap-12">
          {PRINCIPLES.map((p) => (
            <article key={p.num}>
              <div
                className="font-bold mb-6"
                style={{ fontSize: "1.25rem", color: "hsl(var(--accent))", letterSpacing: "0.05em" }}
              >
                {p.num}
              </div>
              <h3
                className="font-bold mb-5 leading-tight"
                style={{ fontSize: "1.5rem", letterSpacing: "-0.01em" }}
              >
                {p.title}
              </h3>
              <p className="text-body leading-[1.85]" style={{ color: "hsl(217 50% 8% / 0.72)" }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      {/* Closing band */}
      <section
        className="border-t"
        style={{ borderColor: "hsl(217 50% 8% / 0.15)" }}
      >
        <div className="container mx-auto px-6 py-section-md text-center">
          <div className="text-eyebrow uppercase tracking-[0.32em] mb-6" style={{ color: "hsl(var(--accent))" }}>
            ההזמנה
          </div>
          <h2
            className="font-bold mb-8 max-w-[20ch] mx-auto leading-[1]"
            style={{ fontSize: "clamp(2rem, 4.5vw, 4rem)", letterSpacing: "-0.025em" }}
          >
            מקום אחד פנוי בחודש.
            <br />
            <span style={{ color: "hsl(217 50% 8% / 0.55)" }}>זה יכול להיות שלכם.</span>
          </h2>
          <Link to="/contact">
            <button
              className="text-base font-semibold px-12 py-5 transition-colors"
              style={{
                backgroundColor: "hsl(217 50% 8%)",
                color: "hsl(36 30% 92%)",
                borderRadius: 0,
              }}
            >
              לקבוע פגישת אבחון ←
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PreviewAtelier;
