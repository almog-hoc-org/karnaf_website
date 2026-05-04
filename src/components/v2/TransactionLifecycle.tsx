import { useEffect, useRef, useState } from "react";

const STEPS = [
  { num: "01", label: "אבחון", duration: "פגישה ראשונה" },
  { num: "02", label: "מיפוי שוק", duration: "אזורים מתאימים" },
  { num: "03", label: "סינון נכסים", duration: "אפיון עסקאות" },
  { num: "04", label: "ניתוח מעמיק", duration: "דוחות מימון ושומה" },
  { num: "05", label: "משא ומתן", duration: "ליווי בזמן אמת" },
  { num: "06", label: "חתימה", duration: "צמוד לעו״ד" },
];

interface TransactionLifecycleProps {
  /** Optional: 0..6 — how many steps to show as completed (filled). */
  progress?: number;
}

/**
 * Horizontal step diagram of a real-estate transaction lifecycle.
 * Pure SVG/CSS — no deps. Fills progressively when scrolled into view.
 */
export const TransactionLifecycle = ({ progress }: TransactionLifecycleProps) => {
  const ref = useRef<HTMLOListElement>(null);
  const [filled, setFilled] = useState(0);

  useEffect(() => {
    if (typeof progress === "number") {
      setFilled(progress);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setFilled(STEPS.length);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            // animate filling 0 → STEPS.length
            STEPS.forEach((_, i) => {
              setTimeout(() => setFilled(i + 1), 350 + i * 250);
            });
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [progress]);

  const fillPct = (filled / STEPS.length) * 100;

  return (
    <div className="relative">
      {/* track */}
      <div className="absolute right-0 left-0 top-7 h-px" style={{ background: "hsl(36 33% 95% / 0.18)" }} />
      <div
        className="absolute right-0 top-7 h-px transition-[width] duration-700 ease-out"
        style={{
          width: `${fillPct}%`,
          background: "hsl(var(--accent))",
        }}
      />

      <ol ref={ref} className="grid grid-cols-3 md:grid-cols-6 gap-6 relative">
        {STEPS.map((s, i) => {
          const done = i < filled;
          return (
            <li key={s.num} className="relative">
              <div className="flex items-center justify-center mb-4">
                <span
                  className="w-4 h-4 rounded-full border-2 transition-colors duration-500"
                  style={{
                    backgroundColor: done ? "hsl(var(--accent))" : "transparent",
                    borderColor: done ? "hsl(var(--accent))" : "hsl(36 33% 95% / 0.3)",
                    boxShadow: done ? "0 0 16px hsl(var(--accent) / 0.6)" : "none",
                  }}
                  aria-hidden
                />
              </div>
              <div className="text-center">
                <div
                  className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1"
                  style={{ color: "hsl(var(--accent))" }}
                >
                  {s.num}
                </div>
                <div className="font-bold text-sm md:text-base mb-1 leading-tight text-white">
                  {s.label}
                </div>
                <div
                  className="text-[11px] font-mono uppercase tracking-[0.14em]"
                  style={{ color: "hsl(36 33% 95% / 0.55)" }}
                >
                  {s.duration}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
