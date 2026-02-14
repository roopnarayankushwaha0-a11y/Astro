import React from 'react';
import { motion } from 'framer-motion';
import HandLeftGuide from '../../assets/images/HandLeftGuide'; // Will create
import HandRightGuide from '../../assets/images/HandRightGuide'; // Will create
import useLanguage from '../../hooks/useLanguage';
import GlassCard from '../common/GlassCard';

/**
 * ✋ HandSelector
 * Step 1 of Palm Scan.
 * Explains the difference between Left (Internal/Potential) vs Right (External/Action).
 */
const HandSelector = ({ onSelect }) => {
  const { t } = useLanguage();

  const options = [
    {
      id: 'left',
      label: t('palm.left'),
      desc: t('palm.leftDesc'),
      component: HandLeftGuide,
      delay: 0.1
    },
    {
      id: 'right',
      label: t('palm.right'),
      desc: t('palm.rightDesc'),
      component: HandRightGuide,
      delay: 0.2
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full">
      
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white mb-8 text-center"
      >
        {t('palm.selectHand')}
      </motion.h2>

      <div className="flex flex-col w-full gap-6">
        {options.map((option) => {
          const HandComponent = option.component;
          
          return (
            <GlassCard
              key={option.id}
              onClick={() => onSelect(option.id)}
              delay={option.delay}
              className="p-6 flex items-center gap-6 group hover:border-accent-cyan/50 transition-colors"
            >
              {/* Visual Icon */}
              <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center p-3 group-hover:scale-110 transition-transform duration-300">
                 <HandComponent className="w-full h-full text-gray-300 group-hover:text-accent-cyan" />
              </div>

              {/* Text Info */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-1 group-hover:text-accent-cyan transition-colors">
                  {option.label}
                </h3>
                <p className="text-sm text-gray-400">
                  {option.desc}
                </p>
              </div>

              {/* Arrow */}
              <div className="text-gray-500 group-hover:text-white transition-colors">
                ➔
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
};

export default HandSelector;
