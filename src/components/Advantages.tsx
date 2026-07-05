import { Instagram, Facebook, Youtube, Music } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import { Reveal } from "@/components/v2/Reveal";
import { TiltCard } from "@/components/v2/TiltCard";

const communityLinks = [
  { icon: Instagram, href: "https://www.instagram.com/karnaf_nadlan/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61563350768976", label: "Facebook" },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
      </svg>
    ),
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
    label: "WhatsApp",
  },
  { icon: Youtube, href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F", label: "YouTube" },
  { icon: Music, href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8", label: "Spotify" },
];

const advantages = [
  {
    num: "01",
    title: "קהילת הנדל״ן מהגדולות בישראל",
    description: "עשרות אלפי עוקבים ותלמידים ברשתות השונות",
    extra: "community",
  },
  {
    num: "02",
    title: "הדרך לדירה",
    description:
      "תוכנית הליווי המקצועית בישראל שתעזור לכם לזהות עסקאות מצוינות, לקבל החלטות נכונות ולהרגיש בטוחים בכל צעד",
  },
  {
    num: "03",
    title: "החלטות מבוססות נתונים",
    description:
      "ידע וניתוח המבוסס על מעל ל-8 שנות מחקר, ניתוח וניסיון אישי. מספרים ולא תחושות.",
  },
];

const Advantages = () => {
  return (
    <section className="relative py-section-lg bg-background overflow-hidden">
      <div className="container mx-auto px-5 md:px-6 relative">
        <div className="max-w-3xl mb-10 md:mb-16">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black leading-[0.98] tracking-tight text-foreground">
              למה <span className="text-accent">קרנף?</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-10 lg:gap-14">
          {advantages.map((item, i) => (
            <Reveal key={item.num} delay={i * 0.12}>
              <TiltCard max={4} className="h-full">
                <article className="border-t border-primary pt-6 h-full flex flex-col">
                  <div className="font-mono text-display-md font-black text-accent leading-none mb-5">
                    {item.num}
                  </div>
                  <h3 className="text-2xl font-bold text-primary mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-body text-muted-foreground leading-[1.85] mb-6">
                    {item.description}
                  </p>
                  {item.extra === "community" && (
                    <div className="flex items-center gap-3 mt-auto">
                      {communityLinks.map((link) => (
                        <a
                          key={link.label}
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-11 h-11 rounded-full border border-primary/20 flex items-center justify-center text-primary/70 hover:text-accent hover:border-accent/50 hover:bg-accent/5 transition-all duration-200"
                          aria-label={link.label}
                        >
                          <link.icon size={18} />
                        </a>
                      ))}
                    </div>
                  )}
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Advantages;
