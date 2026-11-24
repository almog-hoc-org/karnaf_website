import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SplitReveal } from "@/components/v2/scroll";
import HeroCostCheck from "@/components/home/HeroCostCheck";
import { TOTAL_CHAPTERS } from "@/data/courseStats";
import { COURSE_PRICE, analystLink } from "@/lib/constants";
import {
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

/**
 * The front door, set like the opening page of a book on buying a home:
 * a serif headline on cream, and beside it the proof — a calculator that
 * answers the first real question with real 2026 numbers. Every block
 * enters with the CSS `.rise-in` slide (no fade), so the pre-rendered
 * HTML paints the copy before hydration.
 */
const Hero = () => (
  <section className="relative bg-background pt-28 md:pt-36 pb-section-sm md:pb-section-md">
    <div className="container mx-auto px-5 md:px-6 max-w-6xl">
      <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] gap-12 lg:gap-16 items-center">
        <div>
          <SplitReveal
            as="h1"
            trigger="load"
            delay={0.06}
            stagger={0.06}
            text="לקנות דירה בלי לשלם יותר מדי."
            highlight={["יותר", "מדי"]}
            className="text-display-lg max-sm:text-[2.6rem] md:text-display-xl text-foreground text-balance mb-7"
          />

          <p
            className="rise-in text-body-lg md:text-xl leading-relaxed text-foreground/85 max-w-[52ch] mb-9"
            style={{ ["--d" as string]: "0.35s" }}
          >
            מחיר במודעה, מבצע 20/80 של קבלן, הצעה של הבנק — כל אחד מהם יכול לעלות לכם עשרות
            אלפי שקלים. המדריך המעשי לרכישת דירה מלמד לבדוק כל מספר בעצמכם, שלב אחר שלב, מהתקציב
            ועד החתימה.
          </p>

          <div
            className="rise-in flex flex-col items-stretch sm:items-start xl:flex-row xl:items-center gap-4 xl:gap-7"
            style={{ ["--d" as string]: "0.45s" }}
          >
            {/* One primary door; the second track is one quiet link away. */}
            <Link to="/course" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg px-8 md:px-9 py-5 md:py-6 rounded-full w-full sm:w-auto shadow-depth-2"
              >
                לתוכנית הדיגיטלית — ₪{COURSE_PRICE.toLocaleString("he-IL")}
                <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">
                  ←
                </span>
              </Button>
            </Link>
            <Link
              to="/premium"
              className="inline-flex items-center gap-2 text-foreground/85 hover:text-foreground font-semibold underline underline-offset-4 decoration-border hover:decoration-foreground min-h-[44px]"
            >
              מחפשים ליווי אישי 1:1 למשקיעים?
              <span aria-hidden>←</span>
            </Link>
          </div>

          {/* Proof as a sentence, not a big-number template */}
          <p
            className="rise-in mt-9 text-sm text-muted-foreground leading-relaxed max-w-[52ch]"
            style={{ ["--d" as string]: "0.55s" }}
          >
            <strong className="text-foreground tabular-nums">{TOTAL_CLIENTS_STAT}</strong> {TOTAL_CLIENTS_LABEL},{" "}
            <strong className="text-foreground tabular-nums">{YEARS_EXPERIENCE_STAT}</strong> {YEARS_EXPERIENCE_LABEL}, ו-
            <strong className="text-foreground tabular-nums">{TOTAL_CHAPTERS}</strong> פרקים בקורס.
          </p>
        </div>

        <div className="rise-in" style={{ ["--d" as string]: "0.3s" }}>
          <HeroCostCheck />
          {/* The free next step for someone already holding a listing. */}
          <a
            href={analystLink("/check", "home-hero")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 flex items-center justify-center gap-2 text-sm text-foreground/75 hover:text-foreground underline-offset-4 hover:underline min-h-[44px] text-center"
          >
            כבר יש דירה על הכוונת? בדקו את המחיר מול עסקאות אמת — חינם
            <ExternalLink size={14} aria-hidden className="shrink-0" />
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
