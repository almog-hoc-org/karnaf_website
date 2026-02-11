import { motion } from "framer-motion";
import { Gem, TrendingUp, Briefcase } from "lucide-react";

const services = [
  {
    icon: Gem,
    title: "שיווק נכסי יוקרה",
    description: "אסטרטגיה שמוכרת מהר ובמחיר המקסימלי.",
  },
  {
    icon: TrendingUp,
    title: "ליווי משקיעים",
    description: 'איתור "יהלומים" מתחת למחיר השוק באזורי ביקוש.',
  },
  {
    icon: Briefcase,
    title: "תיווך ומכירה",
    description: "ניהול כל התהליך מא' עד ת', בראש שקט עבורכם.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          השירותים <span className="text-primary">שלנו</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 transition-colors duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={28} />
              </div>
              <h3 className="text-heading text-xl text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
