import React from 'react';
import Button from '../common/Button';
import ShareIcon from '../../assets/icons/ShareIcon';
import { shareContent, generateShareText } from '../../utils/shareUtils';
import useLanguage from '../../hooks/useLanguage';
import useToast from '../../hooks/useToast';

/**
 * 🔗 ShareButton
 * Reusable logic for sharing guidance content.
 */
const ShareButton = ({ content, type = 'daily' }) => {
  const { t } = useLanguage();
  const { showToast } = useToast();

  const handleShare = async () => {
    if (!content) return;

    const text = generateShareText(type, content);
    
    const result = await shareContent({
      title: 'AI Spiritual Guidance',
      text: text
    });

    if (result.success && result.method === 'clipboard') {
      showToast('Copied to clipboard!', 'success');
    }
  };

  return (
    <Button 
      variant="secondary" 
      size="sm" 
      icon={<ShareIcon className="w-4 h-4" />}
      onClick={handleShare}
      className="rounded-full px-6"
    >
      {t('common.share')}
    </Button>
  );
};

export default ShareButton;
