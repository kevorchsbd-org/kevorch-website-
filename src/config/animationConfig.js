export const ANIMATION_CONFIG = {
  easings: {
    power3Out: 'power3.out',
    power4Out: 'power4.out',
    expoOut: 'expo.out',
    backOut: 'back.out(1.7)',
    smooth: 'cubic-bezier(0.16, 1, 0.3, 1)',
  },
  durations: {
    fast: 0.4,
    medium: 0.8,
    slow: 1.2,
    preloader: 1.8,
  },
  stagger: {
    fast: 0.05,
    medium: 0.1,
    slow: 0.15,
  },
  breakpoints: {
    mobile: 640,
    tablet: 1024,
    desktop: 1280,
  },
};

export const isReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

export const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
};
