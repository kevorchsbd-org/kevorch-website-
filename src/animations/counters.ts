import { animate } from 'animejs';

export const animateCountUp = (
  element: HTMLElement,
  endValue: number,
  prefix: string = '',
  suffix: string = '',
  duration: number = 1600
): void => {
  const obj = { val: 0 };
  animate(obj, {
    val: endValue,
    duration,
    ease: 'outExpo',
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
    },
  });
};
