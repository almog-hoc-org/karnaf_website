import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const BigCTA = () => {
  const contentRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.15 });

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-primary grain-texture">
      <div ref={contentRef} className="relative z-10 container mx-auto px-5 md:px-6 text-center">
        <h2 className="text-display text-display-lg text-primary-foreground mb-6">
          מוכנים לצעד הראשון?{" "}
          <span className="text-accent">בואו נתחיל.</span>
        </h2>

        <p className="text-lg text-primary-foreground/70 max-w-xl mx-auto mb-10">
          דברו איתנו ונבנה יחד את התוכנית שלכם — בין אם אתם רוכשים דירה ראשונה או מחפשים את ההשקעה הבאה.
        </p>

        <div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-polygon bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg px-10 py-7 gap-3 shadow-glow-accent"
            >
              <MessageCircle size={22} />
              בואו נדבר — בלי התחייבות
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default BigCTA;
