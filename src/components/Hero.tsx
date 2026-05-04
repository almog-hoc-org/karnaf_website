import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import heroCity from "@/assets/hero-city.jpg";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";

const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const mascotY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end overflow-hidden"
      style={{ backgroundColor: "hsl(217 50% 8%)" }}
    >
      {/* Cinematic photo background — parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        aria-hidden="true"
      >
        <img
          src={heroCity}
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
          decoding="async"
        />
      </motion.div>

      {/* Layered cinematic gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, hsl(217 50% 8% / 0.55) 0%, hsl(217 50% 8% / 0.25) 35%, hsl(217 50% 8% / 0.85) 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "radial-gradient(70% 80% at 70% 30%, hsl(24 80% 52% / 0.18) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain-texture pointer-events-none" />

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pb-20 lg:pb-28 pt-32"
        style={reduce ? undefined : { opacity: fade }}
      >
        <div className="grid lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-end">
          {/* Text */}
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-eyebrow uppercase tracking-[0.32em] mb-6 flex items-center gap-3"
              style={{ color: "hsl(36 33% 95% / 0.7)" }}
            >
              <span className="block w-10 h-px bg-accent" aria-hidden />
              <span>ליווי נדל״ן מבוסס נתונים</span>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-display-lg md:text-display-xl font-black text-white leading-[0.95] tracking-tight mb-6"
            >
              הדירה הבאה שלכם{" "}
              <span className="text-accent">מתחילה כאן</span>.
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.55 }}
              className="text-display-sm md:text-display-md font-bold leading-snug max-w-[20ch] mb-5"
              style={{ color: "hsl(var(--accent))" }}
            >
              לקנות דירה חכם ולהימנע מטעויות יקרות
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="text-body-lg leading-relaxed max-w-[52ch] mb-10"
              style={{ color: "hsl(36 33% 95% / 0.78)" }}
            >
              מלווים אתכם בשיטה מבוססת נתונים — מהצעד הראשון ועד חתימת החוזה.
              בלי לסמוך על אינטואיציה, בלי טעויות יקרות.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="flex flex-wrap items-center gap-6"
            >
              <Link to="/course">
                <Button
                  size="lg"
                  className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-all"
                >
                  גלו איך קונים דירה חכם
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </Button>
              </Link>
              <Link
                to="/about"
                className="text-base font-semibold hover:text-accent transition-colors underline-offset-4 hover:underline"
                style={{ color: "hsl(36 33% 95% / 0.85)" }}
              >
                סיפורו של קרנף
              </Link>
            </motion.div>
          </div>

          {/* Mascot — kept on desktop, smaller and integrated */}
          <motion.div
            className="hidden lg:flex items-end justify-center pointer-events-none"
            style={reduce ? undefined : { y: mascotY }}
            aria-hidden
          >
            <img
              src={mascotWelcome}
              alt=""
              className="h-[420px] xl:h-[480px] object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
              loading="eager"
              decoding="async"
            />
          </motion.div>
        </div>

        {/* Trust meta strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-14 lg:mt-20 pt-8 border-t border-white/15 grid grid-cols-3 gap-4 max-w-2xl"
          style={{ color: "hsl(36 33% 95% / 0.7)" }}
        >
          <div>
            <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
              375+
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              לקוחות מרוצים
            </div>
          </div>
          <div>
            <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
              50+
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              שיעורים בקורס
            </div>
          </div>
          <div>
            <div className="text-display-md font-black text-white tabular-nums leading-none mb-1">
              8+
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              שנות מחקר
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Mobile mascot — stack below */}
      <div className="absolute bottom-0 right-2 lg:hidden pointer-events-none opacity-80">
        <img
          src={mascotWelcome}
          alt=""
          aria-hidden
          className="h-[180px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-eyebrow uppercase tracking-[0.32em] flex flex-col items-center gap-2"
        style={{ color: "hsl(36 33% 95% / 0.5)" }}
        aria-hidden
      >
        <span>גלילה</span>
        <span className="block w-px h-10 bg-white/30 overflow-hidden relative">
          <span className="absolute inset-x-0 top-0 h-3 bg-accent scroll-cue-dot" />
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
