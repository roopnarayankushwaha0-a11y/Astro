import React from 'react';
import { motion } from 'framer-motion';
import PalmLineCard from './PalmLineCard'; // Will create
import useLanguage from '../../hooks/useLanguage';
import { PALM_LINES } from '../../utils/palmLinesData';

/**
 * 📝 PalmResultDisplay
 * Renders the full reading.
 * Since AI output structure can vary, we try to parse sections or show full text neatly.
 */
const PalmResultDisplay = ({ reading }) => {
  const { t } = useLanguage();
  
  // Try to map structured data if available, otherwise fallback to generic display
  // In the service, we put everything in 'fullText' mostly.
  // We will display the full text in a nice format, and if we can extract lines, show them specially.
  
  // Note: Since the prompt is "Human-like, Long-form", simple splitting might be fragile.
  // For robustness, we display the main text beautifully formatted.
  
  const paragraphs = reading.fullText.split('\n').filter(p => p.trim().length > 0);

  return (
    <div className="space-y-6">
      
      {/* Hand Visual Header */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-full bg-accent-cyan/10 flex items-center justify-center border border-accent-cyan/20">
          <span className="text-3xl">🖐️</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">
            {t(`palm.${reading.handSide}`)} Reading
          </h2>
          <p className="text-gray-400 text-sm">
            {new Date(reading.date).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Main Reading Content */}
      <div className="space-y-4">
        {paragraphs.map((para, index) => {
          // Check if paragraph starts with a known Line name to style it differently
          const isHeader = para.trim().startsWith('#') || para.trim().endsWith(':');
          const isBullet = para.trim().startsWith('-') || para.trim().startsWith('•');

          if (isHeader) {
            return (
              <motion.h3 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-lg font-semibold text-accent-cyan mt-4 pt-2 border-t border-white/5"
              >
                {para.replace(/#/g, '').trim()}
              </motion.h3>
            );
          }
          
          return (
            <motion.p 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`text-gray-200 leading-relaxed ${isBullet ? 'pl-4 text-sm opacity-90' : 'text-base'}`}
            >
              {para}
            </motion.p>
          );
        })}
      </div>

      {/* Structured Key Lines (Static educational Reference) */}
      <div className="mt-8 pt-6 border-t border-white/10">
        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-4">
          Key Lines Analyzed
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {PALM_LINES.map((line, idx) => (
             <PalmLineCard key={line.id} line={line} index={idx} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default PalmResultDisplay;
