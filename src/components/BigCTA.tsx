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
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, hsl(25 100% 50% / 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, hsl(25 100% 50% / 0.08) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, hsl(25 100% 50% / 0.08) 0%, transparent 50%)",
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-primary/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-bold text-sm tracking-widest uppercase mb-6"
        >
          YOUR JOURNEY STARTS HERE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
        >
          מוכנים להתחיל את הדרך לדירה?{" "}
          <span className="text-primary text-glow-strong">בואו נדבר.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg text-muted-foreground max-w-xl mx-auto mb-10"
        >
          דברו איתנו ונבנה יחד את התוכנית שלכם — בין אם אתם רוכשים דירה ראשונה או מחפשים את ההשקעה הבאה.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <a
            href="https://wa.me/972559966175"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="lg"
              className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3 shadow-2xl"
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
