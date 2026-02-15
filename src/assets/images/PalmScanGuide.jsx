import React from 'react';

const PalmScanGuide = ({ className, flip = false }) => (
  <svg 
    viewBox="0 0 200 300" 
    className={className}
    style={{ transform: flip ? 'scaleX(-1)' : 'none' }}
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeDasharray="4 4"
  >
    {/* Simplified Hand Outline */}
    <path d="M60 280 L60 160 
             C60 160 30 140 30 110 
             C30 90 50 90 60 110 
             L60 160 M60 110 L60 60 
             C60 40 80 40 85 60 
             L85 150 M85 60 L85 30 
             C85 10 110 10 115 30 
             L115 150 M115 30 L115 50 
             C115 30 135 30 140 50 
             L140 180 
             C140 230 140 280 140 280" 
    />
  </svg>
);

export default PalmScanGuide;
