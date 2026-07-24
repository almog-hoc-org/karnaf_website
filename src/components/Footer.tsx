import { MessageCircle, Phone, Mail } from "lucide-react";
import { socialLinks, TIKTOK_URL } from "@/lib/constants";
import { botLink } from "@/lib/whatsapp";
import ContactForm from "@/components/ContactForm";
import { Reveal } from "@/components/v2/Reveal";

const Footer = () => {
  return (
    <section
      id="contact"
      className="relative py-section-lg bg-background overflow-hidden"
    >
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 max-w-5xl mx-auto">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-foreground leading-[0.98] tracking-tight mb-3">
              נשמח להכיר אתכם
            </h2>
            <p className="text-display-sm font-bold text-muted-foreground leading-snug mb-10">
              השאירו פרטים ונתחיל לדבר.
            </p>

            <ContactForm source="footer" />
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h3 className="text-display-sm md:text-display-md font-black text-foreground mb-6 leading-[0.98] tracking-tight">דרכי יצירת קשר</h3>

              <div className="space-y-3 mb-10">
                <a
                  href={botLink("יצירת קשר")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[hsl(var(--whatsapp)/0.1)] flex items-center justify-center">
                    <MessageCircle size={20} className="text-[hsl(var(--whatsapp))]" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold leading-tight group-hover:text-accent transition-colors">
                      WhatsApp
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">דברו איתנו עכשיו</p>
                  </div>
                </a>

                <a
                  href="tel:+972559966175"
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                    <Phone size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold leading-tight group-hover:text-accent transition-colors">
                      טלפון
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5" dir="ltr">055-996-6175</p>
                  </div>
                </a>

                <a
                  href="mailto:karnaf.yazamut@gmail.com"
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                    <Mail size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold leading-tight group-hover:text-accent transition-colors">
                      אימייל
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">karnaf.yazamut@gmail.com</p>
                  </div>
                </a>
              </div>

              <div>
                <p className="text-eyebrow uppercase tracking-[0.18em] text-muted-foreground mb-4">
                  עקבו אחרינו
                </p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200"
                    >
                      <social.icon size={18} />
                    </a>
                  ))}
                  <a
                    href={TIKTOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    className="w-11 h-11 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent/50 transition-all duration-200"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Footer;
