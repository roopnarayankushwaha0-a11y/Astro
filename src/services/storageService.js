/**
 * 📦 Storage Service
 * A safe wrapper around LocalStorage to handle serialization, 
 * error handling, and server-side rendering compatibility checks.
 */

const isBrowser = typeof window !== 'undefined';

/**
 * Save data to local storage
 * @param {string} key 
 * @param {any} value 
 */
export const saveItem = (key, value) => {
  if (!isBrowser) return;
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error saving to storage key "${key}":`, error);
  }
};

/**
 * Get data from local storage
 * @param {string} key 
 * @param {any} defaultValue - Return this if key not found
 * @returns {any}
 */
export const getItem = (key, defaultValue = null) => {
  if (!isBrowser) return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading storage key "${key}":`, error);
    return defaultValue;
  }
};

/**
 * Remove item from local storage
 * @param {string} key 
 */
export const removeItem = (key) => {
  if (!isBrowser) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing storage key "${key}":`, error);
  }
};

/**
 * Clear all app-specific data (Useful for logout/reset)
 * Filters by a prefix if needed, or clears everything.
 */
export const clearAppStorage = () => {
  if (!isBrowser) return;
  try {
    // Optional: Only clear keys related to this app if you want to be polite
    // For now, we clear standard keys we know about
    const keysToRemove = [
      'palm_reader_user_profile',
      'palm_reader_lang',
      'palm_reader_history',
      'palm_reader_settings'
    ];
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    
    // Or clear all
    // localStorage.clear();
  } catch (error) {
    console.error("Error clearing storage:", error);
  }
};

export default {
  saveItem,
  getItem,
  removeItem,
  clearAppStorage
};
