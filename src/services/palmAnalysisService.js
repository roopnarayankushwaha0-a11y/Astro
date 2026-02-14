import { analyzePalmImage } from './aiService';
import { saveItem, getItem } from './storageService';

const HISTORY_KEY = 'palm_reader_history';

/**
 * 🖐️ Palm Analysis Service
 * Manages the logic for requesting, processing, and storing palm readings.
 */

/**
 * Perform a full palm reading
 * @param {string} base64Image - The raw image data
 * @param {string} handSide - 'left' or 'right'
 * @param {string} language - User's preferred language code
 * @returns {Promise<Object>} - The structured reading result
 */
export const processPalmReading = async (base64Image, handSide, language) => {
  try {
    // 1. Call AI Service
    // Note: In a real backend, we would upload the image to S3/Cloudinary here.
    // For this PWA, we send base64 directly to the Vision model.
    const rawAnalysis = await analyzePalmImage(base64Image, handSide, language);

    // 2. Structure the data
    const result = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      handSide,
      language,
      fullText: rawAnalysis,
      // We store a thumbnail version in history, not the full base64 to save LocalStorage space
      // For this PWA demo, we might skip saving the image in history or save a tiny version
      lines: parseLinesFromText(rawAnalysis) // Helper to try and extract sections
    };

    // 3. Save to History
    saveReadingToHistory(result);

    return result;
  } catch (error) {
    console.error("Palm Analysis Service Failed:", error);
    throw error;
  }
};

/**
 * Get past readings
 */
export const getReadingHistory = () => {
  return getItem(HISTORY_KEY, []);
};

/**
 * Save a new reading to local history
 * Limits history to last 10 items to prevent storage overflow
 */
const saveReadingToHistory = (newReading) => {
  const history = getItem(HISTORY_KEY, []);
  
  // Add to front
  const updatedHistory = [newReading, ...history].slice(0, 10);
  
  saveItem(HISTORY_KEY, updatedHistory);
};

/**
 * 🛠️ Helper: Attempt to parse structured sections from AI free-text response
 * This is a "best effort" parser since AI text can vary.
 */
const parseLinesFromText = (text) => {
  // Default structure if parsing fails
  const sections = {
    heartLine: "",
    headLine: "",
    lifeLine: "",
    fateLine: "",
    summary: ""
  };

  if (!text) return sections;

  // Simple keyword matching to split text (Naive implementation)
  // In a robust app, we'd ask the AI to return JSON.
  // Here we assume the AI follows the system prompt structure.
  
  const lowerText = text.toLowerCase();
  
  // This is a placeholder logic. Realistically, we display the full Markdown text.
  // We just return the full text as the "summary" for the UI to render mostly.
  sections.summary = text;

  return sections;
};

export default {
  processPalmReading,
  getReadingHistory
};
