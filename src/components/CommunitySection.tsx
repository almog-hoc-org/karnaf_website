import { motion } from "framer-motion";
import { Instagram, Facebook, Youtube, Music } from "lucide-react";

const platforms = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/karnaf_nadlan/",
    color: "from-pink-500 to-purple-600",
    hoverBorder: "hover:border-pink-500/50",
    description: "תוכן יומי, טיפים ועדכוני שוק",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61563350768976",
    color: "from-blue-500 to-blue-700",
    hoverBorder: "hover:border-blue-500/50",
    description: "קהילה, שאלות ודיונים",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F",
    color: "from-red-500 to-red-700",
    hoverBorder: "hover:border-red-500/50",
    description: "סרטוני הסבר וניתוחי שוק",
  },
  {
    icon: Music,
    label: "Spotify",
    href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8",
    color: "from-green-500 to-green-700",
    hoverBorder: "hover:border-green-500/50",
    description: "פודקאסט — שיחות על נדל״ן",
  },
];

const CommunitySection = () => {
  return (
    <section className="py-14 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-display text-3xl md:text-4xl text-center text-foreground mb-12"
        >
          הצטרפו <span className="text-gradient">לקהילה שלנו</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, i) => (
            <motion.a
              key={platform.label}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              className={`group bg-card border border-border rounded-2xl p-6 text-center transition-all duration-300 ${platform.hoverBorder}`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} text-white mb-4 group-hover:shadow-lg transition-shadow`}>
                <platform.icon size={28} />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-1">{platform.label}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{platform.description}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
