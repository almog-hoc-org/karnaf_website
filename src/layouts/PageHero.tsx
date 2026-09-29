import type { CSSProperties, ReactNode } from "react";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal } from "@/components/v2/scroll";

interface PageHeroProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: ReactNode;
  badge?: string;
  backgroundImage?: string;
  /** CTA row under the subtitle — a cold visitor should never have to scroll to find the first door. */
  actions?: ReactNode;
  /**
   * "ink" — the dark cinematic surface of the homepage hero (drafting-grid
   * backdrop, no photo). Without it the hero is dark only when a
   * `backgroundImage` is given, light otherwise.
   */
  tone?: "light" | "ink";
  /**
   * Set the H1 word by word with `highlight` painted in the accent, and
   * bring the rest of the above-the-fold copy in with CSS-only entrances
   * that run from the first paint of the pre-rendered HTML (no hydration
   * gate in front of the LCP text — see docs/SCROLL-MOTION.md §5).
   */
  splitTitle?: boolean;
  /**
   * With `splitTitle`: words of `title` to paint in the accent when the
   * emphasis sits mid-sentence (instead of a trailing `highlight`).
   */
  accentWords?: string[];
  /**
   * A second column beside the copy from `lg` up (a proof card, a portrait).
   * It stacks under the copy on smaller screens — hide it there from the
   * caller (`hidden lg:block`) if it only earns its place on desktop.
   */
  aside?: ReactNode;
  /** Small print under the actions — reassurance, not a second pitch. */
  footnote?: ReactNode;
  /**
   * Extra classes for the inner container — e.g. `max-w-5xl` so the hero's
   * text edge lines up with the content column of the page below it.
   */
  containerClassName?: string;
  /**
   * With `splitTitle`: "lg" keeps the H1 at display-lg on desktop too — for
   * a longer line sharing the row with an `aside`, so it breaks in two
   * phrases instead of three stubs.
   */
  titleSize?: "lg" | "xl";
}

/** CSS-only rise for above-the-fold copy (`.rise-in` in index.css). */
const Rise = ({ d, children, className = "" }: { d: number; children: ReactNode; className?: string }) => (
  <div className={`rise-in ${className}`} style={{ "--d": `${d}s` } as CSSProperties}>
    {children}
  </div>
);

const PageHero = ({
  tag,
  title,
  highlight,
  subtitle,
  badge,
  backgroundImage,
  actions,
  tone,
  splitTitle = false,
  accentWords = [],
  aside,
  footnote,
  containerClassName = "",
  titleSize = "xl",
}: PageHeroProps) => {
  const photo = !!backgroundImage;
  const ink = !photo && tone === "ink";
  const dark = photo || ink;

  /* Legacy heroes keep the IntersectionObserver Reveal (same delays as
     before); split heroes use the CSS entrance so nothing above the fold
     waits for JS. */
  const LEGACY_DELAYS = [0, 0.12, 0.18, 0.24, 0.3];
  const block = (i: number, children: ReactNode) =>
    splitTitle ? (
      <Rise d={0.12 + i * 0.08}>{children}</Rise>
    ) : (
      <Reveal delay={LEGACY_DELAYS[i]}>{children}</Reveal>
    );

  const SubtitleTag = typeof subtitle === "string" ? "p" : "div";

  const heading = splitTitle ? (
    <SplitReveal
      as="h1"
      trigger="load"
      text={highlight ? `${title} ${highlight}` : title}
      highlight={[...accentWords, ...(highlight ? highlight.split(" ") : [])]}
      stagger={0.05}
      className={`text-display-lg ${titleSize === "xl" ? "md:text-display-xl" : ""} mb-6 text-balance`}
    />
  ) : (
    <h1 className="text-display-lg md:text-display-xl mb-6">
      {title}
      {highlight && <> {highlight}</>}
    </h1>
  );

  const copy = (
    <div className="max-w-4xl">
      {tag &&
        block(0,
          <div
            className="text-eyebrow uppercase tracking-[0.28em] mb-5 flex items-center gap-3"
            style={{
              color: dark
                ? "hsl(36 33% 95% / 0.7)"
                : splitTitle
                  ? "hsl(var(--foreground) / 0.8)" // amber text fails AA at 12px on cream
                  : "hsl(var(--accent))",
            }}
          >
            <span className="block w-10 h-px" style={{ backgroundColor: "hsl(var(--accent))" }} aria-hidden />
            <span>{tag}</span>
          </div>
        )}

      {splitTitle ? (
        <div style={{ color: dark ? "hsl(36 33% 95%)" : "hsl(var(--foreground))" }}>{heading}</div>
      ) : (
        <Reveal delay={0.06}>
          <div style={{ color: dark ? "hsl(36 33% 95%)" : "hsl(var(--foreground))" }}>{heading}</div>
        </Reveal>
      )}

      {badge &&
        block(1,
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold text-sm px-5 py-2 rounded-full mb-5">
            {badge}
          </div>
        )}

      {subtitle &&
        block(2,
          <SubtitleTag
            className="text-body-lg lg:text-xl max-w-3xl leading-relaxed"
            style={{
              color: dark ? "hsl(36 33% 95% / 0.78)" : "hsl(var(--muted-foreground))",
            }}
          >
            {subtitle}
          </SubtitleTag>
        )}

      {actions &&
        block(3,
          <div className="mt-8 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 sm:gap-6">
            {actions}
          </div>
        )}

      {footnote &&
        block(4,
          <div
            className="mt-6 text-sm leading-relaxed"
            style={{ color: dark ? "hsl(36 33% 95% / 0.62)" : "hsl(var(--muted-foreground))" }}
          >
            {footnote}
          </div>
        )}
    </div>
  );

  return (
    <section
      className={`relative overflow-hidden ${
        photo
          ? "min-h-[60svh] flex items-end pt-32 pb-16 md:pt-40 md:pb-24"
          : ink
            ? "pt-32 pb-16 md:pt-40 md:pb-24"
            : "pt-28 pb-12 md:pt-36 md:pb-20"
      }`}
      style={dark ? { backgroundColor: "hsl(217 50% 8%)" } : undefined}
    >
      {photo && (
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

      {ink && (
        <>
          <div className="absolute inset-0 hero-grid pointer-events-none" aria-hidden />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden
            style={{
              background:
                "radial-gradient(60% 70% at 85% 10%, hsl(24 80% 52% / 0.16) 0%, transparent 70%)",
            }}
          />
          <div className="absolute inset-0 grain-texture pointer-events-none" />
        </>
      )}

      <div className={`relative z-10 container mx-auto px-5 md:px-6 w-full ${containerClassName}`}>
        {aside ? (
          <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-10 lg:gap-16 items-center">
            {copy}
            <div>{aside}</div>
          </div>
        ) : (
          copy
        )}
      </div>
    </section>
  );
};

export default PageHero;
