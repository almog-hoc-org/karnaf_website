import { motion, useScroll, useTransform } from "framer-motion";
import { GraduationCap, Crown, Check, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import mascotRealestate from "@/assets/mascot/mascot-realestate.png";

const services = [
  {
    icon: GraduationCap,
    tag: "LEARN. GROW. BUY.",
    title: 'תוכנית "הדרך לדירה"',
    subtitle: "הכשרה דיגיטלית מקיפה לרוכשי דירה ראשונה",
    description:
      "הכשרה דיגיטלית מקיפה ומדויקת עם כל הידע החשוב בדרך לרכישת דירה ראשונה, בשילוב כלים ומחשבונים שיבטיחו לכם עסקה מוצלחת בביטחון מלא.",
    features: [
      "שיעורים דיגיטליים מובנים צעד אחר צעד",
      "מחשבונים וכלים לניתוח עסקאות",
      "ידע מעשי מא׳ עד ת׳ על תהליך הרכישה",
      "גישה מלאה לתכנים — ללמוד בקצב שלכם",
    ],
    cta: "לפרטים נוספים",
    ctaHref: "/course",
    popular: false,
  },
  {
    icon: Crown,
    tag: "HAND IN HAND",
    title: "ליווי קרנף פרימיום",
    subtitle: "ליווי אישי מקצה לקצה",
    description:
      "ליווי אישי עם מומחה קרנף נדל\"ן, שהולך איתכם צעד אחר צעד מהרעיון הראשון ועד חתימת החוזה. תהליך רכישת דירה שנותן לכם שקט וביטחון לאורך כל הדרך.",
    features: [
      "ניתוח פיננסי אישי והגדרת אסטרטגיה",
      "איתור, חיפוש וסינון נכסים בשבילכם",
      "ניהול משא ומתן מקצועי",
      "חיבור לבעלי מקצוע ותפירת חליפה אישית",
    ],
    cta: "בואו נדבר",
    ctaHref: "/premium",
    popular: true,
  },
];

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const mascotY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const mascotOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.12, 0.18, 0.12]);

  return (
    <section ref={sectionRef} id="services" className="py-24 bg-secondary relative overflow-hidden">
      {/* Mascot with parallax and professional blending */}
      <motion.div
        style={{ y: mascotY, opacity: mascotOpacity }}
        className="absolute left-0 bottom-10 pointer-events-none hidden lg:block"
      >
        <img
          src={mascotRealestate}
          alt=""
          className="h-[350px] object-contain mascot-fade-diagonal mascot-blend-soft-light"
          loading="lazy"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          className="text-center text-primary font-bold text-sm tracking-widest uppercase mb-4"
        >
          OUR SERVICES
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          השירותים <span className="text-gradient">שלנו</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              whileHover={{ scale: 1.02, boxShadow: "0 8px 30px rgba(255, 102, 0, 0.15)" }}
              className={`relative bg-card border rounded-2xl p-8 md:p-10 card-hover-glow group flex flex-col transition-all duration-500 ${
                service.popular ? "border-primary/30" : "border-border"
              }`}
            >
              {service.popular && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                >
                  <Sparkles size={12} />
                  הכי פופולרי
                </motion.div>
              )}

              <span className="text-primary font-bold text-xs tracking-widest uppercase mb-4">
                {service.tag}
              </span>

              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
              >
                <service.icon size={32} />
              </motion.div>

              <h3 className="text-heading text-2xl md:text-3xl text-foreground mb-2">
                {service.title}
              </h3>
              <p className="text-primary font-medium text-sm mb-4">{service.subtitle}</p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-8 flex-1">
                {service.features.map((feature, fi) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + fi * 0.1 }}
                    className="flex items-start gap-3 text-sm text-muted-foreground"
                  >
                    <Check size={16} className="text-primary mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <Link to={service.ctaHref}>
                <Button
                  className={`w-full font-bold h-12 text-lg ${
                    service.popular
                      ? "btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                      : "btn-glow bg-primary hover:bg-primary/90 text-primary-foreground"
                  }`}
                >
                  {service.cta}
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
