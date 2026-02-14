/**
 * 🔗 Share Utilities
 * Wrapper for the Web Share API with fallbacks.
 */

/**
 * Share content using native share dialog
 * @param {object} data - { title, text, url }
 */
export const shareContent = async (data) => {
  const shareData = {
    title: data.title || 'AI Palm Reader',
    text: data.text || 'Check out my spiritual reading!',
    url: data.url || window.location.origin
  };

  // 1. Try Native Web Share API (Mobile)
  if (navigator.share) {
    try {
      await navigator.share(shareData);
      return { success: true, method: 'native' };
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
      return { success: false, error };
    }
  } else {
    // 2. Fallback: Copy to Clipboard
    try {
      await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
      return { success: true, method: 'clipboard' };
    } catch (error) {
      console.error('Clipboard failed:', error);
      return { success: false, method: 'failed' };
    }
  }
};

/**
 * Generate a shareable text summary for a reading
 * @param {string} type - 'palm', 'tarot', 'horoscope'
 * @param {string} content - The main reading text
 */
export const generateShareText = (type, content) => {
  const emojis = {
    palm: '🖐️',
    tarot: '🃏',
    horoscope: '✨',
    daily: '🔮'
  };

  const emoji = emojis[type] || '✨';
  const shortContent = content.substring(0, 150) + '...';
  
  return `${emoji} My AI Spiritual Reading:\n\n"${shortContent}"\n\nDiscover your destiny on AI Palm Reader!`;
};

export default {
  shareContent,
  generateShareText
};
