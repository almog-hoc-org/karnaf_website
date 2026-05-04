interface EyebrowProps {
  children: React.ReactNode;
  align?: "start" | "center";
  tone?: "accent" | "muted";
  className?: string;
}

export const Eyebrow = ({
  children,
  align = "start",
  tone = "accent",
  className = "",
}: EyebrowProps) => {
  const color = tone === "accent" ? "text-accent" : "text-muted-foreground";
  const lineColor = tone === "accent" ? "bg-accent" : "bg-current opacity-50";

  return (
    <div
      className={`inline-flex items-center gap-3 text-eyebrow uppercase tracking-[0.22em] ${color} ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className={`block w-10 h-px ${lineColor}`} aria-hidden />
      <span>{children}</span>
      {align === "center" && (
        <span className={`block w-10 h-px ${lineColor}`} aria-hidden />
      )}
    </div>
  );
};
