import type { ReactNode } from "react";

const MUTED = { color: "hsl(36 33% 95% / 0.72)" };

/**
 * The dark answer box every calculator ends with — a label, the number,
 * and one line of context. Announced politely as the inputs change.
 */
export const ResultPanel = ({
  label,
  value,
  children,
  compact,
  valueDir = "ltr",
}: {
  label: ReactNode;
  value: ReactNode;
  children?: ReactNode;
  /** A smaller number, for ranges that must fit a phone. */
  compact?: boolean;
  /** "rtl" when the value carries Hebrew ("73–119 אלף ₪"); a bare amount stays "ltr". */
  valueDir?: "ltr" | "rtl";
}) => (
  <div className="mt-7 rounded-2xl bg-[hsl(var(--ink))] text-white p-5 md:p-6" aria-live="polite" aria-atomic="true">
    <p className="text-sm" style={MUTED}>
      {label}
    </p>
    <p
      dir={valueDir}
      className={`text-accent font-black tabular-nums leading-tight text-right ${
        compact ? "text-[2rem] md:text-[2.75rem]" : "text-4xl md:text-5xl"
      }`}
    >
      {value}
    </p>
    {children && (
      <p className="text-sm mt-1" style={MUTED}>
        {children}
      </p>
    )}
  </div>
);
