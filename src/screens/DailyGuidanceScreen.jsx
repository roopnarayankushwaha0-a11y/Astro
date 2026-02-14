import React, { useState, useEffect } from 'react';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import GuidanceCard from '../components/daily/GuidanceCard'; // Will create
import EnergyMeter from '../components/daily/EnergyMeter'; // Will create
import ShareButton from '../components/daily/ShareButton'; // Will create
import Loader from '../components/common/Loader';
import { getDailyGuidance } from '../services/dailyGuidanceService';
import { useUser } from '../context/UserContext';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { calculateZodiacSign } from '../services/horoscopeService';

/**
 * ✨ DailyGuidanceScreen
 * Shows general energy, lucky items, and advice for the day.
 */
const DailyGuidanceScreen = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { userProfile, markDailyGuidanceRead } = useUser();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const zodiac = calculateZodiacSign(userProfile.dob);
        const userContext = `Name: ${userProfile.name}, Zodiac: ${zodiac}`;
        
        const result = await getDailyGuidance(userContext, language);
        
        setData(result);
        markDailyGuidanceRead();
      } catch (error) {
        console.error(error);
        showToast(t('common.error'), 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [language, markDailyGuidanceRead, showToast, t, userProfile.dob, userProfile.name]);

  return (
    <ScreenWrapper>
      <Header title={t('home.dailyCard')} />

      <PageTransition>
        <div className="flex flex-col h-full px-5 pt-20 pb-10 overflow-y-auto no-scrollbar">
          
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader text={t('common.loading')} />
            </div>
          ) : (
            <div className="space-y-6 animate-fade-in">
              
              {/* Date Header */}
              <div className="text-center mb-2">
                <p className="text-accent-cyan font-medium tracking-widest text-xs uppercase">
                  {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <h2 className="text-2xl font-bold text-white mt-1">Today's Energy</h2>
              </div>

              {/* Energy Visual */}
              <EnergyMeter level={data?.energyLevel || 85} />

              {/* Main Content Card */}
              <GuidanceCard content={data?.content} />

              {/* Action */}
              <div className="pt-4 flex justify-center">
                <ShareButton content={data?.content} type="daily" />
              </div>

            </div>
          )}

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default DailyGuidanceScreen;
