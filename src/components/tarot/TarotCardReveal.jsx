import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import SparkleIcon from '../../assets/icons/SparkleIcon';

/**
 * 🎴 TarotCardReveal
 * Handles the 3D flip animation revealing the card face.
 */
const TarotCardReveal = ({ card, onRevealComplete }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    // Trigger flip after short mounting delay
    const timer = setTimeout(() => {
      setIsFlipped(true);
    }, 500);

    // Notify parent after animation finishes
    const completeTimer = setTimeout(() => {
      onRevealComplete();
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onRevealComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full perspective-1000">
      
      <motion.div
        initial={{ rotateY: 0, scale: 0.8 }}
        animate={{ 
          rotateY: isFlipped ? 180 : 0,
          scale: isFlipped ? 1.1 : 0.8 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="relative w-64 h-96 transform-style-3d shadow-2xl"
      >
        {/* FRONT (Card Back) */}
        <div className="absolute inset-0 backface-hidden rounded-2xl bg-cosmic-800 border border-white/10 flex items-center justify-center">
          <div className="w-full h-full bg-[radial-gradient(circle,_#2d2d44_1px,_transparent_1px)] bg-[length:10px_10px] opacity-30" />
          <div className="absolute w-20 h-20 border-2 border-accent-cyan/20 rotate-45" />
        </div>

        {/* BACK (Card Face) */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/20">
          {/* Card Art Placeholder */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80" />
          
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {/* Suit Icon / Image */}
            <div className="text-6xl mb-4 opacity-80">
              {card.type === 'major' ? '🔮' : '⚔️'} 
              {/* Simplification: Real app would map specific images */}
            </div>

            <h3 className="text-2xl font-serif font-bold text-white mb-1">
              {card.name}
            </h3>
            
            {card.isReversed && (
              <span className="px-2 py-0.5 bg-red-500/20 text-red-200 text-xs rounded-full border border-red-500/30">
                Reversed
              </span>
            )}
            
            {!card.isReversed && (
               <span className="px-2 py-0.5 bg-green-500/20 text-green-200 text-xs rounded-full border border-green-500/30">
                Upright
              </span>
            )}
          </div>

          {/* Sparkles Overlay */}
          <div className="absolute top-2 right-2 animate-spin-slow">
            <SparkleIcon className="text-accent-cyan/50 w-6 h-6" />
          </div>
        </div>

      </motion.div>

    </div>
  );
};

export default TarotCardReveal;
