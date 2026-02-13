import { motion } from "framer-motion";
import { GraduationCap, Crown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: GraduationCap,
    tag: "LEARN. GROW. BUY.",
    title: 'תוכנית "הדרך לדירה"',
    subtitle: "הכשרה דיגיטלית מקיפה לרוכשי דירה ראשונה",
    description:
      "הכשרה דיגיטלית מקיפה ומדויקת עם כל הידע החשוב בדרך לרכישת דירה ראשונה, בשילוב כלים ומחשבונים שיבטיחו לכם עסקה מנצחת בביטחון מלא.",
    features: [
      "שיעורים דיגיטליים מובנים צעד אחר צעד",
      "מחשבונים וכלים לניתוח עסקאות",
      "ידע מעשי מא׳ עד ת׳ על תהליך הרכישה",
      "גישה מלאה לתכנים — ללמוד בקצב שלכם",
    ],
    cta: "לפרטים נוספים",
    ctaHref: "#contact",
  },
  {
    icon: Crown,
    tag: "HAND IN HAND",
    title: "ליווי קרנף פרימיום",
    subtitle: "ליווי משקיעים אישי מקצה לקצה",
    description:
      "ליווי אישי עם מומחה קרנף נדל\"ן, שלוקח אתכם יד ביד ממש משלב הרעיון ועד חתימת החוזה. תהליך רכישת דירה שייתן לכם שקט וביטחון לאורך כל הדרך.",
    features: [
      "ניתוח פיננסי אישי והגדרת אסטרטגיה",
      "איתור, חיפוש וסינון נכסים בשבילכם",
      "ניהול משא ומתן מקצועי",
      "חיבור לבעלי מקצוע ותפירת חליפה אישית",
    ],
    cta: "בואו נדבר",
    ctaHref: "https://wa.me/972559966175",
    ctaExternal: true,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          OUR SERVICES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          השירותים <span className="text-primary">שלנו</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:border-primary/50 transition-colors duration-300 group flex flex-col"
            >
              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4">
                {service.tag}
              </span>

              <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon size={32} />
              </div>

              <h3 className="text-heading text-2xl md:text-3xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-4">{service.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href={service.ctaHref}
                target={service.ctaExternal ? "_blank" : undefined}
                rel={service.ctaExternal ? "noopener noreferrer" : undefined}
              >
                <Button className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg">
                  {service.cta}
                </Button>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
