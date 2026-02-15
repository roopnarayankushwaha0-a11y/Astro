import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import { ZODIAC_SIGNS } from '../../utils/zodiacData';

/**
 * ♈ ZodiacSelector
 * Horizontal scrolling list of all 12 signs.
 * Used in Horoscope and Love Reading screens.
 */
const ZodiacSelector = ({ selected, onSelect }) => {
  const scrollRef = useRef(null);

  // Auto-scroll to selected item on mount
  useEffect(() => {
    if (selected && scrollRef.current) {
      const selectedIndex = ZODIAC_SIGNS.findIndex(z => z.id === selected);
      if (selectedIndex !== -1) {
        // Simple calculation to center the item
        const itemWidth = 80; // Approximate width of item + gap
        const scrollPos = (selectedIndex * itemWidth) - (scrollRef.current.clientWidth / 2) + (itemWidth / 2);
        scrollRef.current.scrollTo({ left: scrollPos, behavior: 'smooth' });
      }
    }
  }, []); // Run once on mount

  return (
    <div 
      ref={scrollRef}
      className="flex gap-4 overflow-x-auto no-scrollbar px-2 py-2 snap-x"
    >
      {ZODIAC_SIGNS.map((sign) => {
        const isSelected = selected === sign.name || selected === sign.id; // Support both name or ID usage

        return (
          <button
            key={sign.id}
            onClick={() => onSelect(sign.name)} // Passing Name as that's what API likely expects
            className="flex flex-col items-center gap-2 min-w-[70px] snap-center group"
          >
            {/* Circle Icon */}
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={cn(
                "w-14 h-14 rounded-full flex items-center justify-center text-2xl border transition-all duration-300",
                isSelected 
                  ? "bg-accent-cyan text-cosmic-900 border-accent-cyan shadow-glow-sm scale-110" 
                  : "bg-white/5 text-gray-400 border-white/10 group-hover:border-white/30 group-hover:bg-white/10"
              )}
            >
              {sign.symbol}
            </motion.div>

            {/* Label */}
            <span className={cn(
              "text-xs font-medium transition-colors",
              isSelected ? "text-accent-cyan" : "text-gray-500 group-hover:text-gray-300"
            )}>
              {sign.name}
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default ZodiacSelector;
