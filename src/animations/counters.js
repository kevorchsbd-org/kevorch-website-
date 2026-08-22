import { animate } from 'animejs';

export const animateCountUp = (
  element,
  endValue,
  prefix = '',
  suffix = '',
  duration = 1600
) => {
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
