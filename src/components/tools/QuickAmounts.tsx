import { formatMillions } from "@/lib/format";

interface QuickAmountsProps {
  amounts: readonly number[];
  value: number;
  onPick: (n: number) => void;
  label: string;
}

/** Example amounts under a MoneyInput — one tap fills the field. */
export const QuickAmounts = ({ amounts, value, onPick, label }: QuickAmountsProps) => (
  <div className="mt-2.5 flex flex-wrap gap-2" role="group" aria-label={label}>
    {amounts.map((n) => (
      <button
        key={n}
        type="button"
        aria-pressed={n === value}
        onClick={() => onPick(n)}
        className={`min-h-[36px] rounded-full border px-3 text-xs font-bold tabular-nums transition-colors ${
          n === value ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary/40"
        }`}
      >
        <span dir="ltr">{formatMillions(n)}</span>
      </button>
    ))}
  </div>
);
