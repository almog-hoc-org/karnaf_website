import { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Play, FileText, Wrench, ArrowLeft, Clock } from "lucide-react";
import PageHero from "@/layouts/PageHero";
import { articles } from "@/data/articles";

type Category = "all" | "article" | "video" | "tool";

const categoryLabels: Record<Category, { label: string; icon: React.ElementType }> = {
  all: { label: "הכל", icon: FileText },
  article: { label: "מאמרים", icon: FileText },
  video: { label: "סרטונים", icon: Play },
  tool: { label: "כלים", icon: Wrench },
};

const categoryColor: Record<string, string> = {
  article: "bg-blue-500/10 text-blue-400",
  video: "bg-red-500/10 text-red-400",
  tool: "bg-green-500/10 text-green-400",
};

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all" ? articles : articles.filter((a) => a.category === activeCategory);
  const featured = articles[0];

  return (
    <>
      <Helmet>
        <title>ידע ותובנות | קרנף נדל"ן</title>
        <meta name="description" content="מאמרים, סרטונים וכלים על נדל&quot;ן — מדריכי רכישה, טיפים למשא ומתן, ניתוחי שוק ועוד." />
      </Helmet>

      <PageHero
        tag="BLOG & CONTENT"
        title="ידע"
        highlight="ותובנות"
        subtitle={'מאמרים, סרטונים וכלים שיעזרו לכם לקבל החלטות חכמות בנדל"ן.'}
      />

      {/* Featured */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <Link to={`/blog/${featured.slug}`}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-2 gap-6 bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group"
            >
              <div className="aspect-video md:aspect-auto relative overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {featured.category === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                      <Play size={24} className="text-primary-foreground ml-1" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-6 md:p-8 flex flex-col justify-center">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block w-fit mb-3 ${categoryColor[featured.category]}`}>
                  {categoryLabels[featured.category].label}
                </span>
                <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground text-sm mb-4">{featured.excerpt}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>{new Date(featured.date).toLocaleDateString("he-IL")}</span>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{featured.readTime}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="pb-4">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(categoryLabels) as Category[]).map((cat) => {
              const { label, icon: Icon } = categoryLabels[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
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

      {/* Articles Grid */}
      <section className="py-12">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((article, i) => (
              <Link key={article.slug} to={`/blog/${article.slug}`}>
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 group h-full flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {article.category === "video" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                          <Play size={18} className="text-primary-foreground ml-0.5" />
                        </div>
                      </div>
                    )}
                    <span className={`absolute top-3 right-3 text-xs font-medium px-2 py-0.5 rounded-full ${categoryColor[article.category]}`}>
                      {categoryLabels[article.category].label}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-foreground font-bold text-base mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-1">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{article.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-primary">
                        קראו עוד <ArrowLeft size={12} />
                      </span>
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
