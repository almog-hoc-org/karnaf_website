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

const ResultBlock = ({
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

export const RoiCalculator = () => {
  const [price, setPrice] = useState(2_400_000);
  const [equity, setEquity] = useState(720_000);
  const [monthlyRent, setMonthlyRent] = useState(7_500);
  const [annualGrowth, setAnnualGrowth] = useState(3.5); // %
  const [years, setYears] = useState(10);

  const calc = useMemo(() => {
    const annualRent = monthlyRent * 12;
    const grossYield = annualRent / price; // % of price
    const cashOnCash = annualRent / equity; // first-year cash return on equity
    const futureValue = price * Math.pow(1 + annualGrowth / 100, years);
    const capitalGain = futureValue - price;
    const totalRentalIncome = annualRent * years; // simple, no inflation adjustment
    const totalReturn = capitalGain + totalRentalIncome;
    const annualizedRoiOnEquity =
      Math.pow((equity + totalReturn) / equity, 1 / years) - 1;
    return {
      annualRent,
      grossYield,
      cashOnCash,
      futureValue,
      capitalGain,
      totalRentalIncome,
      totalReturn,
      annualizedRoiOnEquity,
    };
  }, [price, equity, monthlyRent, annualGrowth, years]);

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
          <span>מחשבון תשואה · live</span>
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
          * פשטני · לא כולל מסים, תחזוקה, תקופות ללא דייר
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
          <ResultBlock
            label="תשואה שנתית מתואמת על ההון העצמי"
            value={`${(calc.annualizedRoiOnEquity * 100).toFixed(1)}%`}
            big
            highlight
          />
          <div className="grid grid-cols-2 gap-6">
            <ResultBlock
              label="תשואה ברוטו (שכ״ד / מחיר)"
              value={`${(calc.grossYield * 100).toFixed(2)}%`}
            />
            <ResultBlock
              label="Cash-on-Cash שנה ראשונה"
              value={`${(calc.cashOnCash * 100).toFixed(1)}%`}
            />
            <ResultBlock
              label="ערך עתידי משוער"
              value={`${formatILS(calc.futureValue)} ₪`}
            />
            <ResultBlock
              label="צבירה כוללת"
              value={`${formatILS(calc.totalReturn)} ₪`}
            />
          </div>

          {/* Stacked breakdown: capital gain vs rental income */}
          <div>
            <div
              className="flex h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: "hsl(36 33% 95% / 0.10)" }}
            >
              {(() => {
                const total = Math.max(1, calc.totalReturn);
                const capPct = (calc.capitalGain / total) * 100;
                return (
                  <>
                    <span
                      className="block transition-[width] duration-300"
                      style={{
                        width: `${capPct}%`,
                        backgroundColor: "hsl(var(--accent))",
                      }}
                    />
                    <span
                      className="block transition-[width] duration-300"
                      style={{
                        width: `${100 - capPct}%`,
                        backgroundColor: "hsl(36 33% 95% / 0.55)",
                      }}
                    />
                  </>
                );
              })()}
            </div>
            <div
              className="flex items-center justify-between mt-2 text-xs font-mono uppercase tracking-[0.14em]"
              style={{ color: "hsl(36 33% 95% / 0.55)" }}
            >
              <span>צמיחת הון {((calc.capitalGain / Math.max(1, calc.totalReturn)) * 100).toFixed(0)}%</span>
              <span>הכנסה משכ״ד {((calc.totalRentalIncome / Math.max(1, calc.totalReturn)) * 100).toFixed(0)}%</span>
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
            כל פרמטר משפיע על התמונה הכוללת. בקורס לומדים איך להעריך כל אחד
            מהם בנפרד — לפני שלוחצים על &quot;לרכוש&quot;.
          </p>
        </div>
      </div>
    </div>
  );
};
