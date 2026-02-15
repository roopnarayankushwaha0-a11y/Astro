import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import { cn } from '../../utils/helpers';

/**
 * 🌍 LanguagePicker
 * Can render as a large grid (onboarding) or compact list (settings).
 * 
 * @param {boolean} compact - Compact mode for Settings screen
 */
const LanguagePicker = ({ compact = false }) => {
  const { language, languages, changeLanguage } = useLanguage();

  if (compact) {
    // Compact Horizontal Scroll for Settings
    return (
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm whitespace-nowrap border transition-all",
              language === lang.code
                ? "bg-accent-cyan/10 border-accent-cyan text-accent-cyan"
                : "bg-white/5 border-transparent text-gray-400 hover:bg-white/10"
            )}
          >
            {lang.native}
          </button>
        ))}
      </div>
    );
  }

  // Large Grid for Onboarding
  return (
    <div className="grid grid-cols-2 gap-3">
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          className={cn(
            "flex flex-col items-center justify-center p-4 rounded-xl border transition-all",
            language === lang.code
              ? "bg-accent-cyan/10 border-accent-cyan text-white shadow-glow-sm"
              : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10"
          )}
        >
          <span className="text-lg font-medium">{lang.native}</span>
          <span className="text-xs opacity-50">{lang.name}</span>
        </button>
      ))}
    </div>
  );
};

export default LanguagePicker;
