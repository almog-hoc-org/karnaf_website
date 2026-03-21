import { useGsapReveal } from "@/hooks/use-gsap-reveal";

interface PageHeroProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
}

const PageHero = ({ tag, title, highlight, subtitle, badge, backgroundImage }: PageHeroProps) => {
  const contentRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.1, start: "top 95%" });

  return (
    <section className="relative pt-20 pb-4 md:pt-32 md:pb-12 overflow-hidden">
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-background/85" />
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      )}

      <div ref={contentRef} className="relative z-10 container mx-auto px-5 md:px-6 text-center">
        {tag && (
          <p className="text-accent font-bold text-sm tracking-widest uppercase mb-4">
            {tag}
          </p>
        )}

        <h1 className="text-display text-display-lg text-foreground mb-2 md:mb-4">
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </h1>

        {badge && (
          <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/30 text-accent font-bold text-sm px-5 py-2 rounded-full mb-4">
            {badge}
          </div>
        )}

        {subtitle && (
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
