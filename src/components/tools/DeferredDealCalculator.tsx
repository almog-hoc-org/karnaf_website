import { useEffect, useMemo, useState } from "react";
import { ChipGroup } from "@/components/tools/ChipGroup";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { QuickAmounts } from "@/components/tools/QuickAmounts";
import { ResultPanel } from "@/components/tools/ResultPanel";
import { BUYER_STATUSES, STATUS_LABEL, parseStatus } from "@/components/tools/buyerStatus";
import { useToolUse } from "@/hooks/use-tool-use";
import { deferredDeal } from "@/lib/calc/deferredPayment";
import type { BuyerStatus } from "@/lib/calc/purchaseTax";
import { maxLtvFor } from "@/lib/calc/transactionCosts";
import { formatDateDots, formatILS, formatPercent } from "@/lib/format";
import { CONSTRUCTION_INDEX_12M, PRIME_RATE } from "@/data/finance/rules2026";

/** Up-front share in whole percents: 20 → a 20/80 deal. */
const SPLITS = [10, 20, 30, 40] as const;
const YEARS = [1, 2, 3, 4] as const;
const YEARS_LABEL: Record<number, string> = { 1: "שנה", 2: "שנתיים", 3: "3 שנים", 4: "4 שנים" };
/** Cost-of-money scenarios around today's prime, deduplicated if prime lands on one. */
const RATES = [...new Set([4, PRIME_RATE.value, 5, 6])].sort((a, b) => a - b);
/** Index scenarios: calm, the last 12 months, and the stress case the index article uses. */
const INDEX_RATES = [...new Set([2, CONSTRUCTION_INDEX_12M.value, 5])].sort((a, b) => a - b);
type Linkage = "none" | "linked";
const LINKAGE: readonly Linkage[] = ["none", "linked"];
const LINKAGE_LABEL: Record<Linkage, string> = { none: "לא צמוד", linked: "צמוד למדד" };

const QUICK_PRICES = [1_500_000, 2_000_000, 2_500_000, 3_000_000] as const;
const DEFAULTS = { price: 2_000_000, split: 20, years: 3, rate: 5, index: CONSTRUCTION_INDEX_12M.value };

const ILS = ({ n, className = "" }: { n: number; className?: string }) => (
  <span dir="ltr" className={`tabular-nums ${className}`}>
    {formatILS(n)}
  </span>
);

/**
 * What a developer's deferred-payment deal (20/80, 10/90…) is worth in
 * today's money, what the index linkage adds, and how much cash delivery
 * day needs beyond the mortgage. Logic and golden tests in
 * lib/calc/deferredPayment. Pre-renders the article's example (₪2M,
 * 20/80, 3 years, 5%); a shared link is applied after mount.
 */
const DeferredDealCalculator = () => {
  const [price, setPrice] = useState(DEFAULTS.price);
  const [split, setSplit] = useState<number>(DEFAULTS.split);
  const [years, setYears] = useState<number>(DEFAULTS.years);
  const [rate, setRate] = useState<number>(DEFAULTS.rate);
  const [linkage, setLinkage] = useState<Linkage>("none");
  const [indexRate, setIndexRate] = useState<number>(DEFAULTS.index);
  const [status, setStatus] = useState<BuyerStatus>("single");
  const [regular, setRegular] = useState(0);
  const touch = useToolUse("20-80", { price, split, years, rate, linked: linkage === "linked", index: indexRate, status, regular });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const num = (k: string) => Number(q.get(k));
    if (num("price") > 0) setPrice(Math.min(num("price"), 100_000_000));
    if ((SPLITS as readonly number[]).includes(num("split"))) setSplit(num("split"));
    if ((YEARS as readonly number[]).includes(num("years"))) setYears(num("years"));
    if (RATES.includes(num("rate"))) setRate(num("rate"));
    if (q.get("linked") === "1") setLinkage("linked");
    if (INDEX_RATES.includes(num("index"))) setIndexRate(num("index"));
    const s = parseStatus(q.get("status"));
    if (s) setStatus(s);
    if (num("regular") > 0) setRegular(Math.min(num("regular"), 100_000_000));
  }, []);

  const r = useMemo(
    () =>
      deferredDeal({
        price,
        upfrontShare: split / 100,
        years,
        discountRate: rate,
        linked: linkage === "linked",
        indexRate,
        maxLtv: maxLtvFor(status),
      }),
    [price, split, years, rate, linkage, indexRate, status],
  );

  const ltv = formatPercent(maxLtvFor(status) * 100, 0);
  const vsRegular = regular > 0 ? regular - r.presentValue : null;
  const discountShown = Math.abs(r.hiddenDiscount) >= 500;

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">כמה שווה המבצע בכסף של היום</h2>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          חוק המכר
        </span>
      </div>

      <div className="space-y-6">
        <div>
          <MoneyInput
            label="המחיר בחוזה"
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

        <ChipGroup<number>
          label="מבנה התשלום"
          options={SPLITS}
          value={split}
          onChange={(v) => {
            touch();
            setSplit(v);
          }}
          format={(v) => `${v}/${100 - v}`}
        />

        <ChipGroup<number>
          label="עד המסירה"
          options={YEARS}
          value={years}
          onChange={(v) => {
            touch();
            setYears(v);
          }}
          format={(v) => YEARS_LABEL[v]}
        />

        <div>
          <ChipGroup<number>
            label="ריבית היוון: כמה עולה לכם הכסף"
            options={RATES}
            value={rate}
            onChange={(v) => {
              touch();
              setRate(v);
            }}
            format={(v) => formatPercent(v)}
          />
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
            אם בלי המבצע הייתם לוקחים משכנתא — הריבית שלה (הפריים היום:{" "}
            <span dir="ltr">{formatPercent(PRIME_RATE.value)}</span>). אם הכסף בפיקדון או בהשקעה — התשואה שהוא
            מרוויח.
          </p>
        </div>

        <div>
          <ChipGroup<Linkage>
            label="התשלום שנדחה למסירה"
            options={LINKAGE}
            value={linkage}
            onChange={(v) => {
              touch();
              setLinkage(v);
            }}
            format={(v) => LINKAGE_LABEL[v]}
            columns="grid-cols-2"
          />
          {linkage === "linked" && (
            <div className="mt-4">
              <ChipGroup<number>
                label="עליית מדד תשומות הבנייה בשנה (הנחה)"
                options={INDEX_RATES}
                value={indexRate}
                onChange={(v) => {
                  touch();
                  setIndexRate(v);
                }}
                format={(v) => formatPercent(v)}
                columns="grid-cols-3"
              />
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                <span dir="ltr">{formatPercent(CONSTRUCTION_INDEX_12M.value)}</span> היא העלייה ב-12 החודשים האחרונים לפי
                הלמ״ס, בפרסום מ-{formatDateDots(CONSTRUCTION_INDEX_12M.asOf)}. החישוב מניח את המקסימום שהחוק מתיר להצמיד.
              </p>
            </div>
          )}
        </div>

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
      </div>

      <ResultPanel label={<>שווי העסקה בכסף של היום · {split}/{100 - split}</>} value={formatILS(r.presentValue)}>
        {price > 0 && discountShown ? (
          <>
            {r.hiddenDiscount > 0 ? "הנחה סמויה של " : "יקר מהמחיר בחוזה ב-"}
            <ILS n={Math.abs(r.hiddenDiscount)} className="font-bold text-white" /> (כ-
            <span dir="ltr" className="tabular-nums font-bold text-white">
              {formatPercent(Math.abs(r.hiddenDiscountRate) * 100, 1)}
            </span>
            ){r.hiddenDiscount > 0 ? ", אם המחיר עצמו לא נופח" : ""}
          </>
        ) : price > 0 ? (
          "בלי הנחה סמויה"
        ) : (
          "הקלידו את המחיר בחוזה"
        )}
      </ResultPanel>

      {price > 0 && (
        <table className="mt-6 w-full text-sm">
          <caption className="text-right text-sm font-semibold text-foreground mb-2">לוח התשלומים</caption>
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th scope="col" className="text-right font-semibold pb-2">
                תשלום
              </th>
              <th scope="col" className="text-left font-semibold pb-2 pl-4">
                סכום
              </th>
              <th scope="col" className="text-left font-semibold pb-2">
                בכסף של היום
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-border/70">
              <th scope="row" className="py-2.5 pl-2 text-right font-semibold text-foreground">
                בחתימה
              </th>
              <td className="py-2.5 pl-4 text-left">
                <ILS n={r.upfront} />
              </td>
              <td className="py-2.5 text-left font-semibold">
                <ILS n={r.upfront} />
              </td>
            </tr>
            <tr className="border-t border-border/70 align-top">
              <th scope="row" className="py-2.5 pl-2 text-right font-normal">
                <span className="block font-semibold text-foreground">במסירה, בעוד {YEARS_LABEL[years]}</span>
                {r.linkage > 0 && (
                  <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">
                    כולל הצמדה של <ILS n={r.linkage} /> על <ILS n={r.linkedAmount} /> צמודים
                  </span>
                )}
              </th>
              <td className="py-2.5 pl-4 text-left">
                <ILS n={r.dueAtDelivery} />
              </td>
              <td className="py-2.5 text-left font-semibold">
                <ILS n={r.dueAtDeliveryToday} />
              </td>
            </tr>
            <tr className="border-t-2 border-border">
              <th scope="row" className="py-2.5 pl-2 text-right font-bold text-foreground">
                סך הכול
              </th>
              <td className="py-2.5 pl-4 text-left font-bold">
                <ILS n={r.upfront + r.dueAtDelivery} />
              </td>
              <td className="py-2.5 text-left font-bold">
                <ILS n={r.presentValue} />
              </td>
            </tr>
          </tbody>
        </table>
      )}

      <div className="mt-6">
        <MoneyInput
          label="המחיר בלי המבצע (לא חובה)"
          hint="המחיר שהקבלן נותן לאותה דירה בלוח תשלומים רגיל או במזומן. בלעדיו אי אפשר לדעת אם המבצע משתלם."
          value={regular}
          onChange={(v) => {
            touch();
            setRegular(v);
          }}
          max={100_000_000}
        />
        {vsRegular !== null && price > 0 && (
          <p
            className={`mt-3 rounded-2xl border p-4 text-sm leading-relaxed ${
              vsRegular >= 0 ? "border-accent/40 bg-accent/5" : "border-destructive/40 bg-destructive/5"
            }`}
            aria-live="polite"
          >
            {vsRegular >= 0 ? (
              <>
                <span className="font-bold">המבצע משתלם לכם בכ-<ILS n={vsRegular} />:</span> שווי העסקה בכסף של
                היום נמוך מהמחיר בלי המבצע.
              </>
            ) : (
              <>
                <span className="font-bold">המבצע עולה לכם כ-<ILS n={-vsRegular} /> יותר:</span> בתשלום רגיל
                הדירה זולה יותר גם אחרי שמתרגמים את הדחייה לכסף.
              </>
            )}
          </p>
        )}
      </div>

      {price > 0 && (
        <div className="mt-4 rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <p className="text-sm font-bold text-foreground mb-1">יום המסירה</p>
          <p className="text-sm text-foreground/85 leading-relaxed">
            במסירה תצטרכו <ILS n={r.dueAtDelivery} className="font-semibold" />. הבנק יממן עד {ltv} מהמחיר
            ל{STATUS_LABEL[status]} — עד <ILS n={r.bankAtDelivery} className="font-semibold" />
            {r.equityAtDelivery > 0 ? (
              <>
                , ואת <ILS n={r.equityAtDelivery} className="font-semibold" /> הנותרים תביאו מהון עצמי באותו יום.
              </>
            ) : (
              <>, כך שהמשכנתא יכולה לכסות את התשלום — אם ההכנסה והשמאות יעמדו בבדיקה.</>
            )}{" "}
            בדקו אישור עקרוני עכשיו, לא שנה לפני המסירה.
          </p>
        </div>
      )}

      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        היוון שנתי בריבית שבחרתם. ההצמדה מחושבת על החלק המרבי שחוק המכר מתיר (מחצית מכל תשלום שאחרי 20%
        הראשונים, בחוזים מ-7.7.2022) ועד מועד המסירה שבחוזה. המימון במסירה לפי המחיר בחוזה; אם שמאי הבנק יעריך
        את הדירה בפחות, הבנק יממן פחות. הערכה בלבד, לא ייעוץ פיננסי.
      </p>
    </div>
  );
};

export default DeferredDealCalculator;
