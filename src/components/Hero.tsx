import { useEffect, useLayoutEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/hero-city.jpg";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import mascotPointing from "@/assets/mascot/mascot-pointing.webp";

gsap.registerPlugin(ScrollTrigger);

const Squiggle = () => (
  <svg
    viewBox="0 0 220 14"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="absolute inset-x-0 -bottom-3 h-3 w-full pointer-events-none"
  >
    <path
      d="M2 7 Q 28 1, 56 7 T 112 7 T 168 7 T 218 7"
      stroke="hsl(var(--accent))"
      strokeWidth="3.5"
      strokeLinecap="round"
      className="squiggle-path"
    />
  </svg>
);

interface MaskedWordsProps {
  words: string[];
  delay?: number;
  stagger?: number;
  className?: string;
  highlightIndex?: number;
}

const MaskedWords = ({
  words,
  delay = 0.15,
  stagger = 0.08,
  className,
  highlightIndex,
}: MaskedWordsProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const wraps = Array.from(root.querySelectorAll<HTMLElement>(".word-mask"));
    if (!wraps.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) {
      wraps.forEach((w) => w.classList.add("is-revealed"));
      return;
    }

    const timers: number[] = [];
    wraps.forEach((wrap, i) => {
      const t = window.setTimeout(
        () => wrap.classList.add("is-revealed"),
        (delay + stagger * i) * 1000
      );
      timers.push(t);
    });

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [delay, stagger, words]);

  return (
    <span ref={containerRef} className={className}>
      {words.map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={`word-mask${i < words.length - 1 ? " me-[0.28em]" : ""}`}
        >
          <span
            className={`word ${i === highlightIndex ? "relative text-accent" : ""}`}
          >
            {w}
            {i === highlightIndex && <Squiggle />}
          </span>
        </span>
      ))}
    </span>
  );
};

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const mascotPrimaryRef = useRef<HTMLImageElement>(null);
  const mascotSecondaryRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Scroll-driven parallax + mascot dual-state crossfade
  useEffect(() => {
    if (!bgRef.current || !sectionRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(bgRef.current, { yPercent: 24, scale: 1.12, ease: "none" }, 0);

      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, y: -40, ease: "none" }, 0);
      }
      if (mascotPrimaryRef.current) {
        tl.to(
          mascotPrimaryRef.current,
          { yPercent: -10, opacity: 0, ease: "none" },
          0
        );
      }
      if (mascotSecondaryRef.current) {
        tl.fromTo(
          mascotSecondaryRef.current,
          { opacity: 0, yPercent: 0 },
          { opacity: 1, yPercent: -14, ease: "none" },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Entrance animations: eyebrow / subhead / body / CTA
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      if (eyebrowRef.current) {
        gsap.from(eyebrowRef.current, {
          opacity: 0,
          y: 12,
          duration: 0.6,
          delay: 0.05,
          ease: "power2.out",
        });
      }
      if (subheadRef.current) {
        gsap.from(subheadRef.current, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          delay: 0.7,
          ease: "power3.out",
        });
      }
      if (bodyRef.current) {
        gsap.from(bodyRef.current, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          delay: 0.95,
          ease: "power3.out",
        });
      }
      if (ctaRef.current) {
        gsap.from(ctaRef.current.children, {
          opacity: 0,
          y: 24,
          stagger: 0.12,
          duration: 0.7,
          delay: 1.15,
          ease: "power2.out",
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Parallax background photo */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20"
        style={{ willChange: "transform" }}
      >
        <img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Editorial layered overlay — cream wash + warm radial glow + subtle grain */}
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-l from-background via-background/95 to-background/55"
      />
      <div
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(60% 80% at 78% 50%, hsl(var(--background) / 0.0) 0%, hsl(var(--background) / 0.25) 50%, hsl(var(--background) / 0.85) 100%)",
        }}
      />
      <div className="absolute inset-0 -z-10 grain-texture" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-6 py-32 lg:py-40 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-center"
      >
        {/* Text side (right in RTL via grid order) */}
        <div className="order-2 lg:order-1">
          <div
            ref={eyebrowRef}
            className="text-eyebrow uppercase text-accent mb-5 flex items-center gap-3"
          >
            <span className="inline-block w-10 h-px bg-accent/70" />
            <span>ליווי נדל״ן מבוסס נתונים</span>
          </div>

          <h1 className="text-editorial text-display-lg md:text-display-xl text-foreground mb-6 lg:mb-8 leading-[0.95]">
            <span className="block">
              <MaskedWords words={["הדירה", "הבאה", "שלכם"]} delay={0.2} />
            </span>
            <span className="block mt-2">
              <MaskedWords
                words={["מתחילה", "כאן"]}
                delay={0.55}
                highlightIndex={1}
              />
            </span>
          </h1>

          <p
            ref={subheadRef}
            className="text-editorial text-display-sm md:text-display-md text-primary/85 mb-5 max-w-xl leading-snug"
          >
            לקנות דירה חכם ולהימנע מטעויות יקרות
          </p>

          <p
            ref={bodyRef}
            className="text-body-lg text-muted-foreground max-w-lg leading-relaxed mb-8"
          >
            מלווים אתכם בשיטה מבוססת נתונים — מהצעד הראשון ועד חתימת החוזה.
            בלי לסמוך על אינטואיציה, בלי טעויות יקרות.
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

        {/* Mascot — dual-state crossfade on scroll */}
        <div className="order-1 lg:order-2 hidden lg:flex items-center justify-center pointer-events-none relative h-[480px]">
          <img
            ref={mascotPrimaryRef}
            src={mascotWelcome}
            alt="קרנף נדל״ן — מנופף שלום"
            className="absolute h-[480px] object-contain mascot-glow mascot-float"
            style={{ willChange: "transform, opacity" }}
          />
          <img
            ref={mascotSecondaryRef}
            src={mascotPointing}
            alt=""
            aria-hidden="true"
            className="absolute h-[480px] object-contain mascot-glow"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          />
        </div>

        {/* Mobile mascot */}
        <div className="order-1 lg:hidden flex justify-center pointer-events-none -mt-2 mb-2">
          <img
            src={mascotWelcome}
            alt=""
            aria-hidden="true"
            className="h-[150px] object-contain mascot-glow mascot-float"
            loading="eager"
            decoding="async"
          />
        </div>
      </div>

      {/* Vertical kinetic scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground/70"
      >
        <div className="text-eyebrow uppercase tracking-[0.3em] [writing-mode:vertical-rl] [text-orientation:mixed] rotate-180">
          גלילה
        </div>
        <div className="relative h-12 w-px bg-muted-foreground/30 overflow-hidden">
          <span className="scroll-cue-dot absolute top-0 left-1/2 -translate-x-1/2 w-1 h-3 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
