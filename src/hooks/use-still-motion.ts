import { useEffect, useState } from "react";

/** Accessibility-widget profiles that ask the page to hold still. */
const STILL_CLASSES = ["a11y-stop-animations", "a11y-adhd", "a11y-epilepsy"];

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

const asksForStillness = () =>
  window.matchMedia(REDUCE_QUERY).matches ||
  STILL_CLASSES.some((c) => document.body.classList.contains(c));

/**
 * True when scroll-linked motion must stay off: the OS-level
 * prefers-reduced-motion, or one of the AccessibilityWidget profiles.
 *
 * The widget's CSS overrides only reach CSS animations/transitions — the
 * scroll-driven effects write inline transforms every frame, so they need
 * to check the body classes themselves.
 *
 * Deliberately NOT framer-motion's useReducedMotion: that one answers on
 * the very first client render, so a component that renders a different
 * tree when still (StackCards, ScrollWords, VelocityMarquee) would not
 * match the pre-rendered HTML and React would throw a hydration error.
 * This starts false on both server and client and flips after mount.
 */
export function useStillMotion(): boolean {
  const [still, setStill] = useState(false);

  useEffect(() => {
    const update = () => setStill(asksForStillness());
    update();
    const mql = window.matchMedia(REDUCE_QUERY);
    mql.addEventListener("change", update);
    const mo = new MutationObserver(update);
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => {
      mql.removeEventListener("change", update);
      mo.disconnect();
    };
  }, []);

  return still;
}
