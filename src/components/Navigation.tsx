import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, ChevronDown, GraduationCap, Users, Landmark } from "lucide-react";
import { botLink } from "@/lib/whatsapp";
import karnafLogo from "@/assets/mascot/karnaf-logo.png";

/* All commercial offerings live under one "השירותים שלנו" mini-menu. */
const serviceItems = [
  {
    label: "הדרך לדירה",
    description: "הקורס הדיגיטלי לרכישת דירה — ₪980",
    to: "/course",
    icon: GraduationCap,
  },
  {
    label: "ליווי משקיעים פרימיום",
    description: "ליווי אישי 1:1 בעסקת הרכישה שלכם",
    to: "/premium",
    icon: Users,
  },
  {
    label: "קרנף משכנתא",
    description: "ייעוץ משכנתא מבוסס נתונים",
    to: "/mortgage",
    icon: Landmark,
  },
];

const navItems = [
  { label: "דף הבית", to: "/" },
  { label: "מי אנחנו", to: "/about" },
  { label: "סיפורי הצלחה", to: "/testimonials" },
  { label: "בלוג", to: "/blog" },
  { label: "צור קשר", to: "/contact" },
];

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout>>();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setServicesOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Close the services dropdown on outside click / Escape
  useEffect(() => {
    if (!servicesOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!servicesRef.current?.contains(e.target as Node)) setServicesOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [servicesOpen]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleCloseServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const isActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };
  const isServiceActive = serviceItems.some((s) => isActive(s.to));

  // Routes whose hero starts on a cinematic dark background.
  // When the user has not scrolled yet on these, the nav text is light.
  const darkHeroPrefixes = ["/course", "/preview/v2"];
  const isDarkHeroPage =
    location.pathname === "/" ||
    darkHeroPrefixes.some((p) => location.pathname.startsWith(p));
  const useLightText = isDarkHeroPage && !isScrolled;

  const desktopLinkClass = `relative text-sm font-medium transition-colors duration-300 py-1 ${
    useLightText ? "text-white/80 hover:text-white" : "text-muted-foreground hover:text-foreground"
  }`;

  const underline = (active: boolean) => (
    <span
      className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full transition-all duration-300 ${
        active ? "bg-accent scale-x-100" : "bg-transparent scale-x-0"
      }`}
    />
  );

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
            <Link key="home" to="/" className={desktopLinkClass}>
              דף הבית
              {underline(isActive("/"))}
            </Link>

            {/* השירותים שלנו — mini-menu */}
            <div
              ref={servicesRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={scheduleCloseServices}
            >
              <button
                type="button"
                className={`${desktopLinkClass} inline-flex items-center gap-1`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen((v) => !v)}
              >
                השירותים שלנו
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                  aria-hidden
                />
                {underline(isServiceActive)}
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-full mt-3 w-80 rounded-2xl border border-border bg-card shadow-depth-3 p-2 text-right"
                    style={{ insetInlineStart: "-1rem" }}
                    role="menu"
                  >
                    {serviceItems.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        role="menuitem"
                        className={`flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary ${
                          isActive(item.to) ? "bg-secondary/70" : ""
                        }`}
                      >
                        <span className="mt-0.5 inline-flex w-9 h-9 rounded-full bg-accent/10 items-center justify-center text-accent flex-shrink-0">
                          <item.icon size={17} aria-hidden />
                        </span>
                        <span>
                          <span className="block font-bold text-foreground leading-tight">
                            {item.label}
                          </span>
                          <span className="block text-sm text-muted-foreground mt-0.5">
                            {item.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navItems.slice(1).map((item) => (
              <Link key={item.label} to={item.to} className={desktopLinkClass}>
                {item.label}
                {underline(isActive(item.to))}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <a href={botLink("שאלה כללית")} target="_blank" rel="noopener noreferrer">
              <Button
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full px-8 py-2.5"
              >
                <MessageCircle size={16} />
                בואו נדבר
              </Button>
            </a>
          </div>

          {/* Hamburger — animated 3 lines */}
          <button
            className={`lg:hidden relative -m-3 p-3 flex items-center justify-center transition-colors ${useLightText ? "text-white" : "text-foreground"}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            aria-expanded={isMenuOpen}
          >
            <span className="relative w-8 h-6 flex flex-col justify-between">
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMenuOpen ? "rotate-[-45deg] translate-y-[1px]" : ""}`} />
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-full h-0.5 bg-current transition-all duration-300 origin-right ${isMenuOpen ? "rotate-[45deg] -translate-y-[1px]" : ""}`} />
            </span>
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
            className="fixed inset-0 z-40 lg:hidden bg-background/95 backdrop-blur-xl flex flex-col justify-center items-center overflow-y-auto py-24"
          >
            <div className="flex flex-col items-center gap-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-2xl font-bold transition-colors ${
                    isActive("/") ? "text-accent" : "text-foreground hover:text-accent"
                  }`}
                >
                  דף הבית
                </Link>
              </motion.div>

              {/* Services group */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ delay: 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3 py-2"
              >
                <span className="text-eyebrow uppercase tracking-[0.24em] text-muted-foreground">
                  השירותים שלנו
                </span>
                {serviceItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-xl font-bold transition-colors ${
                      isActive(item.to) ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <span className="block w-10 h-px bg-border mt-1" aria-hidden />
              </motion.div>

              {navItems.slice(1).map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
                transition={{ delay: 0.45, duration: 0.4 }}
                className="pt-4"
              >
                <a href={botLink("שאלה כללית")} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full px-10 py-3 text-lg">
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
