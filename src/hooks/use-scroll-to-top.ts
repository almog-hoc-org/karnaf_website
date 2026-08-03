import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Reset the scroll position on every route change — but honour a URL
 * fragment when there is one: cross-page anchors like the sitewide
 * sticky CTA's `/course#pricing` used to be silently defeated by the
 * unconditional scroll-to-top.
 */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Two frames: the lazy-loaded page needs a paint before the
      // target element exists and has its final position.
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) el.scrollIntoView();
          else window.scrollTo(0, 0);
        });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
}
