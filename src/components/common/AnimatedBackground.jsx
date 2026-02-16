import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🌌 AnimatedBackground Component
 * Renders the deep space background with moving nebula clouds and twinkling stars.
 * Optimized for performance using CSS transforms and opacity rather than heavy Canvas logic.
 */
const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-cosmic-900">
      
      {/* 🌑 Deep Space Base Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1a1a2e_0%,_#050508_100%)] opacity-80" />

      {/* 🌫️ Nebula Cloud 1 (Purple) */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] bg-mystic-dark/30 rounded-full blur-[100px] mix-blend-screen"
      />

      {/* 🌫️ Nebula Cloud 2 (Cyan) */}
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/3 -right-1/4 w-[60vw] h-[60vw] bg-accent-cyan/10 rounded-full blur-[80px] mix-blend-screen"
      />

      {/* 🌫️ Nebula Cloud 3 (Bottom Glow) */}
      <motion.div
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-1/4 left-1/4 w-[70vw] h-[50vw] bg-mystic-base/20 rounded-full blur-[120px] mix-blend-screen"
      />

      {/* ✨ Stars Layer (CSS Based in index.css or inline SVG) */}
      {/* Using a repeatable SVG pattern for performance */}
      <div className="absolute inset-0 opacity-40">
        <svg width="100%" height="100%">
          <pattern id="star-pattern" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="white" fillOpacity="0.8" />
            <circle cx="150" cy="80" r="1.5" fill="white" fillOpacity="0.6" />
            <circle cx="300" cy="200" r="1" fill="white" fillOpacity="0.8" />
            <circle cx="80" cy="300" r="1.2" fill="white" fillOpacity="0.5" />
            <circle cx="350" cy="350" r="1" fill="white" fillOpacity="0.7" />
            <circle cx="200" cy="250" r="0.8" fill="white" fillOpacity="0.9" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#star-pattern)" />
        </svg>
      </div>

    </div>
  );
};

export default AnimatedBackground;
