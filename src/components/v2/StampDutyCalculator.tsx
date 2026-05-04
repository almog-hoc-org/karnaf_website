import { useMemo, useState } from "react";

/**
 * Israeli purchase tax (Mas Rechisha) brackets — 2025 indicative rates.
 * - First apartment (single home): progressive brackets, lowest first.
 * - Second / investment apartment: 8% from first shekel, 10% above ~6M.
 * Numbers are public knowledge but should be treated as illustrative —
 * Israeli ITA updates them yearly.
 */

interface Bracket {
  upTo: number | null; // null = infinity
  rate: number;
  label: string;
}

const FIRST_HOME_BRACKETS: Bracket[] = [
  { upTo: 1_978_745, rate: 0, label: "0%" },
  { upTo: 2_347_040, rate: 0.035, label: "3.5%" },
  { upTo: 6_055_070, rate: 0.05, label: "5%" },
  { upTo: 20_183_565, rate: 0.08, label: "8%" },
  { upTo: null, rate: 0.10, label: "10%" },
];

const INVESTOR_BRACKETS: Bracket[] = [
  { upTo: 6_055_070, rate: 0.08, label: "8%" },
  { upTo: null, rate: 0.10, label: "10%" },
];

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

interface Slice {
  from: number;
  to: number;
  rate: number;
  taxOnSlice: number;
}

const computeTax = (price: number, brackets: Bracket[]) => {
  const slices: Slice[] = [];
  let total = 0;
  let cursor = 0;

  for (const b of brackets) {
    const cap = b.upTo === null ? Infinity : b.upTo;
    if (price <= cursor) break;
    const sliceTo = Math.min(price, cap);
    const slice = sliceTo - cursor;
    const taxOnSlice = slice * b.rate;
    slices.push({ from: cursor, to: sliceTo, rate: b.rate, taxOnSlice });
    total += taxOnSlice;
    cursor = sliceTo;
    if (price <= cap) break;
  }

  return { total, slices };
};

type Mode = "first" | "investor";

export const StampDutyCalculator = () => {
  const [mode, setMode] = useState<Mode>("first");
  const [price, setPrice] = useState(2_400_000);

  const brackets = mode === "first" ? FIRST_HOME_BRACKETS : INVESTOR_BRACKETS;
  const { total, slices } = useMemo(
    () => computeTax(price, brackets),
    [price, brackets]
  );

  const effectiveRate = price > 0 ? total / price : 0;

  return (
    <div
      className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14 rounded-2xl p-6 md:p-10 backdrop-blur-sm"
      style={{
        backgroundColor: "hsl(36 33% 95% / 0.04)",
        border: "1px solid hsl(36 33% 95% / 0.12)",
      }}
    >
      <div className="space-y-8">
        <div className="text-eyebrow uppercase tracking-[0.22em] text-accent flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden
            style={{ boxShadow: "0 0 12px hsl(var(--accent))" }}
          />
          <span>מחשבון מס רכישה · live</span>
        </div>

        {/* Mode toggle */}
        <div
          role="tablist"
          aria-label="סוג רכישה"
          className="grid grid-cols-2 gap-1 p-1 rounded-full"
          style={{
            backgroundColor: "hsl(36 33% 95% / 0.06)",
            border: "1px solid hsl(36 33% 95% / 0.10)",
          }}
        >
          {[
            { key: "first" as const, label: "דירה יחידה" },
            { key: "investor" as const, label: "משקיע / דירה שנייה" },
          ].map((opt) => {
            const active = mode === opt.key;
            return (
              <button
                key={opt.key}
                role="tab"
                aria-selected={active}
                onClick={() => setMode(opt.key)}
                className="relative py-2.5 text-sm font-bold rounded-full transition-colors"
                style={{
                  backgroundColor: active ? "hsl(var(--accent))" : "transparent",
                  color: active ? "hsl(var(--accent-foreground))" : "hsl(36 33% 95% / 0.7)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        {/* Price slider */}
        <div>
          <div className="flex items-baseline justify-between mb-3">
            <span
              className="text-eyebrow uppercase tracking-[0.18em]"
              style={{ color: "hsl(36 33% 95% / 0.7)" }}
            >
              מחיר הדירה
            </span>
            <span className="font-mono tabular-nums text-lg font-bold text-accent">
              {formatILS(price)} ₪
            </span>
          </div>
          <input
            type="range"
            min={500_000}
            max={8_000_000}
            step={50_000}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full h-1 rounded-full appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(217_50%_8%)]"
            style={{
              background: `linear-gradient(to left, hsl(var(--accent)) 0%, hsl(var(--accent)) ${
                ((price - 500_000) / (8_000_000 - 500_000)) * 100
              }%, hsl(36 33% 95% / 0.15) ${
                ((price - 500_000) / (8_000_000 - 500_000)) * 100
              }%, hsl(36 33% 95% / 0.15) 100%)`,
            }}
          />
        </div>

        {/* Bracket breakdown */}
        <div>
          <p
            className="text-eyebrow uppercase tracking-[0.18em] mb-3"
            style={{ color: "hsl(36 33% 95% / 0.55)" }}
          >
            פירוט לפי מדרגות
          </p>
          <ul className="space-y-2">
            {slices.map((s, i) => (
              <li
                key={i}
                className="flex items-center justify-between text-sm font-mono tabular-nums"
                style={{ color: "hsl(36 33% 95% / 0.85)" }}
              >
                <span>
                  {formatILS(s.from)} – {formatILS(s.to)} ₪
                </span>
                <span>
                  {(s.rate * 100).toFixed(1)}% · {formatILS(s.taxOnSlice)} ₪
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="text-xs font-mono uppercase tracking-[0.18em]"
          style={{ color: "hsl(36 33% 95% / 0.5)" }}
        >
          * מדרגות 2025 · להמחשה בלבד · להתעדכן מול רשות המיסים
        </div>
      </div>

      <div
        className="rounded-xl p-6 lg:p-8 flex flex-col justify-between"
        style={{
          backgroundColor: "hsl(217 50% 5%)",
          border: "1px solid hsl(36 33% 95% / 0.10)",
        }}
      >
        <div className="space-y-6">
          <div>
            <div
              className="text-eyebrow uppercase tracking-[0.18em] mb-1"
              style={{ color: "hsl(36 33% 95% / 0.55)" }}
            >
              סך מס רכישה
            </div>
            <div className="font-mono tabular-nums font-black leading-none text-4xl md:text-5xl text-accent">
              {formatILS(total)} ₪
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                שיעור אפקטיבי
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {(effectiveRate * 100).toFixed(2)}%
              </div>
            </div>
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                מסטטוס
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {mode === "first" ? "דירה יחידה" : "משקיע"}
              </div>
            </div>
          </div>

          {/* Stacked bracket bar */}
          <div>
            <div
              className="flex h-3 rounded-full overflow-hidden"
              style={{ backgroundColor: "hsl(36 33% 95% / 0.10)" }}
            >
              {slices.map((s, i) => {
                const widthPct = (s.taxOnSlice / Math.max(1, total)) * 100;
                if (widthPct < 0.1) return null;
                const intensity = 0.35 + (s.rate / 0.10) * 0.65;
                return (
                  <span
                    key={i}
                    className="block transition-[width] duration-300"
                    style={{
                      width: `${widthPct}%`,
                      backgroundColor: `hsl(var(--accent) / ${intensity.toFixed(2)})`,
                    }}
                    title={`${(s.rate * 100).toFixed(1)}% · ${formatILS(s.taxOnSlice)} ₪`}
                  />
                );
              })}
            </div>
            <div
              className="flex items-center justify-between mt-2 text-xs font-mono uppercase tracking-[0.14em]"
              style={{ color: "hsl(36 33% 95% / 0.55)" }}
            >
              <span>בכבדות לפי מדרגה</span>
              <span>{slices.length} מדרגות</span>
            </div>
          </div>
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
            הבדל של מאות אלפי שקלים בין דירה יחידה למשקיע. בקורס לומדים איך להגיע
            לחישוב מדויק על העסקה הספציפית שלכם — עוד לפני חתימה.
          </p>
        </div>
      </div>
    </div>
  );
};
