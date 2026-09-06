import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead, {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
} from "@/components/SEOHead";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ReactMarkdown from "react-markdown";
import { articles } from "@/data/articles";
import { ArticleInlineCta, ArticleEndBanner } from "@/components/blog/ArticleOffer";
import { Reveal } from "@/components/v2/Reveal";

const categoryLabel = (cat: string) =>
  cat === "article" ? "מאמר" : cat === "video" ? "סרטון" : "כלי";

/**
 * Split the markdown before its Nth "## " heading so an offer can sit
 * between sections. Returns [whole, ""] when the article is too short.
 */
const splitBeforeHeading = (md: string, n: number): [string, string] => {
  const lines = md.split("\n");
  let seen = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      seen += 1;
      if (seen === n) return [lines.slice(0, i).join("\n"), lines.slice(i).join("\n")];
    }
  }
  return [md, ""];
};

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);
  // The offer goes in after the second section — past the intro, before the
  // reader who skims decides they have what they came for.
  const [bodyHead, bodyTail] = splitBeforeHeading(article.content, 3);

  return (
    <>
      <SEOHead
        title={`${article.title} | קרנף נדל״ן`}
        description={article.excerpt}
        path={`/blog/${article.slug}`}
        type="article"
        image={article.image}
        jsonLd={[
          organizationSchema,
          breadcrumbSchema([
            { name: "דף הבית", url: "/" },
            { name: "ידע ותובנות", url: "/blog" },
            { name: article.title, url: `/blog/${article.slug}` },
          ]),
          articleSchema({
            title: article.title,
            description: article.excerpt,
            url: `/blog/${article.slug}`,
            image: article.image,
            datePublished: article.date,
          }),
        ]}
      />

      {/* Header */}
      <section className="pt-32 md:pt-40 pb-12 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/blog" className="inline-block">
            <Button variant="ghost" className="text-muted-foreground mb-8 gap-2 hover:text-accent">
              <ArrowRight size={16} />
              חזרה לבלוג
            </Button>
          </Link>

          <Reveal>
            <span className="text-eyebrow uppercase tracking-[0.18em] text-accent inline-flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-accent" aria-hidden />
              <span>{categoryLabel(article.category)}</span>
            </span>

            <h1 className="text-display-lg md:text-display-xl text-foreground mb-6">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>{new Date(article.date).toLocaleDateString("he-IL")}</span>
              </div>
              <span aria-hidden>·</span>
              <div className="flex items-center gap-1.5">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Video or hero image */}
      {article.videoUrl ? (
        <section className="pb-12 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <Reveal>
              <VideoPlayer url={article.videoUrl} title={article.title} />
            </Reveal>
          </div>
        </section>
      ) : (
        <section className="pb-12 bg-background">
          <div className="container mx-auto px-6 max-w-3xl">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border border-border shadow-depth-2">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover"
                />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Markdown body */}
      <section className="pb-section-md bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal delay={0.05}>
            <div className="prose prose-orange max-w-none prose-headings:text-foreground prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base prose-li:text-muted-foreground prose-li:leading-relaxed prose-strong:text-foreground prose-a:text-accent prose-a:font-semibold prose-ul:space-y-1 tracking-[-0.015em]"
            >
              <ReactMarkdown>{bodyHead}</ReactMarkdown>
              {bodyTail && (
                <>
                  <ArticleInlineCta slug={article.slug} />
                  <ReactMarkdown>{bodyTail}</ReactMarkdown>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* One offer at the end, matched to the article's topic */}
      <section className="pb-section-md bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <ArticleEndBanner slug={article.slug} />
        </div>
      </section>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <section className="py-section-lg bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <Reveal>
              <h3 className="text-display-md text-foreground mb-12 text-center">
                תכנים <span className="text-accent">נוספים</span>
              </h3>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.06}>
                  <Link to={`/blog/${a.slug}`} className="block group h-full">
                    <article className="bg-card border border-border rounded-2xl overflow-hidden h-full transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-depth-2">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={a.image}
                          alt={a.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div className="p-5">
                        <h4 className="text-base font-bold text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                          {a.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mt-2">{a.readTime}</p>
                      </div>
                    </article>
                  </Link>
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
