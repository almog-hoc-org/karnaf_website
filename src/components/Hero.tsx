import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./ui/split-text";
import heroImage from "@/assets/hero-city.jpg";
import teamHeroPhoto from "@/assets/team/itamar-almog-hero-new.png";
import mascotPointing from "@/assets/mascot/mascot-pointing.png";
import ParticlesBackground from "./ParticlesBackground";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // GSAP Animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Character-by-character reveal for main headline
      const chars = headingRef.current?.querySelectorAll('.char');

      if (chars && chars.length > 0) {
        gsap.from(chars, {
          opacity: 0,
          y: 80,
          rotationX: -90,
          stagger: 0.015,
          ease: 'back.out(1.5)',
          duration: 0.7,
          delay: 0.3,
          transformOrigin: '0% 50% -50'
        });
      }

      // Subheading animation with blur
      if (subheadingRef.current) {
        gsap.from(subheadingRef.current, {
          opacity: 0,
          y: 40,
          filter: 'blur(10px)',
          duration: 0.9,
          delay: 0.8,
          ease: 'power3.out'
        });
      }

      // CTA buttons animation
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.6,
          delay: 1.2,
          ease: 'power2.out'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Warm gradient orbs - CSS only, no JS overhead */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, hsl(25 100% 50%) 0%, transparent 70%)' }} />

        <div
          className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full blur-3xl opacity-15"
          style={{ background: 'radial-gradient(circle, hsl(35 100% 55%) 0%, transparent 70%)' }} />

        <div
          className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, hsl(45 100% 60%) 0%, transparent 70%)' }} />

      </div>

      {/* Parallax Background */}
      <motion.div className="absolute inset-0 -z-20" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
          style={{ willChange: "transform" }} />

      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/90 to-background/70 -z-10" />

      {/* Particles */}
      <ParticlesBackground />

      {/* Subtle mascot as background watermark */}
      <div className="absolute bottom-10 right-20 pointer-events-none z-[1] hidden xl:block">
        <img
          src={mascotPointing}
          alt=""
          className="h-[180px] object-contain mascot-fade-bottom opacity-[0.12] mascot-blend-soft-light animate-float-slow"
          loading="lazy" />

      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Content Grid */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">

        {/* Text Side (Right in RTL) */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4">

            KNOWLEDGE. GUIDANCE. CONFIDENCE.
          </motion.p>

          {/* Character-by-character headline with GSAP */}
          <h1
            ref={headingRef}
            className="text-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-4">

            <SplitText text="הדירה הבאה שלכם מתחילה כאן" />
          </h1>

          <p
            ref={subheadingRef}
            className="text-display text-3xl md:text-4xl lg:text-5xl text-primary text-glow mb-6">

            עם ידע, ליווי, ושקט בראש.
          </p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8">מלווים צעד אחר צעד, בין אם אתם בתחילת הדרך או משקיעים מנוסים — אנחנו כאן.



          </motion.p>

          <div
            ref={ctaRef}
            className="flex flex-col sm:flex-row gap-3 md:gap-4">

            <Link to="/course" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full bg-primary text-primary-foreground font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 animate-pulse-glow">

                לתוכנית "הדרך לדירה" 🏠
              </Button>
            </Link>
            <Link to="/premium" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-primary/50 text-primary hover:bg-primary/10 font-bold text-base md:text-lg px-6 md:px-8 py-5 md:py-6 backdrop-blur-sm">

                לליווי קרנף פרימיום
              </Button>
            </Link>
          </div>

        </div>

        {/* Team Photo - left side of hero on desktop */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="hidden lg:flex items-end justify-center absolute bottom-0 left-[8%] z-10 pointer-events-none">

          <img
            src={teamHeroPhoto}
            alt="איתמר ואלמוג — מייסדי קרנף"
            className="h-[500px] object-contain opacity-80"
            style={{
              maskImage: "linear-gradient(to bottom, black 60%, transparent 100%), linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
              filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.15))"
            }} />

        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}>

        <span className="text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }} />

        </motion.div>
      </motion.div>
    </section>);

};

export default Hero;