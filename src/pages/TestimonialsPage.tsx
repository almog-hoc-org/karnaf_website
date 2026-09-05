import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import TestimonialVideoCard from "@/components/rich-media/TestimonialVideoCard";
import { testimonials } from "@/data/testimonials";
import { botLink } from "@/lib/whatsapp";
import BigCTA from "@/components/BigCTA";
import { Reveal } from "@/components/v2/Reveal";
import SEOHead, {
  organizationSchema,
  breadcrumbSchema,
  reviewSchema,
} from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";
import {
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

const TestimonialsPage = () => {
  const courseTestimonials = testimonials.filter((t) => t.service === "course");
  const premiumTestimonials = testimonials.filter((t) => t.service === "premium");
  const allTestimonials = [...premiumTestimonials, ...courseTestimonials];

  return (
    <>
      <SEOHead
        title="סיפורי הצלחה — לקוחות שרכשו דירה בליווי קרנף נדל״ן | עדויות"
        description="עדויות של בוגרי תוכנית המדריך המעשי לרכישת דירה ולקוחות הליווי האישי — במילים שלהם: חיסכון של עשרות אלפי שקלים, ביטחון במשא ומתן ורכישה מתחת למחיר השוק."
        path="/testimonials"
        keywords="עדויות נדל״ן, סיפורי הצלחה, רוכשי דירה ראשונה, ביקורות קורס נדל״ן"
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "סיפורי הצלחה", url: "/testimonials" },
          ]),
          /* aggregateRating deliberately NOT emitted: Google requires the
             rating to be user-visible and backed by a real collection
             mechanism (see OPTIMIZATION-PLAYBOOK "תשתית אמון"). Re-add via
             aggregateRatingSchema only once genuine ratings exist. */
          ...testimonials.map((t) =>
            reviewSchema({
              itemName: "המדריך המעשי לרכישת דירה — הקורס הדיגיטלי המקיף בישראל",
              itemUrl: "https://www.karnafnadlan.com/course",
              reviewerName: t.name,
              reviewBody: t.quote,
              rating: t.rating,
            })
          ),
        ]}
      />

      <PageHero
        tag="סיפורי הצלחה"
        title="סיפורי"
        highlight="הצלחה"
        subtitle="מאות ישראלים כבר רכשו דירה בצורה חכמה עם קרנף. הנה חלק מהסיפורים שלהם."
        backgroundImage={heroCity}
      />

      {/* Stats strip */}
      <section className="py-10 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-8 max-w-md mx-auto text-center">
            <Reveal>
              <p className="text-display-md text-foreground tabular-nums leading-none">
                {TOTAL_CLIENTS_STAT}
              </p>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mt-2">
                {TOTAL_CLIENTS_LABEL}
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-display-md text-foreground tabular-nums leading-none">
                {YEARS_EXPERIENCE_STAT}
              </p>
              <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mt-2">
                {YEARS_EXPERIENCE_LABEL}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* All testimonials */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-12 lg:mb-16 text-center">
              מה הלקוחות אומרים?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {allTestimonials.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.06}>
                <TestimonialVideoCard testimonial={t} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 text-center max-w-2xl">
          <Reveal>
            <h3 className="text-display-md md:text-display-lg text-foreground mb-4">
              רוצים להיות הסיפור הבא?
            </h3>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground mb-8 leading-relaxed">
              הצטרפו למאות ישראלים שכבר רכשו דירה בצורה חכמה עם קרנף.
            </p>
          </Reveal>
          <Reveal delay={0.16}>
            <a href={botLink("שאלה כללית")} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.35)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.55)] transition-all active:scale-[0.98]"
              >
                <MessageCircle size={20} />
                דברו עם הקרנף
                <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              </Button>
            </a>
          </Reveal>
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default TestimonialsPage;
