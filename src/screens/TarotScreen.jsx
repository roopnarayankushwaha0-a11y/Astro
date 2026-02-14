import React from 'react';
import { motion } from 'framer-motion';
import ScreenWrapper from '../components/layout/ScreenWrapper';
import PageTransition from '../components/layout/PageTransition';
import Header from '../components/common/Header';
import TarotCategoryCard from '../components/tarot/TarotCategoryCard'; // Will create
import useNavigation from '../hooks/useNavigation';
import { SCREENS } from '../context/NavigationContext';
import useLanguage from '../hooks/useLanguage';
import BottomNav from '../components/common/BottomNav';

/**
 * 🃏 TarotScreen (Menu)
 * User selects a topic (Love, Career, Growth) to start a reading.
 */
const TarotScreen = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();

  const categories = [
    {
      id: 'love',
      title: t('tarot.love'),
      icon: '❤️',
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'career',
      title: t('tarot.career'),
      icon: '💼',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'growth',
      title: t('tarot.growth'),
      icon: '🌱',
      color: 'from-violet-500 to-purple-500'
    }
  ];

  const handleSelect = (category) => {
    navigate(SCREENS.TAROT_READING, { category: category.id });
  };

  return (
    <ScreenWrapper>
      <Header title={t('tarot.title')} transparent />

      <PageTransition>
        <div className="flex flex-col h-full px-5 pt-24 pb-24 overflow-y-auto no-scrollbar">
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h2 className="text-xl font-medium text-white/90">
              {t('tarot.pickCategory')}
            </h2>
            <div className="w-12 h-1 bg-accent-cyan/50 mx-auto mt-3 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 gap-6">
            {categories.map((cat, index) => (
              <TarotCategoryCard 
                key={cat.id}
                data={cat}
                index={index}
                onClick={() => handleSelect(cat)}
              />
            ))}
          </div>

        </div>

        {/* Floating cards animation in background layer? (Optional polish) */}
        
        <BottomNav />

      </PageTransition>
    </ScreenWrapper>
  );
};

export default TarotScreen;
