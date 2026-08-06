import { useEffect, useRef, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const useSplitText = <T extends HTMLElement = HTMLHeadingElement>(): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current || isReducedMotion()) return;

    const split = new SplitType(ref.current, { types: 'chars,words' });

    if (split.chars) {
      gsap.fromTo(
        split.chars,
        { opacity: 0, y: 25, rotateX: -30 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      split.revert();
    };
  }, []);

  return ref;
};
