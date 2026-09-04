import { useEffect, useRef, useState } from "react";
import { CheckCircle, GraduationCap, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COURSE_PRICE, CHECKOUT_URL } from "@/lib/constants";
import { TOTAL_PARTS, TOTAL_CHAPTERS } from "@/data/courseStats";
import { buildCheckoutUrl } from "@/lib/checkout";
import { botLink } from "@/lib/whatsapp";
import { gaViewPricing, gaBeginCheckout } from "@/lib/analytics";
import { trackInitiateCheckout } from "@/lib/pixel";
import { useQuizContext } from "@/hooks/use-quiz-context";
import { CONCERN_COPY } from "@/lib/personalization";
import { markPricingSeen } from "@/lib/pricingState";

const included = [
  `כל ${TOTAL_PARTS} החלקים ו-${TOTAL_CHAPTERS} הפרקים — גישה מיידית`,
  "מסמכים, תבניות ובוחני ידע בכל פרק",
  "גישה מלאה ל-12 חודשים",
  "מענה בוואטסאפ לשאלות לפני הרכישה",
];

const nextSteps = [
  { num: "1", text: "רוכשים בתשלום מאובטח בדף הסליקה" },
  { num: "2", text: "מקבלים גישה מיידית לכל השיעורים" },
  { num: "3", text: "מתחילים ללמוד ולנתח עסקאות — בקצב שלכם" },
];

/**
 * The decision point of the sales page. One clean price — the anchoring
 * happened in the PriceContext strip above; here the visitor only needs
 * relief and a door. Proof lives inside the card (testimonial line) per
 * proof-at-decision-point research. Fires view_pricing once in-view and
 * InitiateCheckout + begin_checkout(pricing_card) on click.
 */
const PricingCard = () => {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useRef(false);
  const quiz = useQuizContext();
  const personalized = quiz && quiz.fit !== "low" ? CONCERN_COPY[quiz.concern] : null;
  // SSG renders the plain checkout URL; the enriched one (utm/fbclid)
  // replaces it client-side after hydration.
  const [checkoutHref, setCheckoutHref] = useState(CHECKOUT_URL);

  useEffect(() => {
    setCheckoutHref(buildCheckoutUrl());
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !seen.current) {
          seen.current = true;
          gaViewPricing(window.location.pathname);
          // Tell the sticky bar it can switch to a direct-purchase CTA.
          markPricingSeen();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-background border border-border rounded-3xl p-8 md:p-12 relative overflow-hidden max-w-2xl mx-auto shadow-depth-3"
    >
      <div
        className="absolute top-0 right-0 w-40 h-40 pointer-events-none -z-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(50% 50% at 100% 0%, hsl(24 80% 52% / 0.15) 0%, transparent 70%)",
        }}
      />
      <div className="absolute top-0 inset-x-0 h-1 bg-accent" />
      <div className="text-center relative z-10">
        <GraduationCap size={36} className="text-accent mx-auto mb-4" />
        <h3 className="text-display-sm md:text-display-md text-foreground mb-2">
          המדריך המעשי לרכישת דירה — כל התוכנית
        </h3>
        {personalized ? (
          <p className="text-foreground font-bold mb-8 max-w-md mx-auto leading-relaxed">
            {personalized.pricingLine}
          </p>
        ) : (
          <p className="text-muted-foreground mb-8">
            כל מה שצריך כדי להיכנס לעסקה של החיים — מוכנים.
          </p>
        )}

        {/* One clean price. The anchor is the mistake, not an old tag. */}
        <div className="mb-8">
          <div className="flex items-baseline justify-center" dir="rtl">
            <span className="text-display-lg text-accent tabular-nums leading-none">
              ₪{COURSE_PRICE.toLocaleString("he-IL")}
            </span>
          </div>
          <p className="text-foreground font-bold mt-3">
            תשלום אחד · בלי מנוי · בלי אותיות קטנות
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            גישה מלאה ל-12 חודשים, מיד אחרי התשלום
          </p>
        </div>

        <div className="text-right max-w-sm mx-auto space-y-3 mb-8">
          {included.map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={18} className="text-accent flex-shrink-0" />
              <span className="text-foreground">{item}</span>
            </div>
          ))}
        </div>

        {/* Proof at the decision point */}
        <figure className="max-w-sm mx-auto mb-8 text-right border-r-2 border-accent/50 pr-4">
          <blockquote className="text-sm text-muted-foreground leading-relaxed">
            {personalized
              ? personalized.testimonial.quote
              : "״רכשתי דירה מתחת למחיר השוק בזכות מה שלמדתי בתוכנית.״"}
          </blockquote>
          <figcaption className="text-xs font-bold text-foreground mt-1">
            {personalized ? personalized.testimonial.author : "— נועם ד., בוגר התוכנית"}
          </figcaption>
        </figure>

        <a
          href={checkoutHref}
          target="_blank"
          rel="noopener noreferrer"
          data-no-btn-track
          className="inline-block w-full sm:w-auto"
          onClick={() => {
            trackInitiateCheckout("pricing_card");
            gaBeginCheckout("pricing_card");
          }}
        >
          <Button
            size="lg"
            className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 w-full sm:w-auto gap-3 mb-4 rounded-full transition-all active:scale-[0.98]"
          >
            מתחילים עכשיו — גישה מיידית
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:-translate-x-1"
            >
              ←
            </span>
          </Button>
        </a>
        <p className="text-xs text-muted-foreground mb-2">
          תשלום מאובטח · מעבר לדף הסליקה של התוכנית
        </p>

        <div>
          <a
            href={botLink("התוכנית הדיגיטלית — שאלה לפני רכישה")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors underline-offset-4 hover:underline py-3 px-3 min-h-[44px]"
          >
            <MessageCircle size={14} />
            יש שאלות? דברו איתנו בוואטסאפ ←
          </a>
        </div>

        {/* What happens after you join — removes the fear of the unknown. */}
        <div className="mt-8 pt-6 border-t border-border text-right max-w-sm mx-auto">
          <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-4 text-center">
            מה קורה אחרי הרכישה?
          </p>
          <ol className="space-y-3">
            {nextSteps.map((step) => (
              <li key={step.num} className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent/10 text-accent text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                  {step.num}
                </span>
                <span className="text-sm text-foreground leading-relaxed">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
