import { Link } from "react-router-dom";

const FooterBar = () => (
  <footer className="py-8 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="font-black text-primary text-xl tracking-tight hover:opacity-80 transition-opacity">
          KARNAF
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          <Link to="/services" className="hover:text-primary transition-colors">שירותים</Link>
          <Link to="/blog" className="hover:text-primary transition-colors">בלוג</Link>
          <Link to="/about" className="hover:text-primary transition-colors">אודות</Link>
          <Link to="/contact" className="hover:text-primary transition-colors">צור קשר</Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} קרנף נדל"ן. כל הזכויות שמורות.
        </div>
      </div>
    </div>
  </footer>
);

export default FooterBar;
