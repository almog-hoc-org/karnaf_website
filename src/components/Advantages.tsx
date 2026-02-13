import { motion } from "framer-motion";
import { BookOpen, Handshake, BarChart3 } from "lucide-react";

const pillars = [
  {
    icon: BookOpen,
    title: "ידע שמגן עליכם",
    description: "הכשרה מקצועית שחוסכת לכם טעויות יקרות. תלמדו לזהות עסקאות טובות, להבין חוזים ולקבל החלטות חכמות.",
  },
  {
    icon: Handshake,
    title: "ליווי יד ביד",
    description: "מומחה קרנף שנלחם בשבילכם מהרעיון ועד החוזה. לא לבד בשום שלב של התהליך.",
  },
  {
    icon: BarChart3,
    title: "החלטות מבוססות נתונים",
    description: "כל עסקה נבחנת עם ניתוח אנליטי מדויק. מספרים, לא תחושות בטן.",
  },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          WHY KARNAF
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          למה דווקא <span className="text-primary">קרנף?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <pillar.icon size={32} />
              </div>
              <h3 className="text-heading text-xl text-foreground mb-3">
                {pillar.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
