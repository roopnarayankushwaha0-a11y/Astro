import React from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import WelcomeHeader from '../components/home/WelcomeHeader'; // Will create
import FeatureGrid from '../components/home/FeatureGrid'; // Will create
import FeatureCard from '../components/home/FeatureCard'; // Will create
import BottomNav from '../components/common/BottomNav';
import FloatingActionButton from '../components/common/FloatingActionButton';
import Disclaimer from '../components/common/Disclaimer';
import useExitHandler from '../hooks/useExitHandler';
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import useLanguage from '../hooks/useLanguage';

/**
 * 🏠 HomeScreen
 * The main dashboard. Displays features like Palm Scan, Daily Guidance, etc.
 * Handles the "Double back to exit" logic.
 */
const HomeScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();
  
  // Handle double back press to exit
  useExitHandler(true);

  return (
    <ScreenWrapper safeArea={false}>
      <PageTransition>
        <div className="flex flex-col min-h-screen pb-24">
          
          {/* Top Header Section */}
          <WelcomeHeader />

          {/* Main Scrollable Content */}
          <div className="flex-1 px-5 -mt-6 z-10 space-y-6">
            
            {/* 1. Daily Guidance Card (Hero Feature) */}
            <FeatureCard 
              variant="hero"
              title={t('home.dailyCard')}
              description={t('home.greeting')}
              onClick={() => navigate(SCREENS.DAILY_GUIDANCE)}
              delay={0.1}
            />

            {/* 2. Main Feature Grid (Palm, Tarot, Love, Horoscope) */}
            <FeatureGrid />

          </div>

          {/* Legal Disclaimer at bottom */}
          <Disclaimer className="mb-4" />

        </div>

        {/* Floating Action Button for Chat */}
        <FloatingActionButton onClick={() => navigate(SCREENS.AI_CHAT)} />

        {/* Navigation Bar */}
        <BottomNav />

      </PageTransition>
    </ScreenWrapper>
  );
};

export default HomeScreen;
