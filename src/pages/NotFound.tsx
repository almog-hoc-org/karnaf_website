import { Link } from "react-router-dom";
import { Head } from "vite-react-ssg";
import { ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";

/* The pages a lost visitor most likely meant — one line each, no pitch. */
const destinations = [
  { to: "/course", title: "הקורס הדיגיטלי", body: "המדריך המעשי לרכישת דירה — לומדים לבד, בקצב שלכם" },
  { to: "/premium", title: "ליווי משקיעים 1:1", body: "אנליסט לצדכם, מהאסטרטגיה ועד החתימה" },
  { to: "/mortgage", title: "קרנף משכנתא", body: "תמהיל, מכרז בין בנקים ובדיקת מיחזור" },
  { to: "/blog", title: "הבלוג", body: "מדריכים ומאמרים לפני שקונים דירה" },
];

const NotFound = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>404 — העמוד לא נמצא | קרנף נדל״ן</title>
      </Head>

      <section className="relative overflow-hidden bg-background pt-28 pb-section-md md:pt-36">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden
          style={{
            background: "radial-gradient(55% 50% at 50% 20%, hsl(24 80% 52% / 0.10) 0%, transparent 70%)",
          }}
        />

        <div className="relative container mx-auto px-5 md:px-6 max-w-3xl">
          <div className="text-center rise-in">
            <img
              src={mascotWelcome}
              alt=""
              width={180}
              height={180}
              className="h-[150px] md:h-[180px] w-auto object-contain mx-auto mb-4 drop-shadow-[0_24px_48px_hsl(217_42%_15%/0.18)]"
            />
            <p className="font-mono text-display-lg text-[hsl(var(--accent-deep))] leading-none mb-5 tabular-nums" aria-hidden>
              404
            </p>
            <h1 className="text-display-md md:text-display-lg text-foreground mb-4">
              הכתובת הזאת לא מובילה לשום דירה.
            </h1>
            <p className="text-body-lg text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
              אולי הקישור ישן, ואולי נפלה אות. הנה המקומות שרוב האנשים מחפשים:
            </p>
          </div>

          <ul
            className="rise-in border-t border-primary/15 mb-10 text-right"
            style={{ "--d": "0.12s" } as React.CSSProperties}
          >
            {destinations.map((d) => (
              <li key={d.to} className="border-b border-primary/15">
                <Link
                  to={d.to}
                  className="group flex items-center justify-between gap-4 py-4 min-h-[44px] hover:bg-secondary/60 -mx-3 px-3 rounded-xl transition-colors"
                >
                  <span className="min-w-0">
                    <span className="block font-bold text-foreground text-lg">{d.title}</span>
                    <span className="block text-sm text-muted-foreground">{d.body}</span>
                  </span>
                  <ArrowLeft
                    size={18}
                    aria-hidden
                    className="shrink-0 text-primary transition-transform group-hover:-translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>

          <div className="rise-in flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6" style={{ "--d": "0.2s" } as React.CSSProperties}>
            <Link to="/" className="inline-block w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-bold gap-2 rounded-full px-8 h-12">
                <Home size={18} aria-hidden />
                לדף הבית
              </Button>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 font-semibold text-foreground underline-offset-4 hover:underline min-h-[44px]"
            >
              לא מצאתם? דברו איתנו
              <ArrowLeft size={16} aria-hidden />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFound;
