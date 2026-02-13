/**
 * 🔮 Centralized Theme Configuration
 * Used for consistency across JS logic (Canvas, Charts) and UI components.
 * Matches values in tailwind.config.js
 */

export const THEME = {
  colors: {
    // Backgrounds
    background: '#0f0f1a',
    card: '#1a1a2e',
    cardLight: '#2d2d44',
    
    // Primary Accents (Mystic)
    primary: '#7c3aed',
    primaryDark: '#5b21b6',
    primaryLight: '#a78bfa',
    
    // Secondary Accents (Neon)
    secondary: '#22d3ee', // Cyan
    secondaryDark: '#0e7490',
    
    // Text
    textMain: '#ffffff',
    textMuted: '#9ca3af',
    textDim: '#6b7280',
    
    // Status
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    
    // Overlays
    overlay: 'rgba(15, 15, 26, 0.85)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },

  gradients: {
    // Main Background
    cosmic: 'linear-gradient(to bottom, #0f0f1a, #1a1a2e)',
    
    // Button / Active States
    primary: 'linear-gradient(135deg, #7c3aed 0%, #22d3ee 100%)',
    primaryHover: 'linear-gradient(135deg, #6d28d9 0%, #06b6d4 100%)',
    
    // Card Backgrounds
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
    glassStrong: 'linear-gradient(135deg, rgba(26, 26, 46, 0.95) 0%, rgba(26, 26, 46, 0.8) 100%)',
    
    // Special Effects
    gold: 'linear-gradient(to right, #bf953f, #fcf6ba, #b38728, #fbf5b7, #aa771c)',
    mystic: 'linear-gradient(to right, #4c1d95, #8b5cf6, #22d3ee)',
  },

  fonts: {
    main: "'Outfit', sans-serif",
  },

  radii: {
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    full: '9999px',
  },

  shadows: {
    glow: '0 0 20px rgba(167, 139, 250, 0.4)',
    glowCyan: '0 0 20px rgba(34, 211, 238, 0.4)',
    card: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
  }
};

export default THEME;
