import { motion } from "framer-motion";
import { Users, GraduationCap, BarChart3, Instagram, Facebook, Youtube, Music } from "lucide-react";
import { useState } from "react";
import { WHATSAPP_NUMBER, socialLinks, TIKTOK_URL } from "@/lib/constants";

const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotateX(-y * 10);
    setRotateY(x * 10);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={className}
    >
      {children}
    </div>
  );
};

const communityLinks = [
  { icon: Instagram, href: "https://www.instagram.com/karnaf_nadlan/", label: "Instagram", color: "hover:text-pink-500" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61563350768976", label: "Facebook", color: "hover:text-blue-500" },
  { icon: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
    </svg>
  ), href: `https://wa.me/${WHATSAPP_NUMBER}`, label: "WhatsApp", color: "hover:text-green-500" },
  { icon: Youtube, href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F", label: "YouTube", color: "hover:text-red-500" },
  { icon: Music, href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8", label: "Spotify", color: "hover:text-green-400" },
];

const Advantages = () => {
  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-4xl md:text-5xl text-center text-foreground mb-16"
        >
          למה <span className="text-gradient">קרנף?</span>
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden md:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent z-0"
            style={{ originX: 0 }}
          />

          {/* Card 01 - Community */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0 }}
            className="relative z-10"
          >
            <TiltCard className="h-full">
              <div className="card-premium rounded-xl p-8 text-center group h-full relative overflow-hidden">
                <span className="text-primary/10 text-8xl font-black absolute top-4 right-6 select-none group-hover:text-primary/15 transition-colors duration-500">
                  01
                </span>
                <motion.div
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <Users size={32} />
                </motion.div>
                <h3 className="text-heading text-xl text-foreground mb-3">
                  קהילת הנדל״ן מהגדולות בישראל
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-5">
                  עשרות אלפי עוקבים ותלמידים ברשתות השונות
                </p>
                <div className="flex items-center justify-center gap-3">
                  {communityLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground transition-colors ${link.color}`}
                      aria-label={link.label}
                    >
                      <link.icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 02 - הדרך לדירה */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10"
          >
            <TiltCard className="h-full">
              <div className="card-premium rounded-xl p-8 text-center group h-full relative overflow-hidden">
                <span className="text-primary/10 text-8xl font-black absolute top-4 right-6 select-none group-hover:text-primary/15 transition-colors duration-500">
                  02
                </span>
                <motion.div
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <GraduationCap size={32} />
                </motion.div>
                <h3 className="text-heading text-xl text-foreground mb-3">
                  הדרך לדירה
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  תוכנית הליווי המקצועית בישראל שתעזור לכם לזהות עסקאות מצוינות, לקבל החלטות נכונות ולהרגיש בטוחים בכל צעד
                </p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Card 03 - נתונים */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="relative z-10"
          >
            <TiltCard className="h-full">
              <div className="card-premium rounded-xl p-8 text-center group h-full relative overflow-hidden">
                <span className="text-primary/10 text-8xl font-black absolute top-4 right-6 select-none group-hover:text-primary/15 transition-colors duration-500">
                  03
                </span>
                <motion.div
                  whileInView={{ rotate: [0, -10, 10, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <BarChart3 size={32} />
                </motion.div>
                <h3 className="text-heading text-xl text-foreground mb-3">
                  החלטות מבוססות נתונים
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  ידע וניתוח המבוסס על מעל ל-8 שנות מחקר, ניתוח וניסיון אישי. מספרים ולא תחושות.
                </p>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
