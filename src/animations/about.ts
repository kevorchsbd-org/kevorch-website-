import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG, isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const animateAboutSection = (container: HTMLElement): (() => void) | undefined => {
  if (isReducedMotion()) return;

  const ctx = gsap.context(() => {
    // 1. Text slide up on viewport enter
    const textBlocks = container.querySelectorAll('[data-animate="about-text"]');
    if (textBlocks.length > 0) {
      gsap.fromTo(
        textBlocks,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONFIG.durations.medium,
          stagger: 0.15,
          ease: ANIMATION_CONFIG.easings.power3Out,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    // 2. Principles / Value cards staggered entrance
    const cards = container.querySelectorAll('[data-animate="about-card"]');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.93 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_CONFIG.durations.medium,
          stagger: 0.12,
          ease: ANIMATION_CONFIG.easings.backOut,
          scrollTrigger: {
            trigger: container,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, container);

  return () => ctx.revert();
};
