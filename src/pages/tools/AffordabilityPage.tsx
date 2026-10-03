import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import AffordabilityCalculator from "@/components/tools/AffordabilityCalculator";
import { ArticleFaq, ArticleSources } from "@/components/blog/ArticleExtras";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema, toolSchema } from "@/components/SEOHead";
import { MARKET_FEES, MAX_LTV, PAYMENT_TO_INCOME, PRIME_RATE, PURCHASE_TAX_SINGLE } from "@/data/finance/rules2026";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { analystLink } from "@/lib/constants";
import { formatPercent } from "@/lib/format";

const PATH = "/tools/affordability";
const TITLE = "כמה דירה אתם יכולים להרשות לעצמכם";
const DESCRIPTION =
  "מחשבון יכולת רכישה 2026: לפי ההון העצמי, ההכנסה ומגבלות בנק ישראל — המחיר המרבי, המשכנתא, ההחזר החודשי ומה מגביל אתכם. מקור ותאריך לכל מספר.";

const ltv = MAX_LTV.value;
const pti = PAYMENT_TO_INCOME.value;
const pct = (n: number) => formatPercent(n * 100, 0);

/* Worked examples are this site's own calculators: a ₪6,000 payment over
   30 years at prime carries ≈ ₪1.15M (lib/calc/mortgage), and a ₪2M single
   home second-hand via an agent costs ≈ ₪37–73K on top (transactionCosts). */
const faq: FaqItem[] = [
  {
    q: "כמה משכנתא אפשר לקבל לפי המשכורת?",
    a: `בנק ישראל מתיר החזר חודשי של עד ${pct(pti.max)} מההכנסה הפנויה, אבל מעל ${pct(pti.extraCapitalAbove)} הבנק נדרש להחזיק הון נוסף על ההלוואה, ולכן בפועל רבים עוצרים שם. לדוגמה: החזר של ₪6,000 בחודש ל-30 שנה בריבית ${formatPercent(PRIME_RATE.value)} נושא משכנתא של כ-₪1.15 מיליון.`,
  },
  {
    q: "כמה הון עצמי צריך לדירה ראשונה?",
    a: `לפחות ${pct(1 - ltv.single)} ממחיר הדירה, כי הבנק מממן עד ${pct(ltv.single)} לדירה יחידה — ועל זה מס רכישה והעלויות הנלוות, שגם הן מההון העצמי. לדוגמה, בדירה של ₪2 מיליון מיד שנייה דרך מתווך: ₪500,000 ועוד כ-₪37–73 אלף.`,
  },
  {
    q: "למה משפרי דיור ומשקיעים מקבלים פחות מימון?",
    a: `לפי הוראת בנק ישראל, משכנתא לדירה חלופית מוגבלת ל-${pct(ltv.replacement)} מהמחיר ולדירה נוספת ל-${pct(ltv.additional)}, לעומת ${pct(ltv.single)} לדירה יחידה. לכן עם אותו הון עצמי, משקיע מגיע לדירה זולה בהרבה.`,
  },
  {
    q: "המחשבון מחליף אישור עקרוני?",
    a: "לא. אישור עקרוני בודק גם את היסטוריית האשראי, את יציבות ההכנסה ואת שמאות הדירה, והריבית בפועל תלויה בתמהיל ובבנק. המחשבון נותן סדר גודל לפני שמתחילים לחפש — כדי לא להתאהב בדירה שלא תעבור בבנק.",
  },
];

const sources: ArticleSource[] = [MAX_LTV.source, PRIME_RATE.source, PURCHASE_TAX_SINGLE.source, MARKET_FEES.source];

const AffordabilityPage = () => (
  <>
    <SEOHead
      title={`${TITLE}? מחשבון יכולת רכישה 2026 | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="כמה דירה אני יכול להרשות לעצמי, מחשבון יכולת רכישה, כמה משכנתא אפשר לקבל, הון עצמי לדירה ראשונה, מחשבון החזר משכנתא לפי משכורת"
      jsonLd={[
        organizationSchema,
        toolSchema({ name: "מחשבון יכולת רכישת דירה 2026", description: DESCRIPTION, path: PATH }),
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
      tag="מחשבון · יכולת רכישה 2026"
      title={`${TITLE}?`}
      subtitle="שלושה דברים קובעים את התקרה: כמה הון עצמי יש לכם, כמה הבנק מוכן לממן, וכמה החזר חודשי ההכנסה שלכם נושאת. הקלידו את המספרים וגלו מה מגביל אתכם."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start">
          <Reveal>
            <AffordabilityCalculator />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-secondary/50 p-6">
                <p className="font-bold text-foreground mb-3">איך הבנק מחשב, לפי בנק ישראל</p>
                <ul className="space-y-3 text-[0.9375rem] text-foreground/85 leading-relaxed list-disc pr-5">
                  <li>
                    מימון: עד {pct(ltv.single)} מהמחיר לדירה יחידה, {pct(ltv.replacement)} למשפרי דיור ו-
                    {pct(ltv.additional)} לדירה נוספת.
                  </li>
                  <li>
                    החזר: עד {pct(pti.max)} מההכנסה הפנויה. מעל {pct(pti.extraCapitalAbove)} הבנק נדרש להון נוסף,
                    ולכן רבים עוצרים שם.
                  </li>
                  <li>תקופה: עד {pti.maxYears} שנה.</li>
                  <li>מס רכישה והעלויות הנלוות — מההון העצמי, לא מהמשכנתא.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={analystLink("/cities", "affordability")}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent"
              >
                <p className="text-sm font-bold text-accent mb-1.5">קרנף אנליסט · חינם</p>
                <p className="font-bold text-foreground leading-snug mb-2">יש תקציב. איפה הוא קונה דירה?</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  מחיר חציוני, מחיר למ״ר ועסקאות אחרונות — עיר אחר עיר, מנתוני רשות המסים.
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  למחירים לפי עיר
                  <ExternalLink size={14} aria-hidden />
                  <span className="sr-only">(נפתח בחלון חדש)</span>
                </span>
              </a>
            </Reveal>
            <Reveal delay={0.1}>
              <Link
                to="/blog/first-apartment-guide"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm text-muted-foreground mb-1">המדריך המלא</span>
                  <span className="font-bold text-foreground leading-snug">איך קונים דירה ראשונה: המדריך המלא, שלב אחר שלב</span>
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
          line="המחשבון נותן תקרה. בקורס יש פרק על תכנון פיננסי של עסקה ומיני-קורס על יסודות המשכנתא — בחירת תמהיל, לוח שפיצר ומשא ומתן בין הבנקים אחרי אישור עקרוני."
        />
      </div>
    </section>
  </>
);

export default AffordabilityPage;
