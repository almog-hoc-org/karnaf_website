import { Instagram, Facebook, Youtube, Music } from "lucide-react";
import { Reveal } from "@/components/v2/Reveal";

const platforms = [
  {
    icon: Instagram,
    label: "Instagram",
    href: "https://www.instagram.com/karnaf_nadlan/",
    description: "תוכן יומי, טיפים ועדכוני שוק",
  },
  {
    icon: Facebook,
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61563350768976",
    description: "קהילה, שאלות ודיונים",
  },
  {
    icon: Youtube,
    label: "YouTube",
    href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F",
    description: "סרטוני הסבר וניתוחי שוק",
  },
  {
    icon: Music,
    label: "Spotify",
    href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8",
    description: "פודקאסט — שיחות על נדל״ן",
  },
];

const CommunitySection = () => {
  return (
    <section className="relative py-section-md bg-background overflow-hidden">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal>
          <h2 className="text-display-md md:text-display-lg font-black text-center text-foreground mb-10 md:mb-14 leading-[1] tracking-tight">
            הצטרפו <span className="text-accent">לקהילה שלנו</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {platforms.map((platform, i) => (
            <Reveal key={platform.label} delay={i * 0.08}>
              <a
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full block p-5 md:p-6 rounded-2xl bg-card border border-border/50 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-depth-2"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/[0.04] text-primary group-hover:bg-accent group-hover:text-accent-foreground transition-colors mb-4">
                  <platform.icon size={22} />
                </div>
                <h3 className="text-foreground font-bold text-base mb-1">{platform.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {platform.description}
                </p>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
