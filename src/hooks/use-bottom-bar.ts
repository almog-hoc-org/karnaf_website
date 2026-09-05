import { useEffect, useState } from "react";
import { BOTTOM_BAR_EVENT, getBottomBarHeight } from "@/lib/bottomBar";

/** Current height (px) of whichever bottom bar is on screen, 0 when none. */
export function useBottomBarHeight(): number {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(getBottomBarHeight());
    const onChange = (e: Event) => {
      setHeight((e as CustomEvent<number>).detail ?? getBottomBarHeight());
    };
    window.addEventListener(BOTTOM_BAR_EVENT, onChange);
    return () => window.removeEventListener(BOTTOM_BAR_EVENT, onChange);
  }, []);

  return height;
}
