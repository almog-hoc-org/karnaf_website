import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, FileText, Wrench, ArrowLeft, Clock } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { articles } from "@/data/articles";
import { Reveal } from "@/components/v2/Reveal";
import SEOHead, {
  organizationSchema,
  breadcrumbSchema,
} from "@/components/SEOHead";

import type { LucideIcon } from "lucide-react";

type Category = "all" | "article" | "video" | "tool";

const categoryLabels: Record<Category, { label: string; icon: LucideIcon }> = {
  all: { label: "הכל", icon: FileText },
  article: { label: "מאמרים", icon: FileText },
  video: { label: "סרטונים", icon: Play },
  tool: { label: "כלים", icon: Wrench },
};

const categoryColor: Record<string, string> = {
  article: "bg-primary/10 text-primary",
  video: "bg-accent/10 text-accent",
  tool: "bg-foreground/10 text-foreground",
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered =
    activeCategory === "all"
      ? articles
      : articles.filter((a) => a.category === activeCategory);
  const featured = articles[0];

  return (
    <>
      <SEOHead
        title="ידע ותובנות נדל״ן — מדריכים, סרטונים וכלים | קרנף נדל״ן"
        description="מאמרים על רכישת דירה, משכנתא, מיסוי, התחדשות עירונית. מדריכים מעשיים מבוססי 8+ שנות מחקר ו-375+ עסקאות מלוות."
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
            "@id": "https://www.karnafnadlan.com/blog#blog",
            url: "https://www.karnafnadlan.com/blog",
            name: "ידע ותובנות — קרנף נדל״ן",
            description:
              "מאמרים, סרטונים וכלים על רכישת דירה, משכנתא ומיסוי בישראל.",
            inLanguage: "he-IL",
            publisher: { "@id": "https://www.karnafnadlan.com/#organization" },
            blogPost: articles.map((a) => ({
              "@type": "BlogPosting",
              headline: a.title,
              datePublished: a.date,
              url: `https://www.karnafnadlan.com/blog/${a.slug}`,
            })),
          },
        ]}
      />

      <PageHero
        tag="ידע ותובנות"
        title="ידע"
        highlight="ותובנות"
        subtitle={'מאמרים, סרטונים וכלים שיעזרו לכם לקבל החלטות חכמות בנדל"ן.'}
      />

      {/* Featured */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <Reveal>
            <Link to={`/blog/${featured.slug}`} className="block group">
              <article className="grid md:grid-cols-2 gap-0 bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-depth-3">
                <div className="aspect-video md:aspect-auto relative overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {featured.category === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-14 h-14 rounded-full bg-accent flex items-center justify-center">
                        <Play size={24} className="text-accent-foreground ml-1" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-10 flex flex-col justify-center">
                  <span
                    className={`text-eyebrow uppercase tracking-[0.18em] px-3 py-1 rounded-full inline-block w-fit mb-4 ${categoryColor[featured.category]}`}
                  >
                    {categoryLabels[featured.category].label}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                    {featured.title}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>{new Date(featured.date).toLocaleDateString("he-IL")}</span>
                    <span aria-hidden>·</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{featured.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="pb-4 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => {
              const { label, icon: Icon } = categoryLabels[cat];
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-5 py-2.5 min-h-[44px] rounded-full text-sm font-bold transition-colors ${
                    active
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/40"
                  }`}
                >
                  <Icon size={14} />
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Articles grid */}
      <section className="py-section-md bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <Reveal key={article.slug} delay={i * 0.06}>
                <Link to={`/blog/${article.slug}`} className="block group h-full">
                  <article className="bg-card border border-border rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-depth-2 h-full flex flex-col">
                    <div className="relative aspect-video overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {article.category === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                            <Play size={18} className="text-accent-foreground ml-0.5" />
                          </div>
                        </div>
                      )}
                      <span
                        className={`absolute top-3 right-3 text-eyebrow uppercase tracking-[0.18em] px-2.5 py-1 rounded-full ${categoryColor[article.category]}`}
                      >
                        {categoryLabels[article.category].label}
                      </span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h3 className="text-foreground font-bold text-lg mb-2 leading-snug group-hover:text-accent transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-1 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                        <span className="flex items-center gap-1 text-accent font-bold">
                          קראו עוד <ArrowLeft size={12} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
