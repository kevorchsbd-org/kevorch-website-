import { useEffect, useRef, } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);








export const useReveal = (
  options = {}
) => {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current || isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ref.current,
        { opacity: 0, y: options.y || 30 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration || 0.8,
          delay: options.delay || 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, ref.current);

    return () => ctx.revert();
  }, [options.y, options.duration, options.stagger, options.delay]);

  return ref;
};
