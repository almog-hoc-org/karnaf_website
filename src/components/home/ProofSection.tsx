import { Link } from "react-router-dom";
import { ArrowLeft, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal, StackCards } from "@/components/v2/scroll";
import { testimonials, type Testimonial } from "@/data/testimonials";

/**
 * Homepage proof section — "show, don't tell" (PRODUCT.md design principle 1).
 * Real client outcomes with their numbers, placed before any ask so trust is
 * established before the visitor is invited to convert.
 *
 * Course outcomes lead: most of this traffic is headed to the ₪950 course,
 * so the first proof they meet should be evidence for that product. Each
 * card is labeled with its track so accompaniment results are never read
 * as results of the self-serve course.
 *
 * The cards are dealt onto a stack as the visitor scrolls (StackCards) —
 * one story at a time gets the whole stage instead of three competing.
 */
const featured = testimonials
  .filter((t) => t.metric)
  .sort((a, b) => (a.service === "course" ? -1 : 0) - (b.service === "course" ? -1 : 0))
  .slice(0, 3);

const trackLabel = (service: "course" | "premium") =>
  service === "course" ? "התוכנית הדיגיטלית" : "ליווי אישי 1:1";

/* Three surfaces so each card reads as its own sheet as they stack. */
const surfaces = [
  {
    card: "bg-[hsl(var(--ink))] text-white",
    muted: "text-white/60",
    rule: "border-white/15",
    quoteIcon: "text-white/30",
  },
  {
    card: "bg-card text-foreground border border-border",
    muted: "text-muted-foreground",
    rule: "border-border",
    quoteIcon: "text-muted-foreground/40",
  },
  {
    card: "bg-secondary text-foreground border border-border",
    muted: "text-muted-foreground",
    rule: "border-primary/10",
    quoteIcon: "text-muted-foreground/40",
  },
];

const StoryCard = ({ t, i }: { t: Testimonial; i: number }) => {
  const s = surfaces[i % surfaces.length];
  return (
    <figure
      className={`${s.card} rounded-3xl p-7 md:p-12 grid md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] gap-6 md:gap-12 min-h-[20rem] md:min-h-[24rem] shadow-depth-3`}
    >
      <div className="flex flex-col">
        <span
          className={`self-start text-eyebrow uppercase tracking-[0.16em] border rounded-full px-3 py-1 mb-6 ${s.muted} ${s.rule}`}
        >
          {trackLabel(t.service)}
        </span>
        <div className="text-accent font-black text-3xl md:text-5xl tabular-nums leading-[1.05] tracking-[-0.02em]">
          {t.metric}
        </div>
        <figcaption className={`mt-auto pt-6 md:pt-10 border-t ${s.rule}`}>
          <span className="font-bold block">{t.name}</span>
          <span className={`text-sm ${s.muted}`}>{t.role}</span>
        </figcaption>
      </div>
      <blockquote className="text-lg md:text-2xl leading-[1.7] md:leading-[1.6] font-medium self-center">
        <Quote size={22} className={`${s.quoteIcon} mb-3`} aria-hidden />
        {t.quote}
      </blockquote>
    </figure>
  );
};

const ProofSection = () => (
  <section className="relative py-section-lg bg-background">
    <div className="container mx-auto px-5 md:px-6 max-w-6xl">
      <div className="max-w-3xl mb-10 md:mb-14">
        <SplitReveal
          text="תוצאות של לקוחות. במספרים."
          highlight={["במספרים"]}
          className="text-display-md md:text-display-lg text-foreground mb-4"
        />
        <Reveal delay={0.08}>
          <p className="text-body-lg text-muted-foreground leading-relaxed max-w-[60ch]">
            לא מבטיחים — מראים. ככה נראות עסקאות של אנשים שהגיעו אלינו בלי
            ניסיון, ויצאו עם דירה ועם מספרים שעומדים מאחוריהם.
          </p>
        </Reveal>
      </div>

      <StackCards cards={featured.map((t, i) => <StoryCard key={t.name} t={t} i={i} />)} />

      {/* Peak-trust moment → the product, not a lateral hop to /testimonials. */}
      <Reveal delay={0.1}>
        <div className="text-center mt-12 flex flex-col items-center gap-4">
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
