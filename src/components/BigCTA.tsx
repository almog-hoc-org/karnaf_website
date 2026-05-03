import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import mascotPresenting from "@/assets/mascot/mascot-presenting.webp";

const BigCTA = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.15 });

  return (
    <section className="relative py-section-lg overflow-hidden bg-primary grain-texture">
      {/* Layered radial glow */}
      <div
        className="absolute inset-0 pointer-events-none -z-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 70% at 50% 30%, hsl(var(--accent) / 0.20) 0%, transparent 70%), radial-gradient(40% 60% at 85% 70%, hsl(var(--accent) / 0.10) 0%, transparent 70%)",
        }}
      />

      {/* Mascot watermark — corner */}
      <img
        src={mascotPresenting}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-10 -left-10 lg:-left-16 w-[260px] lg:w-[340px] opacity-15 pointer-events-none select-none -z-0"
        loading="lazy"
        decoding="async"
      />

      {/* Decorative orbits */}
      <svg
        viewBox="0 0 800 800"
        className="absolute -right-40 -top-40 w-[700px] h-[700px] opacity-25 pointer-events-none -z-0"
        aria-hidden="true"
      >
        <circle cx="400" cy="400" r="380" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="3 16" />
        <circle cx="400" cy="400" r="320" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="2 22" opacity="0.6" />
        <circle cx="400" cy="400" r="260" fill="none" stroke="hsl(var(--accent))" strokeWidth="1" strokeDasharray="1 30" opacity="0.4" />
      </svg>

      <div
        ref={contentRef}
        className="relative z-10 container mx-auto px-5 md:px-6 text-center max-w-3xl"
      >
        <div className="text-eyebrow uppercase text-accent inline-flex items-center gap-3 mb-5">
          <span className="w-10 h-px bg-accent" />
          <span>הצעד הבא</span>
          <span className="w-10 h-px bg-accent" />
        </div>

        <h2 className="text-display-lg md:text-display-xl text-primary-foreground mb-6 font-black leading-[0.95]">
          מוכנים לצעד הראשון? {" "}
          <span className="relative inline-block text-accent">
            בואו נתחיל.
            <svg
              viewBox="0 0 220 14"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
              className="absolute inset-x-0 -bottom-3 h-4 w-full"
            >
              <path
                d="M2 7 Q 28 1, 56 7 T 112 7 T 168 7 T 218 7"
                stroke="hsl(var(--accent))"
                strokeWidth="4"
                strokeLinecap="round"
                className="squiggle-path"
              />
            </svg>
          </span>
        </h2>

        <p className="text-body-lg text-primary-foreground/75 max-w-xl mx-auto mb-10 leading-relaxed">
          דברו איתנו ונבנה יחד את התוכנית שלכם — בין אם אתם רוכשים דירה ראשונה או מחפשים את ההשקעה הבאה.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-polygon bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-7 gap-3 shadow-[0_0_60px_hsl(var(--accent)/0.45)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.65)] transition-shadow"
            >
              <MessageCircle size={22} />
              בואו נדבר — בלי התחייבות
            </Button>
          </a>
          <span className="text-primary-foreground/50 text-sm">
            תשובה בדרך כלל תוך שעה ביום עסקים
          </span>
        </div>
      </div>
    </section>
  );
};

export default BigCTA;
