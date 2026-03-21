import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
        <title>404 — העמוד לא נמצא | קרנף נדל"ן</title>
      </Helmet>

      <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center px-6"
        >
          <img
            src={mascotWelcome}
            alt="קרנף" className="h-[200px] object-contain mx-auto mb-4 mascot-glow"
          />

          <div className="text-8xl md:text-9xl font-black text-primary mb-4"
          >
            404
          </div>

          <h1 className="text-display text-3xl md:text-4xl text-foreground mb-4">
            העמוד לא נמצא
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            נראה שהגעתם לכתובת שלא קיימת. אל דאגה — אפשר לחזור לדף הבית.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
                <Home size={18} />
                חזרה לדף הבית
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-bold gap-2">
                צרו קשר
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
