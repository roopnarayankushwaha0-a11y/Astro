import { getDailyHoroscope } from './aiService';
import { getItem, saveItem } from './storageService';

const HOROSCOPE_CACHE_KEY = 'palm_reader_horoscope_cache';

/**
 * 🌟 Horoscope Service
 * Manages daily horoscope retrieval and caching to minimize API calls.
 */

/**
 * Get Horoscope for a specific sign
 * @param {string} sign - "Aries", "Taurus", etc.
 * @param {string} language - "en", "hi", etc.
 * @param {boolean} forceRefresh - Ignore cache if true
 */
export const getHoroscope = async (sign, language, forceRefresh = false) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const cacheKey = `${HOROSCOPE_CACHE_KEY}_${sign}_${language}_${today}`;
  
  // 1. Check Cache
  if (!forceRefresh) {
    const cached = getItem(cacheKey);
    if (cached) {
      console.log('Returning cached horoscope');
      return cached;
    }
  }

  // 2. Fetch from AI
  try {
    const reading = await getDailyHoroscope(sign, today, language);
    
    const result = {
      date: today,
      sign,
      reading,
      timestamp: Date.now()
    };

    // 3. Save to Cache
    saveItem(cacheKey, result);
    
    return result;
  } catch (error) {
    console.error("Horoscope Service Failed:", error);
    throw error;
  }
};

/**
 * Helper to determine Zodiac Sign from Date of Birth
 * @param {string} dob - "YYYY-MM-DD"
 * @returns {string} - Zodiac Sign Name (English)
 */
export const calculateZodiacSign = (dob) => {
  if (!dob) return null;
  
  const date = new Date(dob);
  const day = date.getDate();
  const month = date.getMonth() + 1; // 1-12

  if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return "Capricorn";
  if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
  if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
  if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
  if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
  if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
  if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
  if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
  if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
  if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
  if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
  if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
  
  return "Aries"; // Fallback
};

export default {
  getHoroscope,
  calculateZodiacSign
};
