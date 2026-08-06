import { useEffect, useRef, type RefObject } from 'react';
import { animate } from 'animejs';
import { isReducedMotion } from '../config/animationConfig';

export const useCounter = <T extends HTMLElement = HTMLSpanElement>(
  targetNumber: number,
  prefix = '',
  suffix = ''
): RefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    if (isReducedMotion()) {
      ref.current.textContent = `${prefix}${targetNumber}${suffix}`;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && ref.current) {
            const obj = { val: 0 };
            animate(obj, {
              val: targetNumber,
              duration: 1600,
              ease: 'outExpo',
              onUpdate: () => {
                if (ref.current) {
                  ref.current.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
                }
              },
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [targetNumber, prefix, suffix]);

  return ref;
};
