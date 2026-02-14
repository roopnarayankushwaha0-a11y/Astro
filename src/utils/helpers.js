/**
 * 🛠️ General Helper Functions
 * Utility functions used across the application.
 */

/**
 * Pause execution for a specified time (useful for simulating loading states)
 * @param {number} ms - Milliseconds to sleep
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Generate a random string ID
 * @param {number} length 
 */
export const generateId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

/**
 * Capitalize the first letter of a string
 * @param {string} str 
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Validate a simple date string (YYYY-MM-DD)
 * @param {string} dateString 
 */
export const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Truncate text with ellipsis
 * @param {string} str 
 * @param {number} length 
 */
export const truncate = (str, length = 100) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

/**
 * Merge class names conditionally (Simple version of clsx)
 * @param  {...any} classes 
 */
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Get formatted current time greeting
 */
export const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 18) return 'Good Afternoon';
  return 'Good Evening';
};

/**
 * Safe JSON parse
 * @param {string} str 
 * @param {any} fallback 
 */
export const safeJsonParse = (str, fallback = null) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return fallback;
  }
};
