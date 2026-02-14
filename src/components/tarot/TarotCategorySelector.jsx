import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import useLanguage from '../../hooks/useLanguage';

/**
 * 🤏 TarotCategorySelector
 * A compact horizontal scroll selector for categories.
 * Useful if we want to switch context inside a reading or sub-screen.
 */
const TarotCategorySelector = ({ selected, onSelect }) => {
  const { t } = useLanguage();

  const categories = [
    { id: 'love', label: t('tarot.love'), icon: '❤️' },
    { id: 'career', label: t('tarot.career'), icon: '💼' },
    { id: 'growth', label: t('tarot.growth'), icon: '🌱' }
  ];

  return (
    <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
      {categories.map((cat) => {
        const isSelected = selected === cat.id;
        
        return (
          <button
            key={cat.id}
            onClick={() => onSelect(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full border text-sm whitespace-nowrap transition-all",
              isSelected 
                ? "bg-white/10 border-accent-cyan text-white shadow-glow-sm" 
                : "bg-transparent border-white/10 text-gray-400 hover:bg-white/5"
            )}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default TarotCategorySelector;
