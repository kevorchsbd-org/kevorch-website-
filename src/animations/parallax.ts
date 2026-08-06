import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const initParallaxElement = (
  element: HTMLElement,
  speed = 0.5,
  trigger?: HTMLElement
): (() => void) | undefined => {
  if (isReducedMotion()) return;

  const animation = gsap.to(element, {
    y: () => (1 - speed) * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
    },
  });

  return () => {
    animation.kill();
  };
};
