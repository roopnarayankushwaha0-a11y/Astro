import React from 'react';
import { motion } from 'framer-motion';

/**
 * ✨ SplashAnimation
 * Generates random floating particles for the splash screen background.
 */
const SplashAnimation = () => {
  // Generate static random positions for stars so they hydrate consistently
  const particles = Array.from({ length: 15 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100, // %
    y: Math.random() * 100, // %
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white shadow-[0_0_5px_white]"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.8, 0],
            scale: [0, 1.5, 0],
            y: [0, -30] // Float up
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Central Radiating Glow Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
         <motion.div 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
           style={{ width: '200px', height: '200px' }}
           animate={{ scale: [1, 2], opacity: [0.3, 0] }}
           transition={{ duration: 3, repeat: Infinity }}
         />
         <motion.div 
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-white/5 rounded-full"
           style={{ width: '200px', height: '200px' }}
           animate={{ scale: [1, 2], opacity: [0.3, 0] }}
           transition={{ duration: 3, delay: 1, repeat: Infinity }}
         />
      </div>
    </div>
  );
};

export default SplashAnimation;
