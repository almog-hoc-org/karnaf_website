import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { COURSE_PRICE, CHECKOUT_URL } from "@/lib/constants";
import { buildCheckoutUrl } from "@/lib/checkout";
import { gaBeginCheckout } from "@/lib/analytics";
import { trackInitiateCheckout } from "@/lib/pixel";
import { useQuizContext } from "@/hooks/use-quiz-context";
import { CONCERN_COPY, timelineUrgency } from "@/lib/personalization";

/**
 * S13 — the final close. The page ends on the dream (keys in hand), not
 * on logistics: future memory + one direct-checkout door. Replaces the
 * old WhatsApp BigCTA, which diverted purchase intent into a chat funnel.
 */
const FinalClose = () => {
  const [checkoutHref, setCheckoutHref] = useState(CHECKOUT_URL);
  const quiz = useQuizContext();
  const personalized = quiz && quiz.fit !== "low" ? CONCERN_COPY[quiz.concern] : null;
  const urgency = timelineUrgency(quiz);

  useEffect(() => {
    setCheckoutHref(buildCheckoutUrl());
  }, []);

  return (
    <SectionDark size="md" glow="center">
      <div className="container mx-auto px-5 md:px-6 text-center max-w-3xl">
        <Reveal>
          <h2 className="text-display-md md:text-display-xl font-black leading-[0.98] tracking-tight mb-6 text-white">
            יום אחד תעמדו בפתח הדירה
            <br />
            עם המפתח ביד.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="text-body-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "hsl(36 33% 95% / 0.75)" }}
          >
            עוד שנה מהיום תהיו באחד משני מקומות: או עדיין שומרים מודעות
            ומרגישים שכולם מבינים משהו שאתם לא — או אחרי חתימה, במחיר
            שבדקתם בעצמכם, עם משכנתא שנבנתה בשביל החיים שלכם. ההבדל בין
            שני המקומות הוא לא מזל ולא ״ראש לנדל״ן״. הוא הכנה — והיא
            מתחילה הערב.
          </p>
        </Reveal>
        {(personalized || urgency) && (
          <Reveal delay={0.14}>
            <p className="text-base md:text-lg font-bold text-accent max-w-xl mx-auto mb-10 -mt-4 leading-relaxed">
              {personalized?.closingLine ?? urgency}
            </p>
          </Reveal>
        )}
        <Reveal delay={0.18}>
          <a
            href={checkoutHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto"
            onClick={() => {
              trackInitiateCheckout("final_close");
              gaBeginCheckout("final_close");
            }}
          >
            <Button
              size="lg"
              className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full transition-all w-full sm:w-auto"
            >
              מתחילים הערב — ₪{COURSE_PRICE.toLocaleString("he-IL")}, גישה מיידית
              <span
                aria-hidden
                className="inline-block transition-transform group-hover:-translate-x-1"
              >
                ←
              </span>
            </Button>
          </a>
        </Reveal>
        <Reveal delay={0.24}>
          <p className="text-sm mt-4" style={{ color: "hsl(36 33% 95% / 0.55)" }}>
            תשלום מאובטח · מיד אחרי התשלום — כל התוכנית פתוחה
          </p>
        </Reveal>
      </div>
    </SectionDark>
  );
};

export default FinalClose;
