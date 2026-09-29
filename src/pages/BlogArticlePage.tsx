import { Fragment, useMemo, type CSSProperties } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import SEOHead, {
  articleSchema,
  breadcrumbSchema,
  faqPageSchema,
  organizationSchema,
} from "@/components/SEOHead";
import { articles, CATEGORY_LABELS } from "@/data/articles";
import { Reveal } from "@/components/v2/Reveal";
import { ArticleEndBanner, ArticleInlineOffer } from "@/components/blog/ArticleOffer";
import { ArticleCard, CategoryTag } from "@/components/blog/ArticleCard";
import { CoverImage } from "@/components/blog/CoverImage";
import { Prose, SECTION_HEADING_CLASS } from "@/components/blog/ArticleProse";
import {
  ArticleDisclaimer,
  ArticleFaq,
  ArticleSources,
  ArticleTakeaways,
} from "@/components/blog/ArticleExtras";
import { ArticleTocCollapsible, ArticleTocRail, type TocItem } from "@/components/blog/ArticleToc";
import { useArticleReading } from "@/components/blog/useArticleReading";
import {
  creditLine,
  formatHebrewDate,
  hasRealCover,
  readTimeLabel,
  relatedArticles,
  splitSections,
  stripInlineMarkdown,
  wasUpdated,
} from "@/components/blog/articleUtils";
import karnafLogo from "@/assets/mascot/karnaf-logo.png";
import { useSuppressStickyCta } from "@/hooks/use-sticky-cta-suppression";

/** The offer goes in after the second "##" section — past the intro, before a skimmer decides they're done. */
const OFFER_BEFORE_HEADING = 3;

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  const sections = useMemo(() => (article ? splitSections(article.content) : []), [article]);
  const takeaways = article?.takeaways.filter((t) => t.trim()) ?? [];
  const faq = article?.faq?.filter((f) => f.q.trim() && f.a.trim()) ?? [];
  const sources = article?.sources.filter((s) => s.url && s.title) ?? [];

  const tocItems: TocItem[] = useMemo(() => {
    const items: TocItem[] = sections.flatMap((s) => (s.heading ? [s.heading] : []));
    if (faq.length) items.push({ id: "faq", text: "שאלות נפוצות" });
    if (sources.length) items.push({ id: "sources", text: "מקורות" });
    return items;
  }, [sections, faq.length, sources.length]);

  const { bodyRef, activeId } = useArticleReading(tocItems.map((t) => t.id));
  // One product per article: a 1:1-track article doesn't also get the
  // site-wide ₪950 course bar.
  useSuppressStickyCta(article?.offer === "premium");

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const url = `/blog/${article.slug}`;
  const categoryLabel = CATEGORY_LABELS[article.category];
  const modified = article.updated || article.date;
  const hasCover = hasRealCover(article.cover);
  const credit = hasCover ? creditLine(article.cover) : "";
  const related = relatedArticles(article, articles, 3);
  const showToc = tocItems.length >= 3;

  // Index (in `sections`) of the section the inline offer precedes.
  let headed = 0;
  const offerAt = sections.findIndex((s) => s.heading && ++headed === OFFER_BEFORE_HEADING);

  return (
    <>
      <SEOHead
        title={`${article.title} | קרנף נדל״ן`}
        description={article.excerpt}
        path={url}
        type="article"
        image={article.cover.og ?? article.cover.src}
        imageAlt={hasCover ? article.cover.alt : undefined}
        article={{ publishedTime: article.date, modifiedTime: modified, section: categoryLabel }}
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "ידע ותובנות", url: "/blog" },
            { name: article.title, url },
          ]),
          articleSchema({
            type: "BlogPosting",
            title: article.title,
            description: article.excerpt,
            url,
            image: article.cover.og ?? article.cover.src,
            datePublished: article.date,
            dateModified: modified,
            section: categoryLabel,
          }),
          ...(faq.length
            ? [
                faqPageSchema(
                  faq.map((f) => ({ question: stripInlineMarkdown(f.q), answer: stripInlineMarkdown(f.a) }))
                ),
              ]
            : []),
        ]}
      />

      <article>
        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="pt-28 md:pt-36">
          <div className="mx-auto max-w-[61rem] px-5 md:px-6">
            <nav aria-label="פירורי לחם" className="-my-2 mb-5 md:mb-7">
              <ol className="flex flex-wrap items-center gap-x-1.5 text-sm">
                <li>
                  <Link
                    to="/blog"
                    className="inline-flex min-h-[44px] items-center text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    ידע ותובנות
                  </Link>
                </li>
                <li aria-hidden className="text-muted-foreground/60">
                  <ChevronLeft size={14} />
                </li>
                <li>
                  <Link
                    to={`/blog?topic=${article.category}`}
                    className="inline-flex min-h-[44px] items-center underline-offset-4 hover:underline"
                  >
                    <CategoryTag category={article.category} />
                  </Link>
                </li>
              </ol>
            </nav>

            <h1 className="rise-in text-[2rem] font-black leading-[1.12] tracking-[-0.03em] text-primary sm:text-[2.5rem] md:text-[3.25rem] md:leading-[1.08]">
              {article.title}
            </h1>
            <p
              className="rise-in mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground md:mt-6 md:text-[1.375rem]"
              style={{ "--d": "0.08s" } as CSSProperties}
            >
              {article.excerpt}
            </p>

            <div
              className="rise-in mt-8 flex items-center gap-3.5 border-t border-border pt-5"
              style={{ "--d": "0.14s" } as CSSProperties}
            >
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border bg-card">
                <img src={karnafLogo} alt="" width={32} height={32} className="h-8 w-8 object-contain" />
              </span>
              <div className="text-sm leading-relaxed">
                <p className="font-bold text-primary">
                  מערכת קרנף נדל״ן
                  <span className="font-normal text-muted-foreground">
                    <span className="mx-2" aria-hidden>
                      ·
                    </span>
                    {readTimeLabel(article)}
                  </span>
                </p>
                {/* Two dates stack on phones instead of wrapping around a dangling separator */}
                <p className="flex flex-col text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-2">
                  <span>
                    פורסם <time dateTime={article.date}>{formatHebrewDate(article.date)}</time>
                  </span>
                  {wasUpdated(article) && (
                    <span>
                      <span className="me-2 hidden sm:inline" aria-hidden>
                        ·
                      </span>
                      עודכן <time dateTime={modified}>{formatHebrewDate(modified)}</time>
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Cover — edge to edge on mobile, contained and wider than the text on
              desktop. A post without a real photo goes straight to the text: a
              full-width typographic placeholder would only push it down. */}
          {hasCover && (
            <figure className="mx-auto mt-8 max-w-6xl md:mt-12 md:px-6">
              <CoverImage
                article={article}
                priority
                size="lg"
                className="aspect-[3/2] md:aspect-[2/1] md:rounded-editorial md:shadow-depth-2"
              />
              {credit && (
                <figcaption className="px-5 pt-1 text-xs text-muted-foreground md:px-1 md:text-[0.8125rem]">
                  {article.cover.sourceUrl ? (
                    <a
                      href={article.cover.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[44px] items-center underline-offset-4 transition-colors hover:text-foreground hover:underline"
                    >
                      {credit}
                      <span className="sr-only"> (מקור התמונה, נפתח בחלון חדש)</span>
                    </a>
                  ) : (
                    <span className="inline-flex min-h-[44px] items-center">{credit}</span>
                  )}
                </figcaption>
              )}
            </figure>
          )}
        </header>

        {/* ── Body + contents ────────────────────────────────────── */}
        <div
          ref={bodyRef}
          className={`mx-auto mt-8 px-5 md:mt-12 md:px-6 ${
            showToc
              ? "grid max-w-[61rem] gap-x-14 lg:grid-cols-[minmax(0,1fr)_14.5rem]"
              : "max-w-[46rem]"
          }`}
        >
          <div className="min-w-0">
            {takeaways.length > 0 && <ArticleTakeaways items={takeaways} />}
            {showToc && (
              <div className={`lg:hidden ${takeaways.length > 0 ? "mt-6" : ""}`}>
                <ArticleTocCollapsible items={tocItems} />
              </div>
            )}

            <div className={takeaways.length > 0 ? "mt-12" : showToc ? "mt-10 lg:mt-0" : ""}>
              {sections.map((s, i) => (
                <Fragment key={s.heading?.id ?? `lede-${i}`}>
                  {i === offerAt && <ArticleInlineOffer article={article} />}
                  <section className={i === 0 ? "" : "mt-14"}>
                    {s.heading && (
                      <h2 id={s.heading.id} tabIndex={-1} className={SECTION_HEADING_CLASS}>
                        {s.heading.text}
                      </h2>
                    )}
                    {s.body && (
                      <Prose
                        markdown={s.body}
                        className={
                          s.heading
                            ? ""
                            : "[&>p:first-child]:text-[1.1875rem] [&>p:first-child]:leading-[1.75] [&>p:first-child]:text-primary md:[&>p:first-child]:text-[1.375rem]"
                        }
                      />
                    )}
                  </section>
                </Fragment>
              ))}
            </div>

            {faq.length > 0 && <ArticleFaq items={faq} />}
            {sources.length > 0 && <ArticleSources sources={sources} />}
            <ArticleDisclaimer updated={article.updated} />
          </div>

          {showToc && (
            <aside className="hidden lg:block">
              <ArticleTocRail items={tocItems} activeId={activeId} />
            </aside>
          )}
        </div>
      </article>

      {/* One offer at the end, the same product as the inline card */}
      <section aria-label="המשך מהמאמר" className="mx-auto mt-16 max-w-[61rem] px-5 md:mt-20 md:px-6">
        <ArticleEndBanner article={article} />
      </section>

      {/* ── Related ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section
          aria-labelledby="related-title"
          className="mt-16 border-t border-border pt-12 pb-section-sm md:mt-20 md:pt-16"
        >
          <div className="mx-auto max-w-6xl px-5 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
              <h2 id="related-title" className="text-display-sm font-black text-primary">
                להמשך קריאה
              </h2>
              <Link
                to="/blog"
                className="group inline-flex min-h-[44px] items-center gap-1.5 text-sm font-bold text-primary underline-offset-4 hover:underline"
              >
                לכל המאמרים
                <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" aria-hidden />
              </Link>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-3">
              {related.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.07} blur={0} className="h-full">
                  <ArticleCard article={a} compactOnMobile />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default BlogArticlePage;
