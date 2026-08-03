import React from 'react';
import { motion } from 'framer-motion';

interface MarqueeProps {
  items: { name: string; logo: string; logoImg?: string }[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

export const Marquee: React.FC<MarqueeProps> = ({
  items,
  speed = 25,
  direction = 'left',
  className = '',
}) => {
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap relative flex select-none ${className}`}>
      <motion.div
        className="flex items-center gap-12 sm:gap-16 min-w-full shrink-0"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          repeat: Infinity,
          ease: 'linear',
          duration: speed,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div
            key={idx}
            className="inline-flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity duration-300 group cursor-default"
          >
            {item.logoImg ? (
              <img
                src={item.logoImg}
                alt={item.name}
                className="h-8 sm:h-10 w-auto object-contain filter brightness-75 group-hover:brightness-110 transition-all duration-300 group-hover:scale-105"
              />
            ) : null}
            <span className="text-xl sm:text-2xl font-bold font-heading text-slate-300 group-hover:text-cyan-400 group-hover:scale-105 transition-all duration-300">
              {item.logo}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
