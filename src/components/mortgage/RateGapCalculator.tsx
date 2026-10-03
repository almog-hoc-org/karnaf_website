import { useId, useMemo, useState } from "react";
import { spitzerPayment as spitzer } from "@/lib/calc/mortgage";
import { formatILS as ils } from "@/lib/format";
import { PRIME_RATE } from "@/data/finance/rules2026";

/* Reference rate: today's prime, from the dated rules file — an anchor for
   the illustration, not an offer and not a forecast. The point of the
   widget is the GAP between two rates on the same loan, which is what a
   bank tender and a negotiated mix move. */
const BASE_RATE = PRIME_RATE.value;
const BASE_RATE_AS_OF = PRIME_RATE.asOf.split("-").reverse().join(".");
const TERMS = [15, 20, 25, 30] as const;
const GAPS = [0.25, 0.5, 0.75, 1] as const;

const Chips = ({
  label,
  options,
  value,
  onChange,
  format,
}: {
  label: string;
  options: readonly number[];
  value: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) => {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-sm font-semibold text-foreground mb-2.5">
        {label}
      </p>
      <div className="grid grid-cols-4 gap-2">
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={o}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`min-h-[44px] rounded-full border text-sm font-bold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                on
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/40"
              }`}
            >
              {format(o)}
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * "Half a percent sounds small" — one loan, two rates, the difference in
 * shekels per month and over the life of the loan. Pure arithmetic on a
 * labeled illustrative rate: no claims about what anyone will get.
 */
const RateGapCalculator = () => {
  const amountId = useId();
  const [amount, setAmount] = useState(1_000_000);
  const [years, setYears] = useState<number>(25);
  const [gap, setGap] = useState<number>(0.5);

  const r = useMemo(() => {
    const low = spitzer(amount, BASE_RATE, years);
    const high = spitzer(amount, BASE_RATE + gap, years);
    return { low, high, monthly: high - low, total: (high - low) * years * 12 };
  }, [amount, years, gap]);

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
          אותה משכנתא, שתי ריביות
        </h3>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          דוגמה להמחשה
        </span>
      </div>

      <div className="space-y-7">
        <div>
          <div className="flex items-baseline justify-between gap-3 mb-1">
            <label htmlFor={amountId} className="text-sm font-semibold text-foreground">
              סכום המשכנתא
            </label>
            <span dir="ltr" className="font-black text-lg text-foreground tabular-nums">
              {ils(amount)}
            </span>
          </div>
          {/* Native range: labelled, keyboard- and screen-reader-ready out of
              the box; 44px tall for touch. RTL: the minimum sits on the right. */}
          <input
            id={amountId}
            type="range"
            dir="rtl"
            min={400_000}
            max={2_500_000}
            step={50_000}
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            aria-valuetext={ils(amount)}
            className="block w-full h-11 cursor-pointer accent-[hsl(var(--primary))]"
          />
          <div className="flex justify-between text-xs text-muted-foreground tabular-nums -mt-1">
            <span dir="ltr">₪400K</span>
            <span dir="ltr">₪2.5M</span>
          </div>
        </div>

        <Chips
          label="תקופה"
          options={TERMS}
          value={years}
          onChange={setYears}
          format={(v) => `${v} שנה`}
        />
        <Chips
          label="פער הריבית בין שתי ההצעות"
          options={GAPS}
          value={gap}
          onChange={setGap}
          format={(v) => `${v}%`}
        />
      </div>

      <p className="mt-8 mb-2.5 text-sm font-semibold text-foreground">החזר חודשי</p>
      <div className="grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-secondary/60 p-4">
          <p className="text-muted-foreground mb-1">
            ריבית <span dir="ltr">{BASE_RATE}%</span>
          </p>
          <p dir="ltr" className="font-bold text-foreground text-lg tabular-nums text-right">
            {ils(r.low)}
          </p>
        </div>
        <div className="rounded-2xl bg-secondary/60 p-4">
          <p className="text-muted-foreground mb-1">
            ריבית <span dir="ltr">{BASE_RATE + gap}%</span>
          </p>
          <p dir="ltr" className="font-bold text-foreground text-lg tabular-nums text-right">
            {ils(r.high)}
          </p>
        </div>
      </div>

      <div
        className="mt-3 rounded-2xl bg-[hsl(var(--ink))] text-white p-5 md:p-6"
        aria-live="polite"
        aria-atomic="true"
      >
        <p className="text-sm" style={{ color: "hsl(36 33% 95% / 0.72)" }}>
          ההפרש לאורך {years} שנה
        </p>
        <p dir="ltr" className="text-accent font-black text-4xl md:text-5xl tabular-nums leading-tight text-right">
          {ils(r.total)}
        </p>
        <p className="text-sm mt-1" style={{ color: "hsl(36 33% 95% / 0.72)" }}>
          כ-<span dir="ltr" className="tabular-nums font-bold text-white">{ils(r.monthly)}</span> בכל חודש
        </p>
      </div>

      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        חישוב שפיצר בריבית קבועה לכל התקופה, בלי הצמדה למדד ובלי עמלות. ריבית
        הבסיס (<span dir="ltr">{BASE_RATE}%</span>) היא ריבית הפריים נכון ל-{BASE_RATE_AS_OF},
        כנקודת ייחוס להמחשה בלבד — לא הצעה ולא תחזית. משכנתא אמיתית בנויה מכמה
        מסלולים, וכל מסלול מתנהג אחרת.
      </p>
    </div>
  );
};

export default RateGapCalculator;
