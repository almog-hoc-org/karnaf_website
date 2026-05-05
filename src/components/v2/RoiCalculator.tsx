import { useMemo, useState } from "react";

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

/**
 * RoiCalculator — focused on the "leverage advantage" story.
 * Shows side-by-side: same property, same growth, same rent — but the
 * return-on-equity is dramatically higher when bought with a mortgage.
 */
export const RoiCalculator = () => {
  const [price, setPrice] = useState(2_400_000);
  const [equity, setEquity] = useState(720_000);
  const [monthlyRent, setMonthlyRent] = useState(7_500);
  const [annualGrowth, setAnnualGrowth] = useState(3.5); // %
  const [years, setYears] = useState(10);
  const mortgageRate = 0.045;

  const calc = useMemo(() => {
    const futureValue = price * Math.pow(1 + annualGrowth / 100, years);
    const totalAppreciation = futureValue - price;
    const totalRent = monthlyRent * 12 * years;

    // --- Leveraged scenario (with mortgage) ---
    const principal = Math.max(0, price - equity);
    const monthlyRate = mortgageRate / 12;
    const months = years * 12;
    const monthlyPmt =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -months));
    const totalPmt = monthlyPmt * months;
    const totalInterest = totalPmt - principal;

    // Net cash from rent after mortgage payments (simplified, no taxes/maintenance)
    const netRentLeveraged = totalRent - totalPmt;
    // After-period equity = property value - remaining mortgage. We assume the
    // mortgage is fully paid by year `years` for simplicity (worst case for
    // leverage; better than reality for short horizons).
    // For illustrative purposes, total return on equity = appreciation + net rent.
    const leveragedTotalReturn = totalAppreciation + netRentLeveraged;
    const leveragedAnnualizedRoi =
      Math.pow(
        (equity + leveragedTotalReturn) / equity,
        1 / years
      ) - 1;

    // --- Cash scenario (no mortgage) ---
    const cashEquity = price; // bought outright with own money
    const cashTotalReturn = totalAppreciation + totalRent;
    const cashAnnualizedRoi =
      Math.pow((cashEquity + cashTotalReturn) / cashEquity, 1 / years) - 1;

    const leverageMultiplier =
      cashAnnualizedRoi > 0
        ? leveragedAnnualizedRoi / cashAnnualizedRoi
        : 0;

    return {
      principal,
      monthlyPmt,
      futureValue,
      totalAppreciation,
      totalRent,
      totalInterest,
      leveragedAnnualizedRoi,
      cashAnnualizedRoi,
      leveragedTotalReturn,
      cashTotalReturn,
      leverageMultiplier,
    };
  }, [price, equity, monthlyRent, annualGrowth, years]);

  return (
    <div
      className="rounded-2xl p-6 md:p-10 backdrop-blur-sm"
      style={{
        backgroundColor: "hsl(36 33% 95% / 0.04)",
        border: "1px solid hsl(36 33% 95% / 0.12)",
      }}
    >
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-14">
        {/* Inputs */}
        <div className="space-y-8">
          <div className="text-eyebrow uppercase tracking-[0.22em] text-accent flex items-center gap-3">
            <span
              className="w-2 h-2 rounded-full bg-accent"
              aria-hidden
              style={{ boxShadow: "0 0 12px hsl(var(--accent))" }}
            />
            <span>מחשבון תשואה על הון עצמי · live</span>
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
            label="שכר דירה חודשי"
            value={monthlyRent}
            min={2_000}
            max={20_000}
            step={100}
            onChange={setMonthlyRent}
            format={(v) => `${formatILS(v)} ₪`}
          />
          <CalcSlider
            label="צמיחת הון שנתית משוערת"
            value={annualGrowth}
            min={0}
            max={8}
            step={0.5}
            onChange={setAnnualGrowth}
            format={(v) => `${v.toFixed(1)}%`}
          />
          <CalcSlider
            label="אופק השקעה"
            value={years}
            min={3}
            max={20}
            step={1}
            onChange={setYears}
            format={(v) => `${v} שנים`}
          />

          <div
            className="text-xs font-mono uppercase tracking-[0.18em]"
            style={{ color: "hsl(36 33% 95% / 0.5)" }}
          >
            * ריבית משכנתא משוערת {(mortgageRate * 100).toFixed(1)}% · להמחשה בלבד · לא כולל מסים, תחזוקה
          </div>
        </div>

        {/* Headline result + leverage comparison */}
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
                className="text-eyebrow uppercase tracking-[0.18em] mb-1"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                תשואה שנתית על ההון העצמי שלכם
              </div>
              <div className="font-mono tabular-nums font-black leading-none text-5xl md:text-6xl text-accent">
                {(calc.leveragedAnnualizedRoi * 100).toFixed(1)}%
              </div>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mt-3"
                style={{ color: "hsl(36 33% 95% / 0.55)" }}
              >
                {formatILS(equity)} ₪ הון → {formatILS(calc.leveragedTotalReturn + equity)} ₪ אחרי {years} שנים
              </div>
            </div>

            {/* Leverage comparison — side by side bars */}
            <div className="pt-4 border-t" style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}>
              <div
                className="text-eyebrow uppercase tracking-[0.18em] mb-4"
                style={{ color: "hsl(36 33% 95% / 0.7)" }}
              >
                כוח המינוף
              </div>

              <ComparisonRow
                label="עם משכנתא"
                roi={calc.leveragedAnnualizedRoi}
                accent
              />
              <ComparisonRow
                label="במזומן (כל הדירה)"
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
                  אפקט מינוף
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
                  ערך עתידי משוער
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
              אותה דירה. אותה צמיחה. אותו שכ״ד. <strong className="text-white">המינוף הוא שמכפיל את התשואה.</strong> בקורס לומדים מתי המינוף עובד לטובתכם — ומתי הוא מסוכן.
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
      <div className="flex items-baseline justify-between mb-1.5">
        <span
          className="text-sm"
          style={{ color: accent ? "hsl(36 33% 95%)" : "hsl(36 33% 95% / 0.65)" }}
        >
          {label}
        </span>
        <span
          className="font-mono tabular-nums text-base font-bold"
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
