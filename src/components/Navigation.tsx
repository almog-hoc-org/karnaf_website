import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, ChevronDown, GraduationCap, Crown } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import mascotLogo from "@/assets/mascot/mascot-pointing.png";

const navItems = [
  { label: "דף הבית", to: "/" },
  {
    label: "השירותים שלנו",
    to: "/services",
    children: [
      { label: 'תוכנית "הדרך לדירה"', to: "/course", icon: GraduationCap },
      { label: "ליווי קרנף פרימיום", to: "/premium", icon: Crown },
    ],
  },
  { label: "סיפורו של קרנף", to: "/about" },
  { label: "ידע ותובנות", to: "/blog" },
  { label: "סיפורי הצלחה", to: "/testimonials" },
  { label: "צור קשר", to: "/contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border shadow-sm py-3"
          : "bg-background/40 backdrop-blur-md py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img
              src={mascotLogo}
              alt="קרנף"
              className={`rounded-full object-cover transition-all duration-300 ${isScrolled ? "w-7 h-7" : "w-9 h-9"}`}
            />
            <span className={`font-black text-primary tracking-tight transition-all duration-300 ${isScrolled ? "text-xl" : "text-2xl"}`}>
              KARNAF
            </span>
          </Link>
        </motion.div>

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.children && setOpenDropdown(item.label)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <Link
                to={item.to}
                className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300 py-1 flex items-center gap-1"
              >
                {item.label}
                {item.children && <ChevronDown size={14} className={`transition-transform duration-200 ${openDropdown === item.label ? "rotate-180" : ""}`} />}
                {isActive(item.to) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>

              <AnimatePresence>
                {item.children && openDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 w-64 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-50"
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.to}
                        to={child.to}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        <child.icon size={18} className="text-primary/70" />
                        <span>{child.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="hidden lg:block">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
            <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
              <MessageCircle size={16} />
              בואו נדבר
            </Button>
          </a>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
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
                <div key={item.label}>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={item.to}
                      className={`block text-base font-medium transition-colors py-3 border-b border-border/50 ${
                        isActive(item.to) ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>

                  {item.children && (
                    <div className="pr-6 space-y-0">
                      {item.children.map((child, ci) => (
                        <motion.div
                          key={child.to}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 + (ci + 1) * 0.03 }}
                        >
                          <Link
                            to={child.to}
                            className={`flex items-center gap-2 text-sm py-2.5 transition-colors ${
                              isActive(child.to) ? "text-primary" : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            <child.icon size={16} className="text-primary/70" />
                            {child.label}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
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
