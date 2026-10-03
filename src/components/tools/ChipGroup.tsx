import { useId } from "react";

interface ChipGroupProps<T extends string | number> {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (v: T) => void;
  format?: (v: T) => string;
  /** Tailwind grid-cols class, e.g. "grid-cols-4". */
  columns?: string;
}

/**
 * A row of toggle chips for one choice — 44px tall, keyboard reachable,
 * aria-pressed on the selected chip. Shared by the site's calculators.
 */
export function ChipGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
  format = (v) => String(v),
  columns = "grid-cols-4",
}: ChipGroupProps<T>) {
  const id = useId();
  return (
    <div role="group" aria-labelledby={id}>
      <p id={id} className="text-sm font-semibold text-foreground mb-2.5">
        {label}
      </p>
      <div className={`grid ${columns} gap-2`}>
        {options.map((o) => {
          const on = o === value;
          return (
            <button
              key={String(o)}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(o)}
              className={`min-h-[44px] rounded-full border px-3 text-sm font-bold tabular-nums transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                on
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/40"
              }`}
            >
              {format(o)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
