import { gsap } from 'gsap';
import { animate } from 'animejs';

export const hasSeenLoader = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem('kevorch_seen_loader') === 'true';
};

export const markLoaderSeen = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem('kevorch_seen_loader', 'true');
};

export const animatePreloaderSequence = (
  container: HTMLElement,
  counterElement: HTMLElement,
  onComplete: () => void
): void => {
  if (hasSeenLoader()) {
    onComplete();
    return;
  }

  const state = { value: 0 };

  // Counter 0 to 100
  animate(state, {
    value: 100,
    duration: 1400,
    ease: 'inOutExpo',
    onUpdate: () => {
      if (counterElement) {
        counterElement.textContent = `${Math.round(state.value)}%`;
      }
    },
    onComplete: () => {
      // Curtain wipe reveal
      gsap.to(container, {
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        duration: 0.8,
        ease: 'power4.inOut',
        onComplete: () => {
          markLoaderSeen();
          onComplete();
        },
      });
    },
  });
};
