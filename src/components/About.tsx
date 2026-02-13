import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
          >
            OUR STORY
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-display text-4xl md:text-5xl text-foreground mb-8"
          >
            סיפורו של <span className="text-primary">קרנף נדל"ן</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8"
          >
            בראש הצוות עומדים <span className="text-foreground font-semibold">איתמר נחליאל</span> ו<span className="text-foreground font-semibold">אלמוג חכמה</span> — 
            מומחי נדל"ן עם ניסיון מוכח בליווי עשרות עסקאות מוצלחות. 
            המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
