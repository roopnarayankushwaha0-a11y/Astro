import React from 'react';
import { motion } from 'framer-motion';

/**
 * 🃏 TarotDeck
 * Renders a stack of cards that the user can tap to "draw".
 * Includes a breathing animation to invite interaction.
 */
const TarotDeck = ({ onDraw, hintText }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 h-[60vh]">
      
      {/* The Deck Stack */}
      <div 
        className="relative w-48 h-80 cursor-pointer group perspective-1000"
        onClick={onDraw}
      >
        {/* Background Cards (Visual Stack Effect) */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cosmic-700 to-cosmic-900 border border-white/5 shadow-2xl"
            style={{ 
              transform: `translate(${i * 2}px, ${i * 2}px) rotate(${i * 1}deg)`,
              zIndex: 10 - i 
            }}
          />
        ))}

        {/* Top Card (Interactive) */}
        <motion.div
          whileHover={{ scale: 1.05, y: -10 }}
          whileTap={{ scale: 0.95 }}
          animate={{ 
            y: [0, -10, 0],
            boxShadow: [
              '0 0 0px rgba(167, 139, 250, 0)', 
              '0 0 20px rgba(167, 139, 250, 0.4)', 
              '0 0 0px rgba(167, 139, 250, 0)'
            ] 
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute inset-0 z-20 rounded-2xl bg-[url('/card-back-pattern.png')] bg-cover bg-center border border-white/10 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #2d2d44 0%, #1a1a2e 100%)' // Fallback pattern
          }}
        >
          {/* Card Back Design */}
          <div className="w-[90%] h-[90%] border-2 border-white/10 rounded-xl flex items-center justify-center opacity-30">
            <div className="w-20 h-20 border border-white/20 rotate-45" />
            <div className="absolute w-16 h-16 border border-white/20 rotate-45" />
          </div>
        </motion.div>
      </div>

      {/* Hint Text */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-accent-cyan font-medium tracking-widest uppercase text-sm"
      >
        {hintText}
      </motion.p>

    </div>
  );
};

export default TarotDeck;
