import React from 'react';

// "Tarot & Cosmic Guidance" - Cards and Stars
const OnboardingIllustration2 = ({ className }) => (
  <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor">
    {/* Card 1 */}
    <rect x="50" y="50" width="60" height="90" rx="5" transform="rotate(-15 80 95)" strokeWidth="2" fill="rgba(255,255,255,0.05)" />
    
    {/* Card 2 (Center) */}
    <rect x="70" y="40" width="60" height="90" rx="5" strokeWidth="2" fill="rgba(255,255,255,0.1)" />
    <circle cx="100" cy="85" r="15" strokeWidth="1" />
    
    {/* Card 3 */}
    <rect x="90" y="50" width="60" height="90" rx="5" transform="rotate(15 120 95)" strokeWidth="2" fill="rgba(255,255,255,0.05)" />
    
    {/* Stars */}
    <path d="M40 40 L45 50 L50 40 L45 30 Z" fill="currentColor" opacity="0.5" />
    <path d="M160 40 L165 50 L170 40 L165 30 Z" fill="currentColor" opacity="0.5" />
    <path d="M150 150 L155 160 L160 150 L155 140 Z" fill="currentColor" opacity="0.5" />
  </svg>
);

export default OnboardingIllustration2;
