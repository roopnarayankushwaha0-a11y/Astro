import React from 'react';
import GlassCard from '../common/GlassCard';

/**
 * 📏 PalmLineCard
 * Displays static educational info about a specific palm line (Heart, Head, etc).
 * Used at the bottom of results to educate the user.
 */
const PalmLineCard = ({ line, index }) => {
  return (
    <GlassCard 
      className="p-4 flex items-start gap-4"
      delay={0.5 + (index * 0.1)}
    >
      {/* Icon/Color Indicator */}
      <div 
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${line.color}20`, color: line.color }}
      >
        <span className="text-lg">{line.icon}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <h4 className="text-white font-medium text-sm">
            {line.name}
          </h4>
        </div>
        
        <p className="text-gray-400 text-xs leading-snug">
          {line.description}
        </p>
      </div>
    </GlassCard>
  );
};

export default PalmLineCard;
