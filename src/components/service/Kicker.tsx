interface KickerProps {
  children: React.ReactNode;
  /** On the ink sections the label can carry the amber itself (≈6:1). */
  dark?: boolean;
  align?: "start" | "center";
  className?: string;
}

/**
 * Section label: a short amber rule + a small tracked label. On cream the
 * label is set in ink rather than amber — amber text at 12px reads ~2.8:1
 * on cream (fails WCAG AA), so the rule carries the accent instead.
 */
export const Kicker = ({ children, dark = false, align = "start", className = "" }: KickerProps) => (
  <p
    className={`flex items-center gap-3 text-eyebrow uppercase tracking-[0.24em] ${
      dark ? "text-accent" : "text-foreground/80"
    } ${align === "center" ? "justify-center" : ""} ${className}`}
  >
    <span aria-hidden className="block w-10 h-px bg-accent shrink-0" />
    <span>{children}</span>
  </p>
);

export default Kicker;
