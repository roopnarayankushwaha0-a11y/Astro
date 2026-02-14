import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import '../../styles/glassmorphism.css';

/**
 * 🪟 GlassCard Component
 * The fundamental building block of the UI.
 * Implements the frosted glass effect with optional animations.
 * 
 * @param {node} children - Content
 * @param {string} className - Additional CSS
 * @param {string} variant - 'default', 'light', 'heavy', 'active'
 * @param {boolean} gradientBorder - Whether to add a gradient border effect
 * @param {function} onClick - Click handler
 * @param {number} delay - Animation delay in seconds
 */
const GlassCard = ({ 
  children, 
  className, 
  variant = 'default', 
  gradientBorder = false,
  onClick,
  delay = 0,
  ...props 
}) => {
  // Map variants to CSS classes defined in glassmorphism.css
  const getVariantClass = () => {
    switch (variant) {
      case 'light': return 'glass-light';
      case 'heavy': return 'glass-heavy';
      case 'active': return 'glass-active';
      default: return 'glass-panel';
    }
  };

  const baseClasses = cn(
    'relative overflow-hidden rounded-2xl transition-all duration-300',
    getVariantClass(),
    gradientBorder && 'glass-gradient-border',
    onClick && 'cursor-pointer active:scale-[0.98]', // Press effect
    className
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay, ease: "easeOut" }}
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {/* Optional subtle noise texture overlay for realism */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/noise.png')] mix-blend-overlay" />
      
      {/* Content wrapper to ensure it sits above background effects */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
