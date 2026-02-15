import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-city.jpg";
import foundersPhoto from "@/assets/team/itamar-almog.png";
import mascotPointing from "@/assets/mascot/mascot-pointing.png";
import ParticlesBackground from "./ParticlesBackground";

const headlineWords = ["הדירה", "הבאה", "שלכם", "מתחילה", "כאן."];

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background - Layer 1 */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
          style={{ willChange: "transform" }}
        />
      </motion.div>

      {/* Gradient overlay - stronger for light theme readability */}
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/70 z-[0]" />

      {/* Particles - Layer 3 */}
      <ParticlesBackground />

      {/* Subtle mascot as background watermark */}
      <div className="absolute bottom-0 right-10 pointer-events-none z-[1] hidden xl:block">
        <img
          src={mascotPointing}
          alt=""
          className="h-[180px] object-contain mascot-fade-bottom opacity-[0.08] mix-blend-multiply"
        />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Content Grid */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Text Side (Right in RTL) */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
          >
            KNOWLEDGE. GUIDANCE. CONFIDENCE.
          </motion.p>

          {/* Word-by-word headline */}
          <h1 className="text-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-2">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block ml-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-4xl md:text-5xl lg:text-6xl text-primary text-glow mb-6"
          >
            עם ידע, ליווי, ושקט בראש.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8"
          >
            מלווים צעד אחר צעד, עם ידע, ניסיון ואכפתיות אמיתית.
            בין אם אתם בתחילת הדרך או משקיעים מנוסים — אנחנו כאן בשבילכם.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/course">
              <Button
                size="lg"
                className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                לתוכנית "הדרך לדירה"
              </Button>
            </Link>
            <Link to="/premium">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6 backdrop-blur-sm"
              >
                לליווי קרנף פרימיום
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Founders Photo Side (Left in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:block relative"
        >
          {/* Decorative ring behind photo */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-primary/10 -z-10 blur-sm" />

          <div className="relative overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={foundersPhoto}
              alt="איתמר ואלמוג — מייסדי קרנף נדל״ן"
              className="w-full h-[520px] object-cover object-top"
              style={{
                maskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 65%, transparent 100%)",
              }}
            />
            {/* Overlay gradient for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

            {/* Names overlay at bottom */}
            <div className="absolute bottom-6 inset-x-0 text-center">
              <p className="text-foreground font-bold text-lg drop-shadow-sm">איתמר נחליאל & אלמוג חכמה</p>
              <p className="text-primary text-sm font-medium">מייסדי קרנף נדל"ן</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Mouse icon */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
