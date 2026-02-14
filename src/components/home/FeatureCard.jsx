import React from 'react';
import GlassCard from '../common/GlassCard';
import { cn } from '../../utils/helpers';
import SparkleIcon from '../../assets/icons/SparkleIcon';

/**
 * 🃏 FeatureCard
 * A versatile card for the home screen.
 * Supports a "hero" variant for the daily guidance and a standard variant for the grid.
 * 
 * @param {string} title
 * @param {string} description
 * @param {node} icon - SVG Component
 * @param {function} onClick
 * @param {string} variant - 'default' or 'hero'
 * @param {string} iconBg - Tailwind bg class for icon container
 */
const FeatureCard = ({ 
  title, 
  description, 
  icon, 
  onClick, 
  delay = 0,
  variant = 'default',
  iconBg
}) => {
  
  if (variant === 'hero') {
    return (
      <GlassCard 
        onClick={onClick}
        delay={delay}
        variant="heavy" // Darker background to pop
        className="p-6 relative overflow-hidden group border-accent-cyan/20"
      >
        <div className="flex flex-col gap-2 relative z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
            <div className="p-2 bg-white/10 rounded-full animate-pulse-slow">
              <SparkleIcon className="w-6 h-6 text-accent-cyan" />
            </div>
          </div>
          
          <p className="text-gray-300 text-sm leading-relaxed max-w-[80%]">
            {description}
          </p>
          
          <div className="mt-4 flex items-center text-xs font-semibold text-accent-cyan uppercase tracking-wider">
            Reveal Now <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </div>
        </div>

        {/* Decorative Background Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent-cyan/20 blur-[50px] rounded-full group-hover:bg-accent-cyan/30 transition-colors duration-500" />
      </GlassCard>
    );
  }

  // Default Grid Card
  return (
    <GlassCard 
      onClick={onClick}
      delay={delay}
      className="p-4 flex flex-col items-start gap-3 h-full group hover:bg-white/5"
    >
      {/* Icon */}
      <div className={cn("p-3 rounded-xl transition-transform group-hover:scale-110", iconBg)}>
        {icon}
      </div>

      {/* Text */}
      <div>
        <h3 className="font-semibold text-white text-base leading-tight mb-1">
          {title}
        </h3>
        <p className="text-gray-400 text-xs line-clamp-2">
          {description}
        </p>
      </div>

      {/* Hover Arrow */}
      <div className="mt-auto self-end opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0 duration-300">
        <span className="text-white/50 text-sm">→</span>
      </div>
    </GlassCard>
  );
};

export default FeatureCard;
