import type { ReactNode } from "react";

interface CheckRowProps {
  label: string;
  hint?: ReactNode;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}

/** One yes/no assumption of a calculator — a native checkbox in a 44px row. */
export const CheckRow = ({ label, hint, checked, onChange, disabled }: CheckRowProps) => (
  <label
    className={`flex min-h-[44px] items-start gap-3 rounded-xl px-1 py-2 ${
      disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
    }`}
  >
    <input
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      className="mt-0.5 h-5 w-5 shrink-0 rounded accent-[hsl(var(--primary))]"
    />
    <span className="min-w-0">
      <span className="block text-sm font-semibold text-foreground leading-snug">{label}</span>
      {hint && <span className="block text-xs text-muted-foreground leading-relaxed mt-0.5">{hint}</span>}
    </span>
  </label>
);
