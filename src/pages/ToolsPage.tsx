import { Link } from "react-router-dom";
import { ArrowLeft, Calculator, ExternalLink } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { Reveal } from "@/components/v2/Reveal";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import SEOHead, { organizationSchema, breadcrumbSchema, collectionSchema } from "@/components/SEOHead";
import { TOOLS, type ToolEntry } from "@/data/tools";

const PATH = "/tools";
const TITLE = "מחשבונים וכלים לרוכשי דירה";
const DESCRIPTION =
  "מחשבון מס רכישה 2026, בדיקת מחיר מול עסקאות אמת, מחירי דירות לפי עיר ותמהיל משכנתא — כלים חינמיים, עם מקור ותאריך לכל מספר.";

const ToolCard = ({ tool }: { tool: ToolEntry }) => {
  const body = (
    <>
      <span className="inline-flex w-11 h-11 rounded-full bg-accent/10 items-center justify-center text-accent mb-5" aria-hidden>
        <Calculator size={20} />
      </span>
      {tool.external && <p className="text-xs font-bold text-accent mb-1.5">קרנף אנליסט</p>}
      <h2 className="text-xl font-black text-foreground leading-snug mb-2">{tool.title}</h2>
      <p className="text-[0.9375rem] text-muted-foreground leading-relaxed mb-5">{tool.description}</p>
      <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-bold text-primary">
        {tool.external ? (
          <>
            לכלי באנליסט
            <ExternalLink size={14} aria-hidden />
            <span className="sr-only">(נפתח בחלון חדש)</span>
          </>
        ) : (
          <>
            לחישוב
            <ArrowLeft size={16} aria-hidden className="transition-transform group-hover:-translate-x-1" />
          </>
        )}
      </span>
    </>
  );
  const cls =
    "group flex h-full flex-col rounded-3xl border border-border bg-card p-6 md:p-7 shadow-depth-1 transition-colors hover:border-primary/40";
  return tool.external ? (
    <a href={tool.href} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  ) : (
    <Link to={tool.href} className={cls}>
      {body}
    </Link>
  );
};

const ToolsPage = () => (
  <>
    <SEOHead
      title={`${TITLE} — חינם | קרנף נדל״ן`}
      description={DESCRIPTION}
      path={PATH}
      keywords="מחשבון מס רכישה, מחשבון משכנתא, בדיקת מחיר דירה, מחירי דירות לפי עיר, מחשבונים לרכישת דירה"
      jsonLd={[
        organizationSchema,
        collectionSchema({
          name: TITLE,
          description: DESCRIPTION,
          path: PATH,
          items: TOOLS.map((t) => ({ name: t.title, url: t.href })),
        }),
        breadcrumbSchema([
          { name: "דף הבית", url: "/" },
          { name: "מחשבונים", url: PATH },
        ]),
      ]}
    />

    <PageHero
      containerClassName="max-w-5xl"
      tag="כלים חינמיים"
      title="המספרים לפני ההחלטה."
      subtitle="כמה מס תשלמו, האם המחיר שמבקשים מכם הוגן, ומה קורה במחירים בעיר שבחרתם — לפני שמגישים הצעה. כל מספר עם מקור ותאריך."
    />

    <section className="pb-section-md bg-background">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <ul className="grid sm:grid-cols-2 gap-5">
          {TOOLS.map((tool, i) => (
            <li key={tool.slug}>
              <Reveal delay={i * 0.04} className="h-full">
                <ToolCard tool={tool} />
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-xs text-muted-foreground leading-relaxed">
          הכלים נותנים תמונה ראשונה ואינם ייעוץ מס, ייעוץ משכנתא או שמאות. כלי קרנף אנליסט נפתחים
          באתר analyst.karnafnadlan.com.
        </p>
      </div>
    </section>

    <section className="pb-section-lg">
      <div className="container mx-auto px-5 md:px-6 max-w-5xl">
        <OfferBanner
          offer="course"
          line="המחשבונים נותנים מספרים. בקורס לומדים מה עושים איתם: בונים תקציב, בודקים עסקה, מנהלים משא ומתן — שלב אחר שלב, בקצב שלכם."
        />
      </div>
    </section>
  </>
);

export default ToolsPage;
