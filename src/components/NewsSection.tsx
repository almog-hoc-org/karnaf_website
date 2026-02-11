import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import blogMinimalist from "@/assets/blog-minimalist-living.jpg";
import blogSustainable from "@/assets/blog-sustainable-architecture.jpg";
import blogUrban from "@/assets/blog-urban-planning.jpg";

const articles = [
  {
    image: blogMinimalist,
    date: "15 ינואר 2026",
    title: "5 טיפים לרכישת דירה ראשונה בשנת 2026",
    excerpt: "המדריך המלא לרוכשים צעירים - מה חשוב לבדוק, איך לנהל משא ומתן, ואיפה ההזדמנויות.",
  },
  {
    image: blogSustainable,
    date: "8 ינואר 2026",
    title: "שוק הנדל\"ן בישראל: מגמות ותחזיות",
    excerpt: "ניתוח מעמיק של מגמות המחירים, אזורי הביקוש החדשים, והשפעת הריבית על השוק.",
  },
  {
    image: blogUrban,
    date: "2 ינואר 2026",
    title: "השקעה בנדל\"ן מסחרי: המדריך המלא",
    excerpt: "כל מה שצריך לדעת על השקעה בנכסים מסחריים - תשואות, סיכונים ואסטרטגיות.",
  },
];

const NewsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          LATEST NEWS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-12"
        >
          חדשות <span className="text-primary">ועדכונים</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <span className="text-xs text-primary font-medium">{article.date}</span>
                <h3 className="text-heading text-lg text-foreground mt-2 mb-3 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{article.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold gap-2">
            לכל הכתבות
            <ArrowLeft size={16} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
