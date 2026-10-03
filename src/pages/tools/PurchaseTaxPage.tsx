import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import PurchaseTaxCalculator from "@/components/tools/PurchaseTaxCalculator";
import { ArticleFaq, ArticleSources } from "@/components/blog/ArticleExtras";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema, toolSchema } from "@/components/SEOHead";
import { PURCHASE_TAX_ADDITIONAL, PURCHASE_TAX_OLEH, PURCHASE_TAX_SINGLE, type TaxBracket } from "@/data/finance/rules2026";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { analystLink } from "@/lib/constants";
import { formatILS, formatPercent } from "@/lib/format";

const PATH = "/tools/purchase-tax";
const TITLE = "מחשבון מס רכישה 2026";
const DESCRIPTION =
  "חשבו מס רכישה לפי מדרגות 2026: דירה יחידה, משפרי דיור, דירה נוספת ועולים חדשים — עם פירוט לכל מדרגה ומקור לכל מספר.";

/* Every answer below restates the purchase-tax-2026 article, whose sources
   are listed at the end of this page too. */
const faq: FaqItem[] = [
  {
    q: "האם מס רכישה הוא אחוז אחד מכל מחיר הדירה?",
    a: "לא. המס מחושב במדרגות, כמו מס הכנסה: כל חלק מהמחיר מחויב בשיעור של המדרגה שלו. לכן על דירה יחידה של ₪3 מיליון משלמים כ-₪45,538, כ-1.5% מהמחיר, ולא 5% מכל הסכום.",
  },
  {
    q: "מתי משלמים את מס הרכישה?",
    a: "את העסקה מדווחים לרשות המסים בתוך 30 יום מהחתימה (בפועל עורך הדין מגיש), ומשלמים בתוך 60 יום ממועד העסקה. המס משולם מההון העצמי: הבנק מממן אחוז משווי הדירה, לא את המס.",
  },
  {
    q: "מי נחשב משפר דיור?",
    a: "מי שהדירה הקודמת הייתה דירתו היחידה ומוכר אותה בזמן: בתוך 24 חודשים מרכישת הדירה החדשה בקנייה מיד שנייה, או בתוך 12 חודשים מהמסירה החוזית בקנייה מקבלן. אז משלמים לפי מדרגות דירה יחידה. לא מכרתם בזמן? משלימים עד מס של דירה נוספת, בתוספת ריבית והצמדה.",
  },
  {
    q: "יש לי חלק בדירה אחרת. אני עדיין ״דירה יחידה״?",
    a: "לפעמים. חלק של עד שליש בדירה אחרת, או עד מחצית בדירה שהתקבלה בירושה, לא שוללים את הסטטוס. גם מגרש, חנות או משרד לא נספרים כדירה. התא המשפחתי (בני הזוג וילדים מתחת לגיל 18) נחשב רוכש אחד, אז בדקו גם מה רשום על שם בן או בת הזוג.",
  },
  {
    q: "האם המס על דירה נוספת ירד ב-2027?",
    a: "אי אפשר לדעת היום. השיעור של 8% הוא הוראת שעה שתוקפה עד 31 בדצמבר 2026, וההכרעה צפויה לעבור לממשלה שתקום אחרי הבחירות. לפי ניתוח בביזפורטל סביר שהשיעור יישאר גם בחודשים הראשונים של 2027, ולכן כדאי לתכנן עסקה שמחזיקה ב-8%.",
  },
];

/* The rule sources plus the reporting the article relies on, de-duplicated. */
const sources: ArticleSource[] = [
  PURCHASE_TAX_SINGLE.source,
  PURCHASE_TAX_ADDITIONAL.source,
  PURCHASE_TAX_OLEH.source,
  {
    title: "שוקלים לרכוש דירה נוספת? מה צפוי למס הרכישה",
    publisher: "גלובס",
    url: "https://www.globes.co.il/news/article.aspx?did=1001545400",
    date: "2026-06-10",
  },
  {
    title: "מס הרכישה יעלה בתחילת 2027? הקבלנים מפעילים את הלוביסטים, אבל זה לא יקרה",
    publisher: "ביזפורטל",
    url: "https://www.bizportal.co.il/realestates/news/article/20041446",
    date: "2026-09-06",
  },
];

const [OLEH_EXEMPT, OLEH_BAND] = PURCHASE_TAX_OLEH.value.brackets;

const BracketTable = ({ caption, brackets }: { caption: string; brackets: TaxBracket[] }) => {
  let from = 0;
  return (
    <table className="w-full text-sm">
      <caption className="text-right font-bold text-foreground mb-3">{caption}</caption>
      <thead>
        <tr className="text-muted-foreground text-xs">
          <th scope="col" className="text-right font-semibold pb-2">חלק מהמחיר</th>
          <th scope="col" className="text-left font-semibold pb-2">שיעור</th>
        </tr>
      </thead>
      <tbody className="tabular-nums">
        {brackets.map((b) => {
          const row = (
            <tr key={b.upTo} className="border-t border-border/70">
              <td className="py-2.5 text-right">
                {b.upTo === Infinity ? (
                  <>
                    מעל <span dir="ltr">{formatILS(from)}</span>
                  </>
                ) : from === 0 ? (
                  <>
                    עד <span dir="ltr">{formatILS(b.upTo)}</span>
                  </>
                ) : (
                  <span dir="ltr">
                    {formatILS(from)}–{formatILS(b.upTo)}
                  </span>
                )}
              </td>
              <td className="py-2.5 text-left font-semibold" dir="ltr">
                {formatPercent(b.rate * 100, 1)}
              </td>
            </tr>
          );
          from = b.upTo;
          return row;
        })}
      </tbody>
    </table>
  );
};

const PurchaseTaxPage = () => (
  <>
    <SEOHead
      title={`${TITLE} — דירה יחידה, משפרי דיור, דירה נוספת ועולים | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="מחשבון מס רכישה, מס רכישה 2026, מדרגות מס רכישה, מס רכישה דירה יחידה, מס רכישה דירה נוספת, מס רכישה משפרי דיור, מס רכישה עולה חדש"
      jsonLd={[
        organizationSchema,
        toolSchema({ name: TITLE, description: DESCRIPTION, path: PATH }),
        breadcrumbSchema([
          { name: "דף הבית", url: "/" },
          { name: "מחשבונים", url: "/tools" },
          { name: TITLE, url: PATH },
        ]),
        faqPageSchema(faq.map((f) => ({ question: f.q, answer: f.a }))),
      ]}
    />

    <PageHero
      containerClassName="max-w-5xl"
      tag="מחשבון · מס רכישה 2026"
      title="כמה מס רכישה תשלמו על הדירה?"
      subtitle="המס מחושב במדרגות, כמו מס הכנסה — לא אחוז אחד על כל המחיר. הקלידו את המחיר, בחרו את המצב שלכם, וקבלו את הסכום ואת הפירוט לכל מדרגה."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start">
          <Reveal>
            <PurchaseTaxCalculator />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-secondary/50 p-6">
                <p className="font-bold text-foreground mb-3">שלושה דברים שמשנים את החשבון ב-2026</p>
                <ul className="space-y-3 text-[0.9375rem] text-foreground/85 leading-relaxed list-disc pr-5">
                  <li>מדרגות דירה יחידה קפואות עד 15 בינואר 2028, אז יותר דירות נכנסות למדרגה של 5%.</li>
                  <li>על דירה נוספת משלמים 8% מהשקל הראשון — הוראת שעה עד סוף 2026.</li>
                  <li>משפרי דיור משלמים כמו דירה יחידה, אם הדירה הקודמת נמכרת בזמן.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={analystLink("/check", "purchase-tax")}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent"
              >
                <p className="text-sm font-bold text-accent mb-1.5">קרנף אנליסט · חינם</p>
                <p className="font-bold text-foreground leading-snug mb-2">
                  המס תלוי במחיר. בדקתם שהמחיר עצמו הוגן?
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  השוו את המחיר שמבקשים מכם לעסקאות שדווחו לרשות המסים באותו רחוב ובאותה שכונה.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  לבדיקת המחיר
                  <ExternalLink size={14} aria-hidden />
                  <span className="sr-only">(נפתח בחלון חדש)</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/blog/purchase-tax-2026"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm text-muted-foreground mb-1">המדריך המלא</span>
                  <span className="font-bold text-foreground leading-snug">
                    מס רכישה 2026: כמה תשלמו, מתי משלמים, ואיפה טועים
                  </span>
                </span>
                <ArrowLeft size={18} aria-hidden className="shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="py-section-md bg-card border-y border-border" aria-labelledby="brackets">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <h2 id="brackets" className="text-display-sm font-black text-foreground mb-8">
          מדרגות מס רכישה 2026
        </h2>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <BracketTable caption="דירה יחידה (וגם משפרי דיור שמוכרים בזמן)" brackets={PURCHASE_TAX_SINGLE.value} />
          <div>
            <BracketTable caption="דירה נוספת" brackets={PURCHASE_TAX_ADDITIONAL.value} />
            <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
              עולים חדשים: {formatPercent(OLEH_BAND.rate * 100, 1)} על החלק שבין{" "}
              <span dir="ltr">{formatILS(OLEH_EXEMPT.upTo)}</span> ל-<span dir="ltr">{formatILS(OLEH_BAND.upTo)}</span>,
              והמדרגות הרגילות מעל. ההטבה לא חלה על דירה ששוויה
              עולה על <span dir="ltr">{formatILS(PURCHASE_TAX_OLEH.value.maxPrice)}</span>.
            </p>
          </div>
        </div>
      </div>
    </section>

    <div className="container mx-auto px-5 md:px-6 max-w-3xl pb-section-md">
      <ArticleFaq items={faq} />
      <ArticleSources sources={sources} />
    </div>

    <section className="pb-section-lg">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <OfferBanner
          offer="course"
          line="המחשבון נותן מספר. בקורס יש מיני-קורס שלם על מיסוי נדל״ן, עם שיעורים נפרדים על מס רכישה ועל מס שבח, כדי שהמס ייכנס לתחשיב לפני שמגישים הצעה."
        />
      </div>
    </section>
  </>
);

export default PurchaseTaxPage;
