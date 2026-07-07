import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team/itamar-almog-about.webp";
import { Reveal } from "@/components/v2/Reveal";
import { ClipImage } from "@/components/v2/ClipImage";

const About = () => {
  return (
    <section
      id="about"
      className="relative py-section-lg bg-background overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-20 items-center">
          <Reveal>
            <ClipImage
              src={teamPhoto}
              alt="איתמר ואלמוג — מייסדי קרנף"
              ratio="aspect-[4/5]"
              className="rounded-2xl shadow-depth-3 max-w-md mx-auto lg:mx-0"
            />
          </Reveal>

          <div>
            <Reveal>
              <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-6">
                הצוות שמלווה אתכם לדירה הנכונה
              </h2>
            </Reveal>

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
                מומחי נדל״ן עם ניסיון מוכח בליווי מאות עסקאות מוצלחות.
                המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="grid grid-cols-2 gap-6 max-w-md pt-6 border-t border-primary/15 mb-8">
                {[
                  { num: "8+", label: "שנות ניסיון" },
                  { num: "375+", label: "לקוחות מרוצים" },
                ].map((stat, i) => (
                  <div key={i}>
                    <div className="text-display-md font-black text-accent tabular-nums leading-none mb-1">
                      {stat.num}
                    </div>
                    <div className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
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
