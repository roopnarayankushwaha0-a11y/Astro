import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales'; // We will create this in File 50

const LanguageContext = createContext();

export const LANGUAGES = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'es', name: 'Spanish', native: 'Español' },
  { code: 'fr', name: 'French', native: 'Français' },
  { code: 'it', name: 'Italian', native: 'Italiano' },
  { code: 'ko', name: 'Korean', native: '한국어' }
];

const STORAGE_KEY = 'palm_reader_lang';

export const LanguageProvider = ({ children }) => {
  // Default to English or saved preference
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Check if saved language is valid, otherwise default to 'en'
    return saved && translations[saved] ? saved : 'en';
  });

  // Persist change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    // Optional: Update HTML lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  /**
   * Switch Application Language
   * @param {string} code - 'en', 'hi', etc.
   */
  const changeLanguage = (code) => {
    if (translations[code]) {
      setLanguage(code);
    } else {
      console.warn(`Language ${code} not supported`);
    }
  };

  /**
   * Translation Helper
   * @param {string} key - Dot notation string (e.g., 'home.welcome')
   * @returns {string} - Translated text or key if missing
   */
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        // Fallback to English if translation missing
        let fallback = translations['en'];
        for (const fk of keys) {
          if (fallback && fallback[fk]) {
            fallback = fallback[fk];
          } else {
            return key; // Return key if absolutely nothing found
          }
        }
        return typeof fallback === 'string' ? fallback : key;
      }
    }

    return value;
  };

  const value = {
    language,
    languages: LANGUAGES,
    changeLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
