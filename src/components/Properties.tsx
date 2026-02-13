import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

const testimonials = [
  {
    name: "אמיר כ.",
    role: "רוכש דירה ראשונה",
    quote: "הגעתי לקרנף בלי שום ידע על נדל\"ן. הם לקחו אותי יד ביד, הסבירו כל שלב, וחסכו לי עשרות אלפי שקלים בזכות משא ומתן חכם. היום יש לי דירה והרגשת ביטחון שעשיתי את העסקה הנכונה.",
    rating: 5,
  },
  {
    name: "אירית מ.",
    role: "משקיעה",
    quote: "אחרי שנים של חשיבה על השקעה בנדל\"ן, סוף סוף מצאתי את האנשים הנכונים. הניתוח הפיננסי שקיבלתי היה מדויק, והליווי האישי גרם לי להרגיש שאני לא לבד בתהליך.",
    rating: 5,
  },
  {
    name: "נועם ד.",
    role: 'בוגר "הדרך לדירה"',
    quote: "התוכנית הדיגיטלית שינתה לי את הראש. הבנתי מה לבדוק, איך לנהל משא ומתן, ומה באמת קובע מחיר. רכשתי דירה מתחת למחיר השוק בזכות הכלים שקיבלתי.",
    rating: 5,
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1 mb-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 * i, type: "spring", stiffness: 300 }}
      >
        <Star
          size={18}
          className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}
        />
      </motion.div>
    ))}
  </div>
);

const Properties = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

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
          הלקוחות שלנו <span className="text-gradient">מספרים</span>
        </motion.h2>

        <div className="max-w-3xl mx-auto relative">
          <Quote size={120} className="absolute -top-6 right-0 text-primary/5 pointer-events-none" />

          <div className="relative min-h-[300px] flex items-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12 text-center"
              >
                <StarRating rating={testimonials[current].rating} />

                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 font-light">
                  "{testimonials[current].quote}"
                </p>

                <div>
                  <p className="text-foreground font-bold text-lg">{testimonials[current].name}</p>
                  <p className="text-primary text-sm">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  className="relative w-8 h-1.5 rounded-full bg-border overflow-hidden"
                >
                  {i === current && (
                    <motion.div
                      className="absolute inset-0 bg-primary rounded-full"
                      layoutId="testimonial-progress"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
