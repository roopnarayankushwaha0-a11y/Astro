import React from 'react';
import Button from '../common/Button';
import SwipeIndicator from './SwipeIndicator';

/**
 * 🧭 OnboardingNavigation
 * Wrapper for the bottom controls (Indicators + Next Button).
 * Used to keep the main screen code cleaner.
 */
const OnboardingNavigation = ({ total, current, onNext, nextLabel }) => {
  return (
    <div className="w-full flex flex-col gap-8">
      {/* Indicators */}
      <SwipeIndicator 
        total={total} 
        current={current} 
      />

      {/* Action Button */}
      <Button 
        fullWidth 
        size="lg" 
        variant={current === total - 1 ? "primary" : "secondary"}
        onClick={onNext}
      >
        {nextLabel}
      </Button>
    </div>
  );
};

export default OnboardingNavigation;
