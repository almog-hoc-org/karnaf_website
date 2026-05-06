import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Reveal } from "@/components/v2/Reveal";

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
    } catch {
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
    <section className="relative py-section-sm bg-background z-10">
      <div className="container mx-auto px-5 md:px-6">
        <Reveal>
          <div className="bg-card rounded-2xl shadow-depth-3 border border-border/40 p-6 md:p-10">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div>
                <h3 className="text-foreground font-bold text-xl md:text-2xl leading-tight">
                  הרשמו לוובינר הבא שלנו
                </h3>
                <p className="text-muted-foreground text-sm md:text-base mt-1">
                  השאירו פרטים ונחזור אליכם בהקדם
                </p>
              </div>
              <span
                aria-hidden
                className="hidden md:flex w-12 h-12 rounded-full items-center justify-center bg-accent/10 border border-accent/20"
              >
                <Send size={20} className="text-accent -translate-x-0.5" />
              </span>
            </div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-6"
              >
                <CheckCircle className="w-8 h-8 text-accent" />
                <div>
                  <p className="text-foreground font-bold">תודה רבה!</p>
                  <p className="text-muted-foreground text-sm">ניצור איתך קשר בהקדם</p>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4"
              >
                <div className="flex flex-col">
                  <label htmlFor="contact-name" className="sr-only">שם מלא</label>
                  <Input
                    id="contact-name"
                    autoComplete="name"
                    placeholder="שם מלא *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-background border-border h-12 px-4 rounded-xl text-right"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-phone" className="sr-only">טלפון</label>
                  <Input
                    id="contact-phone"
                    autoComplete="tel"
                    inputMode="tel"
                    type="tel"
                    dir="ltr"
                    placeholder="טלפון *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="bg-background border-border h-12 px-4 rounded-xl text-right"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-email" className="sr-only">אימייל</label>
                  <Input
                    id="contact-email"
                    autoComplete="email"
                    type="email"
                    placeholder="אימייל *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-background border-border h-12 px-4 rounded-xl text-right"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="contact-service" className="sr-only">בחירת שירות</label>
                  <Select value={service} onValueChange={setService}>
                    <SelectTrigger
                      id="contact-service"
                      dir="rtl"
                      className="bg-background border-border h-12 px-4 rounded-xl text-right"
                    >
                      <SelectValue placeholder="אני מעוניין ב..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="waitlist">רשימת המתנה — הדרך לדירה</SelectItem>
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
                    className="bg-background border-border h-12 px-4 py-3 rounded-xl resize-none min-h-[3rem] text-right"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 text-base gap-2 sm:col-span-2 lg:col-span-1 rounded-full"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send size={16} />
                      בואו נדבר
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default ContactStrip;
