import { useEffect, useRef, } from 'react';
import { initHorizontalScroll } from '../animations/horizontalScroll';

export const useHorizontalScroll = 


() => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;
    const cleanup = initHorizontalScroll(sectionRef.current, trackRef.current);
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return { sectionRef, trackRef };
};
