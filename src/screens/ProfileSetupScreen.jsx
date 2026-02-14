import React from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import ProfileForm from '../components/profile/ProfileForm'; // Will create
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';

/**
 * 👤 ProfileSetupScreen
 * Form to collect Name, DOB, Time, Gender.
 * Mandatory before entering Home dashboard for accurate astrology.
 */
const ProfileSetupScreen = () => {
  const { navigate } = useNavigation();
  const { completeOnboarding } = useUser();
  const { t } = useLanguage();

  const handleProfileComplete = () => {
    completeOnboarding();
    // Use replace to prevent going back to setup
    navigate(SCREENS.HOME, {}, true); 
  };

  return (
    <ScreenWrapper>
      <PageTransition>
        <div className="flex flex-col h-full max-w-lg mx-auto px-6 py-6">
          
          {/* Header */}
          <div className="mt-6 mb-8 text-center">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-2xl font-bold text-white mb-2"
            >
              {t('profile.title')}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-sm"
            >
              To align the stars with your destiny, we need a few details.
            </motion.p>
          </div>

          {/* Form Container */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex-1 overflow-y-auto no-scrollbar pb-20"
          >
            <ProfileForm onComplete={handleProfileComplete} />
          </motion.div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default ProfileSetupScreen;
