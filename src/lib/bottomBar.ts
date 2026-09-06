/**
 * One shared signal for "a bottom bar is on screen".
 *
 * Two bars can occupy the bottom edge — the desktop StickyCTA and the
 * /course price bar. Each publishes its height here under its own id; the
 * tallest one becomes `--sticky-cta-h`, which the floating widgets
 * (WhatsApp FAB, accessibility button) read to lift themselves above the
 * bar instead of sitting on top of the purchase button.
 */

export const BOTTOM_BAR_EVENT = "karnaf:bottom-bar";

const heights = new Map<string, number>();

function total(): number {
  let max = 0;
  heights.forEach((h) => {
    if (h > max) max = h;
  });
  return max;
}

export function setBottomBarHeight(id: string, px: number): void {
  if (typeof document === "undefined") return;
  if ((heights.get(id) ?? 0) === px) return;
  if (px > 0) heights.set(id, px);
  else heights.delete(id);
  const h = total();
  document.documentElement.style.setProperty("--sticky-cta-h", `${h}px`);
  window.dispatchEvent(new CustomEvent<number>(BOTTOM_BAR_EVENT, { detail: h }));
}

export function getBottomBarHeight(): number {
  return total();
}
