import React from 'react';

const TarotIcon = ({ className, filled }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill={filled ? "currentColor" : "none"} 
    stroke="currentColor" 
    strokeWidth={2} 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="12" y1="8" x2="12" y2="16" />
    <line x1="8" y1="12" x2="16" y2="12" />
    <path d="M7 8 L9 8" /> {/* Decorative marks */}
    <path d="M15 16 L17 16" />
  </svg>
);

export default TarotIcon;
