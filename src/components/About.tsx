import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team/itamar-almog-about.png";

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
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
              מומחי נדל"ן עם ניסיון מוכח בליווי מאות עסקאות מוצלחות.
              המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-2 gap-6"
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

          <div className="relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={teamPhoto}
                alt="איתמר ואלמוג — מייסדי קרנף"
                className="w-[280px] md:w-[350px] lg:w-[400px] object-contain rounded-2xl"
                style={{
                  maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
