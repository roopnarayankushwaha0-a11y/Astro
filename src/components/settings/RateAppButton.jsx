import React from 'react';
import SettingsItem from './SettingsItem';
import useToast from '../../hooks/useToast';

/**
 * ⭐ RateAppButton
 * Simulates opening the store rating page.
 */
const RateAppButton = ({ label }) => {
  const { showToast } = useToast();

  const handleRate = () => {
    // In a real PWA on Android, we might use 'beforeinstallprompt' or link to Play Store URL
    // For now, we simulate the action or link to a placeholder
    const storeUrl = "https://play.google.com/store/apps/details?id=com.ai.palmreader"; // Placeholder
    
    // Try to open externally
    window.open(storeUrl, '_blank');
    
    // Fallback toast
    showToast("Thank you for supporting us!", "success");
  };

  return (
    <SettingsItem 
      label={label} 
      onClick={handleRate}
      showArrow
    />
  );
};

export default RateAppButton;
