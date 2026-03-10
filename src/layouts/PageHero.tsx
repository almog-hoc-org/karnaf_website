import { motion } from "framer-motion";

interface PageHeroProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  badge?: string;
  backgroundImage?: string;
}

const PageHero = ({ tag, title, highlight, subtitle, badge, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover" loading="lazy" />
          </div>
          <div className="absolute inset-0 bg-background/85" />
        </>
      )}
      {!backgroundImage && (
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-background to-background" />
      )}

      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        {tag && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
          >
            {tag}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-6xl lg:text-7xl text-foreground mb-6"
        >
          {title}{" "}
          {highlight && <span className="text-gradient">{highlight}</span>}
        </motion.h1>

        {badge && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary font-bold text-sm px-5 py-2 rounded-full mb-4"
          >
            {badge}
          </motion.div>
        )}

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHero;
