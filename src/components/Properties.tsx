import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

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
      <Star
        key={i}
        size={18}
        className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}
      />
    ))}
  </div>
);

const Properties = () => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const headerRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 10000);
    return () => clearInterval(timer);
  }, [next]);

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6">
        <div ref={headerRef}>
          <p className="text-center text-accent font-bold text-sm tracking-widest uppercase mb-4">
            סיפורי הצלחה
          </p>
          <h2 className="text-display text-display-md text-center text-foreground mb-12">
            הלקוחות שלנו <span className="text-gradient">מספרים</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Large decorative quote */}
          <Quote size={140} className="absolute -top-8 right-0 text-primary/[0.04] pointer-events-none" />

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
                className="w-full bg-card shadow-depth-3 border border-border/20 rounded-2xl p-8 md:p-12 text-center"
              >
                <StarRating rating={testimonials[current].rating} />

                <p className="text-lg md:text-xl text-foreground/90 leading-relaxed mb-8 font-light">
                  "{testimonials[current].quote}"
                </p>

                <div>
                  <p className="text-foreground font-bold text-lg">{testimonials[current].name}</p>
                  <p className="text-accent text-sm">{testimonials[current].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              aria-label="המלצה קודמת"
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              <ChevronRight size={18} />
            </button>

            <div className="flex gap-2" role="tablist" aria-label="בחירת המלצה">
              {testimonials.map((testimonial, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
                  role="tab"
                  aria-label={`המלצה ${i + 1} מאת ${testimonial.name}`}
                  aria-selected={i === current}
                  className={`relative h-2 rounded-full transition-all duration-300 ${
                    i === current ? "w-10 bg-accent" : "w-8 bg-border hover:bg-border/80"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="המלצה הבאה"
              className="w-10 h-10 rounded-full border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200"
            >
              <ChevronLeft size={18} />
            </button>
          </div>

          <div className="text-center mt-8">
            <Link to="/testimonials">
              <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 font-bold gap-2">
                כל סיפורי ההצלחה
                <ArrowLeft size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Properties;
