import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initNavbarScrollAnimation = (navElement) => {
  let lastScrollY = window.scrollY;

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100 && currentScrollY > lastScrollY) {
      // Scroll down - hide nav slightly
      gsap.to(navElement, { y: -100, duration: 0.35, ease: 'power2.out' });
    } else {
      // Scroll up - reveal nav
      gsap.to(navElement, { y: 0, duration: 0.35, ease: 'power2.out' });
    }

    lastScrollY = currentScrollY;
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
