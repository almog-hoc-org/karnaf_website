import { useMemo } from "react";
import { transform, useTransform, type MotionValue } from "framer-motion";

/**
 * useTransform(progress, input, output) for a scroll progress bound to a
 * `target` element — use this instead of the range form.
 *
 * Why: framer-motion 12 hands range-form transforms of `scrollYProgress`
 * to a native ScrollTimeline (opacity / filter / clipPath / transform),
 * but useScroll builds that timeline's factory during render, while
 * `target.current` is still null — so the accelerated animation binds to
 * the whole page instead of the element. Verified in Chromium: an opacity
 * meant to reach 1 at the element's offset sat at ~0.5, tracking page
 * progress. The function form is never accelerated, so it stays correct.
 */
export function useScrubbed<T extends number | string>(
  progress: MotionValue<number>,
  input: number[],
  output: T[]
): MotionValue<T> {
  const key = JSON.stringify([input, output]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const map = useMemo(() => transform(input, output), [key]);
  return useTransform(progress, (v) => map(v));
}
