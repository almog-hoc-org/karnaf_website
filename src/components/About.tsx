import { motion } from "framer-motion";
import { Target, TrendingUp, Shield, Award, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const milestones = [
  { icon: Target, year: "2016", text: "הקמת קרנף נדל\"ן" },
  { icon: TrendingUp, year: "2020", text: "השקת תוכנית \"הדרך לדירה\"" },
  { icon: Shield, year: "2022", text: "ליווי 100+ עסקאות מוצלחות" },
  { icon: Award, year: "2024", text: "הרחבת שירותי הפרימיום" },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
            >
              OUR STORY
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7 }}
              className="text-display text-4xl md:text-5xl text-foreground mb-8"
            >
              סיפורו של{" "}
              <span className="text-gradient">קרנף נדל"ן</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6"
            >
              קרנף נדל"ן הוקמה מתוך אמונה שכל אדם יכול לקבל החלטות חכמות בנדל"ן —
              אם רק ייתנו לו את הכלים, הידע והליווי הנכון. אנחנו מלווים רוכשי דירות
              ראשונות ומשקיעים בשיטה מבוססת נתונים, שמביאה תוצאות.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
            >
              בראש הצוות עומדים{" "}
              <span className="text-foreground font-semibold">איתמר נחליאל</span> ו
              <span className="text-foreground font-semibold">אלמוג חכמה</span> —
              מומחי נדל"ן עם ניסיון מוכח בליווי עשרות עסקאות מוצלחות.
              המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-3 gap-6"
            >
              {[
                { num: "8+", label: "שנות ניסיון" },
                { num: "150+", label: "לקוחות מרוצים" },
                { num: "98%", label: "שביעות רצון" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-primary text-glow">{stat.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8"
            >
              <Link to="/about">
                <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold gap-2">
                  קראו עוד על הסיפור שלנו
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="relative">
            <div className="absolute top-0 bottom-0 right-6 w-px bg-gradient-to-b from-transparent via-primary/30 to-transparent" />

            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="flex items-center gap-6 mb-8 last:mb-0 group"
              >
                <motion.div
                  whileInView={{ scale: [0, 1.2, 1] }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  className="w-12 h-12 rounded-full bg-card border-2 border-primary/30 flex items-center justify-center shrink-0 group-hover:border-primary transition-colors duration-300"
                >
                  <milestone.icon size={20} className="text-primary" />
                </motion.div>

                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-4 flex-1 group-hover:border-primary/30 transition-colors duration-300">
                  <span className="text-primary font-bold text-sm">{milestone.year}</span>
                  <p className="text-foreground font-medium">{milestone.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
