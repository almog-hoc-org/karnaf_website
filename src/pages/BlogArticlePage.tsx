import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowRight, Clock, Calendar, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import SEOHead, {
  articleSchema,
  breadcrumbSchema,
  organizationSchema,
} from "@/components/SEOHead";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import ReactMarkdown from "react-markdown";
import { articles } from "@/data/articles";
import BigCTA from "@/components/BigCTA";
import { Reveal } from "@/components/v2/Reveal";

const categoryLabel = (cat: string) =>
  cat === "article" ? "מאמר" : cat === "video" ? "סרטון" : "כלי";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

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
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-muted-foreground mb-8 gap-2 hover:text-accent">
              <ArrowRight size={16} />
              חזרה לבלוג
            </Button>
          </Link>

          <Reveal>
            <span className="text-eyebrow uppercase tracking-[0.18em] text-accent inline-flex items-center gap-3 mb-5">
              <span className="block w-10 h-px bg-accent" aria-hidden />
              <span>{categoryLabel(article.category)}</span>
            </span>

            <h1 className="text-display-lg md:text-display-xl font-black text-foreground leading-[0.95] tracking-tight mb-6">
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
            <div className="prose prose-orange max-w-none
                prose-headings:text-foreground prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-strong:text-foreground
                prose-a:text-accent prose-a:font-semibold
                prose-ul:space-y-1
              "
            >
              <ReactMarkdown>{article.content}</ReactMarkdown>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Course CTA banner */}
      <section className="pb-section-md bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-2xl p-8 md:p-10 flex flex-col sm:flex-row items-center gap-6 grain-texture"
              style={{
                backgroundColor: "hsl(217 50% 8%)",
                color: "hsl(36 33% 95%)",
              }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-50"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(50% 70% at 80% 20%, hsl(24 80% 52% / 0.20) 0%, transparent 70%)",
                }}
              />
              <div className="relative z-10 w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <GraduationCap size={28} className="text-accent" />
              </div>
              <div className="relative z-10 flex-1 text-center sm:text-right">
                <h3 className="text-xl md:text-2xl font-bold mb-1">רוצים ללמוד עוד?</h3>
                <p className="text-white/70 text-sm md:text-base">
                  50+ שיעורים, מחשבונים וליווי צמוד בתוכנית "הדרך לדירה"
                </p>
              </div>
              <Link to="/course" className="relative z-10">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 whitespace-nowrap rounded-full px-7 py-5">
                  לתוכנית המלאה
                  <ArrowRight size={16} className="rotate-180" />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <section className="py-section-lg bg-background">
          <div className="container mx-auto px-6 max-w-5xl">
            <Reveal>
              <h3 className="text-display-md font-black text-foreground mb-12 leading-[0.98] tracking-tight text-center">
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

      <BigCTA />
    </>
  );
};

export default BlogArticlePage;
