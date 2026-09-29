import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PageHero from "@/layouts/PageHero";
import { team } from "@/data/team";
import { ResearchWaitlistStrip } from "@/components/ResearchWaitlist";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { ExpandOnScroll, ScrollWords, SplitReveal } from "@/components/v2/scroll";
import { Kicker } from "@/components/service/Kicker";
import { StepRail, type RailStep } from "@/components/service/StepRail";
import SEOHead, { organizationSchema, breadcrumbSchema } from "@/components/SEOHead";
import { COURSE_PRICE } from "@/lib/constants";
import {
  ACTIVE_SINCE,
  TOTAL_CLIENTS_STAT,
  TOTAL_CLIENTS_LABEL,
  YEARS_EXPERIENCE_STAT,
  YEARS_EXPERIENCE_LABEL, DEALS_ACCOMPANIED_LABEL } from "@/data/companyStats";
import foundersImg from "@/assets/team/itamar-almog-about.webp";

/* The story, year by year. Only milestones the owners wrote themselves;
   proof numbers come from companyStats (one label per number) — no deal or
   follower counts that the site can't back. */
const timeline: RailStep[] = [
  {
    num: "2016",
    title: "קצינים בקבע",
    body: "איתמר ואלמוג משרתים כקצינים בצה״ל ומתחילים להתעניין בעולם הנדל״ן.",
  },
  {
    num: "2017",
    title: "הפליפ הראשון",
    body: "העסקה הראשונה — רכישה, שיפוץ ומכירה ברווח.",
  },
  {
    num: "2018",
    title: "השקעות בחו״ל",
    body: "התרחבות להשקעות בחו״ל וצבירת ניסיון נוסף בארץ.",
  },
  {
    num: "2021",
    title: "עסקת תמ״א",
    body: "כניסה לעולם ההתחדשות העירונית עם עסקת תמ״א מוצלחת.",
  },
  {
    num: "2022",
    title: "קרקעות ויזמות",
    body: "נכנסים לעולם הקרקעות והיזמות הנדל״נית.",
  },
  {
    num: "2023",
    title: "קרנף נולד",
    body: "קרנף נדל״ן מוקם רשמית — הלקוחות הראשונים מצטרפים.",
  },
  {
    num: "2024",
    title: "יוצאים לרשתות",
    body: "מתחילים לשתף בחינם את מה שלמדנו — ברשתות, ביוטיוב ובפודקאסט.",
  },
  {
    num: "2025",
    title: `${DEALS_ACCOMPANIED_LABEL}, מאות תלמידים`,
    body: `${DEALS_ACCOMPANIED_LABEL} שליווינו, וההכשרות הדיגיטליות מגיעות למאות תלמידים.`,
  },
  {
    num: "2026",
    title: "היום",
    body: `${TOTAL_CLIENTS_STAT} ${TOTAL_CLIENTS_LABEL}, ושני מסלולים: קורס דיגיטלי למי שרוצה ללמוד לבד, וליווי אישי 1:1 למי שרוצה מישהו לצדו.`,
  },
];

/* How we work — positions, not proof numbers. */
const principles = [
  {
    num: "01",
    title: "מספרים, לא תחושות",
    body: "כל המלצה נשענת על עסקאות שנסגרו בפועל ועל חישוב — לא על ״נראה לי״ ולא על מודעה יפה.",
  },
  {
    num: "02",
    title: "בונים, לא גורואים",
    body: "אנחנו עושים עסקאות בעצמנו: פליפים, התחדשות עירונית, קרקעות ויזמות. מה שאנחנו מלמדים, למדנו קודם בשטח.",
  },
  {
    num: "03",
    title: "אומרים גם ״לא״",
    body: "לפעמים התשובה הנכונה היא לא לקנות — לא עכשיו, או לא את הדירה הזאת. נגיד את זה גם כשזה פחות נוח.",
  },
];

const priceLabel = `₪${COURSE_PRICE.toLocaleString("en-US")}`;

const AboutPage = () => {
  return (
    <>
      <SEOHead
        title="סיפורו של הקרנף — איתמר ואלמוג, מייסדי קרנף נדל״ן | אודות"
        description={`הכירו את איתמר נחליאל ואלמוג חכמה: שני קצינים שהתחילו בעסקת פליפ ב-${ACTIVE_SINCE} והקימו את קרנף נדל״ן — ${YEARS_EXPERIENCE_STAT} ${YEARS_EXPERIENCE_LABEL}, ${TOTAL_CLIENTS_STAT} ${TOTAL_CLIENTS_LABEL}.`}
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
        splitTitle
        titleSize="lg"
        tag="אודות · איתמר נחליאל ואלמוג חכמה"
        title="למדנו את השוק עסקה אחרי עסקה."
        accentWords={["עסקה", "אחרי", "עסקה."]}
        subtitle={`שני קצינים בקבע ועסקה ראשונה ב-${ACTIVE_SINCE}: רכישה, שיפוץ ומכירה. מאז — השקעות בארץ ובחו״ל, התחדשות עירונית, קרקעות ויזמות. את קרנף נדל״ן הקמנו כדי שתקבלו את מה שלמדנו, בלי לשלם עליו שכר לימוד.`}
        footnote={
          <span className="tabular-nums">
            מאז {ACTIVE_SINCE} · {TOTAL_CLIENTS_STAT} {TOTAL_CLIENTS_LABEL} · {YEARS_EXPERIENCE_STAT}{" "}
            {YEARS_EXPERIENCE_LABEL}
          </span>
        }
        aside={
          <figure className="rise-in max-w-sm mx-auto lg:max-w-none" style={{ "--d": "0.3s" } as React.CSSProperties}>
            <div className="relative aspect-[4/5] rounded-3xl bg-card border border-border overflow-hidden shadow-depth-3">
              <img
                src={foundersImg}
                alt="איתמר נחליאל ואלמוג חכמה, מייסדי קרנף נדל״ן"
                className="absolute inset-0 w-full h-full object-cover scale-[1.18] origin-[50%_62%]"
                loading="eager"
                decoding="async"
              />
            </div>
            <figcaption className="mt-3 text-sm text-muted-foreground text-center">
              מימין: איתמר נחליאל · משמאל: אלמוג חכמה
            </figcaption>
          </figure>
        }
      />

      {/* Why a rhino — one statement, lit as you read it */}
      <section className="py-section-lg bg-card border-y border-border">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <Reveal>
            <Kicker className="mb-8">למה קרנף</Kicker>
          </Reveal>
          <ScrollWords
            as="h2"
            text="קרנף נראה מאיים מבחוץ, אבל הוא מגן על העדר שלו. ככה אנחנו עובדים: קשוחים מול העסקה — ובצד שלכם של השולחן."
            highlight={["קשוחים", "ובצד", "שלכם"]}
            className="text-display-md md:text-display-lg text-foreground leading-[1.15]"
          />
          <Reveal delay={0.06}>
            <p className="text-body-lg text-muted-foreground leading-[1.9] max-w-[60ch] mt-10">
              התחלנו מתוך תסכול. ראינו חברים ובני משפחה קונים דירות בלי ידע, משלמים
              יותר מדי ומפספסים הזדמנויות — והחלטנו שזה חייב להשתנות.
            </p>
          </Reveal>
        </div>
      </section>

      {/* How we work */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <Reveal>
            <Kicker className="mb-10">איך אנחנו עובדים</Kicker>
          </Reveal>
          <ol className="grid md:grid-cols-3 gap-x-10 lg:gap-x-14">
            {principles.map((p, i) => (
              <li key={p.num}>
                <Reveal delay={i * 0.08} className="h-full border-t border-primary/15 pt-6 pb-10 md:pb-0">
                  <span className="block font-mono text-sm font-bold text-[hsl(var(--accent-deep))] tabular-nums mb-3">
                    {p.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug tracking-[-0.015em]">
                    {p.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.85]">{p.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The story — a rail that fills as you read it */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <div className="mb-12 lg:mb-16">
            <Reveal>
              <Kicker className="mb-5">הסיפור</Kicker>
            </Reveal>
            <SplitReveal
              text="מפליפ ראשון לשני מסלולים."
              highlight={["מסלולים."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>
          <StepRail steps={timeline} />
        </div>
      </section>

      {/* Team */}
      <section className="py-section-lg bg-secondary/50 border-y border-border/60">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="mb-12 lg:mb-14">
            <Reveal>
              <Kicker className="mb-5">מי אנחנו</Kicker>
            </Reveal>
            <SplitReveal
              text="שני שותפים, שיטה אחת."
              highlight={["שיטה", "אחת."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1} as="article" className="h-full">
                <div className="h-full bg-card border border-border rounded-3xl overflow-hidden shadow-depth-1 flex flex-col">
                  <div className="relative aspect-[5/4] overflow-hidden bg-card">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="absolute inset-0 w-full h-full object-cover object-top scale-[1.35] origin-[50%_22%]"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-bold text-6xl">{member.name.charAt(0)}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 md:p-8 border-t border-border flex-1">
                    <h3 className="text-foreground font-bold text-2xl tracking-[-0.015em]">{member.name}</h3>
                    <p className="text-sm font-bold text-[hsl(var(--accent-deep))] mt-1 mb-4">{member.role}</p>
                    <p className="text-muted-foreground leading-[1.85]">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* What comes next — the research subscription waitlist */}
          <div className="mt-12">
            <ResearchWaitlistStrip />
          </div>
        </div>
      </section>

      {/* The next step — the self-serve course first, the 1:1 track as the quiet alternative */}
      <div className="bg-background pt-section-sm">
        <ExpandOnScroll inset={3} radius={32}>
          <SectionDark size="md" glow="bottom">
            <div className="container mx-auto px-5 md:px-6 max-w-3xl text-center">
              <Reveal>
                <Kicker dark align="center" className="mb-6">
                  הצעד הבא
                </Kicker>
              </Reveal>
              <SplitReveal
                text="השיטה שלנו. בקצב שלכם."
                highlight={["בקצב", "שלכם."]}
                className="text-display-md md:text-display-xl text-white mb-6"
              />
              <Reveal delay={0.08}>
                <p
                  className="text-body-lg max-w-xl mx-auto mb-10 leading-relaxed"
                  style={{ color: "hsl(36 33% 95% / 0.75)" }}
                >
                  המדריך המעשי לרכישת דירה: מהשאלה הראשונה ועד המפתח, בסדר שבו באמת
                  קונים דירה. קורס דיגיטלי שלומדים לבד, עם גישה מיידית.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                  <Link to="/course" className="inline-block w-full sm:w-auto">
                    <Button
                      size="lg"
                      className="group w-full sm:w-auto inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-10 py-6 rounded-full transition-colors shadow-glow-accent"
                    >
                      להכיר את הקורס — <span dir="ltr" className="tabular-nums">{priceLabel}</span>
                      <ArrowLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                    </Button>
                  </Link>
                  <Link
                    to="/premium"
                    className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
                  >
                    <span>
                      מעדיפים ליווי אישי <bdi>1:1</bdi>?
                    </span>
                    <ArrowLeft size={16} aria-hidden />
                  </Link>
                </div>
              </Reveal>
            </div>
          </SectionDark>
        </ExpandOnScroll>
      </div>
    </>
  );
};

export default AboutPage;
