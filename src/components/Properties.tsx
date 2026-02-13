import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "אמיר כ.",
    role: "רוכש דירה ראשונה",
    quote: "הגעתי לקרנף בלי שום ידע על נדל\"ן. הם לקחו אותי יד ביד, הסבירו כל שלב, וחסכו לי עשרות אלפי שקלים בזכות משא ומתן חכם. היום יש לי דירה והרגשת ביטחון שעשיתי את העסקה הנכונה.",
  },
  {
    name: "אירית מ.",
    role: "משקיעה",
    quote: "אחרי שנים של חשיבה על השקעה בנדל\"ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק, והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.",
  },
  {
    name: "נועם ד.",
    role: 'בוגר "הדרך לדירה"',
    quote: "התוכנית הדיגיטלית שינתה לי את הראש. הבנתי מה לבדוק, איך לנהל משא ומתן, ומה באמת קובע מחיר. רכשתי דירה מתחת למחיר השוק בזכות הכלים שקיבלתי.",
  },
];

const Properties = () => {
  return (
    <section id="testimonials" className="py-24">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          SUCCESS STORIES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-12"
        >
          הלקוחות שלנו <span className="text-primary">מספרים</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 group flex flex-col"
            >
              <Quote size={32} className="text-primary/30 mb-4" />
              <p className="text-muted-foreground leading-relaxed flex-1 mb-6">
                "{testimonial.quote}"
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-foreground font-bold">{testimonial.name}</p>
                <p className="text-primary text-sm">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Properties;
