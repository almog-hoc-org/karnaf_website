import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Instagram, Facebook, Youtube, Music, Send, CheckCircle, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const WHATSAPP_NUMBER = "972559966175";

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/karnaf_nadlan/", label: "Instagram", hoverColor: "hover:bg-pink-500/20 hover:text-pink-400 hover:border-pink-400/50" },
  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61563350768976", label: "Facebook", hoverColor: "hover:bg-blue-500/20 hover:text-blue-400 hover:border-blue-400/50" },
  { icon: Youtube, href: "https://www.youtube.com/@%D7%A7%D7%A8%D7%A0%D7%A3%D7%A0%D7%93%D7%9C%D7%9F", label: "YouTube", hoverColor: "hover:bg-red-500/20 hover:text-red-400 hover:border-red-400/50" },
  { icon: Music, href: "https://open.spotify.com/show/5aAgSHORYUNfYtxsxY3Dc8", label: "Spotify", hoverColor: "hover:bg-green-500/20 hover:text-green-400 hover:border-green-400/50" },
];

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
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

    setIsSubmitted(true);
    toast({ title: "הפרטים נשלחו בהצלחה!", description: "ניצור איתך קשר בהקדם." });

    setTimeout(() => {
      setName("");
      setPhone("");
      setService("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <>
      <section id="contact" className="py-24 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary via-secondary to-background" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-display text-4xl md:text-5xl text-foreground mb-4">
                אל תישאר מאחור
              </h2>
              <p className="text-xl text-primary font-bold mb-10">
                הצטרף לעדר המנצח.
              </p>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-4 py-12 bg-card/50 rounded-2xl border border-border"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </motion.div>
                  <p className="text-foreground text-xl font-bold">תודה רבה!</p>
                  <p className="text-muted-foreground">ניצור איתך קשר בהקדם</p>
                </motion.div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <Input
                    placeholder="שם מלא"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right focus:border-primary/50 transition-colors"
                  />
                  <Input
                    type="tel"
                    placeholder="טלפון"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right focus:border-primary/50 transition-colors"
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
                    className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg gap-2"
                  >
                    <Send size={18} />
                    שלחו לי פרטים
                  </Button>
                </form>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-heading text-2xl text-foreground mb-6">דרכי יצירת קשר</h3>

              <div className="space-y-4 mb-8">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border hover:border-primary/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle size={20} className="text-[#25D366]" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">WhatsApp</p>
                    <p className="text-sm text-muted-foreground">דברו איתנו עכשיו</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Phone size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">טלפון</p>
                    <p className="text-sm text-muted-foreground" dir="ltr">055-996-6175</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 bg-card/50 rounded-xl border border-border">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail size={20} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium">אימייל</p>
                    <p className="text-sm text-muted-foreground">karnaf.nadlan@gmail.com</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-3">עקבו אחרינו</p>
                <div className="flex items-center gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      whileHover={{ scale: 1.15, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground transition-all duration-300 ${social.hoverColor}`}
                    >
                      <social.icon size={18} />
                    </motion.a>
                  ))}
                  <motion.a
                    href="https://www.tiktok.com/@karnaf.nadlan"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-purple-500/20 hover:text-purple-400 hover:border-purple-400/50 transition-all duration-300"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.7a8.16 8.16 0 0 0 4.76 1.52v-3.4a4.85 4.85 0 0 1-1-.13z" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="py-8 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="font-black text-primary text-xl tracking-tight">KARNAF</div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} קרנף נדל"ן. כל הזכויות שמורות.
            </div>
          </div>
        </div>
      </footer>

      <motion.a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-colors duration-300"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">דברו עם הקרנף</span>
      </motion.a>
    </>
  );
};

export default Footer;
