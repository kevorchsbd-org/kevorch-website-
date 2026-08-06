import { gsap } from 'gsap';

export const animatePageEntrance = (container: HTMLElement): void => {
  gsap.fromTo(
    container,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }
  );
};
