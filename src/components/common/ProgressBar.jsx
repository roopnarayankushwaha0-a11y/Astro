import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * 📊 ProgressBar Component
 * A sleek progress indicator.
 * 
 * @param {number} progress - 0 to 100
 * @param {string} colorClass - Tailwind text/bg color class prefix (e.g. 'bg-accent-cyan')
 */
const ProgressBar = ({ progress = 0, className, barClassName }) => {
  return (
    <div className={cn("w-full h-1.5 bg-white/10 rounded-full overflow-hidden", className)}>
      <motion.div 
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "h-full rounded-full shadow-[0_0_10px_currentColor]", 
          barClassName || "bg-gradient-to-r from-mystic-base to-accent-cyan"
        )}
      />
    </div>
  );
};

export default ProgressBar;
