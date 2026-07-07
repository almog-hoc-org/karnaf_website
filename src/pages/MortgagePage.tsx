import {
  Landmark,
  Percent,
  Scale,
  FileSearch,
  Handshake,
  ShieldCheck,
  Check,
  MessageCircle,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import PageHero from "@/layouts/PageHero";
import ContactForm from "@/components/ContactForm";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import SEOHead, {
  organizationSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/components/SEOHead";
import heroCity from "@/assets/hero-city.jpg";

/* CRM classification for this funnel. */
const LEAD_SOURCE = "mortgage";

const WA_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "היי! אני מעוניין/ת בייעוץ משכנתא של קרנף"
)}`;

/* The advisory journey — diagnosis → signature */
const journey = [
  {
    num: "01",
    icon: FileSearch,
    title: "אבחון פיננסי",
    body: "מתחילים בתמונה מלאה: הכנסות, הון עצמי, התחייבויות ותוכניות קדימה. מבינים כמה משכנתא באמת נכון לכם לקחת — לא כמה הבנק מוכן לתת.",
  },
  {
    num: "02",
    icon: Layers,
    title: "בניית תמהיל מותאם",
    body: "מרכיבים תמהיל מסלולים שמותאם לחיים שלכם — קבועה, משתנה, צמודה ולא צמודה — עם חלוקת סיכון מחושבת, לא תבנית גנרית של הבנק.",
  },
  {
    num: "03",
    icon: Scale,
    title: "מכרז בין הבנקים",
    body: "מריצים את הבקשה שלכם מול כמה בנקים במקביל ומשווים הצעות אחת מול אחת. כשהבנקים מתחרים — התנאים שלכם משתפרים.",
  },
  {
    num: "04",
    icon: Handshake,
    title: "משא ומתן על התנאים",
    body: "מנהלים עבורכם את המשא ומתן על הריביות והעמלות, חמושים בהצעות המתחרות ובנתונים — עד שמגיעים לתנאים הטובים שאפשר להשיג.",
  },
  {
    num: "05",
    icon: ShieldCheck,
    title: "ליווי עד הכסף בחשבון",
    body: "מלווים אתכם בכל הבירוקרטיה — אישור עקרוני, שמאות, ביטוחים וחתימות — עד שהמשכנתא נסגרת והדירה שלכם.",
  },
];

const included = [
  "אבחון פיננסי מלא והגדרת תקציב רכישה ריאלי",
  "תמהיל משכנתא מותאם אישית — לא תבנית של בנק",
  "מכרז ריביות בין מספר בנקים במקביל",
  "ניהול המשא ומתן מול הבנקים עבורכם",
  "ליווי מול שמאי, ביטוחים וכל הבירוקרטיה",
  "סנכרון מלא עם תהליך רכישת הדירה — צוות אחד, תמונה אחת",
];

const whyKarnaf = [
  {
    icon: Landmark,
    title: "רואים את כל העסקה, לא רק את ההלוואה",
    body: "יועץ משכנתא רגיל רואה את המשכנתא. אנחנו מלווים גם את הרכישה עצמה — אז התמהיל נבנה סביב העסקה האמיתית שלכם, לא בוואקום.",
  },
  {
    icon: Percent,
    title: "מספרים, לא תחושות",
    body: "כל המלצה מגובה בסימולציה: כמה תשלמו בכל תרחיש ריבית, מה עלות הפירעון המוקדם, ואיפה הסיכון. אתם מחליטים בעיניים פקוחות.",
  },
  {
    icon: Scale,
    title: "האינטרס שלנו = שלכם",
    body: "אנחנו עובדים בשבילכם, לא בשביל בנק. ההצלחה שלנו נמדדת בתנאים שהשגנו לכם — ובזה בלבד.",
  },
];

const faq = [
  {
    question: "למה בכלל צריך ייעוץ משכנתא? הבנק לא עוזר בחינם?",
    answer:
      "הבנקאי עובד בשביל הבנק — המטרה שלו היא למכור לכם את התמהיל שרווחי לבנק. יועץ שעובד בשבילכם משווה בין כמה בנקים, בונה תמהיל שמותאם לחיים שלכם, ומנהל משא ומתן על הריביות. ההבדל בין תמהיל טוב לבינוני יכול להסתכם בעשרות עד מאות אלפי שקלים לאורך חיי המשכנתא.",
  },
  {
    question: "מתי כדאי להתחיל את תהליך המשכנתא?",
    answer:
      "מוקדם משחושבים — עוד לפני שמצאתם דירה. אישור עקרוני מוקדם מגדיר לכם תקציב ריאלי, מחזק אתכם במשא ומתן על הדירה, ומונע לחץ של הרגע האחרון מול הבנקים.",
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
        title="קרנף משכנתא — ייעוץ משכנתא מבוסס נתונים | קרנף נדל״ן"
        description="תמהיל משכנתא מותאם אישית, מכרז ריביות בין בנקים וליווי עד קבלת הכסף. ייעוץ משכנתא שמסונכרן עם תהליך רכישת הדירה שלכם — מספרים, לא תחושות."
        path="/mortgage"
        keywords="ייעוץ משכנתא, יועץ משכנתא, תמהיל משכנתא, מיחזור משכנתא, ריבית משכנתא, משכנתא ראשונה, קרנף משכנתא"
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
        tag="קרנף משכנתא"
        title="המשכנתא הנכונה שווה"
        highlight="מאות אלפי שקלים"
        subtitle="רוב האנשים לוקחים את התמהיל שהבנק מציע. אנחנו בונים לכם תמהיל שמותאם לחיים שלכם, מריצים מכרז בין הבנקים — ומלווים אתכם עד שהכסף בחשבון."
        backgroundImage={heroCity}
      />

      {/* Why it matters */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-6 leading-[0.98] tracking-tight">
              ההחלטה הפיננסית הגדולה בחיים — ורוב האנשים מקבלים אותה בפגישה אחת בבנק
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg text-muted-foreground leading-[1.85] max-w-[70ch]">
              משכנתא ממוצעת נמשכת 20-30 שנה, והפער בין תמהיל מותאם לתמהיל גנרי
              מצטבר לאורכה לסכומים של רכב חדש — ולפעמים של דירה קטנה. ובכל זאת,
              רוב הרוכשים חותמים על ההצעה הראשונה שקיבלו. אנחנו כאן כדי שאתם
              לא תהיו רוב.
            </p>
          </Reveal>
        </div>
      </section>

      {/* The journey */}
      <SectionDark size="lg" glow="top-end">
        <div className="container mx-auto px-6 max-w-6xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-12 lg:mb-16 leading-[0.98] tracking-tight">
              איך זה עובד?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {journey.map((step, i) => (
              <Reveal key={step.num} delay={i * 0.08}>
                <article
                  className="h-full p-6 lg:p-8 rounded-2xl flex flex-col"
                  style={{
                    backgroundColor: "hsl(36 33% 95% / 0.04)",
                    border: "1px solid hsl(36 33% 95% / 0.12)",
                  }}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-display-md font-black text-accent leading-none">
                      {step.num}
                    </span>
                    <step.icon size={22} className="text-accent" aria-hidden />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-snug">
                    {step.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "hsl(36 33% 95% / 0.72)" }}
                  >
                    {step.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </SectionDark>

      {/* What's included */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-10 leading-[0.98] tracking-tight">
              מה כולל הליווי?
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {included.map((item, i) => (
              <Reveal key={item} delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 bg-card rounded-2xl border border-border h-full">
                  <Check size={18} className="text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-foreground leading-relaxed">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why Karnaf */}
      <section className="py-section-lg bg-secondary/40">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 leading-[0.98] tracking-tight">
              למה משכנתא דרך קרנף?
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {whyKarnaf.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <article className="h-full">
                  <span className="inline-flex w-12 h-12 rounded-full bg-accent/10 border border-accent/20 items-center justify-center text-accent mb-5">
                    <d.icon size={22} aria-hidden />
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-3 leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-[1.85]">
                    {d.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-section-lg bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground mb-12 leading-[0.98] tracking-tight text-center">
              שאלות נפוצות
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Accordion type="single" collapsible className="space-y-3">
              {faq.map((item, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="border border-border rounded-xl px-5 bg-card"
                >
                  <AccordionTrigger className="text-base font-bold text-foreground hover:no-underline hover:text-accent text-right">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </section>

      {/* Lead CTA */}
      <SectionDark id="contact" size="lg" glow="bottom">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <Reveal>
                <h2 className="text-display-md md:text-display-lg font-black text-white mb-4 leading-[0.98] tracking-tight">
                  נבדוק יחד כמה אפשר לחסוך לכם
                </h2>
              </Reveal>
              <Reveal delay={0.08}>
                <p
                  className="text-body-lg leading-relaxed mb-8 max-w-[52ch]"
                  style={{ color: "hsl(36 33% 95% / 0.75)" }}
                >
                  שיחת היכרות ראשונה — ללא עלות וללא התחייבות. מספרים על המצב,
                  מקבלים תמונה ישרה של מה אפשרי, ומחליטים אם ממשיכים יחד.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-block">
                  <Button
                    size="lg"
                    className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg px-8 py-6 rounded-full gap-3 transition-all"
                  >
                    <MessageCircle size={20} />
                    דברו איתנו בוואטסאפ
                  </Button>
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.1}>
              <div className="bg-background rounded-3xl p-6 md:p-8 border border-border shadow-depth-3">
                <h3 className="text-xl font-bold text-foreground mb-1">
                  או השאירו פרטים
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  נחזור אליכם תוך יום עסקים.
                </p>
                <ContactForm source={LEAD_SOURCE} serviceOptions={null} fixedService="mortgage" />
              </div>
            </Reveal>
          </div>
        </div>
      </SectionDark>
    </>
  );
};

export default MortgagePage;
