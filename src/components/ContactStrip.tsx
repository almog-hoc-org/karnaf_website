import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ContactStrip = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim() || !email.trim()) {
      toast({ title: "נא למלא שם, טלפון ואימייל", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { name, phone, email, service, message, source: "contact-strip" },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({ title: "הפרטים נשלחו בהצלחה!", description: "ניצור איתך קשר בהקדם." });
    } catch (err) {
      console.error("Lead submit error:", err);
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או צרו קשר בוואטסאפ.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
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
    <section className="relative -mt-12 md:-mt-16 z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-4 md:p-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="hidden md:block">
              <h3 className="text-foreground font-bold text-lg">הרשמו לוובינר הבא שלנו</h3>
              <p className="text-muted-foreground text-sm">השאירו פרטים ונחזור אליכם בהקדם</p>
            </div>
          </div>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-4"
            >
              <CheckCircle className="w-8 h-8 text-primary" />
              <div>
                <p className="text-foreground font-bold">תודה רבה!</p>
                <p className="text-muted-foreground text-sm">ניצור איתך קשר בהקדם</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
              <div className="flex flex-col">
                <label htmlFor="contact-name" className="sr-only">שם מלא</label>
                <Input
                  id="contact-name"
                  placeholder="שם מלא *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-11 md:h-12 focus:border-primary/50 transition-colors text-right"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-phone" className="sr-only">טלפון</label>
                <Input
                  id="contact-phone"
                  type="tel"
                  dir="rtl"
                  placeholder="טלפון *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-11 md:h-12 focus:border-primary/50 transition-colors text-right"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-email" className="sr-only">אימייל</label>
                <Input
                  id="contact-email"
                  type="email"
                  placeholder="אימייל *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-11 md:h-12 focus:border-primary/50 transition-colors text-right"
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="contact-service" className="sr-only">בחירת שירות</label>
                <Select value={service} onValueChange={setService}>
                  <SelectTrigger id="contact-service" className="bg-background/50 border-border/50 text-foreground h-11 md:h-12 text-right">
                    <SelectValue placeholder="אני מעוניין ב..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="derech">תוכנית "הדרך לדירה"</SelectItem>
                    <SelectItem value="webinar">וובינר</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col sm:col-span-2 lg:col-span-1">
                <label htmlFor="contact-message" className="sr-only">הודעה חופשית</label>
                <Textarea
                  id="contact-message"
                  placeholder="הודעה חופשית (אופציונלי)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={1}
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-11 md:h-12 focus:border-primary/50 transition-colors resize-none min-h-[2.75rem]"
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 md:h-12 text-base gap-2 sm:col-span-2 lg:col-span-1"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  <>
                    <Send size={16} />
                    בואו נדבר
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactStrip;
