import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChipGroup } from "@/components/tools/ChipGroup";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { ResultPanel } from "@/components/tools/ResultPanel";
import { BUYER_STATUSES, STATUS_LABEL, parseStatus } from "@/components/tools/buyerStatus";
import { useToolUse } from "@/hooks/use-tool-use";
import { affordability } from "@/lib/calc/affordability";
import type { BuyerStatus } from "@/lib/calc/purchaseTax";
import { maxLtvFor, transactionCosts } from "@/lib/calc/transactionCosts";
import { formatILS, formatPercent } from "@/lib/format";
import { BOI_RATE, PAYMENT_TO_INCOME, PRIME_RATE } from "@/data/finance/rules2026";

/** Whole percents, so chip values stay exact (0.3 * 100 isn't 30 in floating point). */
const SHARES = [25, 30, 35, 40] as const;
const YEARS = [20, 25, 30] as const;
/** Rate scenarios around today's prime, deduplicated in case prime lands on one of them. */
const RATES = [...new Set([4, PRIME_RATE.value, 5.5])].sort((a, b) => a - b);

const DEFAULTS = { equity: 600_000, income: 20_000, share: 30, years: 30, rate: PRIME_RATE.value };

/**
 * One-off costs the equity must also cover, at a given price: purchase tax
 * plus the top of the market ranges for a second-hand purchase via an agent
 * with a mortgage — deliberately conservative.
 */
const costsFor = (status: BuyerStatus) => (price: number) =>
  transactionCosts({
    price,
    status,
    newBuild: false,
    viaAgent: true,
    withMortgage: true,
    privateAppraisal: false,
    mortgageAdvisor: false,
  }).high;

const Row = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-baseline justify-between gap-4 border-t border-border/70 py-2.5">
    <dt className="text-sm text-foreground/85">{label}</dt>
    <dd className="text-sm font-semibold tabular-nums text-left" dir="ltr">
      {children}
    </dd>
  </div>
);

/**
 * The highest price a household reaches given its equity, its income and
 * the Bank of Israel limits (LTV by status, payment-to-income), after the
 * purchase costs come out of the equity. Logic and tests in
 * lib/calc/affordability. Pre-renders the defaults; a shared link
 * (?equity=&income=&status=&share=&years=&rate=) is applied after mount.
 */
const AffordabilityCalculator = () => {
  const [equity, setEquity] = useState(DEFAULTS.equity);
  const [income, setIncome] = useState(DEFAULTS.income);
  const [status, setStatus] = useState<BuyerStatus>("single");
  const [share, setShare] = useState<number>(DEFAULTS.share);
  const [years, setYears] = useState<number>(DEFAULTS.years);
  const [rate, setRate] = useState<number>(DEFAULTS.rate);
  const touch = useToolUse("affordability", { equity, income, status, share, years, rate });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const num = (k: string) => Number(q.get(k));
    if (num("equity") > 0) setEquity(Math.min(num("equity"), 100_000_000));
    if (num("income") > 0) setIncome(Math.min(num("income"), 10_000_000));
    const s = parseStatus(q.get("status"));
    if (s) setStatus(s);
    if ((SHARES as readonly number[]).includes(num("share"))) setShare(num("share"));
    if ((YEARS as readonly number[]).includes(num("years"))) setYears(num("years"));
    if (RATES.includes(num("rate"))) setRate(num("rate"));
  }, []);

  const r = useMemo(
    () =>
      affordability({
        equity,
        monthlyIncome: income,
        paymentShare: share / 100,
        maxLtv: maxLtvFor(status),
        annualRate: rate,
        years,
        costsAt: costsFor(status),
      }),
    [equity, income, status, share, years, rate],
  );

  const ltv = formatPercent(maxLtvFor(status) * 100, 0);
  const pti = PAYMENT_TO_INCOME.value;

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">עד איזה מחיר אתם יכולים להגיע</h2>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          כללי 2026
        </span>
      </div>

      <div className="space-y-6">
        <MoneyInput
          label="הון עצמי"
          hint="כל הכסף שתכניסו לעסקה, כולל מה שילך למס, לעורך הדין ולתיווך"
          value={equity}
          onChange={(v) => {
            touch();
            setEquity(v);
          }}
          max={100_000_000}
        />
        <MoneyInput
          label="הכנסה פנויה בחודש"
          hint="נטו של כל משק הבית, אחרי החזרי הלוואות קבועים"
          value={income}
          onChange={(v) => {
            touch();
            setIncome(v);
          }}
          max={10_000_000}
        />

        <ChipGroup<BuyerStatus>
          label="המצב שלכם ביום הרכישה"
          options={BUYER_STATUSES}
          value={status}
          onChange={(v) => {
            touch();
            setStatus(v);
          }}
          format={(v) => STATUS_LABEL[v]}
          columns="grid-cols-2 sm:grid-cols-4"
        />

        <div>
          <ChipGroup<number>
            label="כמה מההכנסה תפנו להחזר החודשי"
            options={SHARES}
            value={share}
            onChange={(v) => {
              touch();
              setShare(v);
            }}
            format={(v) => `${v}%`}
          />
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            בנק ישראל מתיר עד {formatPercent(pti.max * 100, 0)} מההכנסה הפנויה; מעל{" "}
            {formatPercent(pti.extraCapitalAbove * 100, 0)} הבנק נדרש להחזיק הון נוסף, ולכן רבים עוצרים שם.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <ChipGroup<number>
            label="תקופת המשכנתא"
            options={YEARS}
            value={years}
            onChange={(v) => {
              touch();
              setYears(v);
            }}
            format={(v) => `${v} שנה`}
            columns="grid-cols-3"
          />
          <div>
            <ChipGroup<number>
              label="ריבית ממוצעת (הנחה)"
              options={RATES}
              value={rate}
              onChange={(v) => {
                touch();
                setRate(v);
              }}
              format={(v) => formatPercent(v)}
              columns="grid-cols-3"
            />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              <span dir="ltr">{formatPercent(PRIME_RATE.value)}</span> הוא הפריים היום: ריבית בנק ישראל (
              <span dir="ltr">{formatPercent(BOI_RATE.value)}</span>) ועוד 1.5%.
            </p>
          </div>
        </div>
      </div>

      <ResultPanel label={<>מחיר הדירה שאפשר להגיע אליו · {STATUS_LABEL[status]}</>} value={formatILS(r.maxPrice)}>
        {r.maxPrice > 0 ? (
          <>
            החזר של{" "}
            <span dir="ltr" className="tabular-nums font-bold text-white">
              {formatILS(r.monthlyPayment)}
            </span>{" "}
            בחודש, כ-
            <span dir="ltr" className="tabular-nums font-bold text-white">
              {formatPercent(r.paymentToIncome * 100, 0)}
            </span>{" "}
            מההכנסה
          </>
        ) : (
          "הקלידו הון עצמי והכנסה"
        )}
      </ResultPanel>

      {r.maxPrice > 0 && (
        <>
          <dl className="mt-5">
            <Row label="משכנתא">{formatILS(r.loan)}</Row>
            <Row label="מקדמה מההון העצמי">{formatILS(r.downPayment)}</Row>
            <Row label="מס רכישה ועלויות נלוות (הערכה)">{formatILS(r.costs)}</Row>
          </dl>

          <div className="mt-4 rounded-2xl border border-accent/40 bg-accent/5 p-5">
            <p className="text-sm font-bold text-foreground mb-1">
              {r.limitedBy === "income" ? "מה מגביל אתכם: ההחזר החודשי" : "מה מגביל אתכם: ההון העצמי"}
            </p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {r.limitedBy === "income" ? (
                <>
                  ההחזר שבחרתם נושא משכנתא של עד{" "}
                  <span dir="ltr" className="tabular-nums font-semibold">{formatILS(r.maxLoanByIncome)}</span> — פחות
                  מ-{ltv} מהמחיר, התקרה של בנק ישראל. תקופה ארוכה יותר או החזר גבוה יותר יעלו את המחיר, וכך
                  גם כל שקל נוסף של הון עצמי.
                </>
              ) : (
                <>
                  הבנק מממן עד {ltv} מהמחיר ל{STATUS_LABEL[status]}, ואת היתר ואת העלויות הנלוות משלמים מההון
                  העצמי. ההכנסה שלכם נושאת משכנתא גדולה יותר — מה שיזיז את התקרה הוא עוד הון עצמי.
                </>
              )}
            </p>
          </div>

          <Link
            to={`/tools/total-cost?price=${r.maxPrice}&status=${status}`}
            className="group mt-4 flex min-h-[44px] items-center justify-between gap-3 text-sm font-bold text-primary"
          >
            פירוט העלויות הנלוות במחיר הזה
            <ArrowLeft size={16} aria-hidden className="shrink-0 transition-transform group-hover:-translate-x-1" />
          </Link>
        </>
      )}

      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
        הערכה ראשונה, לא אישור עקרוני: הבנק בודק גם את היסטוריית האשראי, את יציבות ההכנסה ואת שמאות
        הדירה, והריבית בפועל תלויה בתמהיל ובבנק. החישוב מניח החזר קבוע (שפיצר) בלי הצמדה, ועלויות
        נלוות של קנייה מיד שנייה דרך מתווך, לפי הקצה העליון של טווחי השוק.
      </p>
    </div>
  );
};

export default AffordabilityCalculator;
