import React from 'react';
import { cn } from '../../utils/helpers';
import ArrowRightIcon from '../../assets/icons/ArrowRightIcon'; // Will create

/**
 * ⚙️ SettingsItem
 * A single row in the settings menu.
 */
const SettingsItem = ({ 
  label, 
  onClick, 
  showArrow = false, 
  variant = 'default', // 'default', 'danger'
  rightContent
}) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 active:scale-[0.99] transition-all border-b border-white/5 last:border-0 first:rounded-t-2xl last:rounded-b-2xl"
    >
      <span className={cn(
        "font-medium text-sm",
        variant === 'danger' ? "text-red-400" : "text-white"
      )}>
        {label}
      </span>

      <div className="flex items-center gap-2">
        {rightContent}
        
        {showArrow && (
          <ArrowRightIcon className="w-4 h-4 text-gray-500" />
        )}
      </div>
    </button>
  );
};

export default SettingsItem;
