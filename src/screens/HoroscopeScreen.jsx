import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import ZodiacSelector from '../components/horoscope/ZodiacSelector';
import HoroscopeDisplay from '../components/horoscope/HoroscopeDisplay'; // Will create
import Loader from '../components/common/Loader';
import { getHoroscope, calculateZodiacSign } from '../services/horoscopeService';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';

/**
 * 🌟 HoroscopeScreen
 * Allows user to view their own horoscope or select other signs.
 */
const HoroscopeScreen = () => {
  const { userProfile } = useUser();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const initialSign = userProfile.zodiacSign || calculateZodiacSign(userProfile.dob) || 'Aries';
  
  const [selectedSign, setSelectedSign] = useState(initialSign);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch when sign changes
  useEffect(() => {
    const fetchHoroscope = async () => {
      setIsLoading(true);
      try {
        const result = await getHoroscope(selectedSign, language);
        setData(result);
      } catch (error) {
        console.error(error);
        showToast(t('common.error'), 'error');
      } finally {
        setIsLoading(false);
      }
    };

    if (selectedSign) {
      fetchHoroscope();
    }
  }, [selectedSign, language, showToast, t]);

  return (
    <ScreenWrapper>
      <Header title={t('home.horoscope')} />

      <PageTransition>
        <div className="flex flex-col h-full px-4 pt-20 pb-10 overflow-y-auto no-scrollbar">
          
          {/* Sign Selector (Horizontal Scroll) */}
          <div className="mb-6">
            <ZodiacSelector 
              selected={selectedSign} 
              onSelect={setSelectedSign} 
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 min-h-[300px] relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader />
              </div>
            ) : (
              data && (
                <HoroscopeDisplay 
                  data={data} 
                  sign={selectedSign} 
                />
              )
            )}
          </div>

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default HoroscopeScreen;
