import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoPlayer from "@/components/rich-media/VideoPlayer";
import { articles } from "@/data/articles";
import BigCTA from "@/components/BigCTA";

const BlogArticlePage = () => {
  const { slug } = useParams();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = articles.filter((a) => a.slug !== slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{article.title} | קרנף נדל"ן</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      {/* Header */}
      <section className="pt-32 pb-12">
        <div className="container mx-auto px-6 max-w-3xl">
          <Link to="/blog">
            <Button variant="ghost" size="sm" className="text-muted-foreground mb-6 gap-2">
              <ArrowRight size={16} />
              חזרה לבלוג
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full inline-block mb-4 ${
              article.category === "article" ? "bg-blue-500/10 text-blue-400" :
              article.category === "video" ? "bg-red-500/10 text-red-400" :
              "bg-green-500/10 text-green-400"
            }`}>
              {article.category === "article" ? "מאמר" : article.category === "video" ? "סרטון" : "כלי"}
            </span>

            <h1 className="text-display text-3xl md:text-5xl text-foreground mb-4">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{new Date(article.date).toLocaleDateString("he-IL")}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>{article.readTime}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Video or Image */}
      {article.videoUrl ? (
        <section className="pb-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <VideoPlayer url={article.videoUrl} title={article.title} />
          </div>
        </section>
      ) : (
        <section className="pb-12">
          <div className="container mx-auto px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-2xl overflow-hidden border border-border"
            >
              <img
                src={article.image}
                alt={article.title}
                loading="lazy"
                className="w-full aspect-video object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Content */}
      <section className="pb-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="prose prose-invert prose-orange max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed
              prose-li:text-muted-foreground
              prose-strong:text-foreground
              prose-a:text-primary
              prose-ul:space-y-1
            "
            dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, "<br/>") }}
          />
        </div>
      </section>

      {/* Related */}
      {relatedArticles.length > 0 && (
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-6 max-w-5xl">
            <h3 className="text-display text-2xl text-foreground mb-8 text-center">
              תכנים <span className="text-gradient">נוספים</span>
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedArticles.map((a) => (
                <Link key={a.slug} to={`/blog/${a.slug}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-colors group"
                  >
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={a.image}
                        alt={a.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {a.title}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">{a.readTime}</p>
                    </div>
                  </motion.div>
                </Link>
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
