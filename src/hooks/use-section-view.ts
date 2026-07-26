import { useEffect, useRef } from "react";
import { gaSectionView } from "@/lib/analytics";

/**
 * Attach the returned ref to a sales-page section to report a one-time
 * `section_view` analytics event when ~30% of it enters the viewport.
 */
export function useSectionView<T extends HTMLElement>(section: string) {
  const ref = useRef<T>(null);
  const seen = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting) && !seen.current) {
          seen.current = true;
          gaSectionView(section);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [section]);

  return ref;
}
