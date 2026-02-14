import { getChatResponse } from './aiService'; // Reusing chat for generic guidance
import { getItem, saveItem } from './storageService';

const DAILY_GUIDANCE_KEY = 'palm_reader_daily_guidance';

/**
 * ✨ Daily Guidance Service
 * Provides a universal "Card of the Day" or general spiritual energy reading
 * irrespective of zodiac sign.
 */

export const getDailyGuidance = async (userContext, language) => {
  const today = new Date().toISOString().split('T')[0];
  const cacheKey = `${DAILY_GUIDANCE_KEY}_${language}_${today}`;

  // 1. Check Cache
  const cached = getItem(cacheKey);
  if (cached) {
    return cached;
  }

  // 2. Fetch from AI
  try {
    const systemPrompt = `
      Generate a "Daily Spiritual Guidance" message.
      Include:
      - 🌍 Universal Energy (The general vibe of the world today)
      - 🧘 Focus Area (Mindfulness, Courage, Rest, etc.)
      - ⚠️ What to Avoid (Negative energy, rushing, etc.)
      - 💎 Lucky Crystal/Color
      
      Keep it short, uplifting, and mystical.
    `;

    // We simulate a chat message to get this specific format
    const history = [{ role: 'user', content: systemPrompt }];
    
    const content = await getChatResponse(history, userContext, language);

    const result = {
      date: today,
      content: content,
      energyLevel: Math.floor(Math.random() * 30) + 70 // Random "Vibration" 70-100%
    };

    // 3. Save
    saveItem(cacheKey, result);

    return result;
  } catch (error) {
    console.error("Daily Guidance Failed:", error);
    // Return a safe fallback so the UI doesn't break
    return {
      date: today,
      content: "The universe is quiet today. Look within for your own light.",
      energyLevel: 88
    };
  }
};

export default {
  getDailyGuidance
};
