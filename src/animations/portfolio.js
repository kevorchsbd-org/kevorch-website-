import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ANIMATION_CONFIG, isReducedMotion, isTouchDevice } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const animatePortfolioSection = (
  container,
  horizontalTrack
) => {
  if (isReducedMotion()) return;

  const ctx = gsap.context(() => {
    // 1. Horizontal Scroll Pinning (Desktop only)
    if (horizontalTrack && !isTouchDevice()) {
      const scrollAmount = horizontalTrack.scrollWidth - container.clientWidth;
      if (scrollAmount > 0) {
        gsap.to(horizontalTrack, {
          x: -scrollAmount,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: () => `+=${scrollAmount}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }

    // 2. Staggered Portfolio Card Reveal
    const cards = container.querySelectorAll('[data-animate="portfolio-card"]');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: ANIMATION_CONFIG.durations.medium,
          stagger: 0.12,
          ease: ANIMATION_CONFIG.easings.power3Out,
          scrollTrigger: {
            trigger: container,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, container);

  return () => ctx.revert();
};
