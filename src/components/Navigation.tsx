import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "דף הבית", href: "#" },
    { label: "נכסים למכירה", href: "#properties" },
    { label: "שירותי הבית", href: "#services" },
    { label: "סיפורו של קרנף", href: "#about" },
    { label: "צור קשר", href: "#contact" },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-xl border-b border-border py-3"
          : "bg-background/40 backdrop-blur-md py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className={`font-black text-primary tracking-tight transition-all duration-300 ${isScrolled ? "text-xl" : "text-2xl"}`}>
          KARNAF
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
            <Phone size={16} />
            שיחת ייעוץ מהירה
          </Button>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className="block text-base font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 border-t border-border">
              <Button className="w-full btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
                <Phone size={16} />
                שיחת ייעוץ מהירה
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
