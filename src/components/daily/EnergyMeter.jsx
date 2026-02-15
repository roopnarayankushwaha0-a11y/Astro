import React from 'react';
import { motion } from 'framer-motion';

/**
 * ⚡ EnergyMeter
 * A circular progress gauge showing "Daily Energy" level (0-100%).
 */
const EnergyMeter = ({ level = 80 }) => {
  // SVG Circle props
  const radius = 40;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (level / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-28 h-28 flex items-center justify-center">
        
        {/* SVG Gauge */}
        <svg
          height={radius * 2}
          width={radius * 2}
          className="rotate-[-90deg] drop-shadow-[0_0_10px_rgba(34,211,238,0.3)]"
        >
          {/* Background Ring */}
          <circle
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={stroke}
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress Ring */}
          <motion.circle
            stroke="#22d3ee"
            strokeWidth={stroke}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset }}
            strokeLinecap="round"
            fill="transparent"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </svg>

        {/* Text Inside */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-2xl font-bold text-white"
          >
            {level}%
          </motion.span>
          <span className="text-[10px] text-gray-400 uppercase tracking-widest">
            Vibe
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnergyMeter;
