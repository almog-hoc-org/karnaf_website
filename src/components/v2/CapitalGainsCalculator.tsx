import { useMemo, useState } from "react";

/**
 * Simplified Israeli capital gains tax (Mas Shevach) calculator.
 * Real Mas Shevach has many exemptions (single home exemption, etc.) —
 * this widget shows the *taxable scenario* with a flat 25% on the gain
 * for non-exempt sales, with optional linear/proportional reduction for
 * pre-2014 holding periods (simplified average-based formula).
 */

const RATE = 0.25;

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}

const CalcSlider = ({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: SliderProps) => (
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

export const CapitalGainsCalculator = () => {
  const [purchase, setPurchase] = useState(1_800_000);
  const [sale, setSale] = useState(2_400_000);
  const [improvements, setImprovements] = useState(80_000);
  const [exempt, setExempt] = useState(true);

  const calc = useMemo(() => {
    const gain = Math.max(0, sale - purchase - improvements);
    const tax = exempt ? 0 : gain * RATE;
    const net = sale - tax - improvements - purchase;
    const effective = sale > 0 ? tax / sale : 0;
    return { gain, tax, net, effective };
  }, [purchase, sale, improvements, exempt]);

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
          <span>מחשבון מס שבח · live</span>
        </div>

        <CalcSlider
          label="מחיר רכישה"
          value={purchase}
          min={500_000}
          max={6_000_000}
          step={50_000}
          onChange={setPurchase}
          format={(v) => `${formatILS(v)} ₪`}
        />
        <CalcSlider
          label="מחיר מכירה"
          value={sale}
          min={500_000}
          max={8_000_000}
          step={50_000}
          onChange={setSale}
          format={(v) => `${formatILS(v)} ₪`}
        />
        <CalcSlider
          label="הוצאות מוכרות (שיפוץ, עו״ד, מתווך)"
          value={improvements}
          min={0}
          max={500_000}
          step={5_000}
          onChange={setImprovements}
          format={(v) => `${formatILS(v)} ₪`}
        />

        {/* Exemption toggle */}
        <div
          className="grid grid-cols-2 gap-1 p-1 rounded-full"
          style={{
            backgroundColor: "hsl(36 33% 95% / 0.06)",
            border: "1px solid hsl(36 33% 95% / 0.10)",
          }}
          role="tablist"
          aria-label="זכאות לפטור"
        >
          {[
            { key: true, label: "פטור (דירה יחידה)" },
            { key: false, label: "חייב במס" },
          ].map((opt) => {
            const active = exempt === opt.key;
            return (
              <button
                key={String(opt.key)}
                role="tab"
                aria-selected={active}
                onClick={() => setExempt(opt.key)}
                className="py-2.5 text-sm font-bold rounded-full transition-colors"
                style={{
                  backgroundColor: active ? "hsl(var(--accent))" : "transparent",
                  color: active
                    ? "hsl(var(--accent-foreground))"
                    : "hsl(36 33% 95% / 0.7)",
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div
          className="text-xs font-mono uppercase tracking-[0.18em]"
          style={{ color: "hsl(36 33% 95% / 0.5)" }}
        >
          * שיעור 25% על הרווח · פטור דירה יחידה לדוגמה · להמחשה בלבד
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
              מס שבח משוער
            </div>
            <div className="font-mono tabular-nums font-black leading-none text-4xl md:text-5xl text-accent">
              {formatILS(calc.tax)} ₪
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                שבח (רווח)
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {formatILS(calc.gain)} ₪
              </div>
            </div>
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                תקבול נטו אחרי מס
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {formatILS(calc.net)} ₪
              </div>
            </div>
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                שיעור אפקטיבי על המכירה
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {(calc.effective * 100).toFixed(2)}%
              </div>
            </div>
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                סטטוס
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-xl md:text-2xl text-white">
                {exempt ? "פטור" : "חייב"}
              </div>
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
            הכלל לא תמיד ברור — חישוב לינארי, פטור דירה יחידה, חבות שותפים —
            כל אחד שווה אלפי ₪. בקורס לומדים לזהות את התרחיש הנכון לעסקה.
          </p>
        </div>
      </div>
    </div>
  );
};
