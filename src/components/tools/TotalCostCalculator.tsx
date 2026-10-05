import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ChipGroup } from "@/components/tools/ChipGroup";
import { CheckRow } from "@/components/tools/CheckRow";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { QuickAmounts } from "@/components/tools/QuickAmounts";
import { Range } from "@/components/tools/Range";
import { ResultPanel } from "@/components/tools/ResultPanel";
import { BUYER_STATUSES, STATUS_LABEL, parseStatus } from "@/components/tools/buyerStatus";
import { useToolUse } from "@/hooks/use-tool-use";
import type { BuyerStatus } from "@/lib/calc/purchaseTax";
import { transactionCosts, type CostKey } from "@/lib/calc/transactionCosts";
import { formatDateDots, formatILS, formatPercent } from "@/lib/format";
import { DEVELOPER_LEGAL_FEE, MARKET_FEES, MORTGAGE_FILE_FEE } from "@/data/finance/rules2026";

type Deal = "resale" | "new";
const DEALS: readonly Deal[] = ["resale", "new"];
const DEAL_LABEL: Record<Deal, string> = { resale: "יד שנייה", new: "מקבלן" };

const QUICK_PRICES = [1_500_000, 2_000_000, 2_600_000, 3_500_000] as const;
const DEFAULT_PRICE = 2_600_000;

const LABEL: Record<CostKey, string> = {
  purchaseTax: "מס רכישה",
  buyerLawyer: "עורך דין מטעמכם",
  developerLawyer: "שכר טרחת עו״ד הקבלן",
  agent: "דמי תיווך",
  bankAppraisal: "שמאי מטעם הבנק",
  privateAppraisal: "שמאי פרטי",
  mortgageFileFee: "עמלת פתיחת תיק משכנתא",
  landRegistry: "אגרות רישום בטאבו",
  mortgageAdvisor: "יועץ משכנתאות",
};

/**
 * Headline ranges in thousands, the way Israelis say them ("73–119 אלף ₪"):
 * short enough for a phone, and honest — the inputs are market ranges, not quotes.
 */
const thousands = (low: number, high: number) => {
  const [a, b] = [low, high].map((n) => Math.round(n / 1_000).toLocaleString("en-US"));
  return `${a === b ? a : `${a}–${b}`} אלף ₪`;
};

const percent = (n: number) => formatPercent(n * 100, 1);
const Pct = ({ range: [lo, hi] }: { range: [number, number] }) => <Range low={lo} high={hi} format={percent} />;

/**
 * Everything a purchase costs beyond the price, itemized: tax and fees set
 * by law are exact, market fees are ranges (rules in
 * data/finance/rules2026.ts, logic and tests in lib/calc/transactionCosts).
 * Pre-renders a ₪2.6M single home bought second-hand via an agent, with a
 * mortgage; a shared link is applied after mount.
 */
const TotalCostCalculator = () => {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [status, setStatus] = useState<BuyerStatus>("single");
  const [deal, setDeal] = useState<Deal>("resale");
  const [viaAgent, setViaAgent] = useState(true);
  const [withMortgage, setWithMortgage] = useState(true);
  const [privateAppraisal, setPrivateAppraisal] = useState(false);
  const [mortgageAdvisor, setMortgageAdvisor] = useState(false);
  const touch = useToolUse("total-cost", {
    price,
    status,
    deal,
    agent: viaAgent,
    mortgage: withMortgage,
    appraiser: privateAppraisal,
    advisor: mortgageAdvisor,
  });

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = Number(q.get("price"));
    const s = parseStatus(q.get("status"));
    const d = q.get("deal");
    const flag = (k: string, set: (v: boolean) => void) => {
      const v = q.get(k);
      if (v === "1" || v === "0") set(v === "1");
    };
    if (p > 0) setPrice(Math.min(p, 100_000_000));
    if (s) setStatus(s);
    if (d === "resale" || d === "new") {
      setDeal(d);
      if (d === "new") setViaAgent(false);
    }
    flag("agent", setViaAgent);
    flag("mortgage", setWithMortgage);
    flag("appraiser", setPrivateAppraisal);
    flag("advisor", setMortgageAdvisor);
  }, []);

  const r = useMemo(
    () =>
      transactionCosts({
        price,
        status,
        newBuild: deal === "new",
        viaAgent,
        withMortgage,
        privateAppraisal,
        mortgageAdvisor,
      }),
    [price, status, deal, viaAgent, withMortgage, privateAppraisal, mortgageAdvisor],
  );

  const fees = MARKET_FEES.value;
  const dev = DEVELOPER_LEGAL_FEE.value;
  const note = (key: CostKey) => {
    switch (key) {
      case "purchaseTax":
        return (
          <>
            {status === "replacement" && "בתנאי שהדירה הקודמת נמכרת בזמן. "}
            <Link
              to={`/tools/purchase-tax?price=${price}&status=${status}`}
              className="underline underline-offset-2 hover:text-foreground"
            >
              פירוט לפי מדרגות
            </Link>
          </>
        );
      case "buyerLawyer":
        return (
          <>
            <Pct range={fees.buyerLawyerRate} /> מהמחיר + מע״מ, לפי מחירי השוק
          </>
        );
      case "developerLawyer":
        return r.developerFeeCapped ? (
          <>
            קבוע בתקנות: <span dir="ltr">{formatILS(dev.cap)}</span> + מע״מ, או 0.5% מהמחיר אם זה פחות
          </>
        ) : (
          <>
            מעל <span dir="ltr">{formatILS(dev.capAppliesUpTo)}</span> התקנות לא מגבילות את הסכום — בדקו בחוזה
          </>
        );
      case "agent":
        return (
          <>
            <Pct range={fees.agentRate} /> + מע״מ. אין תקרה בחוק — הסכום נקבע בהזמנת התיווך
          </>
        );
      case "bankAppraisal":
      case "privateAppraisal":
      case "mortgageAdvisor":
        return <>לפי מחירי השוק</>;
      case "mortgageFileFee":
        return <>התקרה בחוק; יש בנקים שגובים פחות</>;
      case "landRegistry":
        return <>הערת אזהרה והעברת בעלות{withMortgage ? ", ורישום המשכנתא" : ""}</>;
    }
  };

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">כמה עולה העסקה מעבר למחיר</h2>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          2026
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

        <ChipGroup<Deal>
          label="ממי קונים"
          options={DEALS}
          value={deal}
          onChange={(v) => {
            touch();
            setDeal(v);
            setViaAgent(v === "resale");
          }}
          format={(v) => DEAL_LABEL[v]}
          columns="grid-cols-2"
        />

        <fieldset>
          <legend className="text-sm font-semibold text-foreground mb-1.5">מה עוד בעסקה</legend>
          <div className="grid sm:grid-cols-2 gap-x-4">
            <CheckRow
              label="קונים דרך מתווך"
              checked={viaAgent}
              onChange={(v) => {
                touch();
                setViaAgent(v);
              }}
            />
            <CheckRow
              label="לוקחים משכנתא"
              checked={withMortgage}
              onChange={(v) => {
                touch();
                setWithMortgage(v);
              }}
            />
            <CheckRow
              label="שמאי פרטי לפני החתימה"
              checked={privateAppraisal}
              onChange={(v) => {
                touch();
                setPrivateAppraisal(v);
              }}
            />
            <CheckRow
              label="יועץ משכנתאות"
              checked={withMortgage && mortgageAdvisor}
              disabled={!withMortgage}
              onChange={(v) => {
                touch();
                setMortgageAdvisor(v);
              }}
            />
          </div>
        </fieldset>
      </div>

      <ResultPanel
        compact
        label={<>עלויות נלוות · {STATUS_LABEL[status]}</>}
        value={thousands(r.low, r.high)}
        valueDir="rtl"
      >
        {price > 0 ? (
          <>
            כ-
            <span className="tabular-nums font-bold text-white">
              <Range low={r.low / price} high={r.high / price} format={percent} />
            </span>{" "}
            נוספים על מחיר הדירה
          </>
        ) : (
          "הקלידו את מחיר הדירה"
        )}
      </ResultPanel>

      {price > 0 && (
        <div className="mt-3 rounded-2xl border border-accent/40 bg-accent/5 p-5">
          <p className="text-sm font-semibold text-foreground">
            {withMortgage ? "הון עצמי שתצטרכו, לפחות" : "סך הכול מזומן לעסקה"}
          </p>
          <p className="text-2xl md:text-3xl font-black text-foreground tabular-nums">
            {thousands(r.equityLow, r.equityHigh)}
          </p>
          <p className="mt-1 text-sm text-foreground/80 leading-relaxed">
            {withMortgage ? (
              <>
                הבנק מממן עד {formatPercent(r.maxLtv * 100, 0)} מהמחיר ל{STATUS_LABEL[status]}, אז{" "}
                <span dir="ltr" className="tabular-nums font-semibold">{formatILS(r.minDownPayment)}</span> משלמים בעצמכם —
                ועליהם כל העלויות הנלוות, שהבנק לא מממן.
              </>
            ) : (
              <>מחיר הדירה ועליו העלויות הנלוות.</>
            )}
          </p>
        </div>
      )}

      <table className="mt-6 w-full text-sm">
        <caption className="text-right text-sm font-semibold text-foreground mb-2">הפירוט</caption>
        <thead>
          <tr className="text-muted-foreground text-xs">
            <th scope="col" className="text-right font-semibold pb-2">
              הוצאה
            </th>
            <th scope="col" className="text-left font-semibold pb-2">
              סכום, כולל מע״מ
            </th>
          </tr>
        </thead>
        <tbody>
          {r.items.map((i) => (
            <tr key={i.key} className="border-t border-border/70 align-top">
              <th scope="row" className="py-2.5 pl-3 text-right font-normal">
                <span className="block font-semibold text-foreground">{LABEL[i.key]}</span>
                <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">{note(i.key)}</span>
              </th>
              <td className="py-2.5 text-left font-semibold whitespace-nowrap">
                <Range low={i.low} high={i.high} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        אגרות ועמלות שנקבעו בחוק — מדויקות לשנת 2026. שכר טרחה, תיווך ושמאות — טווחי שוק נכון
        ל-{formatDateDots(MARKET_FEES.asOf)}; בקשו הצעת מחיר מראש. עמלת פתיחת תיק: עד{" "}
        <span dir="ltr">{formatILS(MORTGAGE_FILE_FEE.value)}</span>. לא כולל הובלה, שיפוץ וריהוט, ובדירה מקבלן גם
        לא את ההצמדה למדד תשומות הבנייה. הערכה בלבד, לא ייעוץ מס או משפטי.
      </p>
    </div>
  );
};

export default TotalCostCalculator;
