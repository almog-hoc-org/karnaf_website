import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/v2/Reveal";
import { Sparkline } from "@/components/v2/Sparkline";

const stats = [
  {
    value: 375,
    suffix: "+",
    label: "לקוחות מרוצים",
    trend: [40, 70, 105, 145, 180, 220, 265, 300, 340, 375],
  },
  {
    value: 50,
    suffix: "+",
    label: "שיעורים בקורס",
    trend: [12, 18, 22, 28, 32, 38, 42, 46, 48, 50],
  },
  {
    value: 8,
    suffix: "+",
    label: "שנות מחקר",
    trend: [1, 2, 3, 4, 5, 6, 7, 8, 8, 8],
  },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(value);
  const [isCounting, setIsCounting] = useState(false);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      setCount(value);
      hasAnimated.current = true;
      return;
    }

    const runCountUp = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;
      setCount(0);
      setIsCounting(true);
      const duration = 1800;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(eased * value));
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setCount(value);
          setIsCounting(false);
        }
      };
      requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) runCountUp();
      },
      { threshold: 0.3 }
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  return (
    <div
      ref={ref}
      className="text-display-xl font-black tabular-nums text-foreground leading-[0.9] transition-opacity duration-300"
      style={{ opacity: isCounting ? 0.85 : 1 }}
    >
      {count.toLocaleString("he-IL")}
      <span className="text-accent">{suffix}</span>
    </div>
  );
};

const StatsCounter = () => {
  return (
    <section className="relative py-section-md bg-background overflow-hidden">
      <div
        className="absolute inset-0 -z-10 opacity-60 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 50%, hsl(var(--accent) / 0.10) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-5 md:px-6">
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black text-center text-foreground mb-10 md:mb-16 leading-[1] tracking-tight">
            <span className="text-accent">מספרים</span> ולא תחושות
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto items-start">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.12}>
              <div className="relative text-center group">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="hidden md:block absolute -right-6 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-border to-transparent"
                  />
                )}

                <Counter value={stat.value} suffix={stat.suffix} />

                <div className="mt-4 hidden md:flex justify-center">
                  <Sparkline values={stat.trend} width={120} height={28} />
                </div>

                <div className="mt-4 md:mt-3 flex flex-col items-center gap-2">
                  <span
                    aria-hidden
                    className="block w-8 h-px bg-accent/60 group-hover:w-14 transition-[width] duration-500"
                  />
                  <p className="text-label md:text-body uppercase tracking-[0.18em] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
