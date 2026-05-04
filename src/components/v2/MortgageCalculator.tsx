import { useMemo, useState } from "react";

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

interface CalcSliderProps {
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
}: CalcSliderProps) => (
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

interface ResultRowProps {
  label: string;
  value: string;
  big?: boolean;
  highlight?: boolean;
}

const ResultRow = ({
  label,
  value,
  big = false,
  highlight = false,
}: ResultRowProps) => (
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

interface MortgageCalculatorProps {
  /** Initial price in NIS */
  defaultPrice?: number;
  /** Initial equity in NIS */
  defaultEquity?: number;
  /** Initial term in years */
  defaultYears?: number;
  /** Annual rate, e.g. 0.045 for 4.5% */
  rate?: number;
  /** Optional title and footnote shown alongside */
  title?: string;
  description?: string;
}

/** Live mortgage calculator card, designed for placement inside a dark cinematic section. */
export const MortgageCalculator = ({
  defaultPrice = 2_400_000,
  defaultEquity = 720_000,
  defaultYears = 25,
  rate = 0.045,
  title = "מחשבון משכנתא · live",
  description,
}: MortgageCalculatorProps) => {
  const [price, setPrice] = useState(defaultPrice);
  const [equity, setEquity] = useState(defaultEquity);
  const [years, setYears] = useState(defaultYears);

  const calc = useMemo(() => {
    const principal = Math.max(0, price - equity);
    const monthlyRate = rate / 12;
    const months = years * 12;
    const monthly =
      monthlyRate === 0
        ? principal / months
        : (principal * monthlyRate) /
          (1 - Math.pow(1 + monthlyRate, -months));
    const totalPaid = monthly * months;
    const interest = totalPaid - principal;
    const ltv = principal / price;
    return { principal, monthly, totalPaid, interest, ltv };
  }, [price, equity, years, rate]);

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
          <span>{title}</span>
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
          * ריבית קבועה משוערת {(rate * 100).toFixed(1)}% · להמחשה בלבד
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
              label="יחס מינוף (LTV)"
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

          <PrincipalInterestBar
            principal={calc.principal}
            interest={calc.interest}
          />
        </div>

        {description && (
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
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
