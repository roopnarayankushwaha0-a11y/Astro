import { getChatResponse } from './aiService';

/**
 * ❤️ Love Reading Service
 * Specialized logic for relationship analysis and compatibility.
 */

/**
 * Generate a Love Compatibility Reading
 * @param {string} sign1 - User's Zodiac Sign
 * @param {string} sign2 - Partner's Zodiac Sign (Optional)
 * @param {string} status - 'Single', 'Relationship', 'Complicated'
 * @param {string} language - Target language
 */
export const getLoveReading = async (sign1, sign2, status, language) => {
  let prompt = "";
  
  if (sign2) {
    // Compatibility Reading
    prompt = `
      Analyze the love compatibility between ${sign1} and ${sign2}.
      Current Status: ${status}.
      
      Provide:
      1. 💞 Emotional Connection Score (1-100%)
      2. 🗣️ Communication Style
      3. 🔥 Chemistry
      4. 🚧 Potential Challenges
      5. 💡 Relationship Advice
      
      Tone: Compassionate, honest, but hopeful. No "break up" commands.
    `;
  } else {
    // Single / General Love Forecast
    prompt = `
      Provide a Love Forecast for ${sign1} who is currently ${status}.
      
      Focus on:
      1. ❤️ Incoming Romantic Energy
      2. 🛡️ Emotional Blocks to clear
      3. 🌟 Advice for attracting/maintaining love
      
      Tone: Empowering and sweet.
    `;
  }

  // Construct generic user context for the AI
  const userContext = `Love Reading Request. Signs: ${sign1} + ${sign2 || 'None'}`;
  
  try {
    const history = [{ role: 'user', content: prompt }];
    const response = await getChatResponse(history, userContext, language);
    
    // Parse a rough compatibility score if possible, or generate a random one for UI visualization
    // In a real app, we'd force JSON output. Here we just return the text and a random score for the meter.
    const calculatedScore = sign2 ? calculateBaseCompatibility(sign1, sign2) : 0;
    
    return {
      text: response,
      score: calculatedScore
    };

  } catch (error) {
    console.error("Love Reading Failed:", error);
    throw error;
  }
};

/**
 * Simple static compatibility algorithm for UI visualization
 * (Real astrology is more complex, this is for the progress bar visual)
 */
const calculateBaseCompatibility = (s1, s2) => {
  // Elements
  const elements = {
    Aries: 'Fire', Leo: 'Fire', Sagittarius: 'Fire',
    Taurus: 'Earth', Virgo: 'Earth', Capricorn: 'Earth',
    Gemini: 'Air', Libra: 'Air', Aquarius: 'Air',
    Cancer: 'Water', Scorpio: 'Water', Pisces: 'Water'
  };

  const e1 = elements[s1];
  const e2 = elements[s2];

  if (!e1 || !e2) return 75; // Default

  if (e1 === e2) return 90; // Same element = High
  if (
    (e1 === 'Fire' && e2 === 'Air') || (e1 === 'Air' && e2 === 'Fire') ||
    (e1 === 'Water' && e2 === 'Earth') || (e1 === 'Earth' && e2 === 'Water')
  ) {
    return 85; // Complementary
  }

  return 60; // Challenging but possible
};

export default {
  getLoveReading
};
