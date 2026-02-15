import React from 'react';
import { motion } from 'framer-motion';
import ZodiacCard from './ZodiacCard';
import useLanguage from '../../hooks/useLanguage';
import ShareButton from '../daily/ShareButton';

/**
 * 📜 HoroscopeDisplay
 * Renders the full daily horoscope content.
 */
const HoroscopeDisplay = ({ data, sign }) => {
  const { t } = useLanguage();

  if (!data) return null;

  // AI returns a markdown string. We just render it cleanly.
  // We expect sections.
  const content = data.reading;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-6"
    >
      {/* Header Info */}
      <ZodiacCard signName={sign} />

      {/* Date */}
      <div className="flex justify-center mb-6">
        <span className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
           {new Date(data.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
        </span>
      </div>

      {/* Main Text Content */}
      <div className="space-y-6">
        {content.split('\n').map((para, i) => {
          if (!para.trim()) return null;
          
          // Style Headers (e.g. "❤️ Love & Relationships")
          const isHeader = para.includes('❤️') || para.includes('💼') || para.includes('🧘') || para.includes('✨') || para.startsWith('##');
          
          if (isHeader) {
            return (
              <h3 key={i} className="text-lg font-semibold text-white mt-6 mb-2 border-l-2 border-accent-cyan pl-3">
                {para.replace(/#/g, '').trim()}
              </h3>
            );
          }

          return (
            <p key={i} className="text-gray-300 leading-relaxed text-sm">
              {para}
            </p>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-6 border-t border-white/10 flex justify-center">
        <ShareButton content={content} type="horoscope" />
      </div>

    </motion.div>
  );
};

export default HoroscopeDisplay;
