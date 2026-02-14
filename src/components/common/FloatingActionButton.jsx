import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import ChatIcon from '../../assets/icons/ChatIcon';

/**
 * 🛰️ FloatingActionButton (FAB)
 * Usually sits at the bottom right.
 * Used to quickly access the AI Chat ("Ask Astra").
 */
const FloatingActionButton = ({ onClick, className }) => {
  return (
    <motion.button
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      onClick={onClick}
      className={cn(
        "fixed bottom-24 right-6 z-40 flex items-center justify-center w-14 h-14 rounded-full",
        "bg-gradient-to-tr from-mystic-dark to-accent-cyan",
        "shadow-glow-md border border-white/20",
        className
      )}
    >
      <ChatIcon className="w-7 h-7 text-white drop-shadow-md" filled />
      
      {/* Pulse Effect Ring */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-accent-cyan" />
    </motion.button>
  );
};

export default FloatingActionButton;
