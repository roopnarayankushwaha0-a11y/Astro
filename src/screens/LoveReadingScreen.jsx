import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import ZodiacSelector from '../components/horoscope/ZodiacSelector'; // Will create
import CompatibilityMeter from '../components/love/CompatibilityMeter'; // Will create
import LoveInsightCard from '../components/love/LoveInsightCard'; // Will create
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import { getLoveReading } from '../services/loveReadingService';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import { calculateZodiacSign } from '../services/horoscopeService';
import useToast from '../hooks/useToast';

/**
 * ❤️ LoveReadingScreen
 * Input: User Zodiac + Partner Zodiac (Optional) + Status
 * Output: AI generated advice + Compatibility Score
 */
const LoveReadingScreen = () => {
  const { userProfile } = useUser();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const userSign = userProfile.zodiacSign || calculateZodiacSign(userProfile.dob) || 'Aries';
  
  const [partnerSign, setPartnerSign] = useState(null);
  const [status, setStatus] = useState('Single');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async () => {
    setIsLoading(true);
    try {
      const reading = await getLoveReading(userSign, partnerSign, status, language);
      setResult(reading);
    } catch (error) {
      console.error(error);
      showToast(t('common.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setPartnerSign(null);
  };

  return (
    <ScreenWrapper>
      <Header title={t('home.love')} />

      <PageTransition>
        <div className="flex flex-col h-full px-5 pt-20 pb-10 overflow-y-auto no-scrollbar">
          
          {isLoading && <Loader fullScreen text={t('common.loading')} />}

          {!result ? (
            // INPUT FORM
            <div className="space-y-8 animate-fade-in">
              {/* User Sign Display */}
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Your Sign</p>
                <div className="inline-block px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xl font-semibold text-white">
                  {userSign}
                </div>
              </div>

              {/* Partner Sign Selection */}
              <div>
                <p className="text-center text-gray-300 mb-4">Partner's Sign (Optional)</p>
                <ZodiacSelector 
                  selected={partnerSign} 
                  onSelect={setPartnerSign} 
                />
              </div>

              {/* Status Selection */}
              <div>
                <p className="text-center text-gray-300 mb-4">Current Status</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Single', 'Relationship', 'Complicated'].map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        status === s 
                        ? 'bg-pink-500 text-white shadow-glow-sm' 
                        : 'bg-white/5 text-gray-400 border border-white/10'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button fullWidth onClick={handleAnalyze}>
                  Analyze Compatibility
                </Button>
              </div>
            </div>
          ) : (
            // RESULT DISPLAY
            <div className="space-y-6 animate-slide-up">
              {/* Score Visual */}
              {partnerSign && (
                <CompatibilityMeter score={result.score} />
              )}

              {/* Text Insight */}
              <LoveInsightCard text={result.text} />

              <Button variant="secondary" fullWidth onClick={reset}>
                Check Another Match
              </Button>
            </div>
          )}

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default LoveReadingScreen;
