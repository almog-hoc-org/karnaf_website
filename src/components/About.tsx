import { motion } from "framer-motion";

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
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
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            בשוק שבו כולם רצים, הקרנף קובע את הקצב. הקמנו את 'קרנף נדל"ן' כדי
            להביא גישה אחרת: עוצמתית יותר, שקופה יותר ובלתי מתפשרת. אנחנו לא
            רק מתווכים, אנחנו השותפים שלכם לכיבוש היעד הבא.
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
