import { gsap } from 'gsap';
import { isTouchDevice } from '../config/animationConfig';

export const initCustomCursorTracking = (
  cursorDot: HTMLElement,
  cursorRing: HTMLElement
): (() => void) | undefined => {
  if (isTouchDevice()) return;

  let mouseX = 0;
  let mouseY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot movement
    gsap.set(cursorDot, { x: mouseX, y: mouseY });

    // Smooth ring trailing
    gsap.to(cursorRing, {
      x: mouseX,
      y: mouseY,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  window.addEventListener('mousemove', handleMouseMove, { passive: true });

  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
  };
};
