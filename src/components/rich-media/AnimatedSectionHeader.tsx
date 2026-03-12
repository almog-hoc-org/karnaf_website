import { motion } from "framer-motion";

interface AnimatedSectionHeaderProps {
  tag?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

const AnimatedSectionHeader = ({
  tag,
  title,
  highlight,
  subtitle,
  centered = true,
}: AnimatedSectionHeaderProps) => {
  return (
    <div className={centered ? "text-center" : ""}>
      {tag && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          {tag}
        </motion.p>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-display text-2xl md:text-5xl lg:text-6xl text-foreground mb-2 md:mb-3"
      >
        {title}{" "}
        {highlight && <span className="text-gradient">{highlight}</span>}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className={`text-base md:text-lg text-muted-foreground ${centered ? "max-w-2xl mx-auto" : "max-w-2xl"}`}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`h-1 w-16 bg-gradient-to-r from-primary to-primary/50 rounded-full mt-4 mb-8 ${centered ? "mx-auto" : ""}`}
      />
    </div>
  );
};

export default AnimatedSectionHeader;
