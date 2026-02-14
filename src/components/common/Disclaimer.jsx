import React from 'react';
import { cn } from '../../utils/helpers';
import useLanguage from '../../hooks/useLanguage';

/**
 * ⚖️ Disclaimer Component
 * Displays the mandatory entertainment purpose disclaimer.
 * Subtle but visible at bottom of screens.
 */
const Disclaimer = ({ className }) => {
  const { t } = useLanguage();

  return (
    <div className={cn(
      "w-full px-6 py-4 mt-auto text-center opacity-40 hover:opacity-80 transition-opacity duration-300",
      className
    )}>
      <p className="text-[10px] uppercase tracking-widest text-white leading-relaxed">
        {t('disclaimer.text')}
      </p>
    </div>
  );
};

export default Disclaimer;
