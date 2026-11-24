import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/* The path the pre-rendered HTML was built for, read once from the layout's
   data-ssr-path. It differs from the address bar on exactly one document:
   dist/404.html, which Vercel serves for every unknown URL. */
let ssrPath: string | null | undefined;
let hydrated = false;

const renderedFor = (): string | null => {
  if (ssrPath === undefined) {
    ssrPath = typeof document === "undefined" ? null : document.querySelector("[data-ssr-path]")?.getAttribute("data-ssr-path") ?? null;
  }
  return ssrPath;
};

/**
 * The pathname the site chrome (nav, sticky bars, WhatsApp links) should
 * render for. Normally the current location; but while React hydrates
 * 404.html at some other URL it is the path the HTML was rendered for, so
 * the first client render matches the server's and hydration doesn't fail.
 * One effect later it switches to the real path.
 */
export function useShellPathname(): string {
  const { pathname } = useLocation();
  const [hydrating, setHydrating] = useState(() => {
    if (hydrated) return false;
    const rendered = renderedFor();
    return rendered !== null && rendered !== pathname;
  });
  useEffect(() => {
    hydrated = true;
    if (hydrating) setHydrating(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- once, after hydration
  }, []);
  return hydrating ? (renderedFor() as string) : pathname;
}
