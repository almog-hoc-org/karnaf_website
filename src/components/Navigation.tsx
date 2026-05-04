import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import karnafLogo from "@/assets/mascot/karnaf-logo.png";

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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  // Routes whose hero starts on a cinematic dark background.
  // When the user has not scrolled yet on these, the nav text is light.
  const darkHeroPrefixes = ["/course", "/preview/v2"];
  const isDarkHeroPage =
    location.pathname === "/" ||
    darkHeroPrefixes.some((p) => location.pathname.startsWith(p));
  const useLightText = isDarkHeroPage && !isScrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "py-3 shadow-depth-2"
            : "py-5"
        }`}
        style={{
          backgroundColor: isScrolled
            ? "hsl(var(--background) / 0.85)"
            : isDarkHeroPage
              ? "hsl(217 50% 8% / 0.30)"
              : "hsl(var(--background) / 0.75)",
          borderBottom: isScrolled
            ? "1px solid hsl(var(--border))"
            : isDarkHeroPage
              ? "1px solid hsl(36 33% 95% / 0.10)"
              : "1px solid hsl(var(--border) / 0.4)",
          backdropFilter: "blur(16px) saturate(1.6)",
          WebkitBackdropFilter: "blur(16px) saturate(1.6)",
        }}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" aria-label="קרנף נדל״ן — דף הבית">
            <img
              src={karnafLogo}
              alt="קרנף"
              className={`object-contain transition-all duration-500 ${isScrolled ? "w-8 h-8" : "w-11 h-11"}`}
            />
            <span className={`font-black tracking-tight transition-all duration-500 ${isScrolled ? "text-lg" : "text-xl"} ${useLightText ? "text-white" : "text-foreground"}`}>
              קרנף נדל״ן
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={`relative text-sm font-medium transition-colors duration-300 py-1 ${useLightText ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"}`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
                    isActive(item.to) ? "bg-accent scale-x-100" : "bg-transparent scale-x-0"
                  }`}
                />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
              <Button
                className="btn-polygon bg-accent text-accent-foreground font-bold gap-2 px-8 py-2.5"
              >
                <MessageCircle size={16} />
                בואו נדבר
              </Button>
            </a>
          </div>

          {/* Hamburger — animated 3 lines */}
          <button
            className={`lg:hidden relative w-8 h-6 flex flex-col justify-between transition-colors ${useLightText ? "text-white" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMenuOpen}
          >
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMenuOpen ? "rotate-[-45deg] translate-y-[1px]" : ""}`} />
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMenuOpen ? "rotate-[45deg] -translate-y-[1px]" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Full-Screen Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 lg:hidden bg-background/98 backdrop-blur-xl flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-2xl font-bold transition-colors ${
                      isActive(item.to) ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="pt-4"
              >
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <Button className="btn-polygon bg-accent text-accent-foreground font-bold gap-2 px-10 py-3 text-lg">
                    <MessageCircle size={18} />
                    בואו נדבר
                  </Button>
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
