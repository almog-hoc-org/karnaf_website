import { useMemo, useState } from "react";

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

interface SliderProps {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}

const CalcSlider = ({
  label,
  hint,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: SliderProps) => (
  <div>
    <div className="flex items-baseline justify-between mb-3 gap-3">
      <span
        className="text-eyebrow uppercase tracking-[0.18em]"
        style={{ color: "hsl(36 33% 95% / 0.7)" }}
      >
        {label}
        {hint && (
          <span
            className="ms-2 normal-case tracking-normal text-xs"
            style={{ color: "hsl(36 33% 95% / 0.4)" }}
          >
            {hint}
          </span>
        )}
      </span>
      <span className="font-mono tabular-nums text-lg font-bold text-accent whitespace-nowrap">
        {format(value)}
      </span>
    </div>
    <input
      type="range"
      aria-label={label}
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

/**
 * RoiCalculator — for first-time / next-home buyers (not investors).
 *
 * Math model (simplified, primary-residence framing):
 *   • Mortgage is a standard 25-year amortization at `mortgageRate`.
 *   • After `years` of payments, we compute the remaining balance and
 *     therefore the buyer's *home equity*  =  home value − balance owed.
 *   • Annualised ROI on equity =  (final equity / initial equity)^(1/years) − 1
 *   • This intentionally treats monthly payments as roughly neutral
 *     (you'd otherwise pay rent), which is the right frame for someone
 *     who lives in the apartment they buy. The disclaimer states this.
 *   • Cash scenario = no mortgage, no leverage — pure value appreciation.
 */
export const RoiCalculator = () => {
  const [price, setPrice] = useState(2_400_000);
  const [equity, setEquity] = useState(720_000);
  const [annualGrowth, setAnnualGrowth] = useState(3.5);
  const [years, setYears] = useState(10);
  const mortgageRate = 0.045;
  const mortgageTermYears = 25;

  const calc = useMemo(() => {
    const futureValue = price * Math.pow(1 + annualGrowth / 100, years);
    const totalAppreciation = futureValue - price;

    const principal = Math.max(0, price - equity);
    const monthlyRate = mortgageRate / 12;
    const totalMonths = mortgageTermYears * 12;
    const elapsedMonths = Math.min(years * 12, totalMonths);

    const monthlyPmt =
      principal === 0
        ? 0
        : monthlyRate === 0
        ? principal / totalMonths
        : (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -totalMonths));

    // Remaining mortgage balance after `elapsedMonths` of payments
    let remainingBalance = 0;
    if (principal > 0) {
      if (elapsedMonths >= totalMonths) {
        remainingBalance = 0;
      } else {
        const denominator = Math.pow(1 + monthlyRate, totalMonths) - 1;
        const numerator =
          Math.pow(1 + monthlyRate, totalMonths) -
          Math.pow(1 + monthlyRate, elapsedMonths);
        remainingBalance = principal * (numerator / denominator);
      }
    }

    const finalEquityValue = Math.max(0, futureValue - remainingBalance);

    // Leveraged ROI on the buyer's actual cash in
    const leveragedAnnualizedRoi =
      equity > 0
        ? Math.pow(finalEquityValue / equity, 1 / years) - 1
        : 0;

    // Cash scenario: no mortgage, full price tied up; ROI just tracks growth
    const cashAnnualizedRoi = Math.pow(futureValue / price, 1 / years) - 1;

    const leverageMultiplier =
      cashAnnualizedRoi > 0
        ? leveragedAnnualizedRoi / cashAnnualizedRoi
        : 0;
    const controlMultiplier = equity > 0 ? price / equity : 0;

    const totalPaymentsHorizon = monthlyPmt * elapsedMonths;
    const principalRepaid = principal - remainingBalance;
    const totalInterestPaid = totalPaymentsHorizon - principalRepaid;

    return {
      principal,
      monthlyPmt,
      futureValue,
      totalAppreciation,
      leveragedAnnualizedRoi,
      cashAnnualizedRoi,
      leverageMultiplier,
      controlMultiplier,
      finalEquityValue,
      remainingBalance,
      totalInterestPaid,
    };
  }, [price, equity, annualGrowth, years]);

  return (
    <div
      className="rounded-2xl p-6 md:p-10"
      style={{
        backgroundColor: "hsl(36 33% 95% / 0.06)",
        border: "1px solid hsl(36 33% 95% / 0.14)",
      }}
    >
      {/* Top tagline — anchors the audience and the math frame */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b" style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}>
        <div className="text-eyebrow uppercase tracking-[0.22em] text-accent flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden
            style={{ boxShadow: "0 0 12px hsl(var(--accent))" }}
          />
          <span>מה ההון העצמי שלכם יעשה · live</span>
        </div>
        <p
          className="text-sm leading-relaxed max-w-md"
          style={{ color: "hsl(36 33% 95% / 0.7)" }}
        >
          התשואה כאן מחושבת <strong className="text-white">על ההון העצמי שלכם</strong> — לא על כל מחיר הדירה. זה הסוד של רכישה במשכנתא.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
        {/* Inputs */}
        <div className="space-y-8">
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
            label="צמיחת ערך שנתית משוערת"
            value={annualGrowth}
            min={0}
            max={8}
            step={0.5}
            onChange={setAnnualGrowth}
            format={(v) => `${v.toFixed(1)}%`}
          />
          <CalcSlider
            label="אופק זמן"
            value={years}
            min={3}
            max={20}
            step={1}
            onChange={setYears}
            format={(v) => `${v} שנים`}
          />

          <div
            className="text-xs leading-relaxed"
            style={{ color: "hsl(36 33% 95% / 0.5)" }}
          >
            * משכנתא {mortgageTermYears} שנה בריבית משוערת של{" "}
            {(mortgageRate * 100).toFixed(1)}%. תשלום חודשי מחושב כתחליף לשכ״ד —
            כלומר, מי שגר בדירה היה ממילא משלם שכ״ד דומה. לא כולל מסים, תחזוקה
            ושיפוצים. להמחשה בלבד.
          </div>
        </div>

        {/* Result panel */}
        <div
          className="rounded-xl p-6 lg:p-8 flex flex-col justify-between"
          style={{
            backgroundColor: "hsl(217 50% 5%)",
            border: "1px solid hsl(36 33% 95% / 0.10)",
          }}
        >
          <div className="space-y-6">
            {/* Big headline number */}
            <div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-2"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                תשואה שנתית על <span className="text-accent">ההון העצמי שלכם</span>
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-5xl md:text-6xl text-accent">
                {(calc.leveragedAnnualizedRoi * 100).toFixed(1)}%
              </div>
              <div
                className="text-sm mt-3 leading-relaxed"
                style={{ color: "hsl(36 33% 95% / 0.65)" }}
              >
                <span className="font-mono tabular-nums text-white font-bold">
                  {formatILS(equity)} ₪
                </span>
                {" → "}
                <span className="font-mono tabular-nums text-white font-bold">
                  {formatILS(calc.finalEquityValue)} ₪
                </span>
                {" "}אחרי {years} שנים
              </div>
            </div>

            {/* Control multiplier — the "your equity controls a much bigger asset" insight */}
            <div
              className="rounded-lg p-4 flex items-center justify-between gap-4"
              style={{
                backgroundColor: "hsl(36 33% 95% / 0.05)",
                border: "1px solid hsl(36 33% 95% / 0.10)",
              }}
            >
              <div>
                <div
                  className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  ההון שלכם שולט על
                </div>
                <div className="font-mono tabular-nums font-bold text-base text-white">
                  דירה של {formatILS(price)} ₪
                </div>
              </div>
              <div className="text-end">
                <div
                  className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  כוח שליטה
                </div>
                <div className="font-mono tabular-nums text-2xl font-black text-accent leading-none">
                  ×{calc.controlMultiplier.toFixed(1)}
                </div>
              </div>
            </div>

            {/* Comparison — equity-leverage vs cash-buyer */}
            <div className="pt-4 border-t" style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-4"
                style={{ color: "hsl(36 33% 95% / 0.7)" }}
              >
                ההון שלכם עבד יותר חזק
              </div>

              <ComparisonRow
                label="עם משכנתא — תשואה על ההון שלכם"
                roi={calc.leveragedAnnualizedRoi}
                accent
              />
              <ComparisonRow
                label="אילו הייתם משלמים את כל הדירה במזומן"
                roi={calc.cashAnnualizedRoi}
              />

              <div
                className="mt-5 pt-4 border-t flex items-center justify-between"
                style={{ borderColor: "hsl(36 33% 95% / 0.08)" }}
              >
                <span
                  className="text-eyebrow uppercase tracking-[0.18em]"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  הפרש לטובת המשכנתא
                </span>
                <span className="font-mono tabular-nums text-2xl font-black text-accent">
                  ×{calc.leverageMultiplier.toFixed(1)}
                </span>
              </div>
            </div>

            {/* Mini stats row */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t" style={{ borderColor: "hsl(36 33% 95% / 0.08)" }}>
              <div>
                <div
                  className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  תשלום משכנתא חודשי
                </div>
                <div className="font-mono tabular-nums font-bold text-base text-white">
                  {formatILS(calc.monthlyPmt)} ₪
                </div>
              </div>
              <div>
                <div
                  className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  ערך הדירה אחרי {years} שנים
                </div>
                <div className="font-mono tabular-nums font-bold text-base text-white">
                  {formatILS(calc.futureValue)} ₪
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
              אותה דירה. אותה צמיחה. <strong className="text-white">המינוף הוא שמכפיל את התשואה על הכסף שלכם.</strong> בקורס לומדים מתי המינוף עובד לטובתכם — ומתי הוא מסוכן.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ComparisonRow = ({
  label,
  roi,
  accent = false,
}: {
  label: string;
  roi: number;
  accent?: boolean;
}) => {
  // Cap visualization at 30% to keep the bar readable
  const widthPct = Math.min(100, Math.max(0, (roi / 0.3) * 100));
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex items-baseline justify-between mb-1.5 gap-3">
        <span
          className="text-sm"
          style={{ color: accent ? "hsl(36 33% 95%)" : "hsl(36 33% 95% / 0.65)" }}
        >
          {label}
        </span>
        <span
          className="font-mono tabular-nums text-base font-bold whitespace-nowrap"
          style={{ color: accent ? "hsl(var(--accent))" : "hsl(36 33% 95% / 0.85)" }}
        >
          {(roi * 100).toFixed(1)}%
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ backgroundColor: "hsl(36 33% 95% / 0.08)" }}
      >
        <div
          className="h-full transition-[width] duration-500"
          style={{
            width: `${widthPct}%`,
            background: accent
              ? "linear-gradient(to left, hsl(var(--accent)), hsl(24 90% 42%))"
              : "hsl(36 33% 95% / 0.45)",
          }}
        />
      </div>
    </div>
  );
};
