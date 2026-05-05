import { useMemo, useState } from "react";

/**
 * Area average price comparator. Numbers are 2025-ish indicative estimates
 * (not live) — used to demonstrate the "data over feelings" promise.
 */

type Area = {
  city: string;
  hood: string;
  pricePerSqm: number;       // ₪/m²
  yoyChange: number;         // %
  rentalYield: number;       // % gross
};

const AREAS: Area[] = [
  { city: "תל אביב",     hood: "הצפון הישן",   pricePerSqm: 70_000, yoyChange: 2.4, rentalYield: 2.7 },
  { city: "תל אביב",     hood: "פלורנטין",     pricePerSqm: 58_000, yoyChange: 4.1, rentalYield: 3.4 },
  { city: "רמת גן",      hood: "מרום נווה",    pricePerSqm: 48_000, yoyChange: 3.2, rentalYield: 3.6 },
  { city: "גבעתיים",     hood: "מרכז",        pricePerSqm: 52_000, yoyChange: 2.0, rentalYield: 3.3 },
  { city: "חיפה",        hood: "כרמל",         pricePerSqm: 24_000, yoyChange: 1.6, rentalYield: 4.8 },
  { city: "ירושלים",     hood: "קטמון",        pricePerSqm: 38_000, yoyChange: 2.2, rentalYield: 3.0 },
  { city: "באר שבע",     hood: "ד׳",          pricePerSqm: 14_500, yoyChange: 0.9, rentalYield: 5.6 },
  { city: "פתח תקווה",   hood: "כפר גנים",     pricePerSqm: 32_000, yoyChange: 2.8, rentalYield: 3.9 },
];

const formatILS = (n: number) =>
  new Intl.NumberFormat("he-IL", { maximumFractionDigits: 0 }).format(
    Math.round(n)
  );

type SortKey = "price" | "yoy" | "yield";

export const AreaCompare = () => {
  const [sort, setSort] = useState<SortKey>("price");
  const [size, setSize] = useState(85); // m²

  const sorted = useMemo(() => {
    const arr = [...AREAS];
    if (sort === "price") arr.sort((a, b) => b.pricePerSqm - a.pricePerSqm);
    if (sort === "yoy") arr.sort((a, b) => b.yoyChange - a.yoyChange);
    if (sort === "yield") arr.sort((a, b) => b.rentalYield - a.rentalYield);
    return arr;
  }, [sort]);

  const max = useMemo(
    () => Math.max(...sorted.map((a) => a.pricePerSqm)),
    [sorted]
  );

  return (
    <div
      className="rounded-2xl p-6 md:p-10 backdrop-blur-sm"
      style={{
        backgroundColor: "hsl(36 33% 95% / 0.04)",
        border: "1px solid hsl(36 33% 95% / 0.12)",
      }}
    >
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div className="text-eyebrow uppercase tracking-[0.22em] text-accent flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-accent"
            aria-hidden
            style={{ boxShadow: "0 0 12px hsl(var(--accent))" }}
          />
          <span>השוואת אזורים · live</span>
        </div>

        <div
          role="tablist"
          aria-label="מיון לפי"
          className="inline-flex items-center gap-1 p-1 rounded-full"
          style={{
            backgroundColor: "hsl(36 33% 95% / 0.06)",
            border: "1px solid hsl(36 33% 95% / 0.10)",
          }}
        >
          {(
            [
              { key: "price" as const, label: "מחיר למ״ר" },
              { key: "yoy" as const, label: "שינוי שנתי" },
              { key: "yield" as const, label: "תשואה" },
            ]
          ).map((t) => {
            const active = sort === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setSort(t.key)}
                className="px-4 py-1.5 text-xs font-bold rounded-full transition-colors"
                style={{
                  backgroundColor: active ? "hsl(var(--accent))" : "transparent",
                  color: active
                    ? "hsl(var(--accent-foreground))"
                    : "hsl(36 33% 95% / 0.7)",
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Size slider */}
      <div className="mb-8 max-w-md">
        <div className="flex items-baseline justify-between mb-3">
          <span
            className="text-eyebrow uppercase tracking-[0.18em]"
            style={{ color: "hsl(36 33% 95% / 0.7)" }}
          >
            גודל הדירה (מ״ר)
          </span>
          <span className="font-mono tabular-nums text-lg font-bold text-accent">
            {size} מ״ר
          </span>
        </div>
        <input
          type="range"
          min={40}
          max={180}
          step={5}
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(217_50%_8%)]"
          style={{
            background: `linear-gradient(to left, hsl(var(--accent)) 0%, hsl(var(--accent)) ${
              ((size - 40) / (180 - 40)) * 100
            }%, hsl(36 33% 95% / 0.15) ${
              ((size - 40) / (180 - 40)) * 100
            }%, hsl(36 33% 95% / 0.15) 100%)`,
          }}
        />
      </div>

      {/* Bars */}
      <ul className="space-y-3">
        {sorted.map((a) => {
          const totalPrice = a.pricePerSqm * size;
          const widthPct = (a.pricePerSqm / max) * 100;
          return (
            <li key={`${a.city}-${a.hood}`} className="grid grid-cols-[120px_1fr_auto] gap-4 items-center">
              <div className="text-sm">
                <div className="text-white font-bold leading-tight">{a.city}</div>
                <div
                  className="text-xs font-mono uppercase tracking-[0.14em]"
                  style={{ color: "hsl(36 33% 95% / 0.5)" }}
                >
                  {a.hood}
                </div>
              </div>
              <div className="relative h-9 rounded-md overflow-hidden"
                style={{ backgroundColor: "hsl(36 33% 95% / 0.06)" }}>
                <div
                  className="h-full transition-[width] duration-500"
                  style={{
                    width: `${widthPct}%`,
                    background:
                      "linear-gradient(to left, hsl(var(--accent)), hsl(24 90% 42%))",
                  }}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center text-xs font-mono tabular-nums font-bold"
                  style={{ color: "hsl(36 33% 95% / 0.95)" }}
                >
                  {formatILS(a.pricePerSqm)} ₪/מ״ר
                </span>
              </div>
              <div className="text-end min-w-[140px]">
                <div className="text-sm font-mono tabular-nums font-bold text-white">
                  {formatILS(totalPrice)} ₪
                </div>
                <div
                  className="text-[11px] font-mono uppercase tracking-[0.14em] mt-0.5"
                  style={{ color: a.yoyChange >= 0 ? "hsl(var(--accent))" : "hsl(0 70% 60%)" }}
                >
                  {a.yoyChange >= 0 ? "+" : ""}
                  {a.yoyChange.toFixed(1)}% YoY · {a.rentalYield.toFixed(1)}% תשואה
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div
        className="mt-8 pt-6 border-t text-xs font-mono uppercase tracking-[0.18em]"
        style={{ borderColor: "hsl(36 33% 95% / 0.10)", color: "hsl(36 33% 95% / 0.5)" }}
      >
        * נתונים מצטברים מ-2025 · להמחשה · בקורס יש דאטה ממוקדת לכל אזור
      </div>
    </div>
  );
};
