import React from 'react';
import { motion } from 'framer-motion';
import useLanguage from '../../hooks/useLanguage';
import PalmScanGuide from '../../assets/images/PalmScanGuide'; // Will create

/**
 * 📏 ScanGuide
 * Visual instruction overlay shown before camera opens.
 * Includes animation to show scanning effect.
 */
const ScanGuide = ({ hand }) => {
  const { t } = useLanguage();

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden my-4 rounded-3xl bg-black/20 border border-white/5">
      
      {/* Background Grid for technical feel */}
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
      />

      {/* Main Illustration */}
      <div className="relative w-64 h-80 z-10 flex items-center justify-center">
        {/* Static Outline */}
        <PalmScanGuide 
          className="w-full h-full text-gray-600 opacity-50" 
          flip={hand === 'right'} 
        />

        {/* Animated Scan Line */}
        <motion.div 
          className="absolute left-0 right-0 h-1 bg-accent-cyan shadow-[0_0_15px_#22d3ee] z-20"
          initial={{ top: "0%" }}
          animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Pulse effect at center palm */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-accent-cyan/30 rounded-full animate-ping opacity-20" />
      </div>

      {/* Text Instruction */}
      <div className="absolute bottom-6 px-6 text-center z-20">
        <p className="text-white font-medium bg-black/40 backdrop-blur-md px-4 py-2 rounded-full text-sm">
          {t('palm.instruction')}
        </p>
      </div>

    </div>
  );
};

export default ScanGuide;
