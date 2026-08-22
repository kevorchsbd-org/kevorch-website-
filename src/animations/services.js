import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import { ANIMATION_CONFIG, isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const animateServicesSection = (container) => {
  if (isReducedMotion()) return;

  const ctx = gsap.context(() => {
    const cards = container.querySelectorAll('[data-animate="service-card"]');
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 45, scale: 0.92, rotate: -1.5 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotate: 0,
          duration: ANIMATION_CONFIG.durations.medium,
          stagger: 0.1,
          ease: ANIMATION_CONFIG.easings.power4Out,
          scrollTrigger: {
            trigger: container,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }, container);

  return () => ctx.revert();
};

export const attachServiceCardMicroInteractions = (element) => {
  const icon = element.querySelector('[data-animate="service-icon"]');

  const handleMouseEnter = () => {
    if (icon) {
      animate(icon, {
        rotate: [0, 15, -10, 0],
        scale: [1, 1.2, 1.1],
        duration: 600,
        ease: 'inOutQuad',
      });
    }

    animate(element, {
      translateY: -8,
      duration: 400,
      ease: 'outQuad',
    });
  };

  const handleMouseLeave = () => {
    animate(element, {
      translateY: 0,
      duration: 400,
      ease: 'outQuad',
    });
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
  };
};
