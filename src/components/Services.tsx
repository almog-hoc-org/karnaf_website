import { BookOpen, Calculator, Headphones, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const cards = [
  {
    icon: BookOpen,
    title: "עיקרי התוכנית",
    description: "שיעורים דיגיטליים מובנים צעד אחר צעד — מיסודות השוק ועד חתימת חוזה. לומדים בקצב שלכם עם תוכן בלעדי ומדויק.",
    features: [
      "תיאוריה מקצועית ויסודות נדל״ן",
      "התחדשות עירונית ואסטרטגיות השקעה",
      "משא ומתן וטכניקות מתקדמות",
      "דוגמאות לעסקאות אמיתיות",
    ],
  },
  {
    icon: Calculator,
    title: "מחשבונים וכלים",
    description: "פורטל כלים מתקדם שיעזור לכם לנתח כל עסקה בצורה מדויקת ומבוססת נתונים.",
    features: [
      "מחשבון עסקת נדל״ן ומיסוי",
      "מחשבון משכנתא וכדאיות",
      "צ׳קליסט ביקור בנכס",
      "אנליסט AI למענה על שאלות",
    ],
  },
  {
    icon: Headphones,
    title: "ליווי מקצועי",
    description: "ליווי צמוד בוואטסאפ של אנליסט נדל״ן שעונה על שאלות, מכוון ועוזר לכם בכל שלב בדרך.",
    features: [
      "ליווי צמוד של אנליסט בוואטסאפ",
      "מענה לשאלות בזמן אמת",
      "גישה לקהילת תלמידים",
      "הרחבות מקצועיות ועדכונים",
    ],
  },
];

const Services = () => {
  const headerRef = useGsapReveal<HTMLHeadingElement>({ y: 30 });
  const cardsRef = useGsapReveal<HTMLDivElement>({ y: 40, stagger: 0.15 });
  const ctaRef = useGsapReveal<HTMLDivElement>({ y: 20, delay: 0.3 });

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <h2
          ref={headerRef}
          className="text-display text-display-md text-center text-foreground mb-12"
        >
          הדרך לדירה — <span className="text-gradient">מה בתוכנית?</span>
        </h2>

        <div ref={cardsRef} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-card shadow-depth-2 border border-border/30 rounded-2xl p-8 group flex flex-col transition-all duration-300 hover:shadow-depth-4 hover:-translate-y-2 hover:border-accent/20"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground mb-6">
                <card.icon size={28} />
              </div>

              <h3 className="text-heading text-xl md:text-2xl text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                {card.description}
              </p>

              <ul className="space-y-3 flex-1">
                {card.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check size={16} className="text-accent mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="text-center mt-12">
          <Link to="/course">
            <Button className="btn-polygon bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-6">
              לפרטים נוספים על התוכנית
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
