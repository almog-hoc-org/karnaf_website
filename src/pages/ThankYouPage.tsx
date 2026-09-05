import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { CheckCircle, MessageCircle, ArrowLeft, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";
import { botLink, premiumLink } from "@/lib/whatsapp";
import { WEBINAR_URL } from "@/lib/constants";

type Variant = "premium" | "webinar" | "mortgage" | "contact";

interface Copy {
  title: string;
  body: string;
  steps: string[];
  whatsapp: string;
  whatsappLabel: string;
}

const COPY: Record<Variant, Copy> = {
  premium: {
    title: "קיבלנו — תודה!",
    body: "אנליסט מהצוות יחזור אליכם לתיאום שיחת היכרות קצרה, בלי התחייבות. כדי שהשיחה תהיה שווה את הזמן שלכם, כדאי שיהיו ביד:",
    steps: [
      "ההון העצמי הזמין להשקעה, בערך",
      "אזור או סוג נכס שאתם שוקלים (גם אם עוד לא בטוחים)",
      "טווח הזמן שבו הייתם רוצים לסגור עסקה",
    ],
    whatsapp: premiumLink(),
    whatsappLabel: "מעדיפים לדבר עכשיו? וואטסאפ",
  },
  webinar: {
    title: "שריינו לכם מקום.",
    body: "פרטי הוובינר וההזמנה יגיעו אליכם בהודעה. בינתיים, אם רוצים לראות מה יש בתוכנית המלאה — הסילבוס וסרטון ההסבר פתוחים לצפייה.",
    steps: [
      "שעה אחת: השיטה, הטעויות שחייבים להכיר, ומה בודקים לפני שחותמים",
      "בלי לחץ מכירתי — באים ללמוד",
      "שאלות? עונים בוואטסאפ",
    ],
    whatsapp: botLink("וובינר — שאלה"),
    whatsappLabel: "שאלה על הוובינר? וואטסאפ",
  },
  mortgage: {
    title: "קיבלנו! נחזור אליכם בהקדם.",
    body: "נבדוק יחד את התמונה הפיננסית ונבנה תמהיל שמתאים לחיים שלכם — לא לבנק.",
    steps: [
      "הכינו את דוחות ההכנסה האחרונים (תלושים / שומות)",
      "אם יש הצעה מהבנק — נשמח לראות אותה",
      "ניצור קשר בשעות הפעילות, א׳–ה׳ 09:00–20:00",
    ],
    whatsapp: botLink("קרנף משכנתא — שאלה"),
    whatsappLabel: "מעדיפים וואטסאפ?",
  },
  contact: {
    title: "תודה! ניצור קשר בהקדם.",
    body: "ברוב המקרים נחזור אליכם תוך מספר שעות, ובכל מקרה עד 24 שעות. בינתיים אפשר להתחיל להכיר את השיטה:",
    steps: [
      "הסילבוס המלא וסרטון ההסבר של התוכנית פתוחים לצפייה",
      "מאמרים ומדריכים חינמיים בבלוג",
      "שאלה דחופה? וואטסאפ",
    ],
    whatsapp: botLink("יצירת קשר — שאלה"),
    whatsappLabel: "מעדיפים וואטסאפ?",
  },
};

function variantFrom(search: string): Variant {
  const params = new URLSearchParams(search);
  const src = params.get("src") ?? "";
  const service = params.get("service") ?? "";
  if (service === "webinar") return "webinar";
  if (src === "premium-investors" || service === "premium") return "premium";
  if (src === "mortgage" || service === "mortgage") return "mortgage";
  return "contact";
}

/**
 * One dedicated post-submit URL for every lead form. Gives the ad
 * platforms a page_view they can count as a conversion, gives the visitor
 * a next step instead of a form that resets itself, and keeps the
 * submitted details on screen for a moment of relief.
 *
 * The variant is read after hydration (SSG renders the generic copy) so the
 * prerendered HTML and the first client render never disagree.
 */
const ThankYouPage = () => {
  const { search } = useLocation();
  const [variant, setVariant] = useState<Variant>("contact");

  useEffect(() => {
    setVariant(variantFrom(search));
  }, [search]);

  const copy = COPY[variant];

  return (
    <>
      <Head>
        <title>תודה — קרנף נדל״ן</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <SectionDark size="lg" glow="center">
        <div className="container mx-auto px-5 md:px-6 max-w-2xl text-center pt-16">
          <Reveal>
            <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
            <h1 className="text-display-md md:text-display-lg text-white mb-5">{copy.title}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-body-lg leading-relaxed mb-8" style={{ color: "hsl(36 33% 95% / 0.78)" }}>
              {copy.body}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <ul className="text-right max-w-md mx-auto space-y-3 mb-10">
              {copy.steps.map((step, i) => (
                <li key={step} className="flex items-start gap-3 text-white/85">
                  <span className="w-6 h-6 rounded-full bg-accent/15 text-accent text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {variant === "webinar" ? (
                <a href={WEBINAR_URL} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-8 py-6 gap-2">
                    <CalendarClock size={18} />
                    לדף הוובינר
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </Button>
                </a>
              ) : (
                <Link to="/course" className="inline-block w-full sm:w-auto">
                  <Button size="lg" className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-8 py-6 gap-2">
                    לסילבוס המלא של התוכנית
                    <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                  </Button>
                </Link>
              )}
              <a
                href={copy.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white/80 hover:text-white font-semibold py-3 px-2 min-h-[44px]"
              >
                <MessageCircle size={18} className="text-[hsl(var(--whatsapp))]" />
                {copy.whatsappLabel}
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.26}>
            <p className="mt-10 text-sm" style={{ color: "hsl(36 33% 95% / 0.5)" }}>
              <Link to="/" className="underline-offset-4 hover:underline">חזרה לדף הבית</Link>
            </p>
          </Reveal>
        </div>
      </SectionDark>
    </>
  );
};

export default ThankYouPage;
