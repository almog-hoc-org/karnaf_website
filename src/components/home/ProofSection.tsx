import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { testimonials } from "@/data/testimonials";

/**
 * Homepage proof section — "show, don't tell" (PRODUCT.md design principle 1).
 * Real client outcomes with their numbers, placed before any ask so trust is
 * established before the visitor is invited to convert.
 *
 * Course outcomes lead: most of this traffic is headed to the ₪950 course,
 * so the first proof they meet should be evidence for that product. Each
 * card is labeled with its track so accompaniment results are never read
 * as results of the self-serve course.
 */
const featured = testimonials
  .filter((t) => t.metric)
  .sort((a, b) => (a.service === "course" ? -1 : 0) - (b.service === "course" ? -1 : 0))
  .slice(0, 3);

const trackLabel = (service: "course" | "premium") =>
  service === "course" ? "התוכנית הדיגיטלית" : "ליווי אישי 1:1";

const ProofSection = () => (
  <section className="py-section-lg bg-card border-y border-border">
    <div className="container mx-auto px-5 md:px-6">
      <div className="max-w-3xl mb-10 md:mb-14">
        <Reveal>
          <h2 className="text-display-md md:text-display-lg text-foreground mb-4">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {featured.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="h-full flex flex-col bg-background border border-border rounded-2xl p-6 lg:p-8">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="text-accent font-black text-xl md:text-2xl tabular-nums leading-tight tracking-[-0.015em]">
                  {t.metric}
                </div>
                <span className="text-eyebrow uppercase tracking-[0.14em] text-muted-foreground whitespace-nowrap mt-1">
                  {trackLabel(t.service)}
                </span>
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

      {/* Peak-trust moment → the product, not a lateral hop to /testimonials. */}
      <Reveal delay={0.3}>
        <div className="text-center mt-10 flex flex-col items-center gap-4">
          <Link to="/course" className="inline-block">
            <Button className="group bg-accent hover:bg-accent/90 text-accent-foreground gap-2 rounded-full px-8 py-6 font-bold text-base">
              לתוכנית הדיגיטלית
              <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            </Button>
          </Link>
          <Link
            to="/testimonials"
            className="text-sm font-semibold text-muted-foreground hover:text-accent underline-offset-4 hover:underline py-2"
          >
            כל סיפורי ההצלחה ←
          </Link>
        </div>
      </Reveal>
    </div>
  </section>
);

export default ProofSection;
