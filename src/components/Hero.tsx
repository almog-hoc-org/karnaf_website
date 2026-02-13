import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-city.jpg";

const WHATSAPP_NUMBER = "972559966175";

const Hero = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
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

    // Send WhatsApp message with lead details
    const message = `🦏 ליד חדש מהאתר!\n\nשם: ${name}\nטלפון: ${phone}\nאימייל: ${email || "לא צוין"}\nשירות: ${serviceLabel}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    // Open WhatsApp in new tab
    window.open(whatsappUrl, "_blank");

    toast({ title: "הפרטים נשלחו בהצלחה! 🎉", description: "ניצור איתך קשר בהקדם." });
    setName("");
    setPhone("");
    setEmail("");
    setService("");
    setIsSubmitting(false);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <div className="absolute inset-0">
        <motion.img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
          style={{ willChange: "transform" }}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background via-background/80 to-background/50" />
      </div>

      {/* Content Grid */}
      <div className="relative z-10 container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text Side (Right in RTL) */}
        <div>
          <motion.p
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-bold text-sm tracking-widest uppercase mb-4"
          >
            KNOWLEDGE. STRATEGY. REAL ESTATE.
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-6"
          >
            להרוויח בנדל"ן זה לא מזל.{" "}
            <span className="text-primary">זה מדע מדויק.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8"
          >
            קרנף נדל"ן מלווים משקיעים ורוכשי דירות ראשונות עם שיטה מבוססת נתונים.
            בין אם אתם בתחילת הדרך או משקיעים מנוסים — יש לנו את הפתרון בדיוק בשבילכם.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#services">
              <Button
                size="lg"
                className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                לתוכנית "הדרך לדירה"
              </Button>
            </a>
            <a href="#services">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6"
              >
                לליווי קרנף פרימיום
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Form Side (Left in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-8 shadow-2xl"
        >
          <h3 className="text-heading text-2xl text-foreground mb-2">רוצים שנחזור אליכם?</h3>
          <p className="text-muted-foreground text-sm mb-6">השאירו פרטים ונציג יחזור אליכם תוך דקות</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              placeholder="שם מלא"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12"
            />
            <Input
              type="tel"
              placeholder="טלפון"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12"
            />
            <Input
              type="email"
              placeholder="אימייל"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background/50 border-border text-foreground placeholder:text-muted-foreground h-12"
            />
            <Select value={service} onValueChange={setService}>
              <SelectTrigger className="bg-background/50 border-border text-foreground h-12">
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
              className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg"
            >
              {isSubmitting ? "שולח..." : "שלחו לי פרטים"}
            </Button>
          </form>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
