import { useEffect, useRef, useState } from "react";
import { Users, BookOpen, CalendarDays } from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const stats = [
  { value: 375, suffix: "+", label: "לקוחות מרוצים", icon: Users },
  { value: 50, suffix: "+", label: "שיעורים בקורס", icon: BookOpen },
  { value: 8, suffix: "+", label: "שנות ניסיון", icon: CalendarDays },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            const current = Math.round(eased * value);
            setCount(current);
            if (progress < 1) requestAnimationFrame(animate);
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="text-display text-display-md text-accent">
      {count.toLocaleString('he-IL')}{suffix}
    </div>
  );
};

const StatsCounter = () => {
  const sectionRef = useGsapReveal<HTMLDivElement>({ y: 20, stagger: 0.12 });

  return (
    <section className="py-8 md:py-12 relative overflow-hidden section-divider">
      <div className="absolute inset-0 bg-card" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <h3 className="text-center text-foreground font-bold text-xl md:text-2xl mb-4 md:mb-8">
          <span className="text-accent">מספרים</span> ולא תחושות
        </h3>
        <div ref={sectionRef} className="grid grid-cols-3 gap-4 md:gap-8 text-center max-w-3xl mx-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="relative group cursor-default">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 text-accent mb-4">
                <stat.icon size={24} />
              </div>
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
