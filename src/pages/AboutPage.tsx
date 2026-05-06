import PageHero from "@/layouts/PageHero";
import { team } from "@/data/team";
import StatsCounter from "@/components/StatsCounter";
import BigCTA from "@/components/BigCTA";
import { Reveal } from "@/components/v2/Reveal";
import SEOHead, { organizationSchema, breadcrumbSchema } from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";

const timeline = [
  { year: "2016", title: "קצינים בקבע", description: "איתמר ואלמוג משרתים כקצינים בצה\"ל ומתחילים להתעניין בעולם הנדל\"ן." },
  { year: "2017", title: "הפליפ הראשון", description: "העסקה הראשונה — רכישה, שיפוץ ומכירה ברווח." },
  { year: "2018", title: "השקעות בחו\"ל", description: "התרחבות להשקעות בחו\"ל וצבירת ניסיון נוסף בארץ." },
  { year: "2021", title: "עסקת תמ\"א", description: "כניסה לעולם ההתחדשות העירונית עם עסקת תמ\"א מוצלחת." },
  { year: "2022", title: "קרקעות ויזמות", description: "נכנסים לעולם הקרקעות והיזמות הנדל\"נית." },
  { year: "2023", title: "קרנף נולד", description: "קרנף נדל\"ן מוקם רשמית — הלקוחות הראשונים מצטרפים." },
  { year: "2024", title: "מתפוצצים ברשתות", description: "צמיחה מסיבית ברשתות החברתיות — עשרות אלפי עוקבים חדשים." },
  { year: "2025", title: "50 עסקאות, 300 תלמידים", description: "50 עסקאות מוצלחות ו-300 תלמידים בהכשרות הדיגיטליות." },
  { year: "2026", title: "הקהילה גדלה", description: "עשרות אלפי עוקבים ברשתות, מעל ל-350 לקוחות ותלמידים." },
];

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="סיפורו של הקרנף — איתמר ואלמוג, מייסדי קרנף נדל״ן | אודות"
        description="הכירו את הצוות שמאחורי קרנף נדל״ן: 8+ שנות מחקר, 375+ עסקאות מלוות, סיפור על שני קצינים שהפכו טעות-יקרה לשיטה לרכישת דירה."
        path="/about"
        keywords="קרנף נדל״ן, איתמר נחליאל, אלמוג חכמה, מייסדים, סיפור, ליווי נדל״ן בישראל"
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "אודות", url: "/about" },
          ]),
        ]}
      />

      <PageHero
        tag="אודות"
        title="סיפורו של"
        highlight="הקרנף"
        subtitle="2 קצינים צעירים בקבע מחליטים להפוך את התשוקה שלהם לניתוח, נתונים ומספרים ולהקים חברה שעוזרת לאנשים לרכוש דירה בישראל בביטחון מלא."
        backgroundImage={heroCity}
      />

      {/* Why Karnaf */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <Reveal>
                <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-6 leading-[0.98] tracking-tight">
                  למה <span className="text-accent">קרנף?</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="space-y-4 text-body-lg text-muted-foreground leading-[1.85]">
                  <p>
                    הקרנף הוא חיה שנראית מאיימת מבחוץ, אבל בפנים — מגנה על העדר שלה בכל מחיר.
                    בדיוק ככה אנחנו עובדים: דואגים לאינטרסים שלכם, מגינים עליכם, ודואגים שתגיעו לעסקה הטובה ביותר.
                  </p>
                  <p>
                    התחלנו מתוך תסכול. ראינו חברים ובני משפחה קונים דירות בלי ידע, משלמים יותר מדי, ומפספסים הזדמנויות.
                    החלטנו שזה חייב להשתנות.
                  </p>
                  <p>
                    היום, אחרי מעל 350 לקוחות ותלמידים, אנחנו ממשיכים באותה משימה: לתת לכל ישראלי את הכלים והידע לקנות דירה בצורה חכמה.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border shadow-depth-2">
                <div className="flex flex-col items-center justify-center py-20 bg-card">
                  <p className="text-lg font-bold text-foreground mb-2">הסרטון בדרך</p>
                  <p className="text-sm text-muted-foreground">בקרוב כאן</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StatsCounter />

      {/* Timeline */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 lg:mb-16 leading-[0.98] tracking-tight text-center">
              ציר <span className="text-accent">הזמן</span>
            </h2>
          </Reveal>

          <div className="relative max-w-2xl mx-auto">
            <div className="absolute right-[19px] top-2 bottom-2 w-px bg-primary/15" />
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.04} y={20}>
                <div className="flex gap-6 mb-8 last:mb-0">
                  <div className="relative flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-card border border-primary flex items-center justify-center text-primary font-bold text-xs tabular-nums">
                      {item.year.slice(2)}
                    </div>
                  </div>
                  <div className="pb-2 pt-1">
                    <p className="text-eyebrow uppercase tracking-[0.18em] text-accent mb-1 tabular-nums">
                      {item.year}
                    </p>
                    <h4 className="text-foreground font-bold text-lg mb-1">{item.title}</h4>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 lg:mb-16 leading-[0.98] tracking-tight text-center">
              הצוות <span className="text-accent">שלנו</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <article className="bg-card border border-border rounded-2xl overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-depth-3">
                  <div className="relative h-64 overflow-hidden">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-6xl">{member.name.charAt(0)}</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  </div>

                  <div className="p-6 -mt-8 relative">
                    <h4 className="text-foreground font-bold text-xl">{member.name}</h4>
                    <p className="text-accent text-sm font-bold mb-3">{member.role}</p>
                    <p className="text-muted-foreground leading-relaxed">{member.bio}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BigCTA />
    </>
  );
};

export default AboutPage;
