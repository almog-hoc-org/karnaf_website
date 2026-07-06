import { Link } from "react-router-dom";

const FooterBar = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          to="/"
          className="inline-flex items-center font-black text-primary text-xl tracking-tight hover:opacity-80 transition-opacity min-h-[44px] px-2 -mx-2"
        >
          קרנף נדל״ן
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2 text-sm text-muted-foreground flex-wrap justify-center">
          <Link
            to="/course"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            הדרך לדירה
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            אודות
          </Link>
          <Link
            to="/testimonials"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            סיפורי הצלחה
          </Link>
          <Link
            to="/premium"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            ליווי משקיעים
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            צור קשר
          </Link>
          <Link
            to="/privacy"
            className="inline-flex items-center min-h-[44px] px-3 hover:text-primary transition-colors rounded-md"
          >
            פרטיות
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} קרנף נדל"ן. כל הזכויות שמורות.
        </div>
      </div>
    </div>
  </footer>
);

export default FooterBar;
