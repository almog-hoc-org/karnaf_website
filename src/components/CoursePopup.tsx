import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, PlayCircle, ArrowLeft } from "lucide-react";
import mascot from "@/assets/mascot/mascot-thumbsup.webp";
import { CHECKOUT_URL } from "@/lib/constants";
import { buildCheckoutUrl } from "@/lib/checkout";
import { PARTS_LABEL, CHAPTERS_LABEL } from "@/data/courseStats";
import { gaFreePreview } from "@/lib/analytics";
import {
  COURSE_POPUP_SEEN_KEY,
  isDiscoveryPath,
  markShown,
  release,
  shownWithin,
  subscribe,
  tryAcquire,
} from "@/lib/popupCoordinator";

/** Identifies this dialog in the shared single-popup slot. */
const POPUP_ID = "course-preview";

/** How long the visitor has to stick around before the offer is earned. */
const DWELL_MS = 100_000;
const TICK_MS = 1000;

/** Breathing room after another dialog leaves the screen — a popup that
 *  appears the second the previous one closes is "pop-up city", the exact
 *  anti-pattern PRODUCT.md names. */
const HANDOFF_COOLDOWN_MS = 45_000;

/**
 * Invites engaged visitors to watch the course's opening lesson for free.
 * The free lesson lives behind the same hosted-checkout URL as the purchase
 * itself, so this is not a second funnel — it's permission to click for
 * someone still deciding.
 *
 * Earning the interruption: discovery pages only, 100 seconds of *foreground*
 * time (a forgotten background tab has survived nothing), at most once a week,
 * and never before the webinar popup has had its turn.
 *
 * The CTA deliberately reports free_preview rather than begin_checkout, and
 * carries data-no-btn-track so PixelTracker's global listener leaves it alone:
 * a preview click is curiosity, and letting it masquerade as purchase intent
 * would teach the ad platforms to buy browsers instead of buyers.
 */
const CoursePopup = () => {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const { pathname } = useLocation();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  // SSG renders the plain checkout URL; the attribution-enriched one replaces
  // it after hydration, same pattern as the sales page's purchase CTAs.
  const [href, setHref] = useState(CHECKOUT_URL);

  useEffect(() => {
    setHref(buildCheckoutUrl({ preview: true }));
  }, []);

  useEffect(() => {
    if (!isDiscoveryPath(pathname) || shownWithin(COURSE_POPUP_SEEN_KEY)) return;

    let matured = false;
    let opened = false;
    let visibleMs = 0;
    let cooldownUntil = 0;
    let retryTimer: number | undefined;

    const attempt = () => {
      if (opened || !matured) return;
      // Another dialog just left the screen — give the visitor a breather
      // instead of opening back-to-back.
      const wait = cooldownUntil - Date.now();
      if (wait > 0) {
        window.clearTimeout(retryTimer);
        retryTimer = window.setTimeout(attempt, wait);
        return;
      }
      // Something else is on screen; the subscription below retries later.
      // The webinar still goes first when it wants the slot — it simply
      // claims it on its own (earlier) triggers.
      if (!tryAcquire(POPUP_ID)) return;
      opened = true;
      // Mark at open, not at close: the weekly cap counts impressions, and
      // this also stops a route change while the dialog is up from re-arming
      // the effect and firing a second "shown" for one impression.
      markShown(COURSE_POPUP_SEEN_KEY);
      setOpen(true);
      gaFreePreview("shown");
    };

    const timer = window.setInterval(() => {
      if (document.hidden) return; // only foreground time counts
      visibleMs += TICK_MS;
      if (visibleMs < DWELL_MS) return;
      matured = true;
      window.clearInterval(timer);
      attempt();
    }, TICK_MS);

    // If another dialog held the slot when the timer matured, retry once it
    // frees up — after a cooldown, never the same second.
    const unsubscribe = subscribe(() => {
      cooldownUntil = Date.now() + HANDOFF_COOLDOWN_MS;
      attempt();
    });

    return () => {
      window.clearInterval(timer);
      window.clearTimeout(retryTimer);
      unsubscribe();
    };
  }, [pathname]);

  const close = () => {
    setOpen(false);
    // Slot released in onExitComplete — see WebinarPopup for why.
  };

  const dismiss = () => {
    gaFreePreview("dismissed");
    close();
  };

  const accept = () => {
    gaFreePreview("accepted");
    close();
  };

  // Escape to close, lock the page behind the dialog, and move keyboard
  // focus into it (aria-modal without focus leaves keyboard users stranded
  // in the inert page behind the overlay).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeButtonRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            aria-label="צפייה בשיעור הראשון של הקורס הדיגיטלי"
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
                <PlayCircle size={14} />
                הקורס הדיגיטלי המקיף בישראל
              </span>

              <h2 className="mt-4 text-2xl md:text-3xl font-black text-foreground leading-tight">
                רוצים לראות איך זה נראה{" "}
                <span className="text-accent">מבפנים?</span>
              </h2>

              <p className="mt-3 text-body text-muted-foreground leading-relaxed">
                ״המדריך המעשי לרכישת דירה״ — {PARTS_LABEL}, {CHAPTERS_LABEL}{" "}
                ו-6+ מחשבונים שהופכים כל החלטה למספרים.{" "}
                <span className="font-bold text-foreground">
                  השיעור הראשון פתוח לצפייה.
                </span>
              </p>

              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-no-btn-track
                onClick={accept}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold text-base md:text-lg h-14 px-5 whitespace-nowrap shadow-[0_0_50px_hsl(var(--accent)/0.4)] transition-all active:scale-[0.98]"
              >
                לצפייה בשיעור הראשון חינם
                <ArrowLeft
                  size={20}
                  className="transition-transform group-hover:-translate-x-1"
                />
              </a>

              <button
                onClick={dismiss}
                className="mt-3 text-sm text-muted-foreground/70 hover:text-foreground transition-colors"
              >
                לא עכשיו
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoursePopup;
