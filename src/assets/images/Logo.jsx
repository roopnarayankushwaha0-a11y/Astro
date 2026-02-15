import React from 'react';

const Logo = ({ className }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className} 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M50 90 C35 90 25 75 25 60 L25 35 C25 27 30 25 32 25 C35 25 38 27 38 32 L38 50 M38 32 L38 25 C38 17 43 15 45 15 C48 15 50 17 50 25 L50 45 M50 25 L50 15 C50 7 55 5 58 5 C60 5 63 7 63 15 L63 45 M63 15 L63 20 C63 12 68 10 70 10 C73 10 75 12 75 20 L75 55 C75 75 65 90 50 90" />
    <circle cx="50" cy="55" r="5" fill="currentColor" stroke="none" />
  </svg>
);

export default Logo;
