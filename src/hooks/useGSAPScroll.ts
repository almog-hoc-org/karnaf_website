import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useGSAPScroll = (
  animation: gsap.TweenVars,
  options?: ScrollTrigger.Vars
) => {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const tween = gsap.to(element, {
      ...animation,
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 1,
        ...options,
      },
    });

    return () => {
      tween.kill();
    };
  }, [animation, options]);

  return ref;
};
