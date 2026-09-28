import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ArrowLeft, CalendarClock, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionDark } from "@/components/v2/Section";
import { chatLink, premiumLink } from "@/lib/whatsapp";
import { WEBINAR_URL } from "@/lib/constants";

type Variant = "premium" | "webinar" | "mortgage" | "contact";

interface Action {
  label: string;
  /** Internal route or external URL. */
  href: string;
  kind: "whatsapp" | "link" | "webinar";
}

interface Copy {
  title: string;
  body: string;
  /** What happens next — the first stage is always done. */
  stages: [string, string, string];
  prepTitle: string;
  prep: string[];
  primary: Action;
  secondary: Action;
}

/* One next step per variant. The 1:1 funnel never points at the ₪950
   course — not even here, after the lead is in. */
const COPY: Record<Variant, Copy> = {
  premium: {
    title: "קיבלנו — תודה!",
    body: "אנליסט מהצוות יחזור אליכם לתיאום שיחת היכרות קצרה, בלי עלות ובלי התחייבות.",
    stages: ["קיבלנו את הפרטים", "אנליסט חוזר אליכם תוך 24 שעות", "שיחת היכרות — ונחליט יחד אם זה מתאים"],
    prepTitle: "כדי שהשיחה תהיה שווה את הזמן שלכם, כדאי שיהיו ביד:",
    prep: [
      "ההון העצמי הזמין להשקעה, בערך",
      "אזור או סוג נכס שאתם שוקלים (גם אם עוד לא בטוחים)",
      "טווח הזמן שבו הייתם רוצים לסגור עסקה",
    ],
    primary: { label: "רוצים להקדים? כתבו לנו בוואטסאפ", href: premiumLink(), kind: "whatsapp" },
    secondary: {
      label: "בינתיים: מה כולל ליווי משקיעים, ולמי הוא מתאים",
      href: "/blog/investor-accompaniment-guide",
      kind: "link",
    },
  },
  webinar: {
    title: "שריינו לכם מקום.",
    body: "פרטי הוובינר וההזמנה יגיעו אליכם בהודעה.",
    stages: ["נרשמתם", "ההזמנה בדרך אליכם", "נפגשים בוובינר"],
    prepTitle: "מה מחכה לכם שם:",
    prep: [
      "שעה אחת: השיטה, הטעויות שחייבים להכיר, ומה בודקים לפני שחותמים",
      "בלי לחץ מכירתי — באים ללמוד",
      "שאלות? עונים בוואטסאפ",
    ],
    primary: { label: "לדף הוובינר", href: WEBINAR_URL, kind: "webinar" },
    secondary: { label: "שאלה על הוובינר? וואטסאפ", href: chatLink("webinar-followup"), kind: "whatsapp" },
  },
  mortgage: {
    title: "קיבלנו! נחזור אליכם בהקדם.",
    body: "נבדוק יחד את התמונה הפיננסית ונבנה תמהיל שמתאים לחיים שלכם — לא לבנק.",
    stages: ["קיבלנו את הפרטים", "חוזרים אליכם בשעות הפעילות", "שיחת אבחון ראשונה — בלי עלות"],
    prepTitle: "כדי להגיע לשיחה מוכנים:",
    prep: [
      "דוחות ההכנסה האחרונים (תלושים / שומות)",
      "אם יש הצעה מהבנק — נשמח לראות אותה",
      "שעות הפעילות: א׳–ה׳ 09:00-20:00",
    ],
    primary: { label: "יש הצעה מהבנק? שלחו לנו בוואטסאפ", href: chatLink("mortgage-followup"), kind: "whatsapp" },
    secondary: {
      label: "בינתיים: סוגי מסלולי המשכנתא, בקצרה",
      href: "/blog/mortgage-types-explained",
      kind: "link",
    },
  },
  contact: {
    title: "תודה! ניצור קשר בהקדם.",
    body: "ברוב המקרים נחזור אליכם תוך כמה שעות, ובכל מקרה עד 24 שעות.",
    stages: ["קיבלנו את הפרטים", "חוזרים אליכם תוך 24 שעות", "מדברים — ומחליטים מה הצעד הנכון"],
    prepTitle: "בינתיים אפשר להתחיל להכיר את השיטה:",
    prep: [
      "הסילבוס המלא וסרטון ההסבר של הקורס פתוחים לצפייה",
      "מאמרים ומדריכים חינמיים בבלוג",
      "שאלה דחופה? וואטסאפ",
    ],
    primary: { label: "לסילבוס המלא של הקורס", href: "/course", kind: "link" },
    secondary: { label: "מעדיפים וואטסאפ?", href: chatLink("contact-followup"), kind: "whatsapp" },
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

const isExternal = (href: string) => href.startsWith("http");

const PrimaryAction = ({ a }: { a: Action }) => {
  const content = (
    <Button
      size="lg"
      className="group w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-8 py-6 gap-2 text-base"
    >
      {a.kind === "whatsapp" && <MessageCircle size={18} aria-hidden />}
      {a.kind === "webinar" && <CalendarClock size={18} aria-hidden />}
      {a.label}
      {a.kind !== "whatsapp" && (
        <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
      )}
    </Button>
  );
  return isExternal(a.href) ? (
    <a href={a.href} target="_blank" rel="noopener noreferrer" className="inline-block w-full sm:w-auto">
      {content}
    </a>
  ) : (
    <Link to={a.href} className="inline-block w-full sm:w-auto">
      {content}
    </Link>
  );
};

const SecondaryAction = ({ a }: { a: Action }) => {
  const cls =
    "inline-flex items-center justify-center gap-2 text-white/80 hover:text-white font-semibold py-3 px-2 min-h-[44px] underline-offset-4 hover:underline text-center";
  const inner = (
    <>
      {a.kind === "whatsapp" && <MessageCircle size={18} aria-hidden className="text-[hsl(var(--whatsapp))] shrink-0" />}
      <span>{a.label}</span>
    </>
  );
  return isExternal(a.href) ? (
    <a href={a.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {inner}
    </a>
  ) : (
    <Link to={a.href} className={cls}>
      {inner}
    </Link>
  );
};

/**
 * One dedicated post-submit URL for every lead form. Gives the ad
 * platforms a page_view they can count as a conversion, and gives the
 * visitor what a form that resets itself never does: what happens now,
 * what to have ready, and one next step.
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
      <SectionDark size="lg" glow="center" className="min-h-[88svh] flex flex-col justify-center">
        <div className="container mx-auto px-5 md:px-6 max-w-2xl pt-16">
          <div className="text-center rise-in">
            <span className="inline-flex w-16 h-16 rounded-full bg-accent text-accent-foreground items-center justify-center mb-6">
              <Check size={32} strokeWidth={2.5} aria-hidden />
            </span>
            <h1 className="text-display-md md:text-display-lg text-white mb-4">{copy.title}</h1>
            <p className="text-body-lg leading-relaxed mb-10" style={{ color: "hsl(36 33% 95% / 0.8)" }}>
              {copy.body}
            </p>
          </div>

          {/* What happens now — stage one is already done */}
          <ol
            aria-label="מה קורה עכשיו"
            className="rise-in grid grid-cols-3 gap-2 sm:gap-4 mb-10"
            style={{ "--d": "0.12s" } as React.CSSProperties}
          >
            {copy.stages.map((stage, i) => (
              <li key={stage} className="relative text-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="absolute top-4 end-1/2 w-full h-px bg-white/15 -z-0"
                  />
                )}
                <span
                  className={`relative z-10 mx-auto mb-3 flex w-8 h-8 rounded-full items-center justify-center text-sm font-bold ${
                    i === 0
                      ? "bg-accent text-accent-foreground"
                      : "bg-[hsl(var(--ink))] border border-white/25 text-white/80"
                  }`}
                >
                  {i === 0 ? <Check size={16} aria-hidden /> : i + 1}
                </span>
                <span className={`block text-xs sm:text-sm leading-snug ${i === 0 ? "text-white font-semibold" : "text-white/70"}`}>
                  {i === 0 && <span className="sr-only">הושלם: </span>}
                  {stage}
                </span>
              </li>
            ))}
          </ol>

          <div
            className="rise-in rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8 mb-10"
            style={{ "--d": "0.2s" } as React.CSSProperties}
          >
            <p className="font-bold text-white mb-4">{copy.prepTitle}</p>
            <ul className="space-y-3">
              {copy.prep.map((item) => (
                <li key={item} className="flex items-start gap-3 text-white/85 leading-relaxed">
                  <span className="w-6 h-6 rounded-full bg-accent/15 text-accent flex items-center justify-center shrink-0 mt-0.5">
                    <Check size={14} aria-hidden />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rise-in flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
            style={{ "--d": "0.28s" } as React.CSSProperties}
          >
            <PrimaryAction a={copy.primary} />
            <SecondaryAction a={copy.secondary} />
          </div>

          <p className="mt-10 text-sm text-center" style={{ color: "hsl(36 33% 95% / 0.6)" }}>
            <Link to="/" className="underline-offset-4 hover:underline inline-flex min-h-[44px] items-center">
              חזרה לדף הבית
            </Link>
          </p>
        </div>
      </SectionDark>
    </>
  );
};

export default ThankYouPage;
