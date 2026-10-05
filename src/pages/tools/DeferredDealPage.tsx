import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import DeferredDealCalculator from "@/components/tools/DeferredDealCalculator";
import { ArticleFaq, ArticleSources } from "@/components/blog/ArticleExtras";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema, toolSchema } from "@/components/SEOHead";
import { CONSTRUCTION_INDEX_12M, MAX_LTV, PRIME_RATE, SALE_LAW_LINKAGE } from "@/data/finance/rules2026";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { analystLink } from "@/lib/constants";
import { formatPercent } from "@/lib/format";

const PATH = "/tools/20-80";
const TITLE = "מבצע 20/80: כמה הדירה עולה באמת";
const DESCRIPTION =
  "מחשבון מבצעי מימון של קבלנים: כמה שווה עסקת 20/80 או 10/90 בכסף של היום, מה מוסיפה ההצמדה למדד תשומות הבנייה, וכמה הון עצמי צריך ביום המסירה.";

const ltv = MAX_LTV.value;
const pct = (n: number) => formatPercent(n * 100, 0);
const linkedCap = pct(SALE_LAW_LINKAGE.value.maxLinkedShare * (1 - SALE_LAW_LINKAGE.value.exemptShare));

/* Worked examples are the calculator's own output for the article's case
   (₪2M, 20/80, 3 years, 5%) — lib/calc/deferredPayment.test.ts pins them. */
const faq: FaqItem[] = [
  {
    q: "איך מחשבים את המחיר האמיתי של דירה ב-20/80?",
    a: "מהוונים את התשלום שנדחה למסירה לכסף של היום. דירה של ₪2 מיליון ב-20/80: ₪400,000 בחתימה, ו-₪1,600,000 בעוד שלוש שנים ששווים היום ₪1,382,140 בהיוון של 5% לשנה. סך הכול ₪1,782,140 — הנחה סמויה של כ-11%, אם התשלום הנדחה לא צמוד ולא נושא ריבית. גם האוצר העריך שדירה של ₪2 מיליון ב-80/20 שווה בפועל ₪1.75–1.8 מיליון.",
  },
  {
    q: "באיזו ריבית להוון?",
    a: `בריבית שמשקפת את עלות הכסף שלכם. אם בלי המבצע הייתם לוקחים משכנתא, זו הריבית הרלוונטית — הפריים עומד היום על ${formatPercent(PRIME_RATE.value)}. אם הכסף יושב בפיקדון או בהשקעה, השתמשו בתשואה שהוא מרוויח. ככל שהריבית גבוהה יותר, ההנחה הסמויה גדלה.`,
  },
  {
    q: "כמה מהמחיר יכול להיות צמוד למדד תשומות הבנייה?",
    a: `בחוזים שנחתמו מ-7 ביולי 2022, ברירת המחדל היא בלי הצמדה. בהסכמה מותר להצמיד עד מחצית מכל תשלום, למעט 20% הראשונים של המחיר — כך שב-20/80 לכל היותר ${linkedCap} מהמחיר צמודים. בקצב של ${formatPercent(CONSTRUCTION_INDEX_12M.value)} בשנה, כמו ב-12 החודשים האחרונים, ההצמדה מוסיפה בשלוש שנים כ-4.3% למחיר — כ-₪87 אלף על דירה של ₪2 מיליון.`,
  },
  {
    q: "כמה הון עצמי צריך ביום המסירה?",
    a: `ב-20/80 משלמים במסירה 80% מהמחיר, והבנק מממן עד ${pct(ltv.single)} לדירה יחידה, ${pct(ltv.replacement)} למשפרי דיור ו-${pct(ltv.additional)} לדירה נוספת. בדירה יחידה של ₪2 מיליון: ₪1,600,000 לתשלום, עד ₪1,500,000 משכנתא — ו-₪100,000 מהון עצמי, ועוד ההצמדה אם יש. למשקיע הפער הוא ₪600,000.`,
  },
  {
    q: "איך יודעים אם המבצע באמת משתלם?",
    a: "מבקשים מהקבלן שני מחירים בכתב: המחיר במבצע, והמחיר לאותה דירה בלוח תשלומים רגיל או במזומן. אם שווי המבצע בכסף של היום נמוך מהמחיר הרגיל, המבצע משתלם. בפרויקט שבו כמעט כל הדירות נמכרות במבצע, משווים לעסקאות בפרויקטים דומים באזור.",
  },
];

const sources: ArticleSource[] = [
  {
    title: "האוצר: ״מחירי הדירות על פי הלמ״ס לא נכונים״",
    publisher: "ביזפורטל",
    url: "https://www.bizportal.co.il/realestates/news/article/20028774",
    date: "2026-03-10",
  },
  SALE_LAW_LINKAGE.source,
  CONSTRUCTION_INDEX_12M.source,
  MAX_LTV.source,
  PRIME_RATE.source,
  {
    title: "עסקאות הדיור ביוני מהנמוכות מאז 2000, וביטולי החוזים מול הקבלנים קפצו ב-41% בשבעה חודשים",
    publisher: "ביזפורטל",
    url: "https://www.bizportal.co.il/realestates/news/article/20038641",
    date: "2026-08-12",
  },
];

const DeferredDealPage = () => (
  <>
    <SEOHead
      title={`${TITLE}? מחשבון מבצעי מימון | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="מבצע 20/80, מחשבון 80/20, מבצעי מימון קבלנים, 10/90 דירה, הצמדה למדד תשומות הבנייה, מחיר אמיתי דירה מקבלן"
      jsonLd={[
        organizationSchema,
        toolSchema({ name: "מחשבון מבצע 20/80", description: DESCRIPTION, path: PATH }),
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
      tag="מחשבון · מבצעי מימון של קבלנים"
      title={`${TITLE}?`}
      subtitle="20% עכשיו והשאר במסירה נשמע כמו הנחה — ולפעמים הוא באמת הנחה. תרגמו את המבצע לכסף של היום, בדקו מה ההצמדה מוסיפה, וכמה תצטרכו להביא ביום המסירה."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start">
          <Reveal>
            <DeferredDealCalculator />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-secondary/50 p-6">
                <p className="font-bold text-foreground mb-3">שלוש שאלות לקבלן לפני החתימה</p>
                <ul className="space-y-3 text-[0.9375rem] text-foreground/85 leading-relaxed list-disc pr-5">
                  <li>מה המחיר לאותה דירה בלוח תשלומים רגיל, ומה במזומן? בלי מחיר ייחוס אי אפשר לדעת כמה המבצע שווה.</li>
                  <li>האם התשלום הנדחה צמוד? איזה חלק, ומאיזה מדד בסיס?</li>
                  <li>
                    מה קורה אם במסירה הבנק לא מאשר את מלוא המשכנתא? ביטולי עסקאות מול קבלנים קפצו ב-41% בשבעת
                    החודשים הראשונים של 2026.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={analystLink("/check", "deal-20-80")}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent"
              >
                <p className="text-sm font-bold text-accent mb-1.5">קרנף אנליסט · חינם</p>
                <p className="font-bold text-foreground leading-snug mb-2">אין מחיר רגיל להשוות אליו?</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  השוו את המחיר לעסקאות שדווחו לרשות המסים באותה שכונה ובפרויקטים דומים.
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
                to="/blog/developer-financing-deals-2026"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm text-muted-foreground mb-1">המדריך המלא</span>
                  <span className="font-bold text-foreground leading-snug">
                    מבצעי מימון של קבלנים ב-2026: כמה באמת עולה דירה ב-20/80
                  </span>
                </span>
                <ArrowLeft size={18} aria-hidden className="shrink-0 text-primary transition-transform group-hover:-translate-x-1" />
              </Link>
            </Reveal>
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
          line="המחשבון מתרגם מבצע לכסף. בקורס, בפרק על סוגי העסקאות, יש שיעורים על הלוואת קבלן ועל עסקת פריסייל — כדי שתדעו מה לבדוק לפני שאתם חותמים."
        />
      </div>
    </section>
  </>
);

export default DeferredDealPage;
