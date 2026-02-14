import React from 'react';
import { motion } from 'framer-motion';
import IconButton from './IconButton';
import BackIcon from '../../assets/icons/BackIcon';
import useNavigation from '../../hooks/useNavigation';
import { cn } from '../../utils/helpers';

/**
 * 🔝 Header Component
 * Standard navigation header for sub-screens.
 * 
 * @param {string} title - Page title
 * @param {boolean} transparent - Whether background is transparent or glass
 * @param {node} rightAction - Optional component for right side (e.g. Settings icon)
 */
const Header = ({ title, transparent = false, rightAction, className }) => {
  const { goBack } = useNavigation();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 pt-safe pb-3",
        !transparent && "bg-cosmic-900/80 backdrop-blur-lg border-b border-white/5",
        className
      )}
    >
      {/* Left: Back Button */}
      <div className="w-10">
        <IconButton variant="ghost" onClick={goBack}>
          <BackIcon className="w-6 h-6" />
        </IconButton>
      </div>

      {/* Center: Title */}
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-white tracking-wide truncate">
          {title}
        </h1>
      </div>

      {/* Right: Action or Spacer */}
      <div className="w-10 flex justify-end">
        {rightAction || <div />}
      </div>
    </motion.header>
  );
};

export default Header;
