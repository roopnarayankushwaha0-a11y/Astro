import React from 'react';
import { cn } from '../../utils/helpers';

/**
 * 📅 DatePicker
 * Wraps native HTML date input styled to look like a glass field.
 * Custom date pickers are heavy; native is best for mobile PWA.
 */
const DatePicker = ({ value, onChange, className }) => {
  return (
    <div className={cn("relative w-full", className)}>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-accent-cyan/50 focus:bg-white/10 transition-all outline-none appearance-none"
        style={{ colorScheme: 'dark' }} // Forces native picker to be dark mode
      />
      
      {/* Fallback Icon for older browsers that don't show calendar icon */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </div>
  );
};

export default DatePicker;
