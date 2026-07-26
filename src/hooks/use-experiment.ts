import { useEffect, useState } from "react";
import { gaSetExperiment } from "@/lib/analytics";

declare global {
  interface Window {
    __exp?: Record<string, string>;
  }
}

/**
 * Read this visitor's A/B assignment. Bucketing happens in an inline
 * script in index.html before hydration (see there), so variants never
 * flicker; this hook just exposes the result to React and reports the
 * assignment to GA4 as a user property once per page view.
 *
 * For content that exists in the pre-rendered HTML (e.g. the hero H1),
 * render BOTH variants and let the `html[data-exp-*]` CSS rules in
 * index.css decide — that path has zero CLS. Use this hook for
 * client-only branches and for the analytics tagging.
 */
export function useExperiment(experimentId: string, fallback = "a"): string {
  const [variant, setVariant] = useState(fallback);

  useEffect(() => {
    const assigned = window.__exp?.[experimentId] ?? fallback;
    setVariant(assigned);
    gaSetExperiment(experimentId, assigned);
  }, [experimentId, fallback]);

  return variant;
}
