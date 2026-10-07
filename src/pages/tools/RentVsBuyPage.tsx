import { Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import RentVsBuyCalculator from "@/components/tools/RentVsBuyCalculator";
import { ArticleFaq, ArticleSources } from "@/components/blog/ArticleExtras";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, faqPageSchema, toolSchema } from "@/components/SEOHead";
import {
  CAPITAL_GAINS_TAX,
  GROSS_RENT_YIELD,
  HOME_PRICES_12M,
  MARKET_FEES,
  MAX_LTV,
  PRIME_RATE,
  PURCHASE_TAX_SINGLE,
  RENT_CHANGE_12M,
} from "@/data/finance/rules2026";
import type { ArticleFaq as FaqItem, ArticleSource } from "@/data/blog/types";
import { analystLink } from "@/lib/constants";
import { formatPercent } from "@/lib/format";

const PATH = "/tools/rent-vs-buy";
const TITLE = "לקנות או לשכור";
const DESCRIPTION =
  "מחשבון לקנות או לשכור 2026: מאיזו עליית מחירים הקנייה משתלמת, ומה יהיה השווי הנקי שלכם בכל תרחיש — עם ריבית, שכר דירה, מס ועלויות אמיתיות.";

const [yLow, yHigh] = GROSS_RENT_YIELD.value;
const y = (n: number) => formatPercent(n * 100);

/* The worked example is the calculator's own default case —
   lib/calc/rentVsBuy.test.ts ("rent-vs-buy page example") pins it. */
const faq: FaqItem[] = [
  {
    q: "מה משתלם יותר ב-2026: לקנות דירה או לשכור?",
    a: `זה תלוי בעיקר בשאלה כמה יעלו מחירי הדירות. לדוגמה: דירה של ₪2 מיליון ששכר הדירה עליה ₪4,500 בחודש, הון עצמי של ₪600,000, משכנתא בריבית הפריים (${formatPercent(PRIME_RATE.value)}) ותשואה של 5% על כסף מושקע. לאורך 10 שנים הקנייה משתלמת אם המחירים יעלו בממוצע ביותר מכ-3% בשנה. בשנה האחרונה הם ${HOME_PRICES_12M.value < 0 ? "ירדו" : "עלו"} ב-${formatPercent(Math.abs(HOME_PRICES_12M.value))}.`,
  },
  {
    q: "למה תשואת השכירות קובעת כל כך הרבה?",
    a: `כי היא מראה כמה עולה לגור בדירה בלי לקנות אותה. ביולי 2026 התשואה ברוטו נעה בערים שנבדקו בין ${y(yLow)} ל-${y(yHigh)}, פחות מריבית המשכנתא. בדוגמה שלמעלה, בשנה הראשונה רכיב הריבית במשכנתא לבדו (כ-₪69 אלף) גבוה משכר הדירה של כל השנה (₪54 אלף). הקנייה מחזירה את הפער דרך עליית ערך ופירעון הקרן.`,
  },
  {
    q: "המחשבון מביא בחשבון מס?",
    a: `כן. מי ששוכר משקיע את ההון העצמי ואת ההפרש החודשי, ובסוף משלם ${formatPercent(CAPITAL_GAINS_TAX.value * 100, 0)} מס על הרווח הריאלי. מי שקונה מוכר בסוף התקופה, בהנחה שזו דירתו היחידה ושהיא פטורה ממס שבח. בצד הקנייה נכללים גם מס רכישה ועלויות הקנייה והמכירה.`,
  },
  {
    q: "למה עליית שכר הדירה משנה את התוצאה?",
    a: `כי השוכר משלם אותה כל שנה, והקונה לא. בשנה האחרונה עלה שכר הדירה ב-${formatPercent(RENT_CHANGE_12M.value.renewals)} למי שחידש חוזה וב-${formatPercent(RENT_CHANGE_12M.value.newTenants)} לשוכרים חדשים. ככל שהוא עולה מהר יותר, הקנייה משתלמת גם בעליית מחירים נמוכה יותר.`,
  },
  {
    q: "מה המחשבון לא מודד?",
    a: "את מה שאין לו מחיר: הביטחון שבבית משלכם, החופש לשפץ, והגמישות של שכירות כשמשנים עבודה או עיר. הוא גם מניח שהשוכר באמת משקיע את ההפרש כל חודש. מי שלא עושה את זה, מוותר על רוב היתרון של השכירות.",
  },
];

const sources: ArticleSource[] = [
  GROSS_RENT_YIELD.source,
  RENT_CHANGE_12M.source,
  CAPITAL_GAINS_TAX.source,
  PRIME_RATE.source,
  MAX_LTV.source,
  PURCHASE_TAX_SINGLE.source,
  MARKET_FEES.source,
];

const RentVsBuyPage = () => (
  <>
    <SEOHead
      title={`${TITLE}? מחשבון שכירות מול קנייה 2026 | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="לקנות או לשכור, מחשבון שכירות מול קנייה, האם כדאי לקנות דירה, לקנות דירה או להמשיך לשכור, תשואת שכירות"
      jsonLd={[
        organizationSchema,
        toolSchema({ name: "מחשבון לקנות או לשכור", description: DESCRIPTION, path: PATH }),
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
      tag="מחשבון · שכירות מול קנייה"
      title={`${TITLE}?`}
      subtitle="שני משקי בית, אותו כסף: אחד קונה, השני שוכר ומשקיע את ההפרש. המחשבון מראה מאיזו עליית מחירים הקנייה משתלמת, ומה יהיה השווי הנקי של כל אחד."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-8 lg:gap-12 items-start">
          <Reveal>
            <RentVsBuyCalculator />
          </Reveal>

          <div className="space-y-5">
            <Reveal delay={0.05}>
              <div className="rounded-3xl border border-border bg-secondary/50 p-6">
                <p className="font-bold text-foreground mb-3">שלושה דברים שמכריעים את ההשוואה</p>
                <ul className="space-y-3 text-[0.9375rem] text-foreground/85 leading-relaxed list-disc pr-5">
                  <li>
                    תשואת השכירות. ביולי 2026 היא נעה בערים שנבדקו בין <bdi dir="ltr">{y(yLow)}</bdi> ל-
                    <bdi dir="ltr">{y(yHigh)}</bdi> — פחות מריבית המשכנתא.
                  </li>
                  <li>עליית המחירים לאורך השנים. אף אחד לא יודע אותה מראש, ולכן המחשבון מראה את נקודת האיזון.</li>
                  <li>כמה זמן תגורו בדירה. עלויות הקנייה והמכירה מתחלקות על פני יותר שנים ככל שנשארים.</li>
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <a
                href={analystLink("/cities", "rent-vs-buy")}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-3xl border border-accent/40 bg-accent/5 p-6 transition-colors hover:border-accent"
              >
                <p className="text-sm font-bold text-accent mb-1.5">קרנף אנליסט · חינם</p>
                <p className="font-bold text-foreground leading-snug mb-2">מה עשו המחירים בעיר שלכם?</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  מחיר חציוני, מגמות ועסקאות אחרונות — עיר אחר עיר, מנתוני רשות המסים.
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
                to="/tools/affordability"
                className="group flex items-center justify-between gap-3 rounded-3xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                <span>
                  <span className="block text-sm text-muted-foreground mb-1">החלטתם לקנות?</span>
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
          line="המחשבון משווה כסף. בקורס, בפרק על תכנון פיננסי של עסקה, בונים את החשבון המלא לפני שמחליטים — ובמיני-קורס על המשכנתא לומדים לנהל משא ומתן בין הבנקים על הריבית שמכריעה את ההשוואה."
        />
      </div>
    </section>
  </>
);

export default RentVsBuyPage;
