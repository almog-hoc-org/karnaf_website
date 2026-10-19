import { useEffect, useId, useState, type ReactNode } from "react";

interface MoneyInputProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  /** Values outside [min, max] are clamped when the field loses focus. */
  min?: number;
  max?: number;
  hint?: ReactNode;
}

const group = (n: number) => Math.round(n).toLocaleString("en-US");
const parse = (s: string) => Number(s.replace(/[^\d]/g, "")) || 0;

/**
 * A shekel amount the visitor types — numeric keypad on phones, grouped
 * thousands as they type, left-to-right digits inside the RTL page.
 * Updates the parent on every keystroke so results follow the typing.
 */
export function MoneyInput({ label, value, onChange, min = 0, max = 100_000_000, hint }: MoneyInputProps) {
  const id = useId();
  const hintId = `${id}-hint`;
  const [text, setText] = useState(group(value));

  // Follow outside changes (e.g. a quick-pick chip).
  useEffect(() => {
    if (parse(text) !== value) setText(group(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only when the value changes
  }, [value]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-foreground mb-2">
        {label}
      </label>
      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-muted-foreground font-bold" aria-hidden>
          ₪
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          dir="ltr"
          value={text}
          aria-describedby={hint ? hintId : undefined}
          onChange={(e) => {
            const n = Math.min(parse(e.target.value), max);
            setText(e.target.value.trim() === "" ? "" : group(n));
            onChange(n);
          }}
          onBlur={() => {
            const n = Math.min(Math.max(parse(text), min), max);
            setText(group(n));
            onChange(n);
          }}
          className="w-full h-14 rounded-2xl border border-border bg-background pl-10 pr-4 text-right text-xl font-black tabular-nums text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>
      {hint && (
        <p id={hintId} className="mt-1.5 text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
}
