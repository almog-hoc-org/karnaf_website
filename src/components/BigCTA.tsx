import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import heroArchitecture from "@/assets/hero-architecture.jpg";

const BigCTA = () => {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroArchitecture}
          alt="ארכיטקטורה מודרנית"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85" />
      </div>

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-bold text-sm tracking-widest uppercase mb-6"
        >
          BUILD. BETTER. FUTURE.
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
        >
          בונים את העתיד שלכם.{" "}
          <span className="text-primary">ביחד.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
        >
          מוכנים לצעד הבא? דברו עם הקרנף ותנו לנו להוביל אתכם אל העסקה המושלמת.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://wa.me/972500000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3"
            >
              <MessageCircle size={22} />
              דברו עם הקרנף
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default BigCTA;
