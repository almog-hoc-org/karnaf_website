import { useEffect, useMemo, useRef, useState } from "react";
import { ChipGroup } from "@/components/tools/ChipGroup";
import { MoneyInput } from "@/components/tools/MoneyInput";
import { purchaseTax, type BuyerStatus } from "@/lib/calc/purchaseTax";
import { formatILS, formatPercent } from "@/lib/format";
import { gaToolUse } from "@/lib/analytics";
import { PURCHASE_TAX_ADDITIONAL, PURCHASE_TAX_OLEH } from "@/data/finance/rules2026";

const STATUSES: readonly BuyerStatus[] = ["single", "replacement", "additional", "oleh"];
const STATUS_LABEL: Record<BuyerStatus, string> = {
  single: "דירה יחידה",
  replacement: "משפרי דיור",
  additional: "דירה נוספת",
  oleh: "עולה חדש",
};
const QUICK_PRICES = [1_500_000, 2_000_000, 2_600_000, 3_500_000] as const;
const DEFAULT_PRICE = 2_600_000;

const dmy = (iso: string) => iso.split("-").reverse().join(".");
const shortILS = (n: number) => `₪${(n / 1_000_000).toLocaleString("en-US", { maximumFractionDigits: 1 })}M`;

/** What the number means for this buyer, and what it depends on. */
function StatusNote({ status, price, overCap }: { status: BuyerStatus; price: number; overCap: boolean }) {
  if (status === "replacement") {
    const ifLate = purchaseTax(price, "additional").total;
    return (
      <>
        בתנאי שהדירה הקודמת תימכר בזמן: בתוך 24 חודשים בקנייה מיד שנייה, או 12 חודשים מהמסירה
        בקנייה מקבלן. לא נמכרה בזמן? משלימים עד מס של דירה נוספת — כאן{" "}
        <span dir="ltr" className="font-bold tabular-nums">{formatILS(ifLate)}</span> — בתוספת ריבית והצמדה.
      </>
    );
  }
  if (status === "additional") {
    return (
      <>
        8% הם הוראת שעה שבתוקף עד {dmy(PURCHASE_TAX_ADDITIONAL.validTo!)}. ההחלטה על 2027 תתקבל אצל
        הממשלה הבאה — תכננו את העסקה כך שתחזיק גם ב-8%.
      </>
    );
  }
  if (status === "oleh") {
    return overCap ? (
      <>
        מעל <span dir="ltr" className="tabular-nums">{formatILS(PURCHASE_TAX_OLEH.value.maxPrice)}</span> ההטבה לעולים
        לא חלה, ולכן החישוב לפי מדרגות דירה יחידה.
      </>
    ) : (
      <>
        לעולה שקונה דירה יחידה משנה לפני העלייה ועד שבע שנים אחריה. ההטבה ניתנת פעם אחת, ורק בבקשה
        למשרד מיסוי מקרקעין — היא לא מגיעה לבד.
      </>
    );
  }
  return <>משולם מההון העצמי, בתוך 60 יום מהעסקה. הבנק לא מממן את המס.</>;
}

/**
 * Purchase tax for 2026, by bracket — the same brackets and worked
 * examples as the purchase-tax-2026 article (rules in
 * data/finance/rules2026.ts, golden tests in lib/calc/purchaseTax.test.ts).
 * Pre-renders with the article's example (₪2.6M, single home); a shared
 * link (?price=&status=) is applied after mount, so SSR and hydration agree.
 */
const PurchaseTaxCalculator = () => {
  const [price, setPrice] = useState(DEFAULT_PRICE);
  const [status, setStatus] = useState<BuyerStatus>("single");
  const used = useRef(false);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const p = Number(q.get("price"));
    const s = q.get("status") as BuyerStatus | null;
    if (p > 0) setPrice(Math.min(p, 100_000_000));
    if (s && STATUSES.includes(s)) setStatus(s);
  }, []);

  const touch = () => {
    if (!used.current) {
      used.current = true;
      gaToolUse("purchase-tax");
    }
  };

  // Keep the URL shareable without adding history entries.
  useEffect(() => {
    if (!used.current) return;
    const url = new URL(window.location.href);
    url.searchParams.set("price", String(price));
    url.searchParams.set("status", status);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [price, status]);

  const r = useMemo(() => purchaseTax(price, status), [price, status]);

  return (
    <div className="bg-card rounded-3xl border border-border shadow-depth-3 p-6 md:p-9">
      <div className="flex items-start justify-between gap-4 mb-7">
        <h2 className="text-xl md:text-2xl font-bold text-foreground leading-snug">כמה מס רכישה תשלמו</h2>
        <span className="shrink-0 text-xs font-semibold border border-dashed border-primary/30 text-muted-foreground rounded-full px-3 py-1">
          מדרגות 2026
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
          <div className="mt-2.5 flex flex-wrap gap-2" aria-label="מחירים לדוגמה">
            {QUICK_PRICES.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => {
                  touch();
                  setPrice(p);
                }}
                className={`min-h-[36px] rounded-full border px-3 text-xs font-bold tabular-nums transition-colors ${
                  p === price ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/40"
                }`}
              >
                <span dir="ltr">{shortILS(p)}</span>
              </button>
            ))}
          </div>
        </div>

        <ChipGroup<BuyerStatus>
          label="המצב שלכם ביום הרכישה"
          options={STATUSES}
          value={status}
          onChange={(v) => {
            touch();
            setStatus(v);
          }}
          format={(v) => STATUS_LABEL[v]}
          columns="grid-cols-2 sm:grid-cols-4"
        />
      </div>

      <div className="mt-7 rounded-2xl bg-[hsl(var(--ink))] text-white p-5 md:p-6" aria-live="polite" aria-atomic="true">
        <p className="text-sm" style={{ color: "hsl(36 33% 95% / 0.72)" }}>
          מס רכישה · {STATUS_LABEL[status]}
        </p>
        <p dir="ltr" className="text-accent font-black text-4xl md:text-5xl tabular-nums leading-tight text-right">
          {formatILS(r.total)}
        </p>
        <p className="text-sm mt-1" style={{ color: "hsl(36 33% 95% / 0.72)" }}>
          {price > 0 ? (
            <>
              כ-<span dir="ltr" className="tabular-nums font-bold text-white">{formatPercent(r.effectiveRate * 100, 1)}</span>{" "}
              מהמחיר
            </>
          ) : (
            "הקלידו את מחיר הדירה"
          )}
        </p>
      </div>

      <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
        <StatusNote status={status} price={price} overCap={r.olehOverCap} />
      </p>

      {r.lines.length > 0 && (
        <table className="mt-6 w-full text-sm">
          <caption className="text-right text-sm font-semibold text-foreground mb-2">איך זה מחושב</caption>
          <thead>
            <tr className="text-muted-foreground text-xs">
              <th scope="col" className="text-right font-semibold pb-2">חלק מהמחיר</th>
              <th scope="col" className="text-center font-semibold pb-2">שיעור</th>
              <th scope="col" className="text-left font-semibold pb-2">מס</th>
            </tr>
          </thead>
          <tbody className="tabular-nums">
            {r.lines.map((l) => (
              <tr key={l.from} className="border-t border-border/70">
                <td className="py-2 text-right">
                  <span dir="ltr">
                    {formatILS(l.from)}–{formatILS(l.to)}
                  </span>
                </td>
                <td className="py-2 text-center" dir="ltr">
                  {formatPercent(l.rate * 100, 1)}
                </td>
                <td className="py-2 text-left font-semibold" dir="ltr">
                  {formatILS(l.tax)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
        לפי מדרגות סעיף 9 לחוק מיסוי מקרקעין, נכון ל-{dmy(PURCHASE_TAX_ADDITIONAL.asOf)}. החישוב לדירת
        מגורים ואינו ייעוץ מס: הסטטוס שלכם נקבע לפי כל התא המשפחתי ביום הרכישה, ועורך הדין מגיש את
        ההצהרה. לאימות:{" "}
        <a
          href="https://www.gov.il/he/service/real_eatate_taxsimulator"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          הסימולטור של רשות המסים
        </a>
        .
      </p>
    </div>
  );
};

export default PurchaseTaxCalculator;
