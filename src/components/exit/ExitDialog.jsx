import React from 'react';
import Modal from '../common/Modal';
import Button from '../common/Button';
import useLanguage from '../../hooks/useLanguage';

/**
 * 🚪 ExitDialog
 * A formal confirmation dialog before closing the app.
 * Note: Browser/PWA "Exit" is limited. We usually just close the window
 * or let the OS handle it. This is a UI element if we choose to enforce manual exit confirmation.
 * 
 * Currently, the app uses a "Double Back" toast logic. 
 * This component is prepared for future "Exit" button usage from menu.
 */
const ExitDialog = ({ isOpen, onClose, onConfirm }) => {
  const { t } = useLanguage();

  const handleExit = () => {
    if (onConfirm) onConfirm();
    
    // Attempt to close
    try {
      window.close();
    } catch (e) {
      console.log("Script cannot close window not opened by it");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={t('common.close')}
    >
      <div className="text-center space-y-6">
        <p className="text-gray-300">
          Are you sure you want to leave the cosmic realm?
        </p>
        
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            fullWidth 
            onClick={onClose}
          >
            {t('common.cancel')}
          </Button>
          <Button 
            variant="danger" 
            fullWidth 
            onClick={handleExit}
          >
            {t('common.close')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ExitDialog;
