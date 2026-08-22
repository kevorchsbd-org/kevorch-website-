import { useEffect, useRef, } from 'react';
import { initCustomCursorTracking } from '../animations/cursor';

export const useCursor = 


() => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current || !ringRef.current) return;
    const cleanup = initCustomCursorTracking(dotRef.current, ringRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return { dotRef, ringRef };
};
