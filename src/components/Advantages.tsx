import { motion } from "framer-motion";
import { BookOpen, Handshake, BarChart3 } from "lucide-react";
import { useState } from "react";

const pillars = [
  {
    icon: BookOpen,
    title: "ידע שמגן עליכם",
    description: "הכשרה מקצועית שחוסכת לכם טעויות יקרות. תלמדו לזהות עסקאות טובות, להבין חוזים ולקבל החלטות חכמות.",
    step: "01",
  },
  {
    icon: Handshake,
    title: "ליווי יד ביד",
    description: "מומחה קרנף שנלחם בשבילכם מהרעיון ועד החוזה. לא לבד בשום שלב של התהליך.",
    step: "02",
  },
  {
    icon: BarChart3,
    title: "החלטות מבוססות נתונים",
    description: "כל עסקה נבחנת עם ניתוח אנליטי מדויק. מספרים, לא תחושות בטן.",
    step: "03",
  },
];

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const Advantages = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
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
          למה דווקא <span className="text-gradient">קרנף?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0"
            style={{ originX: 0 }}
          />

          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="relative z-10"
            >
              <TiltCard className="h-full">
                <div className="bg-card border border-border rounded-xl p-8 text-center card-hover-glow group h-full relative overflow-hidden">
                  <span className="text-primary/10 text-8xl font-black absolute top-4 right-6 select-none group-hover:text-primary/20 transition-colors duration-500">
                    {pillar.step}
                  </span>

                  <motion.div
                    whileInView={{ rotate: [0, -10, 10, 0] }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 + i * 0.2 }}
                    className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
                  >
                    <pillar.icon size={32} />
                  </motion.div>
                  <h3 className="text-heading text-xl text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
