import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

/**
 * 💌 LoveInsightCard
 * Displays the AI-generated relationship advice.
 */
const LoveInsightCard = ({ text }) => {
  if (!text) return null;

  return (
    <GlassCard className="p-6 border-pink-500/20 bg-pink-900/10">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">💘</span>
        <h3 className="text-lg font-semibold text-white">
          Cosmic Insight
        </h3>
      </div>

      <div className="space-y-4">
        {text.split('\n').map((para, i) => {
          if (!para.trim()) return null;

          // Highlight Headers
          if (para.includes('💞') || para.includes('🔥') || para.includes('💡')) {
            return (
              <h4 key={i} className="text-pink-300 font-medium mt-4 border-l-2 border-pink-500 pl-3">
                {para}
              </h4>
            );
          }

          return (
            <p key={i} className="text-gray-300 text-sm leading-relaxed">
              {para}
            </p>
          );
        })}
      </div>
    </GlassCard>
  );
};

export default LoveInsightCard;
