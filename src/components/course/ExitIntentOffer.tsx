import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { botLink } from "@/lib/whatsapp";
import { gaExitIntent } from "@/lib/analytics";
import mascotWelcome from "@/assets/mascot/mascot-welcome.webp";

/**
 * Honest exit-intent save — no discount, no countdown, no fake scarcity.
 * A visitor about to leave is offered something genuinely useful (the
 * property-visit checklist) through the WhatsApp intake bot, which turns
 * an anonymous abandoner into a named, opted-in lead in the CRM.
 * Fires once per session, never while the quiz is being answered.
 */

const STORAGE_KEY = "karnaf_exit_offer_shown";

const ExitIntentOffer = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    let armed = true;
    let lastY = window.scrollY;

    const trigger = () => {
      if (!armed) return;
      // Don't interrupt someone mid-quiz.
      if (document.activeElement?.closest("[data-quiz-root]")) return;
      armed = false;
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* session storage unavailable — still show once this page view */
      }
      setOpen(true);
      gaExitIntent("shown");
    };

    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 0 && !e.relatedTarget) trigger();
    };

    // Mobile proxy: a fast upward flick after the visitor got deep enough.
    const onScroll = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const depth = scrollable > 0 ? y / scrollable : 0;
      if (depth > 0.45 && lastY - y > 90) trigger();
      lastY = y;
    };

    const timer = window.setTimeout(() => {
      document.addEventListener("mouseout", onMouseOut);
      window.addEventListener("scroll", onScroll, { passive: true });
    }, 12000); // don't ambush someone who just arrived

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const close = () => {
    setOpen(false);
    gaExitIntent("dismissed");
  };

  // Escape to close + lock the page behind the dialog.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="exit-offer-title"
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-background border border-border rounded-3xl p-7 md:p-9 max-w-lg w-full shadow-depth-4 text-center"
          >
            <button
              onClick={close}
              aria-label="סגירה"
              className="absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <X size={18} />
            </button>

            <img
              src={mascotWelcome}
              alt=""
              aria-hidden
              className="w-20 h-20 mx-auto mb-4 object-contain"
              loading="lazy"
              decoding="async"
            />

            <h2
              id="exit-offer-title"
              className="text-2xl md:text-3xl font-black text-foreground leading-tight mb-3"
            >
              עוד לא מחליטים? בסדר גמור.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              קחו מאיתנו את <span className="font-bold text-foreground">צ׳קליסט הביקור בנכס</span> —
              בחינם, לוואטסאפ. אותו צ׳קליסט שהתלמידים שלנו לוקחים לכל דירה
              שהם רואים. תחליטו על התוכנית אחר כך.
            </p>

            <a
              href={botLink("צ׳קליסט ביקור בנכס — בקשה מהאתר")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                gaExitIntent("accepted");
                setOpen(false);
              }}
              className="block"
            >
              <Button
                size="lg"
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full py-6 text-base active:scale-[0.98] transition-transform"
              >
                שלחו לי את הצ׳קליסט בוואטסאפ ←
              </Button>
            </a>
            <button
              onClick={close}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
            >
              לא תודה, אני ממשיך לקרוא
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExitIntentOffer;
