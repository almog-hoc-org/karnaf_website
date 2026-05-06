import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";

const BigCTA = () => {
  return (
    <SectionDark size="md" glow="bottom">
      <div className="container mx-auto px-5 md:px-6 text-center max-w-3xl">
        <Reveal>
          <h2 className="text-display-md md:text-display-xl font-black leading-[0.98] tracking-tight mb-6 text-white">
            מוכנים לצעד הראשון?{" "}
            <span className="text-accent">בואו נתחיל.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p
            className="text-body-lg max-w-xl mx-auto mb-10 leading-relaxed"
            style={{ color: "hsl(36 33% 95% / 0.72)" }}
          >
            דברו איתנו ונבנה יחד את התוכנית שלכם — בין אם אתם רוכשים דירה ראשונה או מחפשים את ההשקעה הבאה.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.45)] hover:shadow-[0_0_80px_hsl(var(--accent)/0.65)] transition-all"
            >
              <MessageCircle size={20} />
              בואו נדבר — בלי התחייבות
              <span aria-hidden className="inline-block transition-transform group-hover:-translate-x-1">←</span>
            </Button>
          </a>
        </Reveal>
      </div>
    </SectionDark>
  );
};

export default BigCTA;
