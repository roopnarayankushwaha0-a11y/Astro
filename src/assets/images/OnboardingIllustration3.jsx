import React from 'react';

// "Private & Personal" - Shield / Lock
const OnboardingIllustration3 = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor">
    {/* Shield */}
    <path 
      d="M100 40 L160 65 V100 C160 145 130 170 100 180 C70 170 40 145 40 100 V65 L100 40 Z" 
      strokeWidth="2"
      fill="rgba(255,255,255,0.05)"
    />
    
    {/* Lock Body */}
    <rect x="80" y="90" width="40" height="30" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
    
    {/* Lock Shackle */}
    <path d="M90 90 V80 C90 75 110 75 110 80 V90" strokeWidth="2" />
    
    {/* Keyhole */}
    <circle cx="100" cy="105" r="3" fill="currentColor" />
  </svg>
);

export default OnboardingIllustration3;
