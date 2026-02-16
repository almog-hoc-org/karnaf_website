import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const ContactStrip = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
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

    const serviceLabel =
      service === "derech" ? "הדרך לדירה" :
      service === "premium" ? "ליווי קרנף פרימיום" :
      service === "both" ? "שניהם" : "לא צוין";

    const message = `🦏 ליד חדש מהאתר!\n\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email || "לא צוין"}\nשירות: ${serviceLabel}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setIsSubmitted(true);
    toast({ title: "הפרטים נשלחו בהצלחה!", description: "ניצור איתך קשר בהקדם." });

    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setService("");
      setIsSubmitting(false);
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="relative -mt-16 z-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-card rounded-2xl p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-0">
            <div className="hidden md:block">
              <h3 className="text-foreground font-bold text-lg">נשמח להכיר אתכם</h3>
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
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
              <Input
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
              />
              <Input
                type="tel"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
              />
              <Input
                type="email"
                placeholder="אימייל"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
              />
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="bg-background/50 border-border/50 text-foreground h-12">
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
                disabled={isSubmitting}
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-base gap-2"
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
