import React, { useEffect, useRef, useState } from 'react';
import { animatePreloaderSequence, hasSeenLoader } from '../animations/loader';
import whiteLogo from '../assets/whitelogo.png';

export const Preloader: React.FC = () => {
  const [active, setActive] = useState(() => !hasSeenLoader());
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current || !counterRef.current) return;

    animatePreloaderSequence(
      containerRef.current,
      counterRef.current,
      () => {
        setActive(false);
      }
    );
  }, [active]);

  if (!active) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-99999 bg-black flex flex-col items-center justify-center pointer-events-auto"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex flex-col items-center gap-8">
        <img
          src={whiteLogo}
          alt="KEVORCH Logo"
          className="h-12 sm:h-16 w-auto object-contain animate-pulse"
        />

        <div className="flex flex-col items-center gap-2">
          <span
            ref={counterRef}
            className="text-4xl sm:text-6xl font-heading font-black text-transparent bg-clip-text bg-linear-to-r from-red-500 to-rose-400 font-mono tracking-wider"
          >
            0%
          </span>
          <span className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
            Loading Experience
          </span>
        </div>
      </div>
    </div>
  );
};
