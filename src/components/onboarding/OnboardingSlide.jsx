import React from 'react';
import { motion } from 'framer-motion';
import OnboardingIllustration1 from '../../assets/images/OnboardingIllustration1'; // Will create
import OnboardingIllustration2 from '../../assets/images/OnboardingIllustration2'; // Will create
import OnboardingIllustration3 from '../../assets/images/OnboardingIllustration3'; // Will create

/**
 * 🎠 OnboardingSlide
 * Renders the image and text for a specific onboarding step.
 */
const OnboardingSlide = ({ data }) => {
  // Map string ID to component
  const Illustrations = {
    OnboardingIllustration1,
    OnboardingIllustration2,
    OnboardingIllustration3
  };

  const Illustration = Illustrations[data.imageName] || Illustrations.OnboardingIllustration1;

  return (
    <div className="flex flex-col items-center text-center max-w-xs mx-auto">
      
      {/* Illustration Area */}
      <motion.div 
        className="w-64 h-64 mb-10 flex items-center justify-center relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring" }}
      >
        <div className="absolute inset-0 bg-accent-cyan/5 rounded-full blur-3xl" />
        <Illustration className="w-full h-full text-white drop-shadow-lg relative z-10" />
      </motion.div>

      {/* Text Content */}
      <motion.h2 
        className="text-2xl font-bold text-white mb-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {data.title}
      </motion.h2>

      <motion.p 
        className="text-gray-400 text-sm leading-relaxed"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {data.desc}
      </motion.p>

    </div>
  );
};

export default OnboardingSlide;
