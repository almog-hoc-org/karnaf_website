import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroArchitecture from "@/assets/hero-architecture.jpg";
import mascotWelcome2 from "@/assets/mascot/mascot-welcome-2.png";

const BigCTA = () => {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroArchitecture}
          alt="ארכיטקטורה מודרנית"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-background/85" />
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
          "radial-gradient(circle at 20% 50%, hsl(25 100% 50% / 0.05) 0%, transparent 50%)",
          "radial-gradient(circle at 80% 50%, hsl(25 100% 50% / 0.05) 0%, transparent 50%)",
          "radial-gradient(circle at 20% 50%, hsl(25 100% 50% / 0.05) 0%, transparent 50%)"]

        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} />


      <div className="absolute top-10 left-10 w-32 h-32 border border-primary/10 rounded-full animate-float pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border border-primary/10 rounded-full animate-float pointer-events-none" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-bold text-sm tracking-widest mb-6">

        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-display text-3xl md:text-6xl lg:text-7xl text-foreground mb-3 md:mb-6">

          הדרך לדירה בדרך אליכם!{" "}
          <span className="text-primary text-glow-strong">
הירשמו לרשימת ההמתנה.</span>
        </motion.h2>

        <motion.p initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-4 md:mb-8">

          התוכנית המלאה בפינישים אחרונים — השאירו פרטים ותהיו הראשונים לשמוע כשיוצאים לאוויר!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}>

          <Link
            to="/course#waitlist">

            <Button
              size="lg"
              className="btn-glow animate-pulse-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-7 gap-3 shadow-2xl">

              שמרו לי מקום! 🔔
            </Button>
          </Link>
        </motion.div>

      </div>

      {/* Mascot decoration — outside content div to avoid text overlap */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden md:block absolute left-10 bottom-10 z-20 pointer-events-none">

        <motion.img
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src={mascotWelcome2}
          alt=""
          className="h-[300px] object-contain opacity-[0.25] mascot-fade-radial mascot-blend-overlay"
          loading="lazy" />

      </motion.div>
    </section>);

};

export default BigCTA;