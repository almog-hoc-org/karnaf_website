import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <section id="about" className="py-10 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-3xl">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-foreground mb-6 text-center"
        >
          סיפורו של{" "}
          <span className="text-gradient">קרנף נדל"ן</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-4 text-center"
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
          className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6 text-center"
        >
          בראש הצוות עומדים{" "}
          <span className="text-foreground font-semibold">איתמר נחליאל</span> ו
          <span className="text-foreground font-semibold">אלמוג חכמה</span> —
          מומחי נדל"ן עם ניסיון מוכח בליווי מאות עסקאות מוצלחות.
          המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 gap-6 max-w-xs mx-auto mb-6"
        >
          {[
            { num: "8+", label: "שנות ניסיון" },
            { num: "375+", label: "לקוחות מרוצים" },
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
          className="text-center"
        >
          <Link to="/about">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold gap-2">
              קראו עוד על הסיפור שלנו
              <ArrowLeft size={16} />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
