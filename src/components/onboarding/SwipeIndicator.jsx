import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🚥 SwipeIndicator
 * Renders dots to show current slide position.
 */
const SwipeIndicator = ({ total, current }) => {
  return (
    <div className="flex justify-center gap-3">
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === current;
        
        return (
          <motion.div
            key={index}
            className="h-1.5 rounded-full bg-white"
            initial={false}
            animate={{
              width: isActive ? 24 : 6,
              opacity: isActive ? 1 : 0.2
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        );
      })}
    </div>
  );
};

export default SwipeIndicator;
