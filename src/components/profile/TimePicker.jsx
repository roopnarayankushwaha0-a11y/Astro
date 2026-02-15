import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * ⏰ TimePicker
 * Wraps native HTML time input.
 */
const TimePicker = ({ value, onChange, className }) => {
  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan/50 focus:bg-white/10 transition-all outline-none appearance-none"
        style={{ colorScheme: 'dark' }}
      />
      
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    </div>
  );
};

export default TimePicker;
