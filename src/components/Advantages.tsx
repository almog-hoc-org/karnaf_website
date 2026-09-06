import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";
import { TiltCard } from "@/components/v2/TiltCard";
import { TOTAL_CLIENTS_STAT, TOTAL_CLIENTS_LABEL } from "@/data/companyStats";

/* Mid-page there are no exits to social networks — those live in the
   footer. The community card carries one proof line and one internal link. */
const advantages = [
  {
    num: "01",
    title: "קהילת הנדל״ן מהגדולות בישראל",
    description: "עשרות אלפי עוקבים ותלמידים ברשתות השונות — ואנשים אמיתיים שכבר עברו את הדרך.",
    extra: "proof",
  },
  {
    num: "02",
    title: "המדריך המעשי לרכישת דירה",
    description:
      "הקורס הדיגיטלי המקיף בישראל שילמד אתכם לזהות עסקאות מצוינות, לקבל החלטות נכונות ולהרגיש בטוחים בכל צעד",
  },
  {
    num: "03",
    title: "החלטות מבוססות נתונים",
    description:
      "ידע וניתוח המבוסס על מעל ל-8 שנות מחקר, ניתוח וניסיון אישי. מספרים ולא תחושות.",
  },
];

const Advantages = () => {
  return (
    <section className="relative py-section-lg bg-background overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        <div className="max-w-3xl mb-10 md:mb-16">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground">
              למה קרנף?
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {advantages.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.12}>
              <TiltCard max={4} className="h-full">
                <article className="border-t border-primary pt-6 h-full flex flex-col">
                  <div className="font-mono text-display-md text-accent leading-none mb-5">
                    {item.num}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 leading-snug tracking-[-0.015em]">
                    {item.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-[1.85] mb-6">
                    {item.description}
                  </p>
                  {item.extra === "proof" && (
                    <div className="mt-auto flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="text-display-sm text-accent tabular-nums leading-none">
                        {TOTAL_CLIENTS_STAT}
                      </span>
                      <span className="text-sm font-bold text-foreground">{TOTAL_CLIENTS_LABEL}</span>
                      <Link
                        to="/testimonials"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary underline-offset-4 hover:underline min-h-[44px]"
                      >
                        סיפורי הצלחה
                        <ArrowLeft size={13} />
                      </Link>
                    </div>
                  )}
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
