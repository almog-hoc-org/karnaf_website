import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import TotalCostCalculator from "@/components/tools/TotalCostCalculator";
import { ArticleFaq, ArticleSources } from "@/components/blog/ArticleExtras";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema, toolSchema } from "@/components/SEOHead";
import {
  DEVELOPER_LEGAL_FEE,
  LAND_REGISTRY_FEES,
  MARKET_FEES,
  MAX_LTV,
  MORTGAGE_ADVISOR_SOURCE,
  MORTGAGE_FILE_FEE,
  PURCHASE_TAX_ADDITIONAL,
  PURCHASE_TAX_SINGLE,
  REAL_ESTATE_AGENTS_LAW,
  VAT_RATE,
} from "@/data/finance/rules2026";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { analystLink } from "@/lib/constants";
import { formatILS } from "@/lib/format";

const PATH = "/tools/total-cost";
const TITLE = "כמה באמת עולה לקנות דירה";
const DESCRIPTION =
  "מחשבון עלויות רכישת דירה 2026: מס רכישה, עורך דין, תיווך, שמאי, עמלות משכנתא ואגרות טאבו — וכמה הון עצמי צריך בפועל. מקור ותאריך לכל מספר.";

const dev = DEVELOPER_LEGAL_FEE.value;

/* The worked examples below are this calculator's own output for the
   default case (₪2.6M, single home, second-hand via an agent, with a
   mortgage) — lib/calc/transactionCosts.test.ts pins the same numbers. */
const faq: FaqItem[] = [
  {
    q: "כמה עולה לקנות דירה מעבר למחיר שלה?",
    a: "לדוגמה, דירה יחידה מיד שנייה ב-₪2.6 מיליון, דרך מתווך ועם משכנתא: העלויות הנלוות מגיעות לכ-₪73–119 אלף. מס רכישה של ₪25,538, עורך דין 0.5%–1% + מע״מ, תיווך 1%–2% + מע״מ, שמאי, עמלת פתיחת תיק ואגרות. אותה דירה כדירה נוספת: מס הרכישה לבדו ₪208,000.",
  },
  {
    q: "כמה הון עצמי צריך כדי לקנות דירה?",
    a: "הבנק מממן עד 75% ממחיר דירה יחידה, 70% למשפרי דיור ו-50% לדירה נוספת. את היתר, ואת כל העלויות הנלוות, משלמים מההון העצמי. בדירה יחידה של ₪2.6 מיליון: ₪650,000 ועוד העלויות — כ-₪723–769 אלף בסך הכול.",
  },
  {
    q: "כמה לוקח מתווך?",
    a: "אין תעריף בחוק. מקובל 2% + מע״מ, ובמשא ומתן לא פעם 1%–1.5%. לפי חוק המתווכים, מתווך זכאי לדמי תיווך רק אם חתמתם על הזמנת תיווך בכתב — שם נקבע הסכום, ולכן זה הרגע להתמקח עליו.",
  },
  {
    q: "כמה עולה עורך דין לקניית דירה?",
    a: `בקנייה מיד שנייה מקובל 0.5%–1% מהמחיר + מע״מ. בקנייה מקבלן משלמים גם את שכר הטרחה של עורך הדין של הקבלן, שמוגבל בתקנות ל-${formatILS(dev.cap)} + מע״מ, או 0.5% מהמחיר אם זה פחות (בדירות עד ${formatILS(dev.capAppliesUpTo)}). עורך דין מטעמכם כדאי גם אז.`,
  },
  {
    q: "צריך שמאי לפני שקונים דירה?",
    a: "אם לוקחים משכנתא, הבנק שולח שמאי מטעמו (כ-₪350–950), והוא בודק את הבטוחה של הבנק — לא את האינטרס שלכם. שמאי פרטי לפני החתימה עולה כ-₪1,500–3,500 ובודק בשבילכם את שווי הדירה לפני שמתחייבים.",
  },
];

/* Every rule the calculator reads, plus the law behind the agent's written order. */
const sources: ArticleSource[] = [
  MARKET_FEES.source,
  MORTGAGE_ADVISOR_SOURCE,
  PURCHASE_TAX_SINGLE.source,
  PURCHASE_TAX_ADDITIONAL.source,
  DEVELOPER_LEGAL_FEE.source,
  LAND_REGISTRY_FEES.source,
  MORTGAGE_FILE_FEE.source,
  REAL_ESTATE_AGENTS_LAW,
  VAT_RATE.source,
  MAX_LTV.source,
];

const TotalCostPage = () => (
  <>
    <SEOHead
      title={`${TITLE}? מחשבון עלויות נלוות 2026 | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="כמה עולה לקנות דירה, עלויות נלוות לרכישת דירה, מחשבון עלויות רכישת דירה, שכר טרחת עורך דין דירה, דמי תיווך, הון עצמי לדירה"
      jsonLd={[
        organizationSchema,
        toolSchema({ name: "מחשבון עלויות רכישת דירה 2026", description: DESCRIPTION, path: PATH }),
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
      tag="מחשבון · עלויות רכישה 2026"
      title={`${TITLE}?`}
      subtitle="מעבר למחיר: מס רכישה, עורך דין, תיווך, שמאי, עמלות משכנתא ואגרות — וכמה הון עצמי צריך בפועל. הכול במקום אחד, עם מקור לכל מספר."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start">
          <Reveal>
            <TotalCostCalculator />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-secondary/50 p-6">
                <p className="font-bold text-foreground mb-3">ארבעה דברים שכדאי לדעת לפני החתימה</p>
                <ul className="space-y-3 text-[0.9375rem] text-foreground/85 leading-relaxed list-disc pr-5">
                  <li>מס רכישה ועלויות נלוות משולמים מההון העצמי. הבנק מממן אחוז ממחיר הדירה, לא את ההוצאות.</li>
                  <li>לדמי תיווך אין תקרה בחוק. הסכום נקבע בהזמנת התיווך שחותמים עליה — בלעדיה המתווך לא זכאי לתשלום.</li>
                  <li>
                    בקנייה מקבלן שכר הטרחה של עורך הדין שלו מוגבל בתקנות: עד{" "}
                    <span dir="ltr">{formatILS(dev.cap)}</span> + מע״מ ב-2026.
                  </li>
                  <li>
                    עמלת פתיחת תיק משכנתא מוגבלת בחוק ל-<span dir="ltr">{formatILS(MORTGAGE_FILE_FEE.value)}</span>.
                  </li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={analystLink("/check", "total-cost")}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent"
              >
                <p className="text-sm font-bold text-accent mb-1.5">קרנף אנליסט · חינם</p>
                <p className="font-bold text-foreground leading-snug mb-2">העלויות נגזרות מהמחיר. המחיר עצמו הוגן?</p>
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
                to="/tools/affordability"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm text-muted-foreground mb-1">עוד לא יודעים מה התקציב?</span>
                  <span className="font-bold text-foreground leading-snug">כמה דירה אתם יכולים להרשות לעצמכם</span>
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
          line="המחשבון מראה כמה זה עולה. בקורס יש שיעור על העלויות הנלוות בעסקת יד שנייה, ופרק שלם על אנשי המקצוע — המתווך, עורך הדין ויועץ המשכנתא — ואיך עובדים איתם נכון."
        />
      </div>
    </section>
  </>
);

export default TotalCostPage;
