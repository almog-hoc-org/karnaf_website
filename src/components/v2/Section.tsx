interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg";
  /** Render a soft accent radial glow inside the section */
  glow?: "top-end" | "bottom" | "center" | "none";
}

const padBy = {
  sm: "py-section-sm",
  md: "py-section-md",
  lg: "py-section-lg",
};

const glowGradients: Record<NonNullable<SectionProps["glow"]>, string> = {
  "top-end":
    "radial-gradient(60% 80% at 80% 20%, hsl(24 80% 52% / 0.12) 0%, transparent 70%)",
  bottom:
    "radial-gradient(60% 80% at 50% 100%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
  center:
    "radial-gradient(60% 60% at 50% 50%, hsl(24 80% 52% / 0.10) 0%, transparent 70%)",
  none: "",
};

/** Cinematic dark "ink" section with grain + optional accent radial glow */
export const SectionDark = ({
  children,
  className = "",
  id,
  size = "lg",
  glow = "top-end",
}: SectionProps) => (
  <section
    id={id}
    className={`relative overflow-hidden ${padBy[size]} ${className}`}
    style={{
      backgroundColor: "hsl(217 50% 8%)",
      color: "hsl(36 33% 95%)",
    }}
  >
    {glow !== "none" && (
      <div
        className="absolute inset-0 pointer-events-none opacity-60"
        aria-hidden
        style={{ background: glowGradients[glow] }}
      />
    )}
    <div className="absolute inset-0 grain-texture pointer-events-none" />
    <div className="relative">{children}</div>
  </section>
);

/** Light cream section, the default cadence between cinematic dark blocks */
export const SectionLight = ({
  children,
  className = "",
  id,
  size = "lg",
}: SectionProps) => (
  <section
    id={id}
    className={`relative bg-background ${padBy[size]} ${className}`}
  >
    {children}
  </section>
);
