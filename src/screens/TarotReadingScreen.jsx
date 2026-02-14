import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import TarotDeck from '../components/tarot/TarotDeck'; // Will create
import TarotCardReveal from '../components/tarot/TarotCardReveal'; // Will create
import TarotExplanation from '../components/tarot/TarotExplanation'; // Will create
import Button from '../components/common/Button';
import Loader from '../components/common/Loader';
import useNavigation from '../hooks/useNavigation';
import { useUser } from '../context/UserContext';
import { drawCards, getTarotReading } from '../services/tarotService';
import useLanguage from '../hooks/useLanguage';
import useToast from '../hooks/useToast';
import { shareContent, generateShareText } from '../utils/shareUtils';
import ShareIcon from '../assets/icons/ShareIcon';

/**
 * 🃏 TarotReadingScreen
 * Flow: Deck Pile -> Tap to Draw -> Reveal Animation -> AI Interpretation
 */
const TarotReadingScreen = () => {
  const [step, setStep] = useState('deck'); // 'deck', 'drawing', 'reveal', 'reading'
  const [drawnCard, setDrawnCard] = useState(null);
  const [interpretation, setInterpretation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { navigationParams, goBack } = useNavigation();
  const { incrementReadings } = useUser();
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const category = navigationParams?.category || 'general';

  // Draw Card Handler
  const handleDraw = async () => {
    setStep('drawing');
    
    // Simulate shuffle delay
    setTimeout(() => {
      const cards = drawCards(1);
      setDrawnCard(cards[0]);
      setStep('reveal');
      incrementReadings();
    }, 1500);
  };

  // Card Reveal Handler (Transition to AI Reading)
  const handleRevealComplete = async () => {
    if (!drawnCard) return;
    
    setIsLoading(true);
    
    // Celebration effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#a78bfa', '#22d3ee', '#ffffff']
    });

    try {
      const result = await getTarotReading([drawnCard], category, language);
      setInterpretation(result);
      setStep('reading');
    } catch (error) {
      console.error(error);
      showToast(t('common.error'), 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Share Logic
  const handleShare = async () => {
    const text = generateShareText('tarot', `${drawnCard.name}: ${interpretation}`);
    await shareContent({
      title: 'My Tarot Card',
      text: text
    });
  };

  return (
    <ScreenWrapper>
      <Header 
        title={t('tarot.title')} 
        rightAction={
          step === 'reading' && (
            <button onClick={handleShare} className="p-2">
              <ShareIcon className="w-5 h-5 text-white" />
            </button>
          )
        }
      />

      <PageTransition>
        <div className="flex flex-col h-full items-center justify-center px-6 pt-16 pb-10">
          
          {step === 'deck' && (
            <TarotDeck onDraw={handleDraw} hintText={t('tarot.draw')} />
          )}

          {step === 'drawing' && (
             <div className="animate-pulse text-mystic-light font-medium tracking-widest">
               {t('tarot.revealing')}
             </div>
          )}

          {step === 'reveal' && drawnCard && (
            <TarotCardReveal 
              card={drawnCard} 
              onRevealComplete={handleRevealComplete} 
            />
          )}

          {isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <Loader text="Consulting Spirits..." />
            </div>
          )}

          {step === 'reading' && drawnCard && (
            <div className="w-full h-full flex flex-col">
              <TarotExplanation 
                card={drawnCard} 
                text={interpretation} 
              />
              
              <div className="mt-6">
                <Button fullWidth variant="secondary" onClick={() => goBack()}>
                   {t('common.finish')}
                </Button>
              </div>
            </div>
          )}

        </div>
      </PageTransition>
    </ScreenWrapper>
  );
};

export default TarotReadingScreen;
