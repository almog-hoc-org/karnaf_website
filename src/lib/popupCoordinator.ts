/**
 * One interruption at a time.
 *
 * The discovery pages (homepage + blog) run two promotional dialogs: the
 * webinar popup and the free-lesson popup. Without a shared slot they can
 * open on top of each other, and the ordering the site wants — webinar
 * first, free lesson only for visitors who stay a while — would come down
 * to whichever listener happened to fire first. This module is that slot,
 * plus the localStorage frequency-cap helpers both dialogs share.
 */

export const WEBINAR_SEEN_KEY = "karnaf_webinar_popup_seen_at";
export const COURSE_POPUP_SEEN_KEY = "karnaf_course_popup_seen_at";

/** Both dialogs cap themselves at one appearance per week. */
export const FREQUENCY_CAP_MS = 7 * 24 * 60 * 60 * 1000;

/**
 * A dialog only earns an interruption while the visitor is still browsing —
 * never on the pages where they're already converting (course, premium,
 * contact). Shared so both popups can't drift apart on scope.
 */
const DISCOVERY_PREFIXES = ["/blog"];

export const isDiscoveryPath = (pathname: string): boolean =>
  pathname === "/" || DISCOVERY_PREFIXES.some((p) => pathname.startsWith(p));

let active: string | null = null;
const listeners = new Set<() => void>();

/** Claim the single dialog slot. False means another dialog already owns it. */
export function tryAcquire(id: string): boolean {
  if (active !== null && active !== id) return false;
  active = id;
  return true;
}

/** Hand the slot back and let anyone waiting on it try again. */
export function release(id: string): void {
  if (active !== id) return;
  active = null;
  for (const listener of listeners) listener();
}

/** Called whenever the slot frees up. Returns an unsubscribe function. */
export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Stamp "shown now" so the frequency cap starts counting. */
export function markShown(key: string): void {
  try {
    localStorage.setItem(key, String(Date.now()));
  } catch {
    // storage unavailable — the dialog may reappear next visit, acceptable
  }
}

/**
 * Was this dialog shown inside the cap window? A storage failure answers
 * "yes" on purpose: when we can't tell, stay quiet rather than risk nagging.
 */
export function shownWithin(key: string, withinMs = FREQUENCY_CAP_MS): boolean {
  try {
    const at = Number(localStorage.getItem(key) || 0);
    return Date.now() - at < withinMs;
  } catch {
    return true;
  }
}
