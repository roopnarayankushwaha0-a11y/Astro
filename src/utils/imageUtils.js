/**
 * 🖼️ Image Processing Utilities
 * Handles validation, resizing, and conversion of images for the Vision AI.
 */

const MAX_IMAGE_DIMENSION = 1024; // Resize images larger than this
const COMPRESSION_QUALITY = 0.8; // JPEG quality (0 to 1)

/**
 * Validates selected file
 * @param {File} file 
 * @returns {string|null} - Error message or null if valid
 */
export const validateImage = (file) => {
  if (!file) return "No file selected.";
  
  // Check type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!validTypes.includes(file.type)) {
    return "Please upload a valid image (JPEG, PNG, or WebP).";
  }

  // Check size (Max 10MB raw)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return "Image is too large. Please choose an image under 10MB.";
  }

  return null;
};

/**
 * Converts File object to Base64 string
 * @param {File} file 
 * @returns {Promise<string>}
 */
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Resizes and compresses image using Canvas
 * Essential for optimizing AI API usage and speed.
 * @param {File} file 
 * @returns {Promise<string>} - Base64 string of compressed image
 */
export const compressImage = async (file) => {
  const imageBitmap = await createImageBitmap(file);
  
  let width = imageBitmap.width;
  let height = imageBitmap.height;

  // Calculate new dimensions
  if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
    if (width > height) {
      height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
      width = MAX_IMAGE_DIMENSION;
    } else {
      width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
      height = MAX_IMAGE_DIMENSION;
    }
  }

  // Draw to canvas
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(imageBitmap, 0, 0, width, height);

  // Convert back to base64
  return canvas.toDataURL('image/jpeg', COMPRESSION_QUALITY);
};

export default {
  validateImage,
  fileToBase64,
  compressImage
};
