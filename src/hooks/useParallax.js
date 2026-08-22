import { useEffect, useRef, } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const useParallax = (
  speed = 0.3
) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.to(ref.current, {
        y: () => (1 - speed) * 80,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, ref.current);

    return () => ctx.revert();
  }, [speed]);

  return ref;
};
