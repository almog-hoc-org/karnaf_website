import { Link } from "react-router-dom";
import { ArrowLeft, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/v2/Reveal";
import { CHAPTERS_LABEL } from "@/data/courseStats";
import { COURSE_PRICE } from "@/lib/constants";

/**
 * One commercial offer per article, chosen by topic: investment / accompaniment
 * articles point at the 1:1 track, everything about buying, financing and
 * checking a home points at the course. Both the mid-article card and the
 * end banner read from the same map so an article never sends its reader to
 * two different products.
 */

type OfferKind = "course" | "premium";

interface Offer {
  kind: OfferKind;
  /** One contextual sentence — why this article's reader wants this offer. */
  line: string;
}

const PREMIUM_SLUGS = new Set(["investor-accompaniment-guide", "real-estate-investment-tips"]);

const LINES: Record<string, string> = {
  "investor-accompaniment-guide":
    "בדיוק התהליך שתואר כאן — אסטרטגיה, איתור, בדיקות ומשא ומתן — עם אנליסט אישי לצידכם עד החתימה.",
  "real-estate-investment-tips":
    "רוצים שמישהו יעבור על העסקה הבאה שלכם במספרים, לא בתחושות? ליווי משקיעים 1:1 — מהאסטרטגיה ועד החתימה.",
  "first-apartment-guide":
    "כל ארבעת השלבים שבמאמר — הכנה, מימון, חיפוש ובדיקות — הם פרקים שלמים בתוכנית, צעד אחר צעד.",
  "mortgage-types-explained":
    "פרק המימון בתוכנית מלמד לבנות תמהיל שמתאים לחיים שלכם — ולהגיע לבנק כלקוח שיודע מה הוא מבקש.",
  "negotiation-secrets":
    "פרק המשא ומתן בתוכנית: איך להיכנס לשיחה עם נתונים במקום עם תחושת בטן.",
  "due-diligence-checklist":
    "בתוכנית: בדיקת הנאותות המלאה, עם התבניות והמסמכים לכל שלב — לא רק רשימה.",
  "how-to-choose-real-estate-course":
    "כל מה שרשמנו כאן שקורס טוב חייב לכלול — מכוסה. הסילבוס המלא פתוח בדף התוכנית.",
  "market-update-2025":
    "לקרוא שוק זה כישור שלומדים: בתוכנית מלמדים לנתח אזור ולהשוות לעסקאות שנסגרו באותו רחוב.",
};

function offerFor(slug: string): Offer {
  const kind: OfferKind = PREMIUM_SLUGS.has(slug) ? "premium" : "course";
  const line =
    LINES[slug] ??
    (kind === "course"
      ? `${CHAPTERS_LABEL} מקיפים, מסמכים ותבניות לעבודה — כל הדרך מהתקציב ועד המפתח.`
      : "אנליסט אישי שעובר איתכם את כל הדרך — עד שאתם חותמים על נכס משלכם.");
  return { kind, line };
}

const priceLabel = `₪${COURSE_PRICE.toLocaleString("he-IL")}`;

/** Compact card injected into the article body after the second section. */
export const ArticleInlineCta = ({ slug }: { slug: string }) => {
  const offer = offerFor(slug);
  const course = offer.kind === "course";
  return (
    <aside className="not-prose my-10 rounded-2xl border border-border bg-card p-6 md:p-7 border-r-4 border-r-accent">
      <p className="text-eyebrow uppercase tracking-[0.18em] text-accent mb-2 flex items-center gap-2">
        {course ? <GraduationCap size={14} /> : <Users size={14} />}
        {course ? "מהמאמר לתוכנית" : "מהמאמר לליווי אישי"}
      </p>
      <p className="text-foreground font-semibold leading-relaxed mb-4">{offer.line}</p>
      <Link
        to={course ? "/course" : "/premium#contact"}
        className="inline-flex items-center gap-2 font-bold text-primary underline-offset-4 hover:underline min-h-[44px]"
      >
        {course ? `לתוכנית הדיגיטלית — ${priceLabel}, גישה מיידית` : "לתיאום שיחת היכרות — חינם"}
        <ArrowLeft size={14} />
      </Link>
    </aside>
  );
};

/** The end-of-article banner — one destination, matched to the topic. */
export const ArticleEndBanner = ({ slug }: { slug: string }) => {
  const offer = offerFor(slug);
  const course = offer.kind === "course";
  return (
    <Reveal>
      <div
        className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 grain-texture"
        style={{ backgroundColor: "hsl(217 50% 8%)", color: "hsl(36 33% 95%)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          aria-hidden
          style={{
            background: "radial-gradient(50% 70% at 80% 20%, hsl(24 80% 52% / 0.20) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
          {course ? <GraduationCap size={28} className="text-accent" /> : <Users size={28} className="text-accent" />}
        </div>
        <div className="relative z-10 flex-1 text-center sm:text-right">
          <h3 className="text-xl md:text-2xl font-bold mb-1 tracking-[-0.015em]">
            {course ? "רוצים ללמוד לעשות את זה נכון?" : "מעדיפים שמישהו יעבור את הדרך איתכם?"}
          </h3>
          <p className="text-white/70 text-sm md:text-base">
            {offer.line}{" "}
            {course && <span className="text-white/90 font-semibold">{priceLabel} · גישה מיידית ל-12 חודשים.</span>}
          </p>
        </div>
        <Link to={course ? "/course" : "/premium#contact"} className="relative z-10">
          <Button className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 whitespace-nowrap rounded-full px-7 py-5">
            {course ? "לתוכנית המלאה" : "לשיחת היכרות — חינם"}
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
          </Button>
        </Link>
      </div>
    </Reveal>
  );
};
