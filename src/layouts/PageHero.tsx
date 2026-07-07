import { Reveal } from "@/components/v2/Reveal";

interface PageHeroProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
}

const PageHero = ({
  tag,
  title,
  highlight,
  subtitle,
  badge,
  backgroundImage,
}: PageHeroProps) => {
  const dark = !!backgroundImage;
  return (
    <section
      className={`relative overflow-hidden ${
        dark
          ? "min-h-[60svh] flex items-end pt-32 pb-16 md:pt-40 md:pb-24"
          : "pt-28 pb-12 md:pt-36 md:pb-20"
      }`}
      style={dark ? { backgroundColor: "hsl(217 50% 8%)" } : undefined}
    >
      {dark && (
        <>
          <div className="absolute inset-0">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              decoding="async"
              {...{ fetchpriority: "high" }}
            />
          </div>
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "linear-gradient(180deg, hsl(217 50% 8% / 0.55) 0%, hsl(217 50% 8% / 0.25) 35%, hsl(217 50% 8% / 0.85) 100%)",
            }}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(70% 80% at 70% 30%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 grain-texture pointer-events-none" />
        </>
      )}

      <div className="relative z-10 container mx-auto px-5 md:px-6">
        <div className="max-w-4xl">
          {tag && (
            <Reveal>
              <div
                className={`text-eyebrow uppercase tracking-[0.32em] mb-5 flex items-center gap-3 ${
                  dark ? "" : ""
                }`}
                style={{
                  color: dark ? "hsl(36 33% 95% / 0.7)" : "hsl(var(--accent))",
                }}
              >
                <span
                  className="block w-10 h-px"
                  style={{ backgroundColor: "hsl(var(--accent))" }}
                  aria-hidden
                />
                <span>{tag}</span>
              </div>
            </Reveal>
          )}

          <Reveal delay={0.06}>
            <h1
              className="text-display-lg md:text-display-xl font-black leading-[0.95] tracking-tight mb-6"
              style={{
                color: dark ? "hsl(36 33% 95%)" : "hsl(var(--foreground))",
              }}
            >
              {title}
              {highlight && <> {highlight}</>}
            </h1>
          </Reveal>

          {badge && (
            <Reveal delay={0.12}>
              <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold text-sm px-5 py-2 rounded-full mb-5">
                {badge}
              </div>
            </Reveal>
          )}

          {subtitle && (
            <Reveal delay={0.18}>
              <p
                className="text-body-lg lg:text-xl max-w-3xl leading-relaxed"
                style={{
                  color: dark
                    ? "hsl(36 33% 95% / 0.78)"
                    : "hsl(var(--muted-foreground))",
                }}
              >
                {subtitle}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
