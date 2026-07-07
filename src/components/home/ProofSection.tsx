import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { testimonials } from "@/data/testimonials";

/**
 * Homepage proof section — "show, don't tell" (PRODUCT.md design principle 1).
 * Real client outcomes with their numbers, placed before any ask so trust is
 * established before the visitor is invited to convert.
 */
const featured = testimonials.filter((t) => t.metric).slice(0, 3);

const ProofSection = () => (
  <section className="py-section-lg bg-card border-y border-border">
    <div className="container mx-auto px-5 md:px-6">
      <div className="max-w-3xl mb-10 md:mb-14">
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black leading-[0.98] tracking-tight text-foreground mb-4">
            תוצאות של לקוחות. במספרים.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-body-lg text-muted-foreground leading-relaxed max-w-[60ch]">
            לא מבטיחים — מראים. ככה נראות עסקאות של אנשים שהגיעו אלינו בלי
            ניסיון, ויצאו עם דירה ועם מספרים שעומדים מאחוריהם.
          </p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="h-full flex flex-col bg-background border border-border rounded-2xl p-6 lg:p-8">
              <div className="text-accent font-black text-xl md:text-2xl tabular-nums leading-tight mb-4">
                {t.metric}
              </div>
              <blockquote className="text-foreground leading-[1.85] flex-1">
                <Quote size={16} className="text-muted-foreground/50 mb-2" aria-hidden />
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-4 border-t border-border">
                <span className="font-bold text-foreground">{t.name}</span>
                <span className="text-muted-foreground text-sm block">{t.role}</span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="text-center mt-10">
          <Link to="/testimonials" className="inline-block">
            <Button
              variant="outline"
              className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground gap-2 rounded-full px-7 py-5 font-bold"
            >
              כל סיפורי ההצלחה
              <ArrowLeft size={16} />
            </Button>
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ProofSection;
