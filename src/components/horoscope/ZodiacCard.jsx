import React from 'react';
import GlassCard from '../common/GlassCard';
import { ZODIAC_SIGNS } from '../../utils/zodiacData';

/**
 * 🌠 ZodiacCard
 * Displays static info about the selected sign (Date range, Element, Traits).
 * Used as a header for the reading.
 */
const ZodiacCard = ({ signName }) => {
  const zodiacData = ZODIAC_SIGNS.find(z => z.name === signName) || ZODIAC_SIGNS[0];

  return (
    <GlassCard className="p-6 relative overflow-hidden mb-6">
      
      {/* Background Symbol Watermark */}
      <div className="absolute -right-6 -bottom-6 text-[120px] opacity-5 pointer-events-none select-none">
        {zodiacData.symbol}
      </div>

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            {zodiacData.name}
          </h2>
          <p className="text-accent-cyan text-sm font-medium tracking-wider uppercase mb-4">
            {zodiacData.dateRange}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            <span className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300 border border-white/5">
              Element: {zodiacData.element}
            </span>
            <span className="px-3 py-1 bg-white/10 rounded-lg text-xs text-gray-300 border border-white/5">
              Planet: {zodiacData.planet}
            </span>
          </div>
        </div>

        {/* Hero Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-white/10 to-transparent border border-white/10 flex items-center justify-center text-3xl shadow-glow-sm">
          {zodiacData.symbol}
        </div>
      </div>

      {/* Traits */}
      <div className="mt-6 flex flex-wrap gap-2">
        {zodiacData.traits.map(trait => (
          <span key={trait} className="text-xs text-gray-400">
            • {trait}
          </span>
        ))}
      </div>

    </GlassCard>
  );
};

export default ZodiacCard;
