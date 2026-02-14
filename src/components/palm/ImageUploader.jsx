import React, { useRef } from 'react';
import Button from '../common/Button';
import CameraIcon from '../../assets/icons/CameraIcon';
import GalleryIcon from '../../assets/icons/GalleryIcon'; // Will create
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';
import { validateImage, compressImage, fileToBase64 } from '../../utils/imageUtils';

/**
 * 📸 ImageUploader
 * Handles file input for Camera and Gallery.
 * Processes the image (validation + compression) before passing up.
 */
const ImageUploader = ({ onImageSelected, disabled }) => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 1. Validate
    const error = validateImage(file);
    if (error) {
      showToast(error, 'error');
      return;
    }

    try {
      // 2. Compress & Convert
      // Note: compressImage returns base64 directly
      const processedImage = await compressImage(file);
      
      // 3. Callback
      onImageSelected(processedImage);
      
    } catch (err) {
      console.error("Image processing failed:", err);
      showToast("Failed to process image. Try again.", "error");
    } finally {
      // Reset inputs to allow selecting same file again
      if (cameraInputRef.current) cameraInputRef.current.value = '';
      if (galleryInputRef.current) galleryInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Hidden Inputs */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Forces rear camera on mobile
        className="hidden"
        ref={cameraInputRef}
        onChange={handleFileChange}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={galleryInputRef}
        onChange={handleFileChange}
      />

      {/* Camera Button (Primary) */}
      <Button
        variant="primary"
        size="lg"
        fullWidth
        icon={<CameraIcon className="w-5 h-5" />}
        onClick={() => cameraInputRef.current?.click()}
        disabled={disabled}
      >
        {t('palm.camera')}
      </Button>

      {/* Gallery Button (Secondary) */}
      <Button
        variant="secondary"
        size="lg"
        fullWidth
        icon={<GalleryIcon className="w-5 h-5" />}
        onClick={() => galleryInputRef.current?.click()}
        disabled={disabled}
      >
        {t('palm.gallery')}
      </Button>
    </div>
  );
};

export default ImageUploader;
