import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import mascotPresenting from "@/assets/mascot/mascot-presenting.png";

const WebinarSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !phone.trim()) {
      toast({ title: "נא למלא שם וטלפון", variant: "destructive" });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("submit-lead", {
        body: { name, phone, email, service: "webinar", source: "webinar-section" },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast({ title: "נרשמתם בהצלחה!", description: "נשלח לכם פרטים בקרוב." });
    } catch (err) {
      console.error("Webinar submit error:", err);
      toast({ title: "שגיאה בשליחה", description: "נסו שוב או צרו קשר בוואטסאפ.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }

    setTimeout(() => {
      setName("");
      setEmail("");
      setPhone("");
      setIsSubmitted(false);
    }, 4000);
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-[hsl(217_40%_22%)]" />

      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute right-6 bottom-0 pointer-events-none hidden lg:block"
      >
        <img
          src={mascotPresenting}
          alt=""
          className="h-[280px] object-contain opacity-[0.3] drop-shadow-lg"
          loading="lazy"
        />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-display text-3xl md:text-4xl lg:text-5xl text-primary-foreground mb-4"
          >
            השיעור שהיה חוסך לכם{" "}
            <span className="text-accent">שנים של טעויות</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-primary-foreground/70 text-lg mb-10"
          >
            הירשמו לוובינר הבא שלנו — בחינם, ובלי התחייבות.
          </motion.p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-3 py-8"
            >
              <CheckCircle className="w-10 h-10 text-accent" />
              <div className="text-right">
                <p className="text-primary-foreground font-bold text-lg">נרשמתם בהצלחה!</p>
                <p className="text-primary-foreground/60 text-sm">נשלח לכם פרטים בקרוב</p>
              </div>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="space-y-4 max-w-md mx-auto"
            >
              <Input
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-12 text-right rounded-lg"
              />
              <Input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-12 text-right rounded-lg"
              />
              <Input
                type="tel"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-12 text-right rounded-lg"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-12 text-lg gap-2 rounded-lg"
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
                    הירשמו עכשיו — בחינם
                  </>
                )}
              </Button>
            </motion.form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebinarSection;
