import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';

/**
 * 🔘 Button Component
 * Standardized button with animations and variants.
 * 
 * @param {string} variant - 'primary', 'secondary', 'outline', 'ghost'
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {boolean} isLoading - Shows spinner
 * @param {boolean} disabled - Disables interaction
 * @param {boolean} fullWidth - 100% width
 * @param {ReactNode} icon - Optional icon to display before text
 */
const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  icon,
  onClick,
  type = 'button',
  ...props
}) => {
  
  const variants = {
    primary: "bg-gradient-to-r from-mystic-base to-accent-cyan text-white shadow-glow-sm hover:shadow-glow-md border-none",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10 backdrop-blur-md",
    outline: "bg-transparent border border-accent-cyan/50 text-accent-cyan hover:bg-accent-cyan/10",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5",
    danger: "bg-red-500/20 text-red-200 border border-red-500/50 hover:bg-red-500/30"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm rounded-lg",
    md: "px-6 py-3 text-base rounded-xl",
    lg: "px-8 py-4 text-lg font-semibold rounded-2xl"
  };

  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      whileTap={!isDisabled ? { scale: 0.96 } : {}}
      whileHover={!isDisabled ? { scale: 1.02 } : {}}
      className={cn(
        "relative flex items-center justify-center font-medium transition-all duration-200 select-none overflow-hidden",
        variants[variant],
        sizes[size],
        fullWidth ? "w-full" : "w-auto",
        isDisabled && "opacity-50 cursor-not-allowed grayscale",
        className
      )}
      onClick={isDisabled ? undefined : onClick}
      disabled={isDisabled}
      {...props}
    >
      {/* Loading Spinner */}
      {isLoading && (
        <span className="absolute inset-0 flex items-center justify-center bg-inherit">
          <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
      )}

      {/* Content */}
      <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
        {icon && <span className="w-5 h-5">{icon}</span>}
        {children}
      </span>
    </motion.button>
  );
};

export default Button;
