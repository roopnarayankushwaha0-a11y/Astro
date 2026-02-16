/**
 * 🧱 Global Constants
 * Centralized configuration for the application.
 */

// App Info
export const APP_INFO = {
  NAME: 'AI Palm Reader',
  VERSION: '1.0.0',
  WEBSITE: 'https://palmreader.app', // Placeholder
  SUPPORT_EMAIL: 'support@palmreader.app'
};

// Storage Keys (LocalStorage)
export const STORAGE_KEYS = {
  USER_PROFILE: 'palm_reader_user_profile',
  LANGUAGE: 'palm_reader_lang',
  HISTORY: 'palm_reader_history',
  SETTINGS: 'palm_reader_settings',
  HOROSCOPE_CACHE: 'palm_reader_horoscope_cache',
  DAILY_GUIDANCE: 'palm_reader_daily_guidance',
  THEME_PREFERENCE: 'palm_reader_theme'
};

// AI Model Configuration
export const AI_CONFIG = {
  VISION_MODEL: 'allenai/molmo-2-8b:free',
  CHAT_MODEL: 'liquid/lfm-2.5-1.2b-thinking:free',
  MAX_TOKENS: 1000,
  DEFAULT_TEMP: 0.7
};

// UI / Animation Timing (ms)
export const UI_CONFIG = {
  TOAST_DURATION: 3000,
  SPLASH_DURATION: 2500,
  PAGE_TRANSITION: 400,
  CARD_FLIP_DURATION: 600,
  SCAN_DURATION: 3000 // Fake scan time for effect
};

// Validation Limits
export const LIMITS = {
  MAX_HISTORY_ITEMS: 10,
  MAX_IMAGE_SIZE_MB: 5,
  MIN_AGE: 13
};

export default {
  APP_INFO,
  STORAGE_KEYS,
  AI_CONFIG,
  UI_CONFIG,
  LIMITS
};
