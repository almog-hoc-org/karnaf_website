import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { Users, BookOpen, CalendarDays, ThumbsUp } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 150, suffix: "+", label: "לקוחות שליווינו", icon: Users },
  { value: 50, suffix: "+", label: "שיעורים בקורס", icon: BookOpen },
  { value: 8, suffix: "+", label: "שנות ניסיון", icon: CalendarDays },
  { value: 98, suffix: "%", label: "שביעות רצון", icon: ThumbsUp },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial value to 0
    element.textContent = `0${suffix}`;

    // Animate counter with GSAP
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      textContent: 0,
      duration: 2.5,
      ease: 'power2.out',
      snap: { textContent: 1 },
      onUpdate: function() {
        const current = Math.ceil(this.targets()[0].textContent);
        element.textContent = `${current.toLocaleString('he-IL')}${suffix}`;
      }
    });
  }, [value, suffix]);

  return (
    <div ref={ref} className="text-display text-4xl md:text-5xl lg:text-6xl text-primary text-glow" data-value={value}>
      0{suffix}
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-12"
        >
          THE NUMBERS SPEAK
        </motion.p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className={`relative group cursor-default ${i < stats.length - 1 ? "glow-divider" : ""}`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.3 + i * 0.15 }}
                className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300"
              >
                <stat.icon size={24} />
              </motion.div>

              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2 text-sm md:text-base group-hover:text-foreground transition-colors duration-300">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
