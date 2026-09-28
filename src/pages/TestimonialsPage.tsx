import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { ExpandOnScroll, ScrollWords, SplitReveal } from "@/components/v2/scroll";
import { Kicker } from "@/components/service/Kicker";
import { testimonials, type Testimonial } from "@/data/testimonials";
import { COURSE_PRICE } from "@/lib/constants";
import SEOHead, { organizationSchema, breadcrumbSchema, reviewSchema } from "@/components/SEOHead";
import {
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

const SITE = "https://www.karnafnadlan.com";

/* Two tracks, never mixed: a course graduate's result is evidence for the
   course, an accompanied client's result is evidence for the 1:1 service. */
const courseStories = testimonials.filter((t) => t.service === "course");
const premiumStories = testimonials.filter((t) => t.service === "premium");
const featuredCourse = courseStories.find((t) => t.metric) ?? courseStories[0];
const moreCourse = courseStories.filter((t) => t !== featuredCourse);

const trackLabel = (s: Testimonial["service"]) => (s === "course" ? "הקורס הדיגיטלי" : "ליווי אישי 1:1");
const priceLabel = `₪${COURSE_PRICE.toLocaleString("en-US")}`;

/* Structured data — each review points at the offering it is actually about.
   (reviewSchema types its item as a Course, so the 1:1 reviews are built
   here with a Service item instead.) */
const courseReviews = courseStories.map((t) =>
  reviewSchema({
    itemName: "המדריך המעשי לרכישת דירה — הקורס הדיגיטלי",
    itemUrl: `${SITE}/course`,
    reviewerName: t.name,
    reviewBody: t.quote,
    rating: t.rating,
  })
);
const premiumReviews = premiumStories.map((t) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  itemReviewed: { "@type": "Service", name: "ליווי משקיעים 1:1 — קרנף נדל״ן", url: `${SITE}/premium` },
  reviewRating: { "@type": "Rating", ratingValue: String(t.rating), bestRating: "5" },
  author: { "@type": "Person", name: t.name },
  reviewBody: t.quote,
}));

const StoryCard = ({ t, className = "" }: { t: Testimonial; className?: string }) => (
  <figure
    className={`h-full flex flex-col bg-card border border-border rounded-2xl p-6 md:p-7 shadow-depth-1 ${className}`}
  >
    <div className="flex items-center justify-between gap-3 mb-4">
      <span className="text-eyebrow uppercase tracking-[0.16em] border border-border text-muted-foreground rounded-full px-3 py-1">
        {trackLabel(t.service)}
      </span>
      {t.metric && (
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-primary whitespace-nowrap">
          {t.metric}
        </span>
      )}
    </div>
    <blockquote className="text-foreground leading-[1.8] flex-1">״{t.quote}״</blockquote>
    <figcaption className="mt-5 pt-4 border-t border-border">
      <span className="font-bold text-foreground block">{t.name}</span>
      <span className="text-sm text-muted-foreground">
        {t.role}
        {t.location && ` · ${t.location}`}
      </span>
    </figcaption>
  </figure>
);

const TestimonialsPage = () => {
  return (
    <>
      <SEOHead
        title="סיפורי הצלחה — בוגרי הקורס ולקוחות הליווי במילים שלהם | קרנף נדל״ן"
        description="עדויות של בוגרי הקורס הדיגיטלי ״המדריך המעשי לרכישת דירה״ ושל לקוחות הליווי האישי 1:1 — כל עדות מסומנת לפי המסלול: משא ומתן, קנייה מתחת למחיר השוק וביטחון בהחלטה."
        path="/testimonials"
        keywords="עדויות נדל״ן, סיפורי הצלחה, רוכשי דירה ראשונה, ביקורות קורס נדל״ן, ליווי משקיעים"
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
          ...courseReviews,
          ...premiumReviews,
        ]}
      />

      <PageHero
        containerClassName="max-w-5xl"
        splitTitle
        tag="סיפורי הצלחה"
        title="הם עמדו בדיוק איפה שאתם עומדים."
        accentWords={["איפה", "שאתם"]}
        subtitle="רוכשי דירה ראשונה, זוגות ומשקיעים. חלקם למדו לבד בקורס הדיגיטלי, חלקם עברו את הדרך איתנו בליווי אישי — וכל סיפור מסומן לפי המסלול, כדי שתדעו בדיוק על מה הוא מדבר."
        footnote={
          <span className="tabular-nums">
            {TOTAL_CLIENTS_STAT} {TOTAL_CLIENTS_LABEL} · {YEARS_EXPERIENCE_STAT} {YEARS_EXPERIENCE_LABEL}
          </span>
        }
        actions={
          <nav aria-label="דילוג למסלול" className="flex flex-wrap gap-3">
            <a
              href="#course-stories"
              className="inline-flex items-center min-h-[44px] rounded-full border border-primary/25 px-5 font-semibold text-foreground hover:border-primary transition-colors"
            >
              בוגרי הקורס הדיגיטלי
            </a>
            <a
              href="#premium-stories"
              className="inline-flex items-center min-h-[44px] rounded-full border border-primary/25 px-5 font-semibold text-foreground hover:border-primary transition-colors"
            >
              לקוחות הליווי האישי
            </a>
          </nav>
        }
      />

      {/* Track 1 — the self-serve course */}
      <section id="course-stories" className="py-section-lg bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="max-w-3xl mb-10 lg:mb-12">
            <Reveal>
              <Kicker className="mb-5">הקורס הדיגיטלי · לומדים לבד</Kicker>
            </Reveal>
            <SplitReveal
              text="למדו לבד. קנו בעיניים פקוחות."
              highlight={["בעיניים", "פקוחות."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>

          {featuredCourse && (
            <figure className="mb-12">
              <ScrollWords
                as="p"
                text={`״${featuredCourse.quote}״`}
                highlight={["מתחת", "למחיר", "השוק"]}
                className="text-display-sm md:text-display-md text-foreground leading-[1.35] md:leading-[1.3] font-bold"
              />
              <Reveal>
                <figcaption className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="font-bold text-foreground text-lg">{featuredCourse.name}</span>
                  <span className="text-muted-foreground">{featuredCourse.role}</span>
                  {featuredCourse.metric && (
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-accent/10 text-primary">
                      {featuredCourse.metric}
                    </span>
                  )}
                </figcaption>
              </Reveal>
            </figure>
          )}

          {moreCourse.length > 0 && (
            <div className={`grid gap-6 mb-12 ${moreCourse.length > 1 ? "md:grid-cols-2" : "max-w-2xl"}`}>
              {moreCourse.map((t, i) => (
                <Reveal key={t.name} delay={i * 0.08} className="h-full">
                  <StoryCard t={t} className="bg-background" />
                </Reveal>
              ))}
            </div>
          )}

          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 pt-8 border-t border-border">
              <Link to="/course" className="inline-block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group w-full sm:w-auto inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base px-8 py-6 rounded-full transition-colors"
                >
                  להכיר את הקורס — <span dir="ltr" className="tabular-nums">{priceLabel}</span>
                  <ArrowLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">גישה מיידית · לומדים לבד, בקצב שלכם</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Track 2 — 1:1 accompaniment */}
      <section id="premium-stories" className="py-section-lg bg-background scroll-mt-24">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="max-w-3xl mb-10 lg:mb-12">
            <Reveal>
              <Kicker className="mb-5">ליווי אישי 1:1 · עד החתימה</Kicker>
            </Reveal>
            <SplitReveal
              text="ולמי שרצה מישהו לצדו."
              highlight={["לצדו."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            {premiumStories.map((t, i) => (
              <Reveal key={t.name} delay={(i % 2) * 0.08} className="h-full">
                <StoryCard t={t} />
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 font-bold text-primary underline-offset-4 hover:underline min-h-[44px]"
            >
              איך עובד הליווי האישי
              <ArrowLeft size={16} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The close — the next story starts with the course */}
      <div className="bg-background">
        <ExpandOnScroll inset={3} radius={32}>
          <SectionDark size="md" glow="bottom">
            <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
              <SplitReveal
                text="הסיפור הבא יכול להיות שלכם."
                highlight={["שלכם."]}
                className="text-display-md md:text-display-xl text-white mb-6"
              />
              <Reveal delay={0.08}>
                <p
                  className="text-body-lg max-w-xl mx-auto mb-10 leading-relaxed"
                  style={{ color: "hsl(36 33% 95% / 0.75)" }}
                >
                  מתחילים מהקורס הדיגיטלי — מהשאלה הראשונה ועד המפתח, בסדר שבו באמת
                  קונים דירה.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  <Link to="/course" className="inline-block w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="group w-full sm:w-auto inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full transition-colors shadow-glow-accent"
                    >
                      להכיר את הקורס — <span dir="ltr" className="tabular-nums">{priceLabel}</span>
                      <ArrowLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                    </Button>
                  </Link>
                  <Link
                    to="/premium"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
                  >
                    <span>
                      מעדיפים ליווי אישי <bdi>1:1</bdi>?
                    </span>
                    <ArrowLeft size={16} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
          </SectionDark>
        </ExpandOnScroll>
      </div>
    </>
  );
};

export default TestimonialsPage;
