import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { animate } from 'animejs';
import { ANIMATION_CONFIG, isReducedMotion } from '../config/animationConfig';

gsap.registerPlugin(ScrollTrigger);

export const animateContactSection = (container) => {
  if (isReducedMotion()) return;

  const ctx = gsap.context(() => {
    const fields = container.querySelectorAll('[data-animate="contact-field"]');
    if (fields.length > 0) {
      gsap.fromTo(
        fields,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: ANIMATION_CONFIG.durations.fast,
          stagger: 0.08,
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

export const triggerButtonRipple = (button, e) => {
  const rect = button.getBoundingClientRect();
  const circle = document.createElement('span');
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${e.clientX - rect.left - radius}px`;
  circle.style.top = `${e.clientY - rect.top - radius}px`;
  circle.style.position = 'absolute';
  circle.style.borderRadius = '50%';
  circle.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
  circle.style.pointerEvents = 'none';
  circle.style.transform = 'scale(0)';

  button.appendChild(circle);

  animate(circle, {
    scale: 2.5,
    opacity: 0,
    duration: 600,
    ease: 'outExpo',
    onComplete: () => {
      circle.remove();
    },
  });
};
