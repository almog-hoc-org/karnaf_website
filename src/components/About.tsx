import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team/itamar-almog-about.webp";
import { Reveal } from "@/components/v2/Reveal";
import { ParallaxImage, SplitReveal } from "@/components/v2/scroll";
import { useCountUp } from "@/hooks/use-count-up";
import {
  TOTAL_CLIENTS,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE,
  YEARS_EXPERIENCE_LABEL,
} from "@/data/companyStats";

/** A proof number that counts up once it's on screen (final value in the SSG HTML). */
const CountStat = ({ value, label }: { value: number; label: string }) => {
  const { ref, value: shown } = useCountUp(value);
  return (
    <div>
      <div className="text-display-md text-accent tabular-nums leading-none mb-1">
        <span ref={ref}>{shown}</span>+
      </div>
      <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">{label}</div>
    </div>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="relative py-section-lg bg-background overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">
          <ParallaxImage
            src={teamPhoto}
            alt="איתמר ואלמוג — מייסדי קרנף"
            ratio="aspect-[4/5]"
            className="rounded-2xl shadow-depth-3 max-w-md w-full mx-auto lg:mx-0"
          />

          <div>
            <SplitReveal
              text="הצוות שמלווה אתכם לדירה הנכונה"
              className="text-display-md md:text-display-lg text-foreground mb-6"
            />

            <Reveal delay={0.08}>
              <p className="text-body-lg text-muted-foreground leading-[1.85] mb-6 max-w-[60ch]">
                אנחנו כאן ללמד אתכם לקנות חכם. קרנף נדל״ן מלווה רוכשי דירות
                ראשונות ומשקיעים בשיטה מבוססת נתונים — צעד אחר צעד, עם כלים, ידע וליווי שמביא תוצאות.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="text-body-lg text-muted-foreground leading-[1.85] mb-10 max-w-[60ch]">
                בראש הצוות עומדים{" "}
                <span className="text-foreground font-semibold">איתמר נחליאל</span> ו
                <span className="text-foreground font-semibold">אלמוג חכמה</span> —
                מומחי נדל״ן עם ניסיון מוכח בליווי מאות רוכשים ומשקיעים.
                המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="grid grid-cols-2 gap-6 max-w-md pt-6 border-t border-primary/15 mb-8">
                <CountStat value={YEARS_EXPERIENCE} label={YEARS_EXPERIENCE_LABEL} />
                <CountStat value={TOTAL_CLIENTS} label={TOTAL_CLIENTS_LABEL} />
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <Link to="/about" className="inline-block">
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 rounded-full px-7 py-5"
                >
                  קראו עוד על הסיפור שלנו
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
