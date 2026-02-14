import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import heroImage from "@/assets/hero-city.jpg";
import ParticlesBackground from "./ParticlesBackground";
import { WHATSAPP_NUMBER } from "@/lib/constants";

const headlineWords = ["להרוויח", "בנדל\"ן", "זה", "לא", "מזל."];

const wordVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: 0.3 + i * 0.12,
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

const Hero = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background - Layer 1 */}
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale }}>
        <img
          src={heroImage}
          alt="קו רקיע עירוני מודרני"
          className="w-full h-[120%] object-cover -mt-[10%]"
          style={{ willChange: "transform" }}
        />
      </motion.div>

      {/* Gradient overlay - Layer 2 */}
      <div className="absolute inset-0 bg-gradient-to-l from-background via-background/85 to-background/60 z-[0]" />

      {/* Particles - Layer 3 */}
      <ParticlesBackground />

      {/* Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" style={{ animationDelay: "3s" }} />

      {/* Content Grid */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 container mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center"
      >
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

          {/* Word-by-word headline */}
          <h1 className="text-display text-5xl md:text-6xl lg:text-7xl text-foreground mb-2">
            {headlineWords.map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block ml-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-display text-5xl md:text-6xl lg:text-7xl text-primary text-glow mb-6"
          >
            זה מדע מדויק.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed mb-8"
          >
            קרנף נדל"ן מלווים משקיעים ורוכשי דירות ראשונות עם שיטה מבוססת נתונים.
            בין אם אתם בתחילת הדרך או משקיעים מנוסים — יש לנו את הפתרון בדיוק בשבילכם.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/course">
              <Button
                size="lg"
                className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-8 py-6"
              >
                לתוכנית "הדרך לדירה"
              </Button>
            </Link>
            <Link to="/premium">
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 font-bold text-lg px-8 py-6 backdrop-blur-sm"
              >
                לליווי קרנף פרימיום
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Form Side (Left in RTL) */}
        <motion.div
          initial={{ opacity: 0, x: -40, rotateY: -5 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card/60 backdrop-blur-2xl border border-border/50 rounded-2xl p-8 shadow-2xl gradient-border"
        >
          <h3 className="text-heading text-2xl text-foreground mb-2">רוצים שנחזור אליכם?</h3>
          <p className="text-muted-foreground text-sm mb-6">השאירו פרטים ונציג יחזור אליכם תוך דקות</p>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 py-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              >
                <CheckCircle className="w-16 h-16 text-primary" />
              </motion.div>
              <p className="text-foreground text-xl font-bold">תודה רבה!</p>
              <p className="text-muted-foreground text-sm">ניצור איתך קשר בהקדם</p>
            </motion.div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 }}>
                <Input
                  placeholder="שם מלא"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
                <Input
                  type="tel"
                  placeholder="טלפון"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.9 }}>
                <Input
                  type="email"
                  placeholder="אימייל"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground h-12 focus:border-primary/50 transition-colors"
                />
              </motion.div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }}>
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
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg gap-2"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  ) : (
                    <>
                      <Send size={18} />
                      שלחו לי פרטים
                    </>
                  )}
                </Button>
              </motion.div>
            </form>
          )}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator - Mouse icon */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-1">
          <motion.div
            className="w-1.5 h-1.5 bg-primary rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
