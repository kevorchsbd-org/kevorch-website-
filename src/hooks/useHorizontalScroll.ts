import { useEffect, useRef, type RefObject } from 'react';
import { initHorizontalScroll } from '../animations/horizontalScroll';

export const useHorizontalScroll = <
  S extends HTMLElement = HTMLDivElement,
  T extends HTMLElement = HTMLDivElement
>(): { sectionRef: RefObject<S | null>; trackRef: RefObject<T | null> } => {
  const sectionRef = useRef<S>(null);
  const trackRef = useRef<T>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const cleanup = initHorizontalScroll(sectionRef.current, trackRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return { sectionRef, trackRef };
};
