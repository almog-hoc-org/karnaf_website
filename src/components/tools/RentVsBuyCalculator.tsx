import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { ChipGroup } from "@/components/tools/ChipGroup";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { QuickAmounts } from "@/components/tools/QuickAmounts";
import { ResultPanel } from "@/components/tools/ResultPanel";
import { useToolUse } from "@/hooks/use-tool-use";
import { breakEvenGrowth, homeBuyerInput, rentVsBuy } from "@/lib/calc/rentVsBuy";
import { formatILS, formatPercent } from "@/lib/format";
import {
  BOI_RATE,
  CAPITAL_GAINS_TAX,
  GROSS_RENT_YIELD,
  HOME_PRICES_12M,
  INFLATION_12M,
  PAYMENT_TO_INCOME,
  PRIME_RATE,
  RENT_CHANGE_12M,
} from "@/data/finance/rules2026";

const uniq = (xs: number[]) => [...new Set(xs)].sort((a, b) => a - b);
const HORIZONS = [5, 10, 15, 20] as const;
const MORTGAGE_RATES = uniq([4, PRIME_RATE.value, 5.5]);
const RENT_GROWTH = uniq([INFLATION_12M.value, RENT_CHANGE_12M.value.renewals, RENT_CHANGE_12M.value.newTenants]);
const RETURNS = uniq([BOI_RATE.value, 5, 7]);
/** Upkeep, % of the home's value a year — an assumption, not a statistic. */
const UPKEEP = [0, 0.5, 1] as const;
/** Price scenarios for the table: last year's change, flat, and two rising markets. */
const SCENARIOS = uniq([HOME_PRICES_12M.value, 0, 2, 4]);

const QUICK_PRICES = [1_500_000, 2_000_000, 2_500_000, 3_000_000] as const;
const DEFAULTS = {
  price: 2_000_000,
  rent: 4_500,
  equity: 600_000,
  years: 10,
  rate: PRIME_RATE.value,
  rentGrowth: RENT_CHANGE_12M.value.renewals,
  ret: 5,
  upkeep: 0.5,
};

const pct1 = (n: number) => formatPercent(n, 1);
/** Hebrew counts years in the plural up to ten ("10 שנים") and in the singular above ("15 שנה"). */
const yearsLabel = (n: number) => `${n} ${n <= 10 ? "שנים" : "שנה"}`;
/** "ירדו ב-1.2%" / "עלו ב-0.5%" — a signed change in words, never "ב--1.2%". */
const pricesMoved = (pct: number) => (pct < 0 ? "ירדו" : "עלו");
const ILS = ({ n, className = "" }: { n: number; className?: string }) => (
  <span dir="ltr" className={`tabular-nums ${className}`}>
    {formatILS(n)}
  </span>
);

/**
 * Buy the home you live in, or rent it and invest the difference? Shows
 * the yearly price rise at which buying breaks even over the chosen
 * horizon, and both households' net worth under a few price scenarios.
 * Logic and tests in lib/calc/rentVsBuy. Pre-renders the defaults; a
 * shared link is applied after mount.
 */
const RentVsBuyCalculator = () => {
  const [price, setPrice] = useState(DEFAULTS.price);
  const [rent, setRent] = useState(DEFAULTS.rent);
  const [equity, setEquity] = useState(DEFAULTS.equity);
  const [years, setYears] = useState<number>(DEFAULTS.years);
  const [rate, setRate] = useState<number>(DEFAULTS.rate);
  const [rentGrowth, setRentGrowth] = useState<number>(DEFAULTS.rentGrowth);
  const [ret, setRet] = useState<number>(DEFAULTS.ret);
  const [upkeep, setUpkeep] = useState<number>(DEFAULTS.upkeep);
  const touch = useToolUse("rent-vs-buy", { price, rent, equity, years, rate, rg: rentGrowth, ret, upkeep });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const num = (k: string) => Number(q.get(k));
    if (num("price") > 0) setPrice(Math.min(num("price"), 100_000_000));
    if (num("rent") > 0) setRent(Math.min(num("rent"), 1_000_000));
    if (num("equity") > 0) setEquity(Math.min(num("equity"), 100_000_000));
    if ((HORIZONS as readonly number[]).includes(num("years"))) setYears(num("years"));
    if (MORTGAGE_RATES.includes(num("rate"))) setRate(num("rate"));
    if (RENT_GROWTH.includes(num("rg"))) setRentGrowth(num("rg"));
    if (RETURNS.includes(num("ret"))) setRet(num("ret"));
    if (q.has("upkeep") && (UPKEEP as readonly number[]).includes(num("upkeep"))) setUpkeep(num("upkeep"));
  }, []);

  const input = useMemo(
    () =>
      homeBuyerInput({
        price,
        monthlyRent: rent,
        equity,
        years,
        mortgageRate: rate,
        rentGrowth,
        investReturn: ret,
        upkeepPct: upkeep,
      }),
    [price, rent, equity, years, rate, rentGrowth, ret, upkeep],
  );

  const base = useMemo(() => rentVsBuy(input), [input]);
  const breakEven = useMemo(() => (base.feasible && price > 0 ? breakEvenGrowth(input) : 0), [base.feasible, price, input]);
  const scenarios = useMemo(
    () => SCENARIOS.map((g) => ({ g, r: rentVsBuy({ ...input, priceGrowth: g }) })),
    [input],
  );

  const grossYield = price > 0 ? (rent * 12) / price : 0;
  const [yLow, yHigh] = GROSS_RENT_YIELD.value;
  const upkeepMonthly = (price * upkeep) / 100 / 12;

  const edge = breakEven <= -15 || breakEven >= 25;
  const verdict =
    breakEven <= -15 ? (
      <>קנייה משתלמת גם אם המחירים יירדו</>
    ) : breakEven >= 25 ? (
      <>שכירות משתלמת כמעט בכל תרחיש</>
    ) : (
      <>
        <bdi dir="ltr">{pct1(breakEven)}</bdi> בשנה
      </>
    );

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">לקנות או לשכור את אותה דירה</h2>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          נתוני 2026
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <MoneyInput
            label="מחיר הדירה"
            value={price}
            onChange={(v) => {
              touch();
              setPrice(v);
            }}
            max={100_000_000}
          />
          <QuickAmounts
            label="מחירים לדוגמה"
            amounts={QUICK_PRICES}
            value={price}
            onPick={(p) => {
              touch();
              setPrice(p);
            }}
          />
        </div>
        <MoneyInput
          label="שכר דירה חודשי לדירה כזו"
          hint={
            <>
              תשואה ברוטו של <bdi dir="ltr">{pct1(grossYield * 100)}</bdi>. ביולי 2026 היא נעה בערים שנבדקו בין{" "}
              <bdi dir="ltr">{formatPercent(yLow * 100)}</bdi> ל-<bdi dir="ltr">{formatPercent(yHigh * 100)}</bdi>.
            </>
          }
          value={rent}
          onChange={(v) => {
            touch();
            setRent(v);
          }}
          max={1_000_000}
        />
        <MoneyInput
          label="הון עצמי שיש לכם היום"
          hint="בקנייה הוא הולך למקדמה ולעלויות; בשכירות הוא מושקע."
          value={equity}
          onChange={(v) => {
            touch();
            setEquity(v);
          }}
          max={100_000_000}
        />

        <ChipGroup<number>
          label="לכמה שנים משווים"
          options={HORIZONS}
          value={years}
          onChange={(v) => {
            touch();
            setYears(v);
          }}
          format={(v) => String(v)}
        />

        <fieldset className="rounded-2xl border border-border p-4 md:p-5 space-y-5">
          <legend className="px-1 text-sm font-semibold text-foreground">הנחות — שנו לפי המצב שלכם</legend>
          <div>
            <ChipGroup<number>
              label="ריבית המשכנתא"
              options={MORTGAGE_RATES}
              value={rate}
              onChange={(v) => {
                touch();
                setRate(v);
              }}
              format={(v) => formatPercent(v)}
              columns="grid-cols-3"
            />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              <bdi dir="ltr">{formatPercent(PRIME_RATE.value)}</bdi> הוא הפריים היום. משכנתא ל-
              {PAYMENT_TO_INCOME.value.maxYears} שנה.
            </p>
          </div>
          <div>
            <ChipGroup<number>
              label="עליית שכר הדירה בשנה"
              options={RENT_GROWTH}
              value={rentGrowth}
              onChange={(v) => {
                touch();
                setRentGrowth(v);
              }}
              format={(v) => formatPercent(v)}
              columns="grid-cols-3"
            />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              בשנה האחרונה: <bdi dir="ltr">{formatPercent(RENT_CHANGE_12M.value.renewals)}</bdi> למי שחידש חוזה,{" "}
              <bdi dir="ltr">{formatPercent(RENT_CHANGE_12M.value.newTenants)}</bdi> לשוכרים חדשים; האינפלציה{" "}
              <bdi dir="ltr">{formatPercent(INFLATION_12M.value)}</bdi>.
            </p>
          </div>
          <div>
            <ChipGroup<number>
              label="תשואה על הכסף שמושקע"
              options={RETURNS}
              value={ret}
              onChange={(v) => {
                touch();
                setRet(v);
              }}
              format={(v) => formatPercent(v)}
              columns="grid-cols-3"
            />
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              <bdi dir="ltr">{formatPercent(BOI_RATE.value)}</bdi> היא ריבית בנק ישראל. לפני מס; המס, 25% מהרווח
              הריאלי, מחושב בסוף.
            </p>
          </div>
          <ChipGroup<number>
            label="תחזוקה ותיקונים, מערך הדירה בשנה"
            options={UPKEEP}
            value={upkeep}
            onChange={(v) => {
              touch();
              setUpkeep(v);
            }}
            format={(v) => formatPercent(v)}
            columns="grid-cols-3"
          />
        </fieldset>
      </div>

      {!base.feasible ? (
        <div className="mt-7 rounded-2xl border border-accent/40 bg-accent/5 p-5" aria-live="polite">
          <p className="text-sm font-bold text-foreground mb-1">ההון העצמי לא מספיק לקנייה במחיר הזה</p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            צריך לפחות <ILS n={base.minEquity} className="font-semibold" />: 25% מהמחיר, ועוד מס הרכישה ועלויות
            הקנייה. שנו את המחיר או את ההון העצמי.
          </p>
          <Link
            to={`/tools/affordability?equity=${equity}`}
            className="group mt-2 inline-flex min-h-[44px] items-center gap-2 text-sm font-bold text-primary"
          >
            עד איזה מחיר אתם יכולים להגיע
            <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          </Link>
        </div>
      ) : (
        <>
          <ResultPanel
            label={edge ? <>בהנחות שבחרתם</> : <>קנייה משתלמת אם מחירי הדירות יעלו בממוצע ביותר מ-</>}
            value={verdict}
            valueDir="rtl"
            compact={edge}
          >
            {!edge ? (
              <>
                לאורך {yearsLabel(years)}. מתחת לזה — השכירות משתלמת יותר. בשנה האחרונה המחירים{" "}
                {pricesMoved(HOME_PRICES_12M.value)} ב-
                <bdi dir="ltr" className="tabular-nums font-bold text-white">
                  {formatPercent(Math.abs(HOME_PRICES_12M.value))}
                </bdi>
                .
              </>
            ) : (
              <>לאורך {yearsLabel(years)}, בהנחות שבחרתם.</>
            )}
          </ResultPanel>

          <table className="mt-6 w-full text-sm">
            <caption className="text-right text-sm font-semibold text-foreground mb-2">
              השווי הנקי שלכם בעוד {yearsLabel(years)}, אחרי מס ועלויות מכירה
            </caption>
            <thead>
              <tr className="text-muted-foreground text-xs">
                <th scope="col" className="text-right font-semibold pb-2">
                  מחירים בשנה
                </th>
                <th scope="col" className="text-left font-semibold pb-2 pl-3">
                  אם קונים
                </th>
                <th scope="col" className="text-left font-semibold pb-2">
                  אם שוכרים
                </th>
              </tr>
            </thead>
            <tbody>
              {scenarios.map(({ g, r }) => {
                const buyWins = r.advantage > 0;
                return (
                  <tr key={g} className="border-t border-border/70">
                    <th scope="row" className="py-2.5 text-right font-semibold text-foreground">
                      <bdi dir="ltr">{g > 0 ? `+${formatPercent(g)}` : formatPercent(g)}</bdi>
                    </th>
                    <td className={`py-2.5 pl-3 text-left ${buyWins ? "font-bold text-primary" : "text-foreground/70"}`}>
                      <ILS n={r.buyWealth} />
                    </td>
                    <td className={`py-2.5 text-left ${buyWins ? "text-foreground/70" : "font-bold text-primary"}`}>
                      <ILS n={r.rentWealth} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-5 rounded-2xl border border-accent/40 bg-accent/5 p-5">
            <p className="text-sm font-bold text-foreground mb-1">בחודש הראשון</p>
            <p className="text-sm text-foreground/85 leading-relaxed">
              קונים: <ILS n={base.ownerMonthly} className="font-semibold" /> — משכנתא של{" "}
              <ILS n={base.monthlyPayment} /> על <ILS n={base.loan} />
              {upkeep > 0 && (
                <>
                  {" "}
                  ועוד <ILS n={upkeepMonthly} /> תחזוקה
                </>
              )}
              . שוכרים: <ILS n={rent} className="font-semibold" />. מי שמשלם פחות משקיע את ההפרש, וכך משווים
              שני משקי בית עם אותו כסף.
            </p>
          </div>
        </>
      )}

      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        הנחות החישוב: דירה יחידה מיד שנייה דרך מתווך, עם עלויות קנייה באמצע טווחי השוק ומקדמה מכל ההון העצמי;
        במכירה — תיווך ועורך דין באמצע הטווח, ופטור ממס שבח על דירה יחידה. ההשקעה מחויבת במס של{" "}
        {formatPercent(CAPITAL_GAINS_TAX.value * 100, 0)} על הרווח הריאלי. ארנונה וועד בית לא נכללים, כי משלמים
        אותם בשני המקרים. המחשבון משווה כסף; הוא לא מתמחר את הביטחון שבבית משלכם או את הגמישות שבשכירות.
      </p>
    </div>
  );
};

export default RentVsBuyCalculator;
