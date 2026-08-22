import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { ANIMATION_CONFIG, isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const animateHeroSection = (container) => {
  if (isReducedMotion()) return;

  const ctx = gsap.context(() => {
    // 1. Heading Split Character Reveal
    const heading = container.querySelector('[data-animate="hero-heading"]');
    if (heading) {
      const split = new SplitType(heading , { types: 'chars,words' });
      if (split.chars) {
        gsap.fromTo(
          split.chars,
          { opacity: 0, y: 35, rotateX: -45 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: ANIMATION_CONFIG.durations.medium,
            stagger: 0.02,
            ease: ANIMATION_CONFIG.easings.power4Out,
            delay: 0.2,
          }
        );
      }
    }

    // 2. Subtitle & Body Fade Up
    const subelements = container.querySelectorAll('[data-animate="hero-fade-up"]');
    if (subelements.length > 0) {
      gsap.fromTo(
        subelements,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONFIG.durations.medium,
          stagger: 0.12,
          ease: ANIMATION_CONFIG.easings.power3Out,
          delay: 0.5,
        }
      );
    }

    // 3. CTA Buttons Reveal
    const buttons = container.querySelectorAll('[data-animate="hero-buttons"]');
    if (buttons.length > 0) {
      gsap.fromTo(
        buttons,
        { opacity: 0, scale: 0.9, y: 20 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: ANIMATION_CONFIG.durations.fast,
          stagger: 0.1,
          ease: ANIMATION_CONFIG.easings.backOut,
          delay: 0.8,
        }
      );
    }

    // 4. Hero Parallax ScrollTrigger
    const heroContent = container.querySelector('[data-animate="hero-content"]');
    if (heroContent) {
      gsap.to(heroContent, {
        y: 80,
        opacity: 0.2,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }
  }, container);

  return () => ctx.revert();
};
