import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useGsapReveal } from "@/hooks/use-gsap-reveal";

const WebinarSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const contentRef = useGsapReveal<HTMLDivElement>({ y: 30, stagger: 0.12 });

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
    <section className="py-16 md:py-24 bg-primary relative overflow-hidden grain-texture">
      <div className="container mx-auto px-5 md:px-6 relative z-10">
        <div ref={contentRef} className="max-w-2xl mx-auto text-center">
          <h2 className="text-display text-display-md text-primary-foreground mb-4">
            השיעור שהיה חוסך לכם{" "}
            <span className="text-accent">שנים של טעויות</span>
          </h2>

          <p className="text-primary-foreground/70 text-lg mb-10">
            הירשמו לוובינר הבא שלנו — בחינם, ובלי התחייבות.
          </p>

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
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
              <Input
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-xl"
              />
              <Input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-xl"
              />
              <Input
                type="tel"
                placeholder="טלפון"
                dir="ltr"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-white border-white/20 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-xl"
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-polygon bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg gap-2"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    הירשמו עכשיו — בחינם
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default WebinarSection;
