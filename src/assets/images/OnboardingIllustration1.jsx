import React from 'react';

// "Ancient Wisdom, Modern AI" - Hand with circuits
const OnboardingIllustration1 = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor">
    {/* Hand */}
    <path 
      d="M100 180 C70 180 50 150 50 120 L50 70 C50 55 60 50 65 50 C70 50 75 55 75 65 L75 100 M75 65 L75 50 C75 35 85 30 90 30 C95 30 100 35 100 50 L100 90 M100 50 L100 30 C100 15 110 10 115 10 C120 10 125 15 125 30 L125 90 M125 30 L125 40 C125 25 135 20 140 20 C145 20 150 25 150 40 L150 110 C150 150 130 180 100 180"
      strokeWidth="2"
    />
    
    {/* Circuit Lines */}
    <circle cx="100" cy="100" r="5" fill="currentColor" />
    <path d="M100 100 L80 120" strokeWidth="1" />
    <circle cx="80" cy="120" r="2" fill="currentColor" />
    
    <path d="M100 100 L120 80" strokeWidth="1" />
    <circle cx="120" cy="80" r="2" fill="currentColor" />
    
    <path d="M100 100 L100 130" strokeWidth="1" />
    <circle cx="100" cy="130" r="2" fill="currentColor" />
  </svg>
);

export default OnboardingIllustration1;
