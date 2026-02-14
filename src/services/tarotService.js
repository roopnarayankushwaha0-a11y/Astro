import { interpretTarotSpread } from './aiService';
import { tarotDeck } from '../utils/tarotData'; // Will create this later

/**
 * 🃏 Tarot Service
 * Handles drawing cards, shuffling, and requesting AI interpretations.
 */

/**
 * Draw cards from the deck
 * @param {number} count - Number of cards to draw (1 or 3 usually)
 * @returns {Array} - Array of card objects
 */
export const drawCards = (count = 1) => {
  // Create a copy of the deck to shuffle
  const deck = [...tarotDeck];
  
  // Fisher-Yates Shuffle
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }

  // Draw top 'count' cards
  const drawn = deck.slice(0, count).map(card => ({
    ...card,
    isReversed: Math.random() < 0.2 // 20% chance of reversal
  }));

  return drawn;
};

/**
 * Get AI Interpretation for drawn cards
 * @param {Array} cards - The drawn card objects
 * @param {string} category - 'Love', 'Career', 'General'
 * @param {string} language - User language
 */
export const getTarotReading = async (cards, category, language) => {
  const cardNames = cards.map(c => 
    `${c.name} ${c.isReversed ? '(Reversed)' : ''}`
  );

  try {
    const interpretation = await interpretTarotSpread(cardNames, category, language);
    return interpretation;
  } catch (error) {
    console.error("Tarot Interpretation Failed:", error);
    // Fallback static text if AI fails
    return "The cards are misty today. Meditate on these symbols and trust your intuition.";
  }
};

export default {
  drawCards,
  getTarotReading
};
