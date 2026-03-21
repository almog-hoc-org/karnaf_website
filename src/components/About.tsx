import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import teamPhoto from "@/assets/team/itamar-almog-about.png";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const About = () => {
  const textRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.12 });
  const imageRef = useGsapReveal<HTMLDivElement>({ y: 40, delay: 0.2 });

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <h2 className="text-display text-display-md text-foreground mb-8">
              הצוות שמלווה אתכם{" "}
              <span className="text-gradient">לדירה הנכונה</span>
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
              אנחנו כאן ללמד אתכם לקנות חכם. קרנף נדל״ן מלווה רוכשי דירות
              ראשונות ומשקיעים בשיטה מבוססת נתונים — צעד אחר צעד, עם כלים, ידע וליווי שמביא תוצאות.
            </p>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
              בראש הצוות עומדים{" "}
              <span className="text-foreground font-semibold">איתמר נחליאל</span> ו
              <span className="text-foreground font-semibold">אלמוג חכמה</span> —
              מומחי נדל"ן עם ניסיון מוכח בליווי מאות עסקאות מוצלחות.
              המשימה שלנו: שתגיעו לעסקה הנכונה, בביטחון מלא.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "8+", label: "שנות ניסיון" },
                { num: "375+", label: "לקוחות מרוצים" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-accent">{stat.num}</div>
                  <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/about">
                <Button variant="outline" className="border-accent/50 text-accent hover:bg-accent/10 font-bold gap-2">
                  קראו עוד על הסיפור שלנו
                  <ArrowLeft size={16} />
                </Button>
              </Link>
            </div>
          </div>

          <div ref={imageRef} className="relative flex justify-center">
            <img
              src={teamPhoto}
              alt="איתמר ואלמוג — מייסדי קרנף"
              className="w-[280px] md:w-[350px] lg:w-[400px] object-contain rounded-2xl shadow-depth-3"
              style={{
                maskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
                WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
