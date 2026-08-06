import { useRef } from "react";
import { Head } from "vite-react-ssg";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { WordCascade, Squiggled } from "@/components/v2/WordCascade";
import { Figure } from "@/components/ui/figure-number";
import heroCity from "@/assets/hero-city.jpg";
import heroCityAvif from "@/assets/hero-city.avif";

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

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-end overflow-hidden"
      style={{ backgroundColor: "hsl(217 50% 8%)" }}
    >
      {/* Preload the LCP image — SSG writes this into the page <head> */}
      <Head>
        <link rel="preload" as="image" href={heroCityAvif} type="image/avif" />
      </Head>
      {/* Cinematic photo background — parallax */}
      <motion.div
        className="absolute inset-0"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
        aria-hidden="true"
      >
        <picture>
          <source srcSet={heroCityAvif} type="image/avif" />
          <img
            src={heroCity}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            {...{ fetchpriority: "high" }}
          />
        </picture>
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
        {/* Text-led hero — the 3D mascot render was retired here (it
            clashed with the cinematic-editorial language; the commissioned
            illustration set replaces it, see docs/CREATIVE-BRIEF.md §6). */}
        <div className="max-w-3xl">
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

            {/* Number-led hook — the same 3% → ₪60,000 figure the VSL,
                the mistake ledger and the live calculator use. One hook,
                one brand, everywhere the visitor meets us. Exactly two
                lines: each phrase is nowrap from md up (display-lg fits
                the column; xl would overflow and force mid-phrase breaks). */}
            <h1 className="text-display-lg font-black text-white leading-[1.02] tracking-tight mb-6">
              <span className="md:whitespace-nowrap">
                <WordCascade text="פער של 3% במחיר הדירה —" delay={0.25} />
              </span>
              <br />
              <span className="text-accent tabular-nums md:whitespace-nowrap">
                <WordCascade text="60,000 ₪ מהכיס שלכם." delay={0.65} />
              </span>
            </h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.85 }}
              className="text-display-sm md:text-display-md font-bold leading-snug max-w-[26ch] mb-5"
              style={{ color: "hsl(36 33% 95% / 0.92)" }}
            >
              דירה קונים עם <Squiggled>מספרים</Squiggled> — לא עם תחושת בטן.
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.7 }}
              className="text-body-lg leading-relaxed max-w-[52ch] mb-10"
              style={{ color: "hsl(36 33% 95% / 0.78)" }}
            >
              בשביל זה בדיוק קיימת קרנף. שני מסלולים, מטרה אחת: הקורס
              הדיגיטלי המקיף בישראל שמלמד אתכם לעשות את זה לבד — או ליווי
              אישי 1:1 עד שהמפתח בידיים שלכם.
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.95 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/course" className="inline-block">
                <Button
                  size="lg"
                  className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-all"
                >
                  לקורס הדיגיטלי
                  <span
                    aria-hidden
                    className="inline-block transition-transform group-hover:-translate-x-1"
                  >
                    ←
                  </span>
                </Button>
              </Link>
              <Link to="/premium" className="inline-block">
                <Button
                  size="lg"
                  variant="outline"
                  className="inline-flex items-center gap-3 border-white/40 bg-white/5 text-white hover:bg-white hover:text-primary font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-all backdrop-blur-sm"
                >
                  ליווי משקיעים 1:1
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Trust meta strip */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          className="mt-14 lg:mt-20 pt-8 border-t border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 max-w-2xl"
          style={{ color: "hsl(36 33% 95% / 0.7)" }}
        >
          <div>
            <div className="mb-1">
              <Figure value="375" suffix="+" size="md" dark ledger />
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              עסקאות מלוות
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Figure value="15" size="md" dark ledger />
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              פרקים בקורס
            </div>
          </div>
          <div>
            <div className="mb-1">
              <Figure value="8" suffix="+" size="md" dark ledger />
            </div>
            <div className="text-eyebrow uppercase tracking-[0.18em]">
              שנות מחקר
            </div>
          </div>
        </motion.div>
      </motion.div>

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
