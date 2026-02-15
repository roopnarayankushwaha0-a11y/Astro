import React from 'react';
import SettingsItem from './SettingsItem';
import { shareContent } from '../../utils/shareUtils';
import useToast from '../../hooks/useToast';
import { APP_INFO } from '../../utils/constants';

/**
 * 🔗 ShareAppButton
 * Invokes native share to send app link to friends.
 */
const ShareAppButton = ({ label }) => {
  const { showToast } = useToast();

  const handleShare = async () => {
    const result = await shareContent({
      title: APP_INFO.NAME,
      text: "Check out this amazing AI Palm Reader & Astrology app!",
      url: window.location.origin
    });

    if (result.success && result.method === 'clipboard') {
      showToast("App link copied to clipboard!", "success");
    }
  };

  return (
    <SettingsItem 
      label={label} 
      onClick={handleShare}
      showArrow
    />
  );
};

export default ShareAppButton;
