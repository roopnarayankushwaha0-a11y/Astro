import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import AnimatedBackground from '../common/AnimatedBackground';

/**
 * 🖼️ ScreenWrapper
 * The base layout container for every screen.
 * Handles safe areas, background rendering, and entry animations.
 * 
 * @param {node} children
 * @param {boolean} withBackground - Show cosmic background
 * @param {boolean} safeArea - Apply safe area padding
 * @param {string} className
 */
const ScreenWrapper = ({ 
  children, 
  withBackground = true, 
  safeArea = true,
  className 
}) => {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-cosmic-900 text-white">
      {/* Dynamic Background */}
      {withBackground && <AnimatedBackground />}

      {/* Main Content Area */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={cn(
          "relative flex-1 flex flex-col w-full h-full overflow-y-auto overflow-x-hidden no-scrollbar",
          safeArea && "pt-safe pb-safe",
          className
        )}
      >
        {children}
      </motion.main>
    </div>
  );
};

export default ScreenWrapper;
