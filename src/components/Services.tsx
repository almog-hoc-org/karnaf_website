import { motion, useScroll, useTransform } from "framer-motion";
import { BookOpen, Calculator, Headphones, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import mascotRealestate from "@/assets/mascot/mascot-realestate.png";

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
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const mascotY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.18, 0.12]);

  return (
    <section ref={sectionRef} id="services" className="py-16 bg-secondary relative overflow-hidden">
      <motion.div
        style={{ y: mascotY, opacity: mascotOpacity }}
        className="absolute left-0 bottom-10 pointer-events-none hidden lg:block"
      >
        <img
          src={mascotRealestate}
          alt=""
          className="h-[350px] object-contain mascot-fade-diagonal mascot-blend-soft-light"
          loading="lazy"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-10"
        >
          הדרך לדירה — <span className="text-gradient">מה בתוכנית?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255, 102, 0, 0.15)" }}
              className="relative card-premium p-8 group flex flex-col"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
              >
                <card.icon size={28} />
              </motion.div>

              <h3 className="text-heading text-xl md:text-2xl text-foreground mb-2">
                {card.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 text-sm">
                {card.description}
              </p>

              <ul className="space-y-3 flex-1">
                {card.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + fi * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/course">
            <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6">
              לפרטים נוספים על התוכנית
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
