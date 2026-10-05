import { useCallback, useEffect, useRef } from "react";
import { gaToolUse } from "@/lib/analytics";

type QueryValue = string | number | boolean;

/**
 * Shared plumbing for the /tools calculators. Returns `touch`, which an
 * input calls on every change: the first call reports `tool_use`, and from
 * then on the calculator's state is mirrored into the URL (replaceState, no
 * history entries) so the result can be shared. Before the visitor touches
 * anything the URL stays clean. Reading a shared link back is the
 * calculator's own job, after mount, so pre-rendered HTML and hydration agree.
 */
export function useToolUse(slug: string, query: Record<string, QueryValue>): () => void {
  const used = useRef(false);
  const serialized = JSON.stringify(query);

  useEffect(() => {
    if (!used.current) return;
    const url = new URL(window.location.href);
    for (const [k, v] of Object.entries(JSON.parse(serialized) as Record<string, QueryValue>)) {
      url.searchParams.set(k, typeof v === "boolean" ? (v ? "1" : "0") : String(v));
    }
    window.history.replaceState(window.history.state, "", `${url.pathname}${url.search}${url.hash}`);
  }, [serialized]);

  return useCallback(() => {
    if (used.current) return;
    used.current = true;
    gaToolUse(slug);
  }, [slug]);
}
