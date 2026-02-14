import { useLanguage as useContextLanguage } from '../context/LanguageContext';

/**
 * 🗣️ useLanguage Hook
 * 
 * Re-exports the language context hook for consistent importing from @hooks
 */

const useLanguage = () => {
  return useContextLanguage();
};

export default useLanguage;
