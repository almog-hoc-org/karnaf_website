import { useEffect, useSyncExternalStore } from "react";

/*
 * Lets a page switch the site-wide desktop StickyCTA (the course
 * cross-sell) off for itself — e.g. an article whose one offer is the 1:1
 * track must not also carry a permanent ₪950 bar. Route prefixes can't
 * express that (it depends on the article's data), and importing every
 * article into the layout just to decide would bloat the shell bundle.
 */
let suppressed = false;
const listeners = new Set<() => void>();

const subscribe = (cb: () => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

/** Read side — used by StickyCTA. Server snapshot: not suppressed. */
export function useStickyCtaSuppressed(): boolean {
  return useSyncExternalStore(subscribe, () => suppressed, () => false);
}

/** Write side — hide the sticky course bar while `on` and this page is mounted. */
export function useSuppressStickyCta(on: boolean): void {
  useEffect(() => {
    if (!on) return;
    suppressed = true;
    listeners.forEach((l) => l());
    return () => {
      suppressed = false;
      listeners.forEach((l) => l());
    };
  }, [on]);
}
