import { useLayoutEffect, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "./ui/split-text";
import heroImage from "@/assets/hero-city.jpg";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import { ChevronDown } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // GSAP parallax — single ScrollTrigger timeline
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bgRef.current, { yPercent: 30, scale: 1.15, ease: "none" }, 0);

      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, y: -50, ease: "none" }, 0);
      }

      if (mascotRef.current) {
        tl.to(mascotRef.current, { yPercent: -15, ease: "none" }, 0);
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // GSAP entrance animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
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
      {/* Parallax Background — GSAP driven */}
      <div ref={bgRef} className="absolute inset-0 -z-20" style={{ willChange: "transform" }}>
        <img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
        />
      </div>

      {/* Clean gradient overlay — stronger on text side for readability */}
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/95 to-background/50 -z-10" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center"
      >
        {/* Text Side (Right in RTL) */}
        <div>
          <h1
            ref={headingRef}
            className="text-display text-display-lg text-foreground mb-4"
          >
            <SplitText text="הדירה הבאה שלכם מתחילה כאן" />
          </h1>

          <p
            ref={subheadingRef}
            className="text-display-md text-accent mb-6"
          >
            לקנות דירה חכם ולהימנע מטעויות יקרות
          </p>

          <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8">
            מלווים אתכם בשיטה מבוססת נתונים — מהצעד הראשון ועד חתימת החוזה. בלי לסמוך על אינטואיציה, בלי טעויות יקרות.
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <Link to="/course" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full btn-polygon bg-accent text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 shadow-glow-accent"
              >
                גלו איך קונים דירה חכם
              </Button>
            </Link>
          </div>
        </div>

        {/* Mascot — GSAP parallax */}
        <div className="hidden lg:flex items-center justify-center pointer-events-none">
          <img
            ref={mascotRef}
            src={mascotWelcome}
            alt="קרנף נדל״ן — מנופף שלום"
            className="h-[480px] object-contain mascot-glow mascot-float"
            style={{
              willChange: "transform",
            }}
          />
        </div>
        {/* Mobile mascot */}
        <div className="flex lg:hidden justify-center pointer-events-none -mt-4 mb-2">
          <img
            src={mascotWelcome}
            alt=""
            aria-hidden="true"
            className="h-[140px] object-contain mascot-glow mascot-float"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/50">
        <ChevronDown size={20} className="animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
