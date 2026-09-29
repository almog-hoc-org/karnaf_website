import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { articles, CATEGORY_LABELS } from "@/data/articles";
import type { ArticleCategory } from "@/data/blog/types";
import { Reveal } from "@/components/v2/Reveal";
import { SplitReveal } from "@/components/v2/scroll";
import WebinarCapture from "@/components/WebinarCapture";
import { ArticleCard, LeadStory } from "@/components/blog/ArticleCard";
import { OfferBanner } from "@/components/blog/ArticleOffer";
import {
  defaultOfferLine,
  formatHebrewDate,
  lastUpdated,
  leadArticle,
  usedCategories,
} from "@/components/blog/articleUtils";
import SEOHead, { organizationSchema, breadcrumbSchema } from "@/components/SEOHead";

const SITE_URL = "https://www.karnafnadlan.com";

type Filter = "all" | ArticleCategory;

const CATEGORY_ORDER = Object.keys(CATEGORY_LABELS) as ArticleCategory[];
const categories = usedCategories(articles, CATEGORY_ORDER);
const lead = leadArticle(articles);
const newestUpdate = articles.reduce((max, a) => (lastUpdated(a) > max ? lastUpdated(a) : max), "");

const isCategory = (v: string | null): v is ArticleCategory =>
  !!v && (categories as string[]).includes(v);

const BlogPage = () => {
  // "all" on the server and on the first client render (no hydration
  // mismatch); a ?topic= link (e.g. from an article's breadcrumb) is
  // applied right after mount.
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get("topic");
    if (isCategory(topic)) setFilter(topic);
  }, []);

  const choose = (next: Filter) => {
    setFilter(next);
    const url = new URL(window.location.href);
    if (next === "all") url.searchParams.delete("topic");
    else url.searchParams.set("topic", next);
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  };

  // "All" lists everything below the lead story; a topic lists every
  // article in it, the lead story included.
  const visible = useMemo(
    () =>
      filter === "all"
        ? articles.filter((a) => a.slug !== lead?.slug)
        : articles.filter((a) => a.category === filter),
    [filter]
  );

  const countFor = (c: ArticleCategory) => articles.filter((a) => a.category === c).length;

  return (
    <>
      <SEOHead
        title="ידע ותובנות — מדריכים לרכישת דירה, משכנתא ומיסוי | קרנף נדל״ן"
        description="מדריכים מעשיים לרכישת דירה בישראל: משכנתא, מס רכישה, משא ומתן, דירה מקבלן, התחדשות עירונית והשקעות — עם מספרים, מקורות ותאריך בדיקה."
        path="/blog"
        keywords="בלוג נדל״ן, מדריך רכישת דירה, משכנתא בישראל, מס רכישה, תמ״א 38, השקעות נדל״ן"
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "ידע ותובנות", url: "/blog" },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            "@id": `${SITE_URL}/blog#blog`,
            url: `${SITE_URL}/blog`,
            name: "ידע ותובנות — קרנף נדל״ן",
            description: "מדריכים מעשיים על רכישת דירה, משכנתא, מיסוי והשקעות נדל״ן בישראל.",
            inLanguage: "he-IL",
            publisher: { "@id": `${SITE_URL}/#organization` },
            blogPost: articles.map((a) => {
              const image = a.cover.og ?? a.cover.src;
              return {
                "@type": "BlogPosting",
                headline: a.title,
                description: a.excerpt,
                datePublished: a.date,
                dateModified: lastUpdated(a),
                url: `${SITE_URL}/blog/${a.slug}`,
                image: image.startsWith("http") ? image : `${SITE_URL}${image}`,
              };
            }),
          },
        ]}
      />

      {/* ── Masthead ─────────────────────────────────────────────── */}
      <header className="pt-[6.5rem] pb-6 md:pt-36 md:pb-12">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <p className="rise-in inline-flex items-center gap-3 text-sm font-bold text-primary">
            <span className="block h-[2px] w-8 rounded-full bg-accent" aria-hidden />
            הבלוג של קרנף נדל״ן
          </p>
          <SplitReveal
            as="h1"
            trigger="load"
            text="ידע ותובנות"
            className="mt-3 text-display-xl text-primary md:mt-4"
            stagger={0.08}
          />
          <p
            className="rise-in mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-muted-foreground md:mt-6 md:text-xl"
            style={{ "--d": "0.18s" } as CSSProperties}
          >
            מדריכים מעשיים לרכישת דירה בישראל — משכנתא, מיסוי, משא ומתן והשקעות. בגובה העיניים, עם
            מספרים ומקורות.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-y md:mt-10 border-primary/15 py-3 text-sm text-muted-foreground">
            <span className="tabular-nums">
              {articles.length} מאמרים · {categories.length} נושאים
            </span>
            {newestUpdate && (
              <span>
                עדכון אחרון: <time dateTime={newestUpdate}>{formatHebrewDate(newestUpdate)}</time>
              </span>
            )}
          </div>
        </div>
      </header>

      {/* ── Lead story ───────────────────────────────────────────── */}
      {lead && (
        <section aria-labelledby="lead-story-title" className="pb-section-sm">
          <div className="mx-auto max-w-6xl px-5 md:px-6">
            <LeadStory article={lead} />
          </div>
        </section>
      )}

      {/* ── All articles, filterable by topic ────────────────────── */}
      <section aria-labelledby="all-articles-title" className="pb-section-md">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="flex flex-col gap-5 border-t border-primary/15 pt-8 md:pt-10 lg:flex-row lg:items-center lg:justify-between">
            <h2 id="all-articles-title" className="text-display-sm font-black text-primary">
              {filter === "all" ? "כל המאמרים" : CATEGORY_LABELS[filter]}
            </h2>
            {categories.length > 1 && (
              <div
                role="group"
                aria-label="סינון לפי נושא"
                className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-wrap lg:justify-end lg:overflow-visible lg:px-0 lg:pb-0"
              >
                {(["all", ...categories] as Filter[]).map((c) => {
                  const active = filter === c;
                  return (
                    <button
                      key={c}
                      type="button"
                      aria-pressed={active}
                      onClick={() => choose(c)}
                      className={`inline-flex min-h-[44px] shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-bold transition-colors ${
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-primary/40"
                      }`}
                    >
                      {c === "all" ? "הכל" : CATEGORY_LABELS[c]}
                      <span className={`tabular-nums text-xs ${active ? "opacity-75" : "text-muted-foreground"}`}>
                        {c === "all" ? articles.length : countFor(c)}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <p className="sr-only" role="status">
            {filter === "all" ? "מוצגים כל המאמרים" : `מוצגים ${visible.length} מאמרים בנושא ${CATEGORY_LABELS[filter]}`}
          </p>

          <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 3) * 0.07} blur={0} className="h-full">
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── The one commercial banner — after the reading grid, never inside it ── */}
      <section aria-label="הקורס הדיגיטלי" className="pb-section-md">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <OfferBanner
            offer="course"
            title="כל מה שבבלוג — בסדר אחד, מהתקציב ועד החתימה"
            line={defaultOfferLine("course")}
          />
        </div>
      </section>

      {/* The blog is the top of the cold funnel — leave with something. */}
      <section className="border-t border-border py-section-md">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <WebinarCapture source="blog-index" />
        </div>
      </section>
    </>
  );
};

export default BlogPage;
