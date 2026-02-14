import React from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import SettingsGroup from '../components/settings/SettingsGroup'; // Will create
import SettingsItem from '../components/settings/SettingsItem'; // Will create
import LanguagePicker from '../components/settings/LanguagePicker';
import RateAppButton from '../components/settings/RateAppButton'; // Will create
import ShareAppButton from '../components/settings/ShareAppButton'; // Will create
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import { clearAppStorage } from '../services/storageService';
import { APP_INFO } from '../utils/constants';
import BottomNav from '../components/common/BottomNav';
import useToast from '../hooks/useToast';

/**
 * ⚙️ SettingsScreen
 * Manage Language, Data, Privacy, and App Info.
 */
const SettingsScreen = () => {
  const { navigate, resetToHome } = useNavigation();
  const { resetProfile } = useUser();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleClearData = () => {
    if (window.confirm("Are you sure? This will delete your profile and reading history.")) {
      clearAppStorage();
      resetProfile();
      showToast("Data cleared successfully.", "success");
      
      // Force reload to restart app clean
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <ScreenWrapper>
      <Header title={t('settings.title')} transparent />

      <PageTransition>
        <div className="flex flex-col px-5 pt-20 pb-24 overflow-y-auto no-scrollbar space-y-6">
          
          {/* Language Section */}
          <SettingsGroup title={t('settings.language')}>
            <LanguagePicker compact />
          </SettingsGroup>

          {/* General App Actions */}
          <SettingsGroup>
            <ShareAppButton label={t('settings.shareApp')} />
            <RateAppButton label={t('settings.rate')} />
          </SettingsGroup>

          {/* Legal & Data */}
          <SettingsGroup>
            <SettingsItem 
              label={t('settings.privacy')} 
              onClick={() => navigate(SCREENS.PRIVACY)}
              showArrow
            />
            <SettingsItem 
              label={t('settings.clearData')} 
              onClick={handleClearData}
              variant="danger"
            />
          </SettingsGroup>

          {/* Version Info */}
          <div className="text-center pt-4 opacity-30 text-xs">
             <p>{APP_INFO.NAME} v{APP_INFO.VERSION}</p>
          </div>

        </div>

        <BottomNav />

      </PageTransition>
    </ScreenWrapper>
  );
};

export default SettingsScreen;
