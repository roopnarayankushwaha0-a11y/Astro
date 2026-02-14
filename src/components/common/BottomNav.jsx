import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/helpers';
import HomeIcon from '../../assets/icons/HomeIcon';
import PalmIcon from '../../assets/icons/PalmIcon';
import TarotIcon from '../../assets/icons/TarotIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import useNavigation from '../../hooks/useNavigation';
import { SCREENS } from '../../context/NavigationContext';

/**
 * 🧭 BottomNav Component
 * Main navigation for the application.
 * Only shown on main dashboard screens usually, but for this specific app structure,
 * we might treat the dashboard as a single hub and this navigates sub-sections 
 * OR it's just for the main sections.
 */

const NAV_ITEMS = [
  { id: 'HOME', icon: HomeIcon, label: 'Home', screen: SCREENS.HOME },
  { id: 'PALM', icon: PalmIcon, label: 'Palm', screen: SCREENS.PALM_SCAN },
  { id: 'TAROT', icon: TarotIcon, label: 'Tarot', screen: SCREENS.TAROT_MENU },
  { id: 'SETTINGS', icon: SettingsIcon, label: 'Settings', screen: SCREENS.SETTINGS }
];

const BottomNav = () => {
  const { currentScreen, navigate } = useNavigation();

  // Helper to check if item is active based on current screen logic
  // Since some screens are sub-screens (like Palm Result), we check "includes" or exact match logic
  const isActive = (item) => {
    if (item.id === 'PALM') return currentScreen === SCREENS.PALM_SCAN || currentScreen === SCREENS.PALM_RESULT;
    if (item.id === 'TAROT') return currentScreen === SCREENS.TAROT_MENU || currentScreen === SCREENS.TAROT_READING;
    if (item.id === 'SETTINGS') return currentScreen === SCREENS.SETTINGS;
    if (item.id === 'HOME') return currentScreen === SCREENS.HOME;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-6 pb-6 pt-2">
      <motion.nav 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between px-2 py-3 bg-cosmic-800/90 backdrop-blur-xl border border-white/10 rounded-3xl shadow-glow-sm"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item);
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => navigate(item.screen)}
              className={cn(
                "relative flex flex-col items-center justify-center w-16 h-12 gap-1 transition-all duration-300",
                active ? "text-accent-cyan" : "text-gray-400 hover:text-gray-200"
              )}
            >
              {/* Active Indicator Glow */}
              {active && (
                <motion.div
                  layoutId="navIndicator"
                  className="absolute -top-3 w-8 h-1 bg-accent-cyan rounded-full shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                />
              )}
              
              <Icon 
                className={cn(
                  "w-6 h-6 transition-transform",
                  active && "scale-110 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]"
                )} 
                filled={active} 
              />
              
              <span className="text-[10px] font-medium tracking-wide">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.nav>
    </div>
  );
};

export default BottomNav;
