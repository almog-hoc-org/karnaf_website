import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "דף הבית", href: "/" },
    { label: "נכסים למכירה", href: "#properties" },
    { label: "שירותי הבית", href: "#services" },
    { label: "סיפורו של קרנף", href: "#about" },
    { label: "צור קשר", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo - Right side in RTL */}
        <div className="text-2xl font-black text-primary tracking-tight">
          KARNAF
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA - Left side in RTL */}
        <div className="hidden lg:block">
          <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
            <Phone size={16} />
            שיחת ייעוץ מהירה
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <div className="container mx-auto px-6 py-6 space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
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
