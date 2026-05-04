import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, CheckCircle, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_NUMBER, socialLinks, TIKTOK_URL } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/v2/Reveal";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { name, phone, service, source: "footer" },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({ title: "הפרטים נשלחו בהצלחה!", description: "ניצור איתך קשר בהקדם." });
    } catch (err) {
      console.error("Lead submit error:", err);
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או צרו קשר בוואטסאפ.", variant: "destructive" });
    }

    setTimeout(() => {
      setName("");
      setPhone("");
      setService("");
      setIsSubmitted(false);
    }, 3000);
  };

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
            <p className="text-display-sm font-bold text-accent leading-snug mb-10">
              השאירו פרטים ונתחיל לדבר.
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
                  <CheckCircle className="w-16 h-16 text-accent" />
                </motion.div>
                <p className="text-foreground text-xl font-bold">תודה רבה!</p>
                <p className="text-muted-foreground">ניצור איתך קשר בהקדם</p>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  autoComplete="name"
                  placeholder="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-card border-border h-14 px-5 rounded-full text-right"
                />
                <Input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="טלפון"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-card border-border h-14 px-5 rounded-full text-right"
                />
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-card border-border h-14 px-5 rounded-full">
                    <SelectValue placeholder="אני מעוניין ב..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="derech">תוכנית "הדרך לדירה"</SelectItem>
                    <SelectItem value="webinar">וובינר</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg gap-2 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.35)]"
                >
                  <Send size={18} />
                  בואו נדבר — בלי התחייבות
                </Button>
              </form>
            )}
          </Reveal>

          <Reveal delay={0.15}>
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">דרכי יצירת קשר</h3>

              <div className="space-y-3 mb-10">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border hover:border-accent/40 transition-all duration-200 group"
                >
                  <div className="w-11 h-11 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                    <MessageCircle size={20} className="text-[#25D366]" />
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
