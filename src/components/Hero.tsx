import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import mascotPointing from "@/assets/mascot/mascot-pointing.webp";

gsap.registerPlugin(ScrollTrigger);

const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 73) % 100}%`,
  top: `${20 + ((i * 41) % 70)}%`,
  size: 4 + (i % 4) * 2,
  delay: `${(i * 0.6) % 6}s`,
  dur: `${7 + (i % 5)}s`,
  dx: `${i % 2 === 0 ? "-" : ""}${20 + (i * 7) % 60}px`,
  dy: `${-(80 + (i * 13) % 120)}px`,
  isAccent: i % 3 === 0,
}));

const Squiggle = () => (
  <svg
    viewBox="0 0 220 14"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
    className="absolute inset-x-0 -bottom-3 h-4 w-full pointer-events-none"
  >
    <path
      d="M2 7 Q 28 1, 56 7 T 112 7 T 168 7 T 218 7"
      stroke="hsl(var(--accent))"
      strokeWidth="4"
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

const TRUST_PILLARS = [
  "8+ שנות מחקר",
  "375+ בוגרים",
  "מספרים, לא תחושות",
  "ליווי צמוד",
  "מחשבונים מתקדמים",
  "קהילה פעילה",
];

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const mascotPrimaryRef = useRef<HTMLImageElement>(null);
  const mascotSecondaryRef = useRef<HTMLImageElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  // Mouse-reactive 3D tilt on the headline (subtle, capped)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ rx: -dy * 5, ry: dx * 6 });
  };
  const handleMouseLeave = () => setTilt({ rx: 0, ry: 0 });

  // Scroll-driven parallax + mascot dual-state crossfade + halo scale
  useEffect(() => {
    if (!sectionRef.current) return;
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

      if (contentRef.current) {
        tl.to(contentRef.current, { opacity: 0, y: -60, ease: "none" }, 0);
      }
      if (haloRef.current) {
        tl.to(haloRef.current, { scale: 1.4, opacity: 0.3, ease: "none" }, 0);
      }
      if (mascotPrimaryRef.current) {
        tl.to(
          mascotPrimaryRef.current,
          { yPercent: -16, opacity: 0, ease: "none" },
          0
        );
      }
      if (mascotSecondaryRef.current) {
        tl.fromTo(
          mascotSecondaryRef.current,
          { opacity: 0, yPercent: 0 },
          { opacity: 1, yPercent: -22, ease: "none" },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Entrance animations
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
      className="relative min-h-screen flex flex-col items-stretch overflow-hidden"
    >
      {/* Animated mesh-gradient background */}
      <div className="absolute inset-0 -z-30 hero-mesh-bg" aria-hidden="true" />

      {/* Soft top vignette so navbar reads cleanly */}
      <div
        className="absolute inset-x-0 top-0 h-40 -z-20 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background) / 0.85), hsl(var(--background) / 0))",
        }}
        aria-hidden="true"
      />

      {/* Floating ambient particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
        {PARTICLES.map((p) => (
          <span
            key={p.id}
            className={`particle absolute rounded-full ${
              p.isAccent ? "bg-accent/70" : "bg-primary/55"
            }`}
            style={
              {
                left: p.left,
                top: p.top,
                width: p.size,
                height: p.size,
                "--p-delay": p.delay,
                "--p-dur": p.dur,
                "--p-x": p.dx,
                "--p-y": p.dy,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Subtle grain on top of everything for film texture */}
      <div className="absolute inset-0 -z-10 grain-texture pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex-1 container mx-auto px-6 pt-28 pb-16 lg:pt-36 lg:pb-24 grid lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] gap-10 lg:gap-16 items-center"
      >
        {/* Text side */}
        <div
          className="order-2 lg:order-1 [perspective:1200px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            ref={eyebrowRef}
            className="text-eyebrow uppercase text-accent mb-5 flex items-center gap-3"
          >
            <span className="inline-block w-12 h-px bg-accent" />
            <span>ליווי נדל״ן מבוסס נתונים</span>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="text-display-lg md:text-display-xl text-foreground mb-6 lg:mb-8 leading-[0.95] font-black tracking-tight transition-transform duration-200 will-change-transform"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <span className="block lg:whitespace-nowrap">
              <MaskedWords words={["הדירה", "הבאה", "שלכם"]} delay={0.2} />
            </span>
            <span className="block lg:whitespace-nowrap mt-2">
              <MaskedWords
                words={["מתחילה", "כאן"]}
                delay={0.55}
                highlightIndex={1}
              />
            </span>
          </h1>

          <p
            ref={subheadRef}
            className="text-display-sm md:text-display-md text-primary/85 mb-5 max-w-xl leading-snug font-bold"
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

          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-4 items-start">
            <Link to="/course" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full btn-polygon bg-accent text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 shadow-glow-accent hover:shadow-[0_0_60px_hsl(var(--accent)/0.6)] transition-shadow"
              >
                גלו איך קונים דירה חכם
              </Button>
            </Link>
            <a
              href="#webinar"
              className="hidden sm:inline-flex items-center gap-2 self-center text-foreground/80 hover:text-accent transition-colors text-base font-semibold underline-offset-4 hover:underline"
            >
              או — וובינר חינם השבוע
              <span aria-hidden>←</span>
            </a>
          </div>
        </div>

        {/* Mascot side — halo + dual-state crossfade */}
        <div className="order-1 lg:order-2 relative flex items-center justify-center pointer-events-none min-h-[280px] lg:min-h-[520px]">
          {/* Halo */}
          <div
            ref={haloRef}
            className="mascot-halo absolute w-[110%] aspect-square rounded-full -z-10"
            style={{ willChange: "transform, opacity" }}
            aria-hidden="true"
          />
          {/* Decorative orbiting ring */}
          <svg
            viewBox="0 0 400 400"
            className="absolute inset-0 w-full h-full -z-10 opacity-50 hidden lg:block"
            aria-hidden="true"
          >
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke="hsl(var(--accent))"
              strokeWidth="1"
              strokeDasharray="4 12"
              opacity="0.4"
            />
            <circle
              cx="200"
              cy="200"
              r="155"
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              strokeDasharray="2 10"
              opacity="0.35"
            />
          </svg>

          {/* Mascots */}
          <div className="relative h-[260px] sm:h-[320px] lg:h-[480px] aspect-square flex items-center justify-center">
            <img
              ref={mascotPrimaryRef}
              src={mascotWelcome}
              alt="קרנף נדל״ן — מנופף שלום"
              className="absolute inset-0 m-auto h-full w-auto object-contain mascot-glow mascot-float"
              style={{ willChange: "transform, opacity" }}
              loading="eager"
              decoding="async"
            />
            <img
              ref={mascotSecondaryRef}
              src={mascotPointing}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 m-auto h-full w-auto object-contain mascot-glow"
              style={{ opacity: 0, willChange: "transform, opacity" }}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>

      {/* Trust marquee strip — full bleed bottom */}
      <div className="relative z-10 border-y border-border/40 bg-background/40 backdrop-blur-sm overflow-hidden">
        <div className="flex marquee-track whitespace-nowrap">
          {[...TRUST_PILLARS, ...TRUST_PILLARS].map((label, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-3 px-6 py-3 text-eyebrow uppercase text-foreground/70"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
              <span>{label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Vertical kinetic scroll cue */}
      <div
        aria-hidden="true"
        className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-muted-foreground/70"
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
