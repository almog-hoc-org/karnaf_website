import { Star, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";

const testimonials = [
  {
    name: "אמיר כ.",
    role: "רוכש דירה ראשונה",
    quote:
      "הגעתי לקרנף בלי שום ידע על נדל\"ן. הם לקחו אותי יד ביד, הסבירו כל שלב, וחסכו לי עשרות אלפי שקלים בזכות משא ומתן חכם. היום יש לי דירה והרגשת ביטחון שעשיתי את העסקה הנכונה.",
    rating: 5,
    metric: "חסך עשרות אלפי ₪",
  },
  {
    name: "אירית מ.",
    role: "משקיעה",
    quote:
      "אחרי שנים של חשיבה על השקעה בנדל\"ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק, והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.",
    rating: 5,
  },
  {
    name: "נועם ד.",
    role: 'בוגר "הדרך לדירה"',
    quote:
      "התוכנית הדיגיטלית שינתה לי את הראש. הבנתי מה לבדוק, איך לנהל משא ומתן, ומה באמת קובע מחיר. רכשתי דירה מתחת למחיר השוק בזכות הכלים שקיבלתי.",
    rating: 5,
    metric: "קנה מתחת למחיר השוק",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1" role="img" aria-label={`דירוג ${rating} מתוך 5`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={16}
        aria-hidden="true"
        className={i < rating ? "fill-accent text-accent" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const Properties = () => {
  return (
    <section
      id="testimonials"
      className="relative py-section-lg bg-background overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight">
              הלקוחות שלנו <span className="text-accent">מספרים</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.12}>
              <article className="h-full flex flex-col bg-card rounded-2xl shadow-depth-2 border border-border/40 p-6 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-depth-3">
                <StarRating rating={t.rating} />

                <p className="text-foreground/90 leading-[1.85] mt-6 mb-6 flex-1">
                  "{t.quote}"
                </p>

                <div className="pt-6 border-t border-border flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-accent/10 border border-accent/30 flex items-center justify-center text-accent font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-foreground font-bold leading-tight">{t.name}</p>
                    <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mt-1">
                      {t.role}
                    </p>
                  </div>
                </div>

                {t.metric && (
                  <div className="mt-4 inline-flex items-center gap-2 bg-accent/5 border border-accent/20 rounded-full px-3 py-1 self-start">
                    <span className="text-xs font-bold text-accent">{t.metric}</span>
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.4}>
          <div className="text-center mt-12 lg:mt-16">
            <Link to="/testimonials">
              <Button
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 rounded-full px-8 py-5"
              >
                כל סיפורי ההצלחה
                <ArrowLeft size={16} />
              </Button>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Properties;
