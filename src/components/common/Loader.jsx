import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import Logo from '../../assets/images/Logo'; // Will create later

/**
 * 🌀 Loader Component
 * Universal loading indicator. Can be a small spinner or full-screen overlay.
 * 
 * @param {boolean} fullScreen - Covers entire screen with backdrop
 * @param {string} text - Optional text to display below spinner
 */
const Loader = ({ fullScreen = false, text, className }) => {
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      {/* Animated Spinner Container */}
      <div className="relative w-16 h-16">
        {/* Outer Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border-t-2 border-r-2 border-accent-cyan/50"
        />
        
        {/* Inner Ring (Counter-rotating) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 rounded-full border-b-2 border-l-2 border-mystic-light/50"
        />
        
        {/* Center Logo Pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
             {/* Small visual anchor if logo not available, or use CSS circle */}
             <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_white]" />
          </motion.div>
        </div>
      </div>

      {/* Optional Text */}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium text-mystic-light/80 tracking-widest uppercase"
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-cosmic-900/90 backdrop-blur-md">
        {content}
      </div>
    );
  }

  return content;
};

export default Loader;
