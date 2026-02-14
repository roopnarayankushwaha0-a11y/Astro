import React from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import LanguagePicker from '../components/settings/LanguagePicker'; // Will create
import Button from '../components/common/Button';
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import useLanguage from '../hooks/useLanguage';

/**
 * 🗣️ LanguageSelectionScreen
 * User selects their preferred language before starting onboarding.
 * This ensures the AI tone and UI text are correct from the start.
 */
const LanguageSelectionScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();

  const handleContinue = () => {
    navigate(SCREENS.ONBOARDING);
  };

  return (
    <ScreenWrapper>
      <PageTransition>
        <div className="flex flex-col h-full px-6 py-8">
          
          {/* Header Area */}
          <div className="flex-1 flex flex-col justify-center items-center text-center mt-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-20 h-20 mb-6 bg-white/5 rounded-full flex items-center justify-center border border-white/10 shadow-glow-sm"
            >
              <span className="text-4xl">🌍</span>
            </motion.div>
            
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl font-bold text-white mb-3"
            >
              Select Language
            </motion.h1>
            
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 max-w-xs"
            >
              Choose your preferred language for readings and interface.
            </motion.p>
          </div>

          {/* Selection Area */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-[2] w-full max-w-sm mx-auto"
          >
            <LanguagePicker />
          </motion.div>

          {/* Footer Action */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-auto w-full max-w-sm mx-auto"
          >
            <Button 
              fullWidth 
              size="lg" 
              onClick={handleContinue}
              variant="primary"
            >
              {t('common.continue')}
            </Button>
          </motion.div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default LanguageSelectionScreen;
