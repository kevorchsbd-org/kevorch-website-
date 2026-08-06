import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const initHorizontalScroll = (
  section: HTMLElement,
  track: HTMLElement
): (() => void) | undefined => {
  const scrollAmount = track.scrollWidth - section.clientWidth;
  if (scrollAmount <= 0) return;

  const animation = gsap.to(track, {
    x: -scrollAmount,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${scrollAmount}`,
      pin: true,
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    animation.kill();
  };
};
