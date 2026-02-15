import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import mascotWelcome from "@/assets/mascot/mascot-welcome.png";

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center px-6"
      >
        {/* Mascot */}
        <motion.img
          src={mascotWelcome}
          alt="קרנף"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: "spring" }}
          className="h-[200px] object-contain mx-auto mb-4 mascot-crop-text mascot-glow"
        />

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-8xl md:text-9xl font-black text-primary text-glow mb-4"
        >
          404
        </motion.div>

        <h1 className="text-display text-3xl md:text-4xl text-foreground mb-4">
          העמוד לא נמצא
        </h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          נראה שהגעתם לכתובת שלא קיימת. אל דאגה — אפשר לחזור לדף הבית.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2">
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
      </motion.div>
    </div>
  );
};

export default NotFound;
