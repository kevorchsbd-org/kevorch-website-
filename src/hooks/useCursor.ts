import { useEffect, useRef, type RefObject } from 'react';
import { initCustomCursorTracking } from '../animations/cursor';

export const useCursor = <
  D extends HTMLElement = HTMLDivElement,
  R extends HTMLElement = HTMLDivElement
>(): { dotRef: RefObject<D | null>; ringRef: RefObject<R | null> } => {
  const dotRef = useRef<D>(null);
  const ringRef = useRef<R>(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;
    const cleanup = initCustomCursorTracking(dotRef.current, ringRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return { dotRef, ringRef };
};
