import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * 🔘 IconButton Component
 * A circular or square button typically used for icons (Back, Close, Menu).
 * 
 * @param {node} children - SVG or Icon component
 * @param {string} variant - 'glass', 'solid', 'ghost'
 * @param {string} size - 'sm', 'md', 'lg'
 */
const IconButton = ({
  children,
  className,
  variant = 'glass',
  size = 'md',
  onClick,
  disabled = false,
  ...props
}) => {
  const variants = {
    glass: "bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20",
    solid: "bg-mystic-base text-white hover:bg-mystic-light shadow-glow-sm",
    ghost: "bg-transparent text-gray-400 hover:text-white hover:bg-white/5",
    active: "bg-accent-cyan text-cosmic-900 shadow-glow-lg"
  };

  const sizes = {
    sm: "w-8 h-8 p-1.5 rounded-full",
    md: "w-10 h-10 p-2.5 rounded-xl",
    lg: "w-12 h-12 p-3 rounded-2xl"
  };

  return (
    <motion.button
      type="button"
      whileTap={!disabled ? { scale: 0.90 } : {}}
      className={cn(
        "flex items-center justify-center transition-colors duration-200",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default IconButton;
