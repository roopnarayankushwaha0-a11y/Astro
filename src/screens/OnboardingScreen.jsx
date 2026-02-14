import React, { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { motion, AnimatePresence } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import OnboardingSlide from '../components/onboarding/OnboardingSlide';
import SwipeIndicator from '../components/onboarding/SwipeIndicator';
import Button from '../components/common/Button';
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import useLanguage from '../hooks/useLanguage';

/**
 * 🚀 OnboardingScreen
 * 3-step swipeable tutorial introducing app features.
 */
const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { navigate } = useNavigation();
  const { t } = useLanguage();

  const slides = [
    {
      id: 0,
      imageName: 'OnboardingIllustration1',
      title: t('onboarding.slide1.title'),
      desc: t('onboarding.slide1.desc')
    },
    {
      id: 1,
      imageName: 'OnboardingIllustration2',
      title: t('onboarding.slide2.title'),
      desc: t('onboarding.slide2.desc')
    },
    {
      id: 2,
      imageName: 'OnboardingIllustration3',
      title: t('onboarding.slide3.title'),
      desc: t('onboarding.slide3.desc')
    }
  ];

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      finishOnboarding();
    }
  };

  const finishOnboarding = () => {
    navigate(SCREENS.PROFILE);
  };

  // Swipe handlers
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: () => setCurrentIndex(prev => Math.max(0, prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  return (
    <ScreenWrapper className="justify-between" safeArea={false}>
      <div 
        {...handlers} 
        className="flex flex-col h-full w-full relative"
      >
        {/* Skip Button */}
        <div className="absolute top-safe right-6 z-20 pt-4">
          <button 
            onClick={finishOnboarding}
            className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
          >
            Skip
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 pb-20 pt-20">
          <AnimatePresence mode='wait'>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center"
            >
              <OnboardingSlide data={slides[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Controls */}
        <div className="w-full px-6 pb-safe mb-8 flex flex-col gap-8">
          {/* Indicators */}
          <SwipeIndicator 
            total={slides.length} 
            current={currentIndex} 
          />

          {/* Action Button */}
          <Button 
            fullWidth 
            size="lg" 
            variant={currentIndex === slides.length - 1 ? "primary" : "secondary"}
            onClick={handleNext}
          >
            {currentIndex === slides.length - 1 ? t('onboarding.slide3.title').includes('Private') ? "Get Started" : t('common.next') : t('common.next')}
          </Button>
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default OnboardingScreen;
