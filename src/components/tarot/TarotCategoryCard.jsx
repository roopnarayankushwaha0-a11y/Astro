import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';
import { cn } from '../../utils/helpers';

/**
 * 🎴 TarotCategoryCard
 * Large card for selecting reading type (Love, Career, etc).
 */
const TarotCategoryCard = ({ data, index, onClick }) => {
  return (
    <GlassCard
      onClick={onClick}
      delay={index * 0.1}
      className="group relative overflow-hidden p-6 h-32 flex items-center justify-between border-white/5 hover:border-white/20 transition-all"
    >
      {/* Background Gradient Blob */}
      <div className={cn(
        "absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity bg-gradient-to-br",
        data.color
      )} />

      {/* Text Content */}
      <div className="relative z-10 flex flex-col gap-1">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all">
          {data.title}
        </h3>
        <p className="text-sm text-gray-400 group-hover:text-gray-300">
          Tap to begin reading
        </p>
      </div>

      {/* Icon */}
      <motion.div 
        className="relative z-10 text-4xl group-hover:scale-110 transition-transform duration-300"
      >
        {data.icon}
      </motion.div>

    </GlassCard>
  );
};

export default TarotCategoryCard;
