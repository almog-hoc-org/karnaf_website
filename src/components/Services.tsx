import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { SectionDark } from "@/components/v2/Section";
import { TiltCard } from "@/components/v2/TiltCard";

const cards = [
  {
    num: "01",
    title: "עיקרי התוכנית",
    description:
      "שיעורים דיגיטליים מובנים צעד אחר צעד — מיסודות השוק ועד חתימת חוזה. לומדים בקצב שלכם עם תוכן בלעדי ומדויק.",
    features: [
      "תיאוריה מקצועית ויסודות נדל״ן",
      "התחדשות עירונית ואסטרטגיות השקעה",
      "משא ומתן וטכניקות מתקדמות",
      "דוגמאות לעסקאות אמיתיות",
    ],
  },
  {
    num: "02",
    title: "מחשבונים וכלים",
    description:
      "פורטל כלים מתקדם שיעזור לכם לנתח כל עסקה בצורה מדויקת ומבוססת נתונים.",
    features: [
      "מחשבון עסקת נדל״ן ומיסוי",
      "מחשבון משכנתא וכדאיות",
      "צ׳קליסט ביקור בנכס",
      "אנליסט AI למענה על שאלות",
    ],
  },
  {
    num: "03",
    title: "ליווי מקצועי",
    description:
      "ליווי צמוד בוואטסאפ של אנליסט נדל״ן שעונה על שאלות, מכוון ועוזר לכם בכל שלב בדרך.",
    features: [
      "ליווי צמוד של אנליסט בוואטסאפ",
      "מענה לשאלות בזמן אמת",
      "גישה לקהילת תלמידים",
      "הרחבות מקצועיות ועדכונים",
    ],
  },
];

const Services = () => {
  return (
    <SectionDark id="services" size="lg" glow="top-end">
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black leading-[0.98] tracking-tight text-white">
              הדרך לדירה: <span className="text-accent">מה בתוכנית?</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12}>
              <TiltCard max={4} className="h-full">
              <article
                className="h-full p-6 lg:p-8 rounded-2xl flex flex-col group transition-all duration-300"
                style={{
                  backgroundColor: "hsl(36 33% 95% / 0.04)",
                  border: "1px solid hsl(36 33% 95% / 0.12)",
                }}
              >
                <div className="font-mono text-display-md font-black text-accent leading-none mb-5">
                  {card.num}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{ color: "hsl(36 33% 95% / 0.72)" }}
                >
                  {card.description}
                </p>

                <ul className="space-y-3 flex-1 mb-2 pt-5 border-t" style={{ borderColor: "hsl(36 33% 95% / 0.10)" }}>
                  {card.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                      style={{ color: "hsl(36 33% 95% / 0.85)" }}
                    >
                      <Check size={16} className="text-accent mt-0.5 shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="mt-14 lg:mt-20 text-center">
            <Link to="/course">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.35)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.55)] transition-all"
              >
                לפרטים נוספים על התוכנית
                <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </SectionDark>
  );
};

export default Services;
