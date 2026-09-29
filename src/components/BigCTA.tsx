import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { chatLink } from "@/lib/whatsapp";
import { COURSE_PRICE } from "@/lib/constants";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { ExpandOnScroll, SplitReveal } from "@/components/v2/scroll";

/**
 * The closing ask. The dark panel arrives as an inset card and opens to
 * full bleed as it rises (ExpandOnScroll) — the page "opens the door"
 * right where it asks the visitor to walk through one. One primary action
 * (the course), with a human on WhatsApp for whoever still has a question.
 */
const BigCTA = () => {
  return (
    <div className="bg-background">
      <ExpandOnScroll>
        <SectionDark size="md" glow="bottom">
          <div className="container mx-auto px-5 md:px-6 text-center max-w-3xl">
            <SplitReveal
              text="לעסקה הגדולה בחיים מגיעים מוכנים."
              highlight={["מוכנים"]}
              className="text-display-md md:text-display-xl mb-6 text-white"
            />
            <Reveal delay={0.1}>
              <p
                className="text-body-lg max-w-xl mx-auto mb-10 leading-relaxed"
                style={{ color: "hsl(36 33% 95% / 0.72)" }}
              >
                לפני המודעה, המתווך והבנק — לומדים לבדוק מחיר, לקרוא מבצע מימון ולנהל
                משא ומתן. קורס דיגיטלי, גישה מיידית, בקצב שלכם.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-7">
                <Link to="/course" className="inline-block w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="group w-full sm:w-auto inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full transition-all shadow-glow-accent"
                  >
                    לקורס הדיגיטלי — ₪{COURSE_PRICE.toLocaleString("he-IL")}
                    <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
                  </Button>
                </Link>
                <a
                  href={chatLink("general")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-semibold text-white/80 hover:text-white underline-offset-4 hover:underline min-h-[44px]"
                >
                  <MessageCircle size={18} aria-hidden />
                  יש שאלה? דברו איתנו בוואטסאפ
                </a>
              </div>
            </Reveal>
          </div>
        </SectionDark>
      </ExpandOnScroll>
    </div>
  );
};

export default BigCTA;
