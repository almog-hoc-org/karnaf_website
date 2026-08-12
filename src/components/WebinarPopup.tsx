import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, CalendarClock, ArrowLeft } from "lucide-react";
import mascot from "@/assets/mascot/mascot-presenting.webp";
import {
  WEBINAR_SEEN_KEY,
  isDiscoveryPath,
  markShown,
  release,
  shownWithin,
  tryAcquire,
} from "@/lib/popupCoordinator";

const WEBINAR_URL = "https://webinar.karnafnadlan.com";
const SCROLL_TRIGGER = 0.5; // fire after half the page is read

/** Identifies this dialog in the shared single-popup slot. */
const POPUP_ID = "webinar";

/**
 * Promo popup steering visitors to the upcoming-webinar landing page.
 * Value-first triggering: opens only after the visitor scrolled half the
 * page (or on exit intent), only on the homepage/blog, at most once every
 * 7 days. The CTA is a plain external <a>, so PixelTracker's global click
 * listener classifies the click automatically.
 */
const WebinarPopup = () => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { pathname } = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDiscoveryPath(pathname) || shownWithin(WEBINAR_SEEN_KEY)) return;

    let fired = false;
    const fire = () => {
      if (fired) return;
      // Another dialog is on screen — stay armed and try on the next trigger.
      if (!tryAcquire(POPUP_ID)) return;
      fired = true;
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable > 0 && window.scrollY / scrollable >= SCROLL_TRIGGER) fire();
    };
    // Exit intent (desktop): pointer leaves through the top of the viewport.
    const onMouseOut = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) fire();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onMouseOut);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onMouseOut);
    return cleanup;
  }, [pathname]);

  const dismiss = () => {
    markShown(WEBINAR_SEEN_KEY);
    setOpen(false);
    // The slot is released in onExitComplete, not here — until the exit
    // animation has finished this dialog is still on screen, and handing the
    // slot over early would briefly show two popups at once.
  };

  // Escape to close, lock the page behind the dialog (parity with
  // CoursePopup), and move keyboard focus into the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <AnimatePresence onExitComplete={() => release(POPUP_ID)}>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className="absolute inset-0 bg-primary/70 backdrop-blur-sm"
            onClick={dismiss}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="הרשמה לוובינר הקרוב"
            dir="rtl"
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-background shadow-depth-4 border border-border"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              ref={closeButtonRef}
              onClick={dismiss}
              aria-label="סגירה"
              className="absolute top-3 left-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-foreground/5 hover:bg-foreground/10 text-foreground/60 hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            {/* Dark header band with mascot */}
            <div
              className="relative flex items-center justify-center pt-8 pb-5 overflow-hidden"
              style={{ backgroundColor: "hsl(217 50% 8%)" }}
            >
              <div
                className="absolute inset-0 pointer-events-none opacity-70"
                aria-hidden
                style={{
                  background:
                    "radial-gradient(70% 100% at 50% 0%, hsl(24 80% 52% / 0.28) 0%, transparent 70%)",
                }}
              />
              <img
                src={mascot}
                alt=""
                aria-hidden
                width={500}
                height={281}
                className="relative h-28 w-auto object-contain drop-shadow-2xl"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="px-7 pb-8 pt-6 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/12 border border-accent/25 px-3.5 py-1.5 text-eyebrow font-bold uppercase tracking-[0.14em] text-accent">
                <CalendarClock size={14} />
                וובינר קרוב · בחינם
              </span>

              <h2 className="mt-4 text-2xl md:text-3xl font-black text-foreground leading-tight tracking-[-0.02em]">
                וובינר חינם:{" "}
                <span className="text-accent">כך ניגשים נכון לרכישת דירה</span>
              </h2>

              <p className="mt-3 text-body text-muted-foreground leading-relaxed">
                שעה אחת שתחסוך לכם שנים של טעויות. הכלים, השיטה והטעויות שחייבים
                להכיר — לפני שקונים דירה.
              </p>

              <a
                href={WEBINAR_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismiss}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-lg h-14 px-6 shadow-[0_0_50px_hsl(var(--accent)/0.4)] transition-all"
              >
                להרשמה לוובינר
                <ArrowLeft
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>

              <button
                onClick={dismiss}
                className="mt-3 text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                אולי אחר כך
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebinarPopup;
