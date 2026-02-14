import { format, parseISO, isValid } from 'date-fns';

/**
 * 📅 Date Utilities
 * Standardized date formatting for the app.
 */

/**
 * Format a date string into a readable format
 * @param {string} dateString - ISO string or YYYY-MM-DD
 * @param {string} formatStr - date-fns format string
 */
export const formatDate = (dateString, formatStr = 'MMMM d, yyyy') => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (!isValid(date)) return '';
  return format(date, formatStr);
};

/**
 * Format time string (HH:mm) to AM/PM
 * @param {string} timeString - "14:30"
 */
export const formatTime = (timeString) => {
  if (!timeString) return '';
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(parseInt(hours), parseInt(minutes));
  return format(date, 'h:mm a');
};

/**
 * Calculate Age from DOB
 * @param {string} dob - YYYY-MM-DD
 */
export const calculateAge = (dob) => {
  if (!dob) return 0;
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

/**
 * Check if a date is today
 * @param {string} dateString 
 */
export const isToday = (dateString) => {
  if (!dateString) return false;
  const today = new Date().toISOString().split('T')[0];
  return dateString.startsWith(today); // Handles ISO full strings or YYYY-MM-DD
};

export default {
  formatDate,
  formatTime,
  calculateAge,
  isToday
};
