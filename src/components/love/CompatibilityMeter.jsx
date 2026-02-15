import React from 'react';
import { motion } from 'framer-motion';

/**
 * ❤️ CompatibilityMeter
 * Animated heart-shaped or linear gauge for relationship score.
 */
const CompatibilityMeter = ({ score }) => {
  return (
    <div className="flex flex-col items-center justify-center py-6">
      
      <div className="relative w-40 h-40 flex items-center justify-center">
        {/* Pulsing Background */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-pink-500/20 rounded-full blur-xl"
        />

        {/* SVG Ring */}
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="80" cy="80" r="70"
            fill="none"
            stroke="#ec4899" // Pink-500
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={440} // 2 * PI * 70
            strokeDashoffset={440}
            animate={{ strokeDashoffset: 440 - (440 * score) / 100 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Center Score */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-4xl font-bold text-white"
          >
            {score}%
          </motion.span>
          <span className="text-pink-300 text-xs uppercase tracking-widest mt-1">
            Match
          </span>
        </div>
      </div>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-pink-200/70 text-sm mt-4 italic"
      >
        {score > 80 ? "The stars align perfectly!" : 
         score > 60 ? "A promising connection." : 
         "Challenges await, but love prevails."}
      </motion.p>
    </div>
  );
};

export default CompatibilityMeter;
