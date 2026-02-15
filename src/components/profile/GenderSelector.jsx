import React from 'react';
import useLanguage from '../../hooks/useLanguage';
import { cn } from '../../utils/helpers';

/**
 * 🚻 GenderSelector
 * Simple segmented control for gender selection.
 */
const GenderSelector = ({ value, onChange }) => {
  const { t } = useLanguage();

  const options = [
    { id: 'female', label: t('profile.female') },
    { id: 'male', label: t('profile.male') },
    { id: 'other', label: t('profile.other') }
  ];

  return (
    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
      {options.map((option) => {
        const isActive = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => onChange(option.id)}
            className={cn(
              "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
              isActive 
                ? "bg-accent-cyan text-cosmic-900 shadow-sm" 
                : "text-gray-400 hover:text-white"
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default GenderSelector;
