import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TIMELINE = [
  { step: "01", label: "אבחון", duration: "90 דק׳", state: "done" },
  { step: "02", label: "מיפוי שוק", duration: "5–7 ימים", state: "done" },
  { step: "03", label: "סינון נכסים", duration: "2–4 שב׳", state: "active" },
  { step: "04", label: "ניתוח מעמיק", duration: "3–5 ימים", state: "pending" },
  { step: "05", label: "משא ומתן", duration: "1–3 שב׳", state: "pending" },
  { step: "06", label: "חתימה", duration: "1 יום", state: "pending" },
];

const SAMPLE_TX = [
  { addr: "ת״א · רוטשילד", price: "2.85 מ׳", saved: "78K", roi: "+9.2%" },
  { addr: "חיפה · כרמל", price: "1.62 מ׳", saved: "42K", roi: "+6.8%" },
  { addr: "ר״ג · מרום", price: "2.10 מ׳", saved: "61K", roi: "+8.1%" },
];

const HERO_STATS = [
  { value: "375", label: "עסקאות מלוות", trend: [4, 6, 5, 8, 9, 12, 14, 18, 21, 26] },
  { value: "8.4%", label: "ROI ממוצע", trend: [5, 6, 5, 7, 8, 7, 9, 10, 9, 11] },
  { value: "62K", label: "חיסכון ממוצע ₪", trend: [3, 4, 6, 5, 7, 9, 8, 11, 10, 13] },
];

const Sparkline = ({
  values,
  width = 120,
  height = 32,
  color = "hsl(var(--accent))",
}: {
  values: number[];
  width?: number;
  height?: number;
  color?: string;
}) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const stepX = width / (values.length - 1);
  const points = values
    .map((v, i) => `${i * stepX},${height - ((v - min) / range) * height}`)
    .join(" ");
  const last = values[values.length - 1];
  const lastX = (values.length - 1) * stepX;
  const lastY = height - ((last - min) / range) * height;
  return (
    <svg width={width} height={height + 6} className="overflow-visible">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={lastX} cy={lastY} r="2.5" fill={color} />
    </svg>
  );
};

const MortgageChart = () => {
  // 30-year mortgage breakdown: principal grows, interest shrinks
  const years = Array.from({ length: 30 }, (_, i) => i + 1);
  const totalPay = 100;
  const data = years.map((y) => {
    const principal = Math.min(95, 5 + (y / 30) * 90);
    const interest = totalPay - principal;
    return { y, principal, interest };
  });
  const W = 460;
  const H = 220;
  const stepX = W / data.length;
  const barW = stepX * 0.65;
  return (
    <svg viewBox={`0 0 ${W} ${H + 28}`} className="w-full" aria-hidden="true">
      {/* axes */}
      <line x1="0" y1={H} x2={W} y2={H} stroke="hsl(var(--primary) / 0.15)" />
      <line x1="0" y1="0" x2="0" y2={H} stroke="hsl(var(--primary) / 0.15)" />
      {/* bars: stacked principal/interest */}
      {data.map((d, i) => {
        const principalH = (d.principal / 100) * H;
        const interestH = (d.interest / 100) * H;
        return (
          <g key={d.y}>
            <rect
              x={i * stepX + (stepX - barW) / 2}
              y={H - interestH}
              width={barW}
              height={interestH}
              fill="hsl(var(--primary) / 0.30)"
            />
            <rect
              x={i * stepX + (stepX - barW) / 2}
              y={H - interestH - principalH}
              width={barW}
              height={principalH}
              fill="hsl(var(--accent))"
            />
          </g>
        );
      })}
      {/* labels */}
      <text x="0" y={H + 18} fontSize="10" fill="hsl(var(--primary) / 0.55)" letterSpacing="1">
        שנה 01
      </text>
      <text x={W} y={H + 18} fontSize="10" fill="hsl(var(--primary) / 0.55)" letterSpacing="1" textAnchor="end">
        שנה 30
      </text>
    </svg>
  );
};

const PreviewWorkshop = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top metadata bar */}
      <div className="border-b border-border bg-background">
        <div className="container mx-auto px-6 py-2 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="font-mono">KARNAF · LIVE · {new Date().toLocaleDateString("he-IL")}</span>
          <span className="font-mono hidden sm:block">דאשבורד פיננסי · גרסה ציבורית 04.2026</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative">
        {/* Faint 12-col grid lines at edges (decorative annotation) */}
        <div className="hidden lg:flex absolute inset-y-0 left-0 right-0 pointer-events-none">
          <div className="container mx-auto px-6 grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-l border-primary/[0.05] h-full" />
            ))}
          </div>
        </div>

        <div className="container mx-auto px-6 pt-20 lg:pt-28 pb-16 grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-12 items-start">
          <div className="relative">
            {/* dimension annotation top */}
            <div className="hidden lg:flex items-center gap-2 absolute -top-6 right-0 text-[10px] font-mono uppercase tracking-[0.18em] text-accent">
              <span className="w-3 h-px bg-accent" />
              <span>HERO · 92vh</span>
              <span className="w-3 h-px bg-accent" />
            </div>

            <div className="text-eyebrow uppercase tracking-[0.22em] text-accent mb-5 font-mono">
              <span className="opacity-60">/</span> ANALYTICS · רכישת דירה כתהליך נמדד
            </div>

            <h1 className="text-display-lg md:text-display-xl font-black text-primary leading-[0.92] mb-6 tracking-tight">
              דירה. בנתונים.
              <br />
              <span className="text-accent">ולא בתחושות.</span>
            </h1>

            <p className="text-body-lg text-muted-foreground max-w-[52ch] leading-[1.7] mb-8">
              כל עסקה שאתם בוחנים מקבלת אצלנו דוח: מחיר היסטורי למ״ר, פוטנציאל השבחה, חישוב משכנתא לעומק, יחס מינוף, סיכוני שכונה.
              לפני שאתם חותמים — אתם יודעים את התשובה.
            </p>

            <div className="flex flex-wrap gap-4 items-center">
              <Link to="/course">
                <Button
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold text-base px-8 py-6 gap-2"
                >
                  הפעל ניתוח
                  <span className="font-mono opacity-70">→</span>
                </Button>
              </Link>
              <a
                href="#timeline"
                className="text-sm font-mono uppercase tracking-[0.18em] text-muted-foreground hover:text-accent transition-colors"
              >
                ↓ תרשים תהליך
              </a>
            </div>
          </div>

          {/* Data card with mortgage chart */}
          <aside className="bg-card border border-border rounded-md shadow-depth-2 overflow-hidden">
            {/* card header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-primary/[0.03]">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span>SAMPLE · משכנתא 30 שנה</span>
              </div>
              <div className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
                ID #ANL-038
              </div>
            </div>
            {/* card body */}
            <div className="p-5">
              <div className="flex items-baseline justify-between mb-4">
                <div>
                  <div className="text-eyebrow uppercase text-muted-foreground tracking-[0.18em] mb-1">
                    תשלום חודשי
                  </div>
                  <div className="font-black text-display-md text-primary tabular-nums">
                    ₪ 8,420
                  </div>
                </div>
                <div className="text-end">
                  <div className="text-eyebrow uppercase text-muted-foreground tracking-[0.18em] mb-1">
                    יחס קרן/ריבית
                  </div>
                  <div className="text-sm font-mono">
                    <span className="text-accent font-bold">52</span>
                    <span className="text-muted-foreground">/</span>
                    <span className="text-primary/70 font-bold">48</span>
                  </div>
                </div>
              </div>
              <MortgageChart />
              <div className="flex items-center gap-4 mt-4 text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 bg-accent" />
                  קרן
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="inline-block w-3 h-3 bg-primary/30" />
                  ריבית
                </span>
              </div>
            </div>
          </aside>
        </div>

        {/* Stats strip with sparklines */}
        <div className="border-y border-border bg-card/40">
          <div className="container mx-auto px-6 grid sm:grid-cols-3 divide-x rtl:divide-x-reverse divide-border">
            {HERO_STATS.map((s) => (
              <div key={s.label} className="px-6 py-6 flex items-center justify-between gap-4">
                <div>
                  <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-1 font-mono">
                    {s.label}
                  </div>
                  <div className="text-display-sm md:text-display-md font-black text-primary tabular-nums leading-none">
                    {s.value}
                  </div>
                </div>
                <Sparkline values={s.trend} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transaction lifecycle timeline */}
      <section id="timeline" className="container mx-auto px-6 py-section-md">
        <div className="text-eyebrow uppercase tracking-[0.22em] text-accent mb-3 font-mono">
          /02 · LIFECYCLE
        </div>
        <h2 className="text-display-md md:text-display-lg font-black text-primary mb-12 leading-[1] max-w-3xl tracking-tight">
          ששה שלבים. אפס הפתעות.
        </h2>

        <div className="relative">
          {/* track */}
          <div className="absolute right-0 left-0 top-7 h-px bg-border" />
          <div className="absolute right-0 top-7 h-px bg-accent" style={{ width: "37%" }} />

          <ol className="grid grid-cols-3 md:grid-cols-6 gap-6 relative">
            {TIMELINE.map((t) => (
              <li key={t.step} className="relative">
                <div className="flex items-center justify-center mb-4">
                  <span
                    className={`w-4 h-4 rounded-full border-2 ${
                      t.state === "done"
                        ? "bg-accent border-accent"
                        : t.state === "active"
                        ? "bg-card border-accent ring-4 ring-accent/20"
                        : "bg-card border-border"
                    }`}
                  />
                </div>
                <div className="text-center">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent mb-1">
                    {t.step}
                  </div>
                  <div className="font-bold text-primary text-sm md:text-base mb-1 leading-tight">
                    {t.label}
                  </div>
                  <div className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground">
                    {t.duration}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Sample transactions table */}
      <section className="container mx-auto px-6 pb-section-md">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="text-eyebrow uppercase tracking-[0.22em] text-accent mb-2 font-mono">
              /03 · CASE LOG
            </div>
            <h2 className="text-display-sm md:text-display-md font-black text-primary leading-tight">
              דוגמאות מהחודש האחרון
            </h2>
          </div>
          <span className="text-[11px] font-mono uppercase tracking-[0.14em] text-muted-foreground hidden sm:block">
            anonymized
          </span>
        </div>
        <div className="border border-border rounded-md overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-primary/[0.03] text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-mono">
              <tr>
                <th className="text-start px-5 py-3">נכס</th>
                <th className="text-start px-5 py-3">מחיר עסקה</th>
                <th className="text-start px-5 py-3">חיסכון בזכות ניתוח</th>
                <th className="text-start px-5 py-3">ROI שנה ראשונה</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_TX.map((tx, i) => (
                <tr key={i} className={i > 0 ? "border-t border-border" : ""}>
                  <td className="px-5 py-4 font-bold text-primary">{tx.addr}</td>
                  <td className="px-5 py-4 font-mono tabular-nums text-foreground">{tx.price} ₪</td>
                  <td className="px-5 py-4 font-mono tabular-nums text-accent font-bold">{tx.saved} ₪</td>
                  <td className="px-5 py-4 font-mono tabular-nums text-accent font-bold">{tx.roi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* CTA band */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 py-section-md grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <div className="text-eyebrow uppercase tracking-[0.22em] text-accent mb-3 font-mono">
              /04 · ENGAGEMENT
            </div>
            <h2 className="text-display-md md:text-display-lg font-black mb-4 leading-[1] tracking-tight">
              להריץ ניתוח על העסקה שלכם?
            </h2>
            <p className="text-primary-foreground/70 max-w-md mb-6 text-body-lg leading-relaxed">
              30 דקות שיחה. אנחנו מבינים את התרחיש שלכם, מציגים בדיוק מה הניתוח כולל, ואומרים אם זה מתאים — או לא.
            </p>
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-bold text-base px-8 py-6 gap-2"
              >
                לקבוע ניתוח
                <span className="font-mono opacity-70">→</span>
              </Button>
            </Link>
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-foreground/45 leading-relaxed text-end">
            <div>METHODOLOGY · 8YR DATASET</div>
            <div>SOURCE · LAND REGISTRY ISRAEL</div>
            <div>CONFIDENCE · 95%</div>
            <div>UPDATED · {new Date().toLocaleDateString("he-IL")}</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviewWorkshop;
