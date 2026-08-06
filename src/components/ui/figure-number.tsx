import type { ReactNode } from "react";

/**
 * מספר-קרנף — "מספרים, לא תחושות" given a visual form. Every business
 * figure on the site (deal counts, shekel gaps, the price) renders
 * through this one treatment: tabular digits, the unit mark in amber,
 * and an optional thin ledger rule underneath — so a number reads as the
 * brand's signature rather than as more text.
 */

const sizeClass = {
  sm: "text-2xl md:text-3xl",
  md: "text-display-md",
  lg: "text-display-lg",
} as const;

interface FigureProps {
  /** The digits — a string, or an animated <span> (count-up ref). */
  value: ReactNode;
  /** Unit mark rendered in amber after the digits: "₪" / "%" / "+". */
  suffix?: string;
  size?: keyof typeof sizeClass;
  /** Set on dark ink sections — flips the ink color to white. */
  dark?: boolean;
  /** Thin ledger rule under the figure. */
  ledger?: boolean;
  className?: string;
}

export const Figure = ({
  value,
  suffix,
  size = "md",
  dark = false,
  ledger = false,
  className = "",
}: FigureProps) => (
  <span
    className={`inline-block font-black tabular-nums leading-none whitespace-nowrap ${sizeClass[size]} ${
      dark ? "text-white" : "text-foreground"
    } ${ledger ? "border-b border-accent/40 pb-2" : ""} ${className}`}
  >
    {value}
    {suffix && <span className="text-accent">{suffix}</span>}
  </span>
);

/** Compact quantified-outcome chip — crowns a testimonial with its number. */
export const FigureChip = ({ children }: { children: ReactNode }) => (
  <span className="inline-block text-sm font-black tabular-nums px-3 py-1.5 rounded-full bg-accent/10 text-accent-deep whitespace-nowrap">
    {children}
  </span>
);
