import React from 'react';
import { motion } from 'framer-motion';

/**
 * 💬 TypingIndicator
 * "..." Animation to show AI is thinking.
 */
const TypingIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1 px-4 py-3 bg-white/5 rounded-2xl rounded-tl-sm border border-white/5 w-fit"
    >
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
    </motion.div>
  );
};

export default TypingIndicator;
