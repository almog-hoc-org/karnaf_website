import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle, Send, CheckCircle, Phone, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_NUMBER, socialLinks, TIKTOK_URL } from "@/lib/constants";
import { supabase } from "@/integrations/supabase/client";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast({ title: "נא למלא שם, טלפון ואימייל", variant: "destructive" });
      return;
    }

    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { name, phone, email, service, message, source: "footer" },
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
      setEmail("");
      setService("");
      setMessage("");
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-10 md:py-16 bg-secondary relative overflow-hidden">
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
              נשמח להכיר אתכם
            </h2>
            <p className="text-xl text-primary font-bold mb-10">
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
                  <CheckCircle className="w-16 h-16 text-green-500" />
                </motion.div>
                <p className="text-foreground text-xl font-bold">תודה רבה!</p>
                <p className="text-muted-foreground">ניצור איתך קשר בהקדם</p>
              </motion.div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <Input
                  placeholder="שם מלא *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right focus:border-primary/50 transition-colors"
                />
                <Input
                  type="tel"
                  placeholder="טלפון *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right focus:border-primary/50 transition-colors"
                />
                <Input
                  type="email"
                  placeholder="אימייל *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right focus:border-primary/50 transition-colors"
                />
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger className="bg-card border-border text-foreground h-12 text-right">
                    <SelectValue placeholder="אני מעוניין ב..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="derech">תוכנית "הדרך לדירה"</SelectItem>
                    <SelectItem value="webinar">וובינר</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="הודעה חופשית (אופציונלי)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="bg-card border-border text-foreground placeholder:text-muted-foreground text-right focus:border-primary/50 transition-colors resize-none"
                />
                <Button
                  type="submit"
                  className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg gap-2"
                >
                  <Send size={18} />
                  בואו נדבר
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
                className="flex items-center gap-4 p-4 bg-card/80 rounded-xl border border-border hover:border-primary/30 transition-colors group shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                  <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <div>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">דברו איתנו עכשיו</p>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 bg-card/80 rounded-xl border border-border shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Phone size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">טלפון</p>
                  <p className="text-sm text-muted-foreground" dir="ltr">055-996-6175</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card/80 rounded-xl border border-border shadow-sm">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail size={20} className="text-primary" />
                </div>
                <div>
                  <p className="text-foreground font-medium">אימייל</p>
                  <p className="text-sm text-muted-foreground">karnaf.yazamut@gmail.com</p>
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
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:bg-purple-500/20 hover:text-purple-600 hover:border-purple-500/50 transition-all duration-300"
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
  );
};

export default Footer;
