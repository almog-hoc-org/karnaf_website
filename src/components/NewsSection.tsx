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
    title: "5 טעויות שרוכשי דירה ראשונה עושים — ואיך להימנע מהן",
    excerpt: "טעויות נפוצות שעולות עשרות אלפי שקלים. המדריך שחייבים לקרוא לפני שחותמים.",
  },
  {
    image: blogSustainable,
    date: "8 ינואר 2026",
    title: "איך לנתח עסקת נדל\"ן ב-5 דקות",
    excerpt: "הכלים והנוסחאות שמשקיעים מנוסים משתמשים בהם כדי לזהות הזדמנויות.",
  },
  {
    image: blogUrban,
    date: "2 ינואר 2026",
    title: "השקעה בנדל\"ן 2026: מגמות ותחזיות",
    excerpt: "ניתוח מעמיק של שוק הנדל\"ן — אזורי ביקוש, מחירים, והשפעת הריבית.",
  },
];

const NewsSection = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          KNOWLEDGE BASE
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-12"
        >
          ידע <span className="text-primary">ותובנות</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
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
          viewport={{ once: true, amount: 0.1 }}
          className="text-center mt-10"
        >
          <a href="https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold gap-2">
              לכל התכנים
              <ArrowLeft size={16} />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsSection;
