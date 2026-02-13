import React, { Suspense, lazy } from 'react';
import { AppProvider } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { UserProvider } from './context/UserContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';

// Components
import Toast from './components/common/Toast';
import Snackbar from './components/common/Snackbar';
import ExitDialog from './components/exit/ExitDialog';
import Loader from './components/common/Loader';

// Lazy Load Screens for Performance
const SplashScreen = lazy(() => import('./screens/SplashScreen'));
const LanguageSelectionScreen = lazy(() => import('./screens/LanguageSelectionScreen'));
const OnboardingScreen = lazy(() => import('./screens/OnboardingScreen'));
const ProfileSetupScreen = lazy(() => import('./screens/ProfileSetupScreen'));
const HomeScreen = lazy(() => import('./screens/HomeScreen'));
const PalmScanScreen = lazy(() => import('./screens/PalmScanScreen'));
const PalmResultScreen = lazy(() => import('./screens/PalmResultScreen'));
const AIPalmChatScreen = lazy(() => import('./screens/AIPalmChatScreen'));
const TarotScreen = lazy(() => import('./screens/TarotScreen'));
const TarotReadingScreen = lazy(() => import('./screens/TarotReadingScreen'));
const LoveReadingScreen = lazy(() => import('./screens/LoveReadingScreen'));
const DailyGuidanceScreen = lazy(() => import('./screens/DailyGuidanceScreen'));
const HoroscopeScreen = lazy(() => import('./screens/HoroscopeScreen'));
const SettingsScreen = lazy(() => import('./screens/SettingsScreen'));
const PrivacyPolicyScreen = lazy(() => import('./screens/PrivacyPolicyScreen'));

/**
 * Main Content Navigator
 * Handles which screen is currently visible based on global state
 */
const AppContent = () => {
  const { currentScreen } = useNavigation();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'SPLASH':
        return <SplashScreen />;
      case 'LANGUAGE':
        return <LanguageSelectionScreen />;
      case 'ONBOARDING':
        return <OnboardingScreen />;
      case 'PROFILE':
        return <ProfileSetupScreen />;
      case 'HOME':
        return <HomeScreen />;
      case 'PALM_SCAN':
        return <PalmScanScreen />;
      case 'PALM_RESULT':
        return <PalmResultScreen />;
      case 'AI_CHAT':
        return <AIPalmChatScreen />;
      case 'TAROT_MENU':
        return <TarotScreen />;
      case 'TAROT_READING':
        return <TarotReadingScreen />;
      case 'LOVE_READING':
        return <LoveReadingScreen />;
      case 'DAILY_GUIDANCE':
        return <DailyGuidanceScreen />;
      case 'HOROSCOPE':
        return <HoroscopeScreen />;
      case 'SETTINGS':
        return <SettingsScreen />;
      case 'PRIVACY':
        return <PrivacyPolicyScreen />;
      default:
        return <SplashScreen />;
    }
  };

  return (
    <>
      <Suspense fallback={<Loader fullScreen />}>
        {renderScreen()}
      </Suspense>
      
      {/* Global Overlays */}
      <Toast />
      <Snackbar />
      <ExitDialog />
    </>
  );
};

/**
 * Root App Component
 * Wraps the application in necessary Context Providers
 */
const App = () => {
  return (
    <AppProvider>
      <LanguageProvider>
        <UserProvider>
          <NavigationProvider>
            <AppContent />
          </NavigationProvider>
        </UserProvider>
      </LanguageProvider>
    </AppProvider>
  );
};

export default App;
