import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageCircle } from "lucide-react";

const Footer = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <section id="contact" className="py-24 bg-secondary">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-display text-4xl md:text-5xl text-foreground mb-4">
              אל תישאר מאחור
            </h2>
            <p className="text-xl text-primary font-bold mb-10">
              הצטרף לעדר המנצח.
            </p>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <Input
                placeholder="שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right"
              />
              <Input
                type="tel"
                placeholder="טלפון"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-card border-border text-foreground placeholder:text-muted-foreground h-12 text-right"
              />
              <Select>
                <SelectTrigger className="bg-card border-border text-foreground h-12">
                  <SelectValue placeholder="אני מעוניין ב..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sell">מכירה</SelectItem>
                  <SelectItem value="buy">קנייה</SelectItem>
                  <SelectItem value="invest">השקעה</SelectItem>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12 text-lg"
              >
                שלחו לי פרטים
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Bottom footer */}
      <footer className="py-6 border-t border-border">
        <div className="container mx-auto px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} קרנף נדל"ן. כל הזכויות שמורות.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/972500000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 flex items-center gap-2 bg-[#25D366] hover:bg-[#1da851] text-white font-bold px-5 py-3 rounded-full shadow-lg transition-colors duration-300"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">דברו עם הקרנף</span>
      </a>
    </>
  );
};

export default Footer;
