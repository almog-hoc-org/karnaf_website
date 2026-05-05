import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { WHATSAPP_NUMBER } from "@/lib/constants";

interface StickyCTAProps {
  label?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Hide on these route prefixes (string match). Defaults: contact + blog article. */
  hideOn?: string[];
}

export const StickyCTA = ({
  label = "30 דקות · ייעוץ ראשוני · ללא התחייבות",
  ctaLabel = "בואו נדבר",
  ctaHref = "/contact",
  hideOn = ["/contact"],
}: StickyCTAProps) => {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  const hidden = hideOn.some((p) => location.pathname.startsWith(p));

  useEffect(() => {
    return scrollYProgress.on("change", (v) => setVisible(v > 0.3 && v < 0.95));
  }, [scrollYProgress]);

  /**
   * Publish a CSS variable while the sticky bar is visible, so floating
   * widgets (WhatsApp FAB, accessibility button) can lift themselves
   * above it instead of hiding behind it.
   */
  useEffect(() => {
    const showing = visible && !hidden;
    document.documentElement.style.setProperty(
      "--sticky-cta-h",
      showing ? "72px" : "0px"
    );
    return () => {
      document.documentElement.style.setProperty("--sticky-cta-h", "0px");
    };
  }, [visible, hidden]);

  if (hidden) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{
        y: visible ? 0 : 100,
        opacity: visible ? 1 : 0,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 pointer-events-none"
      aria-hidden={!visible}
    >
      <div className="h-px bg-white/15">
        <motion.div
          className="h-full bg-accent origin-right"
          style={{ scaleX: smooth }}
        />
      </div>

      <div
        className="pointer-events-auto"
        style={{
          backgroundColor: "hsl(217 50% 8% / 0.92)",
          color: "hsl(36 33% 95%)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-5 py-3 flex items-center justify-between gap-4">
          <div className="hidden md:flex items-center gap-3">
            <span
              aria-hidden
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "hsl(var(--accent))" }}
            />
            <span className="text-eyebrow uppercase tracking-[0.18em] text-white/75">
              {label}
            </span>
          </div>
          <div className="md:hidden text-sm font-semibold text-white/85">
            {label.split("·")[0].trim()}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex text-sm font-semibold text-white/80 hover:text-accent transition-colors px-3 py-2"
            >
              WhatsApp
            </a>
            <Link to={ctaHref}>
              <button className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-bold text-sm md:text-base px-5 md:px-7 py-2.5 md:py-3 rounded-full hover:bg-accent/90 transition-colors">
                {ctaLabel}
                <span aria-hidden>←</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
