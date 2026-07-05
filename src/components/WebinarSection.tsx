import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { submitWebsiteLead } from "@/lib/leadSubmission";
import { SectionDark } from "@/components/v2/Section";
import { Reveal } from "@/components/v2/Reveal";

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
      await submitWebsiteLead({ name, phone, email, service: "webinar", source: "webinar-section" });

      setIsSubmitted(true);
      toast({ title: "נרשמתם בהצלחה!", description: "נשלח לכם פרטים בקרוב." });
    } catch {
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
    <SectionDark size="md" glow="bottom">
      <div className="container mx-auto px-5 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <Reveal>
            <h2 className="text-display-md md:text-display-lg font-black text-white mb-5 leading-[0.98] tracking-tight">
              השיעור שהיה חוסך לכם{" "}
              <span className="text-accent">שנים של טעויות</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p
              className="text-body-lg mb-10 leading-relaxed"
              style={{ color: "hsl(36 33% 95% / 0.72)" }}
            >
              הירשמו לוובינר הבא שלנו — בחינם, ובלי התחייבות.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-8"
              >
                <CheckCircle className="w-10 h-10 text-accent" />
                <div className="text-right">
                  <p className="text-white font-bold text-lg">נרשמתם בהצלחה!</p>
                  <p className="text-white/60 text-sm">נשלח לכם פרטים בקרוב</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
                <Input
                  autoComplete="name"
                  placeholder="שם מלא"
                  aria-label="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
                />
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="אימייל"
                  aria-label="כתובת אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
                />
                <Input
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="טלפון"
                  aria-label="מספר טלפון"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  className="bg-white/95 border-white/10 text-foreground placeholder:text-muted-foreground h-14 text-right rounded-full px-6"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold h-14 text-lg gap-2 rounded-full shadow-[0_0_60px_hsl(var(--accent)/0.45)]"
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
          </Reveal>
        </div>
      </div>
    </SectionDark>
  );
};

export default WebinarSection;
