import React from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../../context/UserContext';
import useLanguage from '../../hooks/useLanguage';
import { getGreeting } from '../../utils/helpers';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import IconButton from '../common/IconButton';
import useNavigation from '../../hooks/useNavigation';
import { SCREENS } from '../../context/NavigationContext';

/**
 * 🌤️ WelcomeHeader
 * Sticky header for the Home Screen.
 * Displays "Good Morning, Name" and quick settings access.
 */
const WelcomeHeader = () => {
  const { userProfile } = useUser();
  const { t } = useLanguage();
  const { navigate } = useNavigation();

  // Parse first name
  const firstName = userProfile.name ? userProfile.name.split(' ')[0] : 'Guest';
  const greeting = getGreeting(); // e.g., "Good Morning"

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-0 z-40 px-6 pt-safe pb-6 bg-gradient-to-b from-cosmic-900 to-transparent backdrop-blur-sm"
    >
      <div className="flex items-center justify-between">
        
        {/* User Greeting */}
        <div className="flex flex-col">
          <span className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-1">
            {greeting}
          </span>
          <h1 className="text-2xl font-bold text-white tracking-wide">
            {firstName}
          </h1>
        </div>

        {/* Quick Settings Action */}
        <IconButton 
          variant="glass" 
          size="sm"
          onClick={() => navigate(SCREENS.SETTINGS)}
        >
          <SettingsIcon className="w-5 h-5 text-gray-300" />
        </IconButton>

      </div>
    </motion.header>
  );
};

export default WelcomeHeader;
