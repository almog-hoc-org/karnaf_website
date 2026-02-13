import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Instagram, Facebook, Youtube, Music } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "972559966175";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/karnaf_nadlan/", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61563350768976", label: "Facebook" },
  { icon: Youtube, href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F", label: "YouTube" },
  { icon: Music, href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8", label: "Spotify Podcast" },
];

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }

    const serviceLabel =
      service === "derech" ? "הדרך לדירה" :
      service === "premium" ? "ליווי קרנף פרימיום" :
      service === "both" ? "שניהם" : "לא צוין";

    const message = `🦏 ליד חדש מהאתר!\n\nשם: ${name}\nטלפון: ${phone}\nשירות: ${serviceLabel}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({ title: "הפרטים נשלחו בהצלחה! 🎉", description: "ניצור איתך קשר בהקדם." });
    setName("");
    setPhone("");
    setService("");
  };

  return (
    <>
      <section id="contact" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-display text-4xl md:text-5xl text-foreground mb-4">
              אל תישאר מאחור
            </h2>
            <p className="text-xl text-primary font-bold mb-10">
              הצטרף לעדר המנצח.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right"
              />
              <Input
                type="tel"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right"
              />
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="bg-card border-border text-foreground h-12">
                  <SelectValue placeholder="אני מעוניין ב..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="derech">תוכנית "הדרך לדירה"</SelectItem>
                  <SelectItem value="premium">ליווי קרנף פרימיום</SelectItem>
                  <SelectItem value="both">שניהם</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg"
              >
                שלחו לי פרטים
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Bottom footer */}
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} קרנף נדל"ן. כל הזכויות שמורות.
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
              {/* TikTok custom icon */}
              <a
                href="https://www.tiktok.com/@karnaf.nadlan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-colors duration-300"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">דברו עם הקרנף</span>
      </a>
    </>
  );
};

export default Footer;
