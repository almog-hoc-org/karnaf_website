import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import karnafLogo from "@/assets/mascot/karnaf-logo.svg";

const navItems = [
  { label: "דף הבית", to: "/" },
  { label: "הדרך לדירה", to: "/course" },
  { label: "סיפורו של קרנף", to: "/about" },
  { label: "סיפורי הצלחה", to: "/testimonials" },
  { label: "צור קשר", to: "/contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  // Pages with dark hero backgrounds need light nav text when not scrolled
  const isDarkHeroPage = location.pathname === "/course";
  const useLightText = isDarkHeroPage && !isScrolled;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-3"
          : isDarkHeroPage
            ? "bg-transparent backdrop-blur-sm py-5"
            : "bg-background/40 backdrop-blur-md py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/" className="flex items-center gap-2">
            <img
              src={karnafLogo}
              alt="קרנף"
              className={`object-contain transition-all duration-300 ${isScrolled ? "w-8 h-8" : "w-10 h-10"}`}
            />
            <span className={`font-black tracking-tight transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"} ${useLightText ? "text-white" : "text-foreground"}`}>
              קרנף נדל״ן
            </span>
          </Link>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className={`relative text-sm font-medium transition-colors duration-300 py-1 ${useLightText ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-accent"}`}
            >
              {item.label}
              {isActive(item.to) && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <Button className="btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2">
              <MessageCircle size={16} />
              בואו נדבר
            </Button>
          </a>
        </div>

        <button
          className={`lg:hidden transition-colors ${useLightText ? "text-white hover:text-white/80" : "text-foreground hover:text-accent"}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="container mx-auto px-6 py-6 space-y-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.to}
                    className={`block text-base font-medium transition-colors py-3 border-b border-border/50 ${
                      isActive(item.to) ? "text-accent" : "text-muted-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full btn-glow bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2">
                    <MessageCircle size={16} />
                    בואו נדבר
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
