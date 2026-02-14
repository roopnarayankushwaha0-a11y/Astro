import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🔮 SplashLogo
 * Animated central logo for the Splash Screen.
 * Composed of SVG elements representing a Palm + Eye + Star.
 */
const SplashLogo = () => {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      
      {/* Outer Glow Ring */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 rounded-full bg-accent-cyan/20 blur-xl"
      />

      {/* SVG Logo Construction */}
      <svg 
        viewBox="0 0 200 200" 
        className="w-full h-full drop-shadow-[0_0_15px_rgba(167,139,250,0.6)]"
      >
        {/* Palm Outline */}
        <motion.path
          d="M100 180 C70 180 50 150 50 120 L50 70 C50 55 60 50 65 50 C70 50 75 55 75 65 L75 100 M75 65 L75 50 C75 35 85 30 90 30 C95 30 100 35 100 50 L100 90 M100 50 L100 30 C100 15 110 10 115 10 C120 10 125 15 125 30 L125 90 M125 30 L125 40 C125 25 135 20 140 20 C145 20 150 25 150 40 L150 110 C150 150 130 180 100 180"
          fill="none"
          stroke="#a78bfa"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />

        {/* Third Eye (Center) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <path
            d="M80 110 Q100 90 120 110 Q100 130 80 110"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <circle cx="100" cy="110" r="6" fill="#22d3ee" />
        </motion.g>

        {/* Stars */}
        <motion.path
          d="M100 15 L102 19 L106 19 L103 21 L104 25 L100 23 L96 25 L97 21 L94 19 L98 19 Z"
          fill="white"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0.5], scale: [0, 1.2, 1] }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        
      </svg>
    </div>
  );
};

export default SplashLogo;
