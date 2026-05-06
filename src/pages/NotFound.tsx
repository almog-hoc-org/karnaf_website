import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight } from "lucide-react";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";
import { Reveal } from "@/components/v2/Reveal";

const NotFound = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>404 — העמוד לא נמצא | קרנף נדל"ן</title>
      </Head>

      <div className="min-h-[85svh] flex items-center justify-center relative overflow-hidden bg-background">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          aria-hidden
          style={{
            background:
              "radial-gradient(60% 60% at 50% 40%, hsl(24 80% 52% / 0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative text-center px-6 max-w-2xl">
          <Reveal>
            <img
              src={mascotWelcome}
              alt="קרנף"
              className="h-[180px] object-contain mx-auto mb-6 drop-shadow-[0_30px_60px_rgba(0,0,0,0.18)]"
            />
          </Reveal>

          <Reveal delay={0.08}>
            <div className="font-mono text-display-xl font-black text-accent leading-none mb-6 tabular-nums">
              404
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <h1 className="text-display-md md:text-display-lg font-black text-foreground mb-4 leading-[0.98] tracking-tight">
              העמוד לא נמצא
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-body-lg text-muted-foreground mb-10 max-w-md mx-auto leading-relaxed">
              נראה שהגעתם לכתובת שלא קיימת. אל דאגה — אפשר לחזור לדף הבית.
            </p>
          </Reveal>

          <Reveal delay={0.28}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/">
                <Button className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full px-8 py-5 shadow-[0_0_60px_hsl(var(--accent)/0.35)]">
                  <Home size={18} />
                  חזרה לדף הבית
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  variant="outline"
                  className="border-primary/40 text-primary hover:bg-primary hover:text-primary-foreground font-bold gap-2 rounded-full px-8 py-5"
                >
                  צרו קשר
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  );
};

export default NotFound;
