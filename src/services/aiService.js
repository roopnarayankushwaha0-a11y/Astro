/**
 * 🧠 AI Service – The Core Brain of the Application
 * Integration with OpenRouter API for Palm Analysis and Chat.
 * 
 * MODELS USED:
 * - Vision: allenai/molmo-2-8b:free (For Palm Reading)
 * - Chat/Logic: liquid/lfm-2.5-1.2b-thinking:free (For Tarot/Horoscope/Chat)
 */

const API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

// 🛑 STRICT SYSTEM PROMPT - DO NOT MODIFY LOGIC
const SYSTEM_PROMPT = `
You are an advanced spiritual AI guide named "Astra". 
Your purpose is to provide insights based on Palmistry (Chiromancy), Tarot, and Astrology.

🚨 STRICT RULES (NON-NEGOTIABLE):
1. NO FEAR-BASED LANGUAGE: Never predict death, severe illness, divorce, or inevitable doom.
2. NO MEDICAL/LEGAL ADVICE: If asked about health or court cases, gently remind the user you offer spiritual perspective only, not professional advice.
3. NO ABSOLUTE PREDICTIONS: Use phrases like "The energy suggests," "You may find," "Potentially." Never say "You will definitely."
4. TONE: Calm, mystical, empathetic, wise, and soothing. Use soft language.
5. FORMAT: Use Markdown. Break text into readable paragraphs. Use emojis 🔮 ✨ 🌙 sparingly to enhance the vibe.
6. LANGUAGE: Respond in the language requested by the user.

STRUCTURED OUTPUT FOR PALM READING:
When analyzing a palm, break it down into:
- ❤️ Heart Line (Emotions, Relationships)
- 🧠 Head Line (Intellect, Mentality)
- 🌱 Life Line (Vitality, Energy - NOT length of life)
- 🏹 Fate Line (Career, Destiny - if visible)
- 📝 Summary Advice
`;

/**
 * Generic API Call Helper
 */
async function callOpenRouter(messages, model) {
  if (!API_KEY) {
    throw new Error("Missing API Key. Please configure VITE_OPENROUTER_API_KEY.");
  }

  const headers = {
    "Authorization": `Bearer ${API_KEY}`,
    "HTTP-Referer": window.location.origin, // Required by OpenRouter
    "X-Title": "AI Palm Reader PWA",
    "Content-Type": "application/json"
  };

  const body = {
    model: model,
    messages: messages,
    temperature: 0.7, // Balance between creativity and consistency
    max_tokens: 1000,
    top_p: 1,
    repetition_penalty: 1.1
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(`AI API Error: ${errData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || "The spirits are silent right now. Please try again.";

  } catch (error) {
    console.error("AI Service Error:", error);
    throw error;
  }
}

/**
 * 🖐️ Analyze Palm Image
 * Uses Vision Model to interpret lines.
 * @param {string} base64Image - The uploaded palm image (base64 string)
 * @param {string} handSide - 'left' or 'right'
 * @param {string} userLanguage - 'en', 'hi', etc.
 */
export const analyzePalmImage = async (base64Image, handSide, userLanguage = 'en') => {
  const prompt = `
    Analyze this image of a ${handSide} palm. 
    Identify the Heart Line, Head Line, Life Line, and Fate Line if visible.
    Provide a spiritual reading based on the length, depth, and curvature of these lines.
    
    Adhere strictly to the safety guidelines: No death predictions, no medical advice.
    Focus on personality, emotional style, and potential.
    
    Output in ${userLanguage} language.
  `;

  const messages = [
    {
      role: "system",
      content: SYSTEM_PROMPT
    },
    {
      role: "user",
      content: [
        { type: "text", text: prompt },
        { type: "image_url", image_url: { url: base64Image } }
      ]
    }
  ];

  // Using Vision capable model
  return await callOpenRouter(messages, "allenai/molmo-2-8b:free");
};

/**
 * 💬 Chat with AI Astrologer
 * Uses Reasoning Model for text conversation.
 * @param {Array} history - Array of {role: 'user'|'assistant', content: string}
 * @param {string} userContext - Context string (Name, Zodiac, Gender)
 * @param {string} language - Target language code
 */
export const getChatResponse = async (history, userContext, language = 'en') => {
  const contextMsg = `
    User Context: ${userContext}
    Language: ${language}
    
    Answer the user's spiritual question with empathy and depth.
  `;

  // Construct message chain
  const messages = [
    { role: "system", content: SYSTEM_PROMPT + "\n" + contextMsg },
    ...history
  ];

  // Using Text/Reasoning model
  return await callOpenRouter(messages, "liquid/lfm-2.5-1.2b-thinking:free");
};

/**
 * 🃏 Generate Tarot Interpretation
 * @param {Array} cards - Array of card names (e.g., ["The Fool", "Ace of Cups"])
 * @param {string} question - User's question or focus area (Love, Career)
 * @param {string} language - Target language
 */
export const interpretTarotSpread = async (cards, question, language = 'en') => {
  const prompt = `
    Interpret this Tarot spread for the area of: ${question}.
    Cards drawn: ${cards.join(', ')}.
    
    Provide a cohesive narrative connecting these cards.
    1. Analyze individual card meanings in this context.
    2. Synthesize the combined message.
    3. Provide actionable spiritual guidance.
    
    Language: ${language}
  `;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt }
  ];

  return await callOpenRouter(messages, "liquid/lfm-2.5-1.2b-thinking:free");
};

/**
 * 🌟 Generate Daily Horoscope/Guidance
 * @param {string} sign - Zodiac sign
 * @param {string} date - Current date
 * @param {string} language - Target language
 */
export const getDailyHoroscope = async (sign, date, language = 'en') => {
  const prompt = `
    Generate a daily horoscope for ${sign} for the date ${date}.
    
    Includes sections:
    - 🌌 General Energy
    - ❤️ Love & Relationships
    - 💼 Career & Finance
    - 🧘 Spiritual Advice
    - ✨ Lucky Element/Color
    
    Language: ${language}
  `;

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: prompt }
  ];

  return await callOpenRouter(messages, "liquid/lfm-2.5-1.2b-thinking:free");
};
