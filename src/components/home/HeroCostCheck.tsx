import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { Range } from "@/components/tools/Range";
import { transactionCosts } from "@/lib/calc/transactionCosts";
import { formatILS } from "@/lib/format";
import { gaToolUse } from "@/lib/analytics";

const DEFAULT_PRICE = 2_000_000;

/**
 * The homepage's first proof is a working number, not a claim: type a price
 * and see what the purchase really costs on top of it. The common case only
 * (a single home, second-hand, via an agent, with a mortgage) — the full
 * calculator on /tools/total-cost takes every other case, carrying the price.
 */
const HeroCostCheck = () => {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const used = useRef(false);
  const r = useMemo(
    () =>
      transactionCosts({
        price,
        status: "single",
        newBuild: false,
        viaAgent: true,
        withMortgage: true,
        privateAppraisal: false,
        mortgageAdvisor: false,
      }),
    [price],
  );

  const onChange = (n: number) => {
    setPrice(n);
    if (!used.current) {
      used.current = true;
      gaToolUse("home-hero-cost");
    }
  };

  const rows = [
    { label: "מס רכישה", value: <bdi dir="ltr">{formatILS(r.tax.total)}</bdi> },
    { label: "כל העלויות מעבר למחיר", value: <Range low={r.low} high={r.high} /> },
    { label: "הון עצמי שתצטרכו לפחות", value: <Range low={r.equityLow} high={r.equityHigh} />, strong: true },
  ];

  return (
    <div className="rounded-[1.75rem] border border-border bg-card p-6 md:p-8 shadow-depth-2">
      <h2 className="font-serif text-2xl md:text-[1.75rem] font-bold leading-tight text-foreground mb-1.5">
        כמה באמת עולה הדירה?
      </h2>
      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
        הקלידו מחיר. המספרים מתעדכנים לפי כללי 2026.
      </p>

      <MoneyInput label="מחיר הדירה" value={price} onChange={onChange} max={50_000_000} />

      <dl className="mt-6 divide-y divide-border" aria-live="polite">
        {rows.map((row) => (
          <div key={row.label} className="flex items-baseline justify-between gap-4 py-3.5">
            <dt className="text-[0.9375rem] text-foreground/80">{row.label}</dt>
            <dd
              className={`tabular-nums whitespace-nowrap text-foreground ${
                row.strong ? "text-xl font-black" : "text-lg font-bold"
              }`}
            >
              {price > 0 ? row.value : "—"}
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
        דירה יחידה, יד שנייה, דרך מתווך ועם משכנתא. טווח, כי שכר טרחה של עורך דין ותיווך נקבע במשא ומתן.
      </p>
      <Link
        to={`/tools/total-cost?price=${price}`}
        className="group mt-5 inline-flex items-center gap-2 font-bold text-primary underline-offset-4 hover:underline min-h-[44px]"
      >
        לפירוט המלא ולמקרים אחרים
        <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
      </Link>
    </div>
  );
};

export default HeroCostCheck;
