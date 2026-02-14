import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import SplashLogo from '../components/splash/SplashLogo'; // Will create later
import SplashAnimation from '../components/splash/SplashAnimation'; // Will create later
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import { sleep } from '../utils/helpers';
import { APP_INFO } from '../utils/constants';

/**
 * 🌊 SplashScreen
 * First screen user sees. Loads resources and determines next route (Onboarding vs Home).
 */
const SplashScreen = () => {
  const { navigate } = useNavigation();
  const { userProfile } = useUser();
  const { t } = useLanguage();

  useEffect(() => {
    const initFlow = async () => {
      // 1. Minimum display time for branding
      await sleep(2500);

      // 2. Navigate based on user state
      if (!userProfile.isOnboarded) {
        navigate(SCREENS.LANGUAGE, {}, true); // Replace history
      } else {
        navigate(SCREENS.HOME, {}, true); // Replace history
      }
    };

    initFlow();
  }, [navigate, userProfile.isOnboarded]);

  return (
    <ScreenWrapper safeArea={false} withBackground={true}>
      <div className="flex flex-col items-center justify-center w-full h-full relative z-10">
        
        {/* Animated Central Logo */}
        <div className="mb-12">
          <SplashLogo />
        </div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-3xl font-bold tracking-wider text-white mb-2 font-serif">
            {APP_INFO.NAME}
          </h1>
          <p className="text-mystic-light/80 text-sm tracking-[0.2em] uppercase">
            {t('splash.tagline')}
          </p>
        </motion.div>

        {/* Background Animation Overlay */}
        <SplashAnimation />
        
        {/* Bottom Loader Line */}
        <motion.div 
          className="absolute bottom-16 w-32 h-1 bg-white/10 rounded-full overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div 
            className="h-full bg-accent-cyan"
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
        </motion.div>

      </div>
    </ScreenWrapper>
  );
};

export default SplashScreen;
