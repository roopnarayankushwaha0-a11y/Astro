import React from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import PalmResultDisplay from '../components/palm/PalmResultDisplay'; // Will create
import Button from '../components/common/Button';
import useNavigation from '../hooks/useNavigation';
import { useApp } from '../context/AppContext';
import { SCREENS } from '../context/NavigationContext';
import useLanguage from '../hooks/useLanguage';
import ShareIcon from '../assets/icons/ShareIcon';
import { shareContent, generateShareText } from '../utils/shareUtils';
import useToast from '../hooks/useToast';

/**
 * 🔮 PalmResultScreen
 * Displays the structured output of the palm reading AI.
 * Allows sharing and saving (auto-saved in service).
 */
const PalmResultScreen = () => {
  const { navigationParams, navigate, goBack } = useNavigation();
  const { t } = useLanguage();
  const { showToast } = useToast();

  const reading = navigationParams?.reading;

  // Defensive check: If no reading passed, go back
  React.useEffect(() => {
    if (!reading) {
      goBack();
    }
  }, [reading, goBack]);

  if (!reading) return null;

  const handleShare = async () => {
    const text = generateShareText('palm', reading.fullText);
    const result = await shareContent({
      title: 'My Palm Reading',
      text: text
    });

    if (result.success && result.method === 'clipboard') {
      showToast('Copied to clipboard!', 'success');
    }
  };

  const handleDone = () => {
    navigate(SCREENS.HOME, {}, true); // Return to home, clearing stack slightly
  };

  return (
    <ScreenWrapper>
      <Header 
        title={t('palm.resultTitle')} 
        rightAction={
          <button onClick={handleShare} className="p-2">
            <ShareIcon className="w-5 h-5 text-white" />
          </button>
        }
      />

      <PageTransition>
        <div className="flex flex-col h-full px-5 pt-20 pb-10 overflow-y-auto no-scrollbar">
          
          {/* Main Content */}
          <PalmResultDisplay reading={reading} />

          {/* Bottom Action */}
          <div className="mt-8 mb-4">
            <Button 
              fullWidth 
              variant="primary" 
              onClick={handleDone}
            >
              {t('common.finish')}
            </Button>
          </div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default PalmResultScreen;
