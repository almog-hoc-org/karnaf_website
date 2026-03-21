import { Instagram, Facebook, Youtube, Music } from "lucide-react";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

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
  const headerRef = useGsapReveal<HTMLHeadingElement>({ y: 30 });
  const cardsRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.1 });

  return (
    <section className="py-8 md:py-14 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <h2
          ref={headerRef}
          className="text-display text-display-md text-center text-foreground mb-4 md:mb-8"
        >
          הצטרפו <span className="text-gradient">לקהילה שלנו</span>
        </h2>

        <div ref={cardsRef} className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-4xl mx-auto">
          {platforms.map((platform) => (
            <a
              key={platform.label}
              href={platform.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group bg-card border border-border rounded-2xl p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-depth-2 ${platform.hoverBorder}`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${platform.color} text-white mb-4 group-hover:shadow-lg transition-shadow`}>
                <platform.icon size={28} />
              </div>
              <h3 className="text-foreground font-bold text-sm mb-1">{platform.label}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{platform.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
