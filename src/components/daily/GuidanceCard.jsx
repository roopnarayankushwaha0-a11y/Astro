import React from 'react';
import { motion } from 'framer-motion';
import GlassCard from '../common/GlassCard';

/**
 * 🧘 GuidanceCard
 * The main container for the "Card of the Day".
 * Styled to look like a premium oracle card.
 */
const GuidanceCard = ({ content }) => {
  if (!content) return null;

  // Assuming content comes as text sections, we render it gracefully
  const sections = content.split('\n').filter(s => s.trim().length > 0);

  return (
    <GlassCard 
      className="p-8 min-h-[400px] flex flex-col justify-center relative overflow-hidden border-accent-cyan/30"
      variant="heavy"
    >
      {/* Decorative Corner Borders */}
      <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-accent-cyan/40 rounded-tl-lg" />
      <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-accent-cyan/40 rounded-tr-lg" />
      <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-accent-cyan/40 rounded-bl-lg" />
      <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-accent-cyan/40 rounded-br-lg" />

      {/* Central Content */}
      <div className="relative z-10 space-y-4 text-center">
        {sections.map((para, i) => {
          // Detect headers or emphasis
          const isEmphasis = para.includes('Focus Area') || para.includes('Lucky');
          
          if (isEmphasis) {
             return (
               <motion.div 
                 key={i}
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ delay: i * 0.1 }}
                 className="py-2"
               >
                 <span className="text-accent-cyan font-bold tracking-wider text-sm uppercase block mb-1">
                   {para.split(':')[0]}
                 </span>
                 <span className="text-white text-lg font-serif">
                   {para.split(':')[1]}
                 </span>
               </motion.div>
             );
          }

          return (
            <motion.p 
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="text-gray-300 text-sm leading-7"
            >
              {para}
            </motion.p>
          );
        })}
      </div>

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-accent-cyan/5 to-transparent pointer-events-none" />
    </GlassCard>
  );
};

export default GuidanceCard;
