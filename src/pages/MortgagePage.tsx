import { ArrowLeft, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import ContactForm from "@/components/ContactForm";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { ExpandOnScroll, ScrollWords, SplitReveal } from "@/components/v2/scroll";
import { Kicker } from "@/components/service/Kicker";
import { StepRail, type RailStep } from "@/components/service/StepRail";
import RateGapCalculator from "@/components/mortgage/RateGapCalculator";
import { chatLink } from "@/lib/whatsapp";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema } from "@/components/SEOHead";

/* CRM classification for this funnel. */
const LEAD_SOURCE = "mortgage";

const WA_LINK = chatLink("mortgage");

/* What the first (free) call actually gives you — shown beside the hero. */
const firstCall = [
  "כמה משכנתא נכון לכם לקחת — לא כמה הבנק מוכן לתת",
  "איזה תמהיל מתאים להכנסה, להון העצמי ולתוכניות שלכם",
  "אם כבר יש הצעה מהבנק — האם היא הוגנת, ומה אפשר לשפר",
];

/* 2026, qualitatively: rates started coming down, developer financing
   deals push the mortgage to delivery day, refinancing is worth a look. */
const shifts = [
  {
    num: "01",
    title: "הריבית התחילה לרדת",
    body: "בנק ישראל התחיל להוריד את הריבית ב-2026. זה משנה את החשבון בין פריים, קבועה ומשתנה — ותמהיל שנבנה לפני שנה לא בהכרח נכון היום.",
  },
  {
    num: "02",
    title: "קניתם במבצע 20/80?",
    body: "רוב הכסף משולם במסירה — ואז צריך משכנתא. מתכננים אותה מעכשיו, לא חודש לפני המפתח, כשאין זמן להשוות.",
  },
  {
    num: "03",
    title: "כבר יש לכם משכנתא",
    body: "כשהריבית זזה, שווה לבדוק אם המשכנתא הקיימת עדיין משתלמת ומה עולה לעבור. ואם מיחזור לא משתלם — נגיד לכם את זה.",
  },
];

/* The advisory journey — diagnosis → money in the account. */
const journey: RailStep[] = [
  {
    num: "01",
    title: "אבחון פיננסי",
    body: "מתחילים בתמונה מלאה: הכנסות, הון עצמי, התחייבויות ותוכניות קדימה. מבינים כמה משכנתא באמת נכון לכם לקחת — לא כמה הבנק מוכן לתת.",
    outcome: "תקציב רכישה ריאלי",
  },
  {
    num: "02",
    title: "בניית תמהיל מותאם",
    body: "מרכיבים תמהיל מסלולים שמותאם לחיים שלכם — קבועה, משתנה, צמודה ולא צמודה — עם חלוקת סיכון מחושבת, לא תבנית גנרית של הבנק.",
    outcome: "סימולציה: כמה תשלמו בכל תרחיש ריבית",
  },
  {
    num: "03",
    title: "מכרז בין הבנקים",
    body: "מריצים את הבקשה שלכם מול כמה בנקים במקביל ומשווים הצעות אחת מול אחת. כשהבנקים מתחרים, התנאים משתפרים.",
    outcome: "הצעות מתחרות על השולחן",
  },
  {
    num: "04",
    title: "משא ומתן על התנאים",
    body: "מנהלים בשבילכם את המשא ומתן על הריביות והעמלות, עם ההצעות המתחרות והנתונים ביד.",
    outcome: "התנאים הטובים שאפשר להשיג — לא ההצעה הראשונה",
  },
  {
    num: "05",
    title: "ליווי עד הכסף בחשבון",
    body: "מלווים אתכם בכל הבירוקרטיה — אישור עקרוני, שמאות, ביטוחים וחתימות — עד שהמשכנתא נסגרת.",
    outcome: "צוות אחד שמסונכרן גם עם תהליך הרכישה",
  },
];

const faq = [
  {
    question: "למה בכלל צריך ייעוץ משכנתא? הבנק לא עוזר בחינם?",
    answer:
      "הבנקאי עובד בשביל הבנק — המטרה שלו היא למכור לכם את התמהיל שרווחי לבנק. יועץ שעובד בשבילכם משווה בין כמה בנקים, בונה תמהיל שמותאם לחיים שלכם, ומנהל משא ומתן על הריביות. ההבדל בין תמהיל טוב לבינוני יכול להסתכם בעשרות עד מאות אלפי שקלים לאורך חיי המשכנתא.",
  },
  {
    question: "הריבית יורדת — כדאי לחכות עם המשכנתא?",
    answer:
      "אף אחד לא יודע בוודאות לאן הריבית תלך. מה שכן אפשר לעשות: לבנות תמהיל שלא מהמר על כיוון אחד, ולהשאיר גמישות — מסלולים שמאפשרים פירעון או מיחזור בהמשך בעלות סבירה. את החלוקה בונים לפי המספרים שלכם, לא לפי כותרות.",
  },
  {
    question: "מתי כדאי להתחיל את תהליך המשכנתא?",
    answer:
      "מוקדם משחושבים — עוד לפני שמצאתם דירה. אישור עקרוני מוקדם מגדיר לכם תקציב ריאלי, מחזק אתכם במשא ומתן על הדירה, ומונע לחץ של הרגע האחרון מול הבנקים.",
  },
  {
    question: "קנינו דירה במבצע 20/80 — מתי מתחילים עם המשכנתא?",
    answer:
      "עכשיו — גם אם רוב התשלום רק במסירה. צריך לדעת מראש כמה הבנק יאשר, איך ייראה ההחזר, ומה קורה אם הריבית או ההכנסה ישתנו עד אז. מי שמגיע למסירה בלי תוכנית מימון, מנהל משא ומתן עם הבנק בלחץ.",
  },
  {
    question: "אני כבר בתהליך רכישה עם קרנף — זה מתחבר?",
    answer:
      "כן, וזה בדיוק היתרון. אותו צוות שמנתח איתכם את העסקה בונה גם את המימון שלה — התקציב, לוחות הזמנים והתמהיל מסונכרנים מהיום הראשון, בלי ליפול בין הכיסאות בין יועצים שונים.",
  },
  {
    question: "יש לי כבר משכנתא — אפשר לשפר אותה?",
    answer:
      "לעיתים קרובות כן. בדיקת מיחזור משכנתא בוחנת אם התנאים שקיבלתם בעבר עדיין משתלמים היום, ומה עלות המעבר. נבדוק יחד את המספרים — ואם המיחזור לא משתלם, נגיד לכם את זה ישר.",
  },
  {
    question: "כמה עולה הליווי?",
    answer:
      "שיחת ההיכרות הראשונה היא ללא עלות וללא התחייבות — בה נבין את הצרכים שלכם ונציג הצעה מסודרת ושקופה לפני שמתחילים. בלי הפתעות בהמשך.",
  },
];

/* Service schema for the mortgage advisory offering. */
const mortgageServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Mortgage advisory",
  name: "קרנף משכנתא — ייעוץ משכנתא",
  provider: { "@id": "https://www.karnafnadlan.com/#organization" },
  areaServed: { "@type": "Country", name: "Israel" },
  description:
    "ייעוץ משכנתא מבוסס נתונים: אבחון פיננסי, בניית תמהיל מותאם, מכרז ריביות בין בנקים וליווי עד קבלת הכסף.",
};

const MortgagePage = () => {
  return (
    <>
      <SEOHead
        title="קרנף משכנתא — ייעוץ משכנתא ומכרז בין בנקים | קרנף נדל״ן"
        description="אל תחתמו על ההצעה הראשונה של הבנק: תמהיל משכנתא מותאם אישית, מכרז ריביות בין בנקים, בדיקת מיחזור וליווי עד קבלת הכסף — מסונכרן עם תהליך רכישת הדירה. שיחת היכרות ללא עלות."
        path="/mortgage"
        keywords="ייעוץ משכנתא, יועץ משכנתא, תמהיל משכנתא, מיחזור משכנתא, ריבית משכנתא, משכנתא ראשונה, משכנתא 20/80, קרנף משכנתא"
        jsonLd={[
          organizationSchema,
          mortgageServiceSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "קרנף משכנתא", url: "/mortgage" },
          ]),
          faqPageSchema(faq),
        ]}
      />

      <PageHero
        containerClassName="max-w-6xl"
        tone="ink"
        splitTitle
        tag="קרנף משכנתא · ייעוץ משכנתא"
        title="אל תחתמו על ההצעה הראשונה של הבנק."
        accentWords={["הראשונה"]}
        subtitle="תמהיל שנבנה סביב החיים שלכם, הצעות מכמה בנקים על השולחן, ומשא ומתן על הריבית — עד שהכסף עובר. אנחנו עובדים בשבילכם, לא בשביל הבנק."
        actions={
          <>
            <a href="#contact" className="inline-block w-full sm:w-auto">
              <Button
                size="lg"
                className="group inline-flex items-center gap-3 bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 md:px-10 py-5 md:py-6 rounded-full transition-colors w-full sm:w-auto shadow-glow-accent"
              >
                לבדיקת המשכנתא שלי
                <ArrowLeft size={18} aria-hidden className="transition-transform group-hover:-translate-x-1" />
              </Button>
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center sm:justify-start gap-2 text-white/85 hover:text-white font-semibold underline-offset-4 hover:underline min-h-[44px]"
            >
              <MessageCircle size={18} aria-hidden className="text-[hsl(var(--whatsapp))]" />
              או בוואטסאפ, עכשיו
            </a>
          </>
        }
        footnote="שיחת היכרות ראשונה ללא עלות וללא התחייבות"
        aside={
          <div className="hidden lg:block rounded-3xl border border-white/12 bg-white/[0.04] p-7">
            <p className="text-eyebrow uppercase tracking-[0.24em] text-white/60 mb-5">
              מה יוצא לכם מהשיחה הראשונה
            </p>
            <ul className="space-y-4">
              {firstCall.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                  <span className="inline-flex w-6 h-6 rounded-full bg-accent text-accent-foreground items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        }
      />

      {/* Show, don't tell — the gap between two offers, in shekels */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 lg:gap-16 items-center">
            <div>
              <Reveal>
                <Kicker className="mb-5">כמה שווה חצי אחוז</Kicker>
              </Reveal>
              <SplitReveal
                text="חצי אחוז נשמע קטן. על 25 שנה הוא לא."
                highlight={["הוא", "לא."]}
                className="text-display-md md:text-display-lg text-foreground leading-[1.02] mb-6"
              />
              <Reveal delay={0.08}>
                <p className="text-body-lg text-muted-foreground leading-[1.85] max-w-[54ch] mb-5">
                  משכנתא נמשכת עשרים ושלושים שנה, ורוב הרוכשים חותמים על ההצעה הראשונה
                  שקיבלו. שחקו עם המספרים: אותה הלוואה, שתי ריביות — וההפרש הוא בדיוק
                  הכסף שמכרז בין בנקים ותמהיל נכון נלחמים עליו.
                </p>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="text-foreground font-semibold leading-relaxed max-w-[54ch]">
                  אנחנו לא מבטיחים ריבית מסוימת. אנחנו דואגים שהבנקים יתחרו עליכם —
                  ושתדעו בדיוק על מה אתם חותמים.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.06}>
              <RateGapCalculator />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 2026 — why the mix needs a second look this year */}
      <section className="py-section-md bg-secondary/50 border-y border-border/60">
        <div className="container mx-auto px-5 md:px-6 max-w-6xl">
          <div className="max-w-3xl mb-10 lg:mb-14">
            <Reveal>
              <Kicker className="mb-5">משכנתא ב-2026</Kicker>
            </Reveal>
            <SplitReveal
              text="הריבית זזה. התמהיל צריך לזוז איתה."
              highlight={["לזוז", "איתה."]}
              className="text-display-md md:text-display-lg text-foreground leading-[1.02]"
            />
          </div>
          <ol className="grid md:grid-cols-3 gap-x-10 lg:gap-x-14">
            {shifts.map((s, i) => (
              <li key={s.num}>
                <Reveal
                  delay={i * 0.08}
                  className="h-full border-t border-primary/15 pt-6 pb-8 md:pb-0"
                >
                  <span className="block font-mono text-sm font-bold text-[hsl(var(--accent-deep))] tabular-nums mb-3">
                    {s.num}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2 leading-snug tracking-[-0.015em]">
                    {s.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.85]">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* The journey — a rail that fills as you read it */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-5 md:px-6 max-w-5xl">
          <div className="max-w-3xl mb-12 lg:mb-16">
            <Reveal>
              <Kicker dark className="mb-5">
                איך זה עובד
              </Kicker>
            </Reveal>
            <SplitReveal
              text="מהאבחון ועד הכסף בחשבון."
              highlight={["בחשבון."]}
              className="text-display-md md:text-display-lg text-white leading-[1.02]"
            />
          </div>
          <StepRail steps={journey} dark />
        </div>
      </SectionDark>

      {/* Why us — one statement, lit as you read it */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-5 md:px-6 max-w-4xl">
          <Reveal>
            <Kicker className="mb-8">למה משכנתא דרך קרנף</Kicker>
          </Reveal>
          <ScrollWords
            as="h2"
            text="יועץ משכנתא רגיל רואה את ההלוואה. אנחנו רואים את כל העסקה — ובונים את המימון סביבה."
            highlight={["כל", "העסקה"]}
            className="text-display-md md:text-display-lg text-foreground leading-[1.15]"
          />
          <div className="grid sm:grid-cols-2 gap-8 mt-12 pt-10 border-t border-primary/15">
            <Reveal>
              <h3 className="font-bold text-foreground text-lg mb-2">מספרים, לא תחושות</h3>
              <p className="text-muted-foreground leading-[1.85]">
                כל המלצה מגובה בסימולציה: כמה תשלמו בכל תרחיש ריבית, מה עלות הפירעון
                המוקדם, ואיפה הסיכון.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="font-bold text-foreground text-lg mb-2">האינטרס שלנו = שלכם</h3>
              <p className="text-muted-foreground leading-[1.85]">
                אנחנו עובדים בשבילכם, לא בשביל בנק. ההצלחה שלנו נמדדת בתנאים שהשגנו
                לכם — ובזה בלבד.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-lg bg-card border-y border-border">
        <div className="container mx-auto px-5 md:px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg text-foreground mb-10 md:mb-12 text-center">
              שאלות נפוצות
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={item.question}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-background"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline hover:text-primary text-right min-h-[44px]">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-[1.85]">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Lead CTA — the dark panel opens to full width as it rises */}
      <div className="bg-background">
        <ExpandOnScroll inset={3} radius={32}>
          <SectionDark id="contact" size="lg" glow="bottom">
            <div className="container mx-auto px-5 md:px-6 max-w-5xl">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                <div>
                  <Reveal>
                    <Kicker dark className="mb-5">
                      שיחת היכרות
                    </Kicker>
                  </Reveal>
                  <SplitReveal
                    text="נבדוק יחד כמה אפשר לחסוך לכם."
                    highlight={["לחסוך"]}
                    className="text-display-md md:text-display-lg text-white leading-[1.02] mb-5"
                  />
                  <Reveal delay={0.08}>
                    <p
                      className="text-body-lg leading-[1.85] mb-8 max-w-[52ch]"
                      style={{ color: "hsl(36 33% 95% / 0.78)" }}
                    >
                      שיחה ראשונה — ללא עלות וללא התחייבות. מספרים על המצב, מקבלים תמונה
                      ישרה של מה אפשרי, ומחליטים אם ממשיכים יחד. יש כבר הצעה מהבנק? הביאו
                      אותה.
                    </p>
                  </Reveal>
                  <Reveal delay={0.14}>
                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-white font-semibold hover:text-accent transition-colors group min-h-[44px]"
                    >
                      <span className="inline-flex w-11 h-11 rounded-full bg-[hsl(var(--whatsapp-deep))] items-center justify-center text-white shrink-0">
                        <MessageCircle size={20} aria-hidden />
                      </span>
                      מעדיפים וואטסאפ? כתבו לנו עכשיו
                      <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
                    </a>
                  </Reveal>
                </div>
                <Reveal delay={0.1}>
                  <div className="bg-background rounded-3xl p-6 md:p-8 border border-border shadow-depth-3">
                    <h3 className="text-xl font-bold text-foreground mb-1">השאירו פרטים</h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      נחזור אליכם תוך יום עסקים, בשעות הפעילות.
                    </p>
                    <ContactForm
                      source={LEAD_SOURCE}
                      serviceOptions={null}
                      fixedService="mortgage"
                      submitLabel="לבדיקת המשכנתא שלי"
                    />
                  </div>
                </Reveal>
              </div>
            </div>
          </SectionDark>
        </ExpandOnScroll>
      </div>
    </>
  );
};

export default MortgagePage;
