import React, { useState } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import HandSelector from '../components/palm/HandSelector'; // Will create
import ScanGuide from '../components/palm/ScanGuide'; // Will create
import ImageUploader from '../components/palm/ImageUploader'; // Will create
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import { processPalmReading } from '../services/palmAnalysisService';
import useLanguage from '../hooks/useLanguage';
import Loader from '../components/common/Loader';
import useToast from '../hooks/useToast';

/**
 * 🖐️ PalmScanScreen
 * Flow: Select Hand -> Show Guide -> Upload/Take Photo -> Analyze -> Navigate to Result
 */
const PalmScanScreen = () => {
  const [step, setStep] = useState(1); // 1: Hand Select, 2: Upload/Camera
  const [selectedHand, setSelectedHand] = useState('left'); // 'left' or 'right'
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const { navigate } = useNavigation();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const handleHandSelect = (hand) => {
    setSelectedHand(hand);
    setStep(2);
  };

  const handleImageSelected = async (base64Image) => {
    setIsAnalyzing(true);
    try {
      // API Call to analyze
      const result = await processPalmReading(base64Image, selectedHand, language);
      
      // Navigate to result with data
      navigate(SCREENS.PALM_RESULT, { reading: result });
    } catch (error) {
      console.error(error);
      showToast(t('common.error'), 'error');
      setIsAnalyzing(false);
    }
  };

  return (
    <ScreenWrapper>
      {isAnalyzing && (
        <Loader fullScreen text={t('palm.analyzing')} />
      )}

      <Header title={t('palm.title')} />

      <PageTransition>
        <div className="flex flex-col h-full px-6 pt-20 pb-10">
          
          {step === 1 ? (
            // Step 1: Hand Selection
            <HandSelector 
              onSelect={handleHandSelect} 
            />
          ) : (
            // Step 2: Guide & Upload
            <div className="flex flex-col h-full">
              <ScanGuide hand={selectedHand} />
              
              <div className="mt-auto">
                <ImageUploader 
                  onImageSelected={handleImageSelected} 
                  disabled={isAnalyzing}
                />
                
                <button 
                  onClick={() => setStep(1)}
                  className="w-full mt-4 text-sm text-gray-400 hover:text-white py-2"
                >
                  {t('common.back')}
                </button>
              </div>
            </div>
          )}

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default PalmScanScreen;
