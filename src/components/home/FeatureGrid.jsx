import React from 'react';
import FeatureCard from './FeatureCard';
import useNavigation from '../../hooks/useNavigation';
import { SCREENS } from '../../context/NavigationContext';
import useLanguage from '../../hooks/useLanguage';
import PalmIcon from '../../assets/icons/PalmIcon';
import TarotIcon from '../../assets/icons/TarotIcon';
import HeartIcon from '../../assets/icons/HeartIcon';
import StarIcon from '../../assets/icons/StarIcon';

/**
 * 🍱 FeatureGrid
 * Displays the main app capabilities in a 2-column grid.
 */
const FeatureGrid = () => {
  const { navigate } = useNavigation();
  const { t } = useLanguage();

  const features = [
    {
      id: 'palm',
      title: t('home.palmScan'),
      description: t('home.palmDesc'),
      icon: <PalmIcon className="w-8 h-8 text-accent-cyan" />,
      action: () => navigate(SCREENS.PALM_SCAN),
      delay: 0.2,
      color: 'bg-accent-cyan/10'
    },
    {
      id: 'tarot',
      title: t('home.tarot'),
      description: t('home.tarotDesc'),
      icon: <TarotIcon className="w-8 h-8 text-mystic-light" />,
      action: () => navigate(SCREENS.TAROT_MENU),
      delay: 0.3,
      color: 'bg-mystic-light/10'
    },
    {
      id: 'horoscope',
      title: t('home.horoscope'),
      description: t('home.horoscopeDesc'),
      icon: <StarIcon className="w-8 h-8 text-yellow-400" />,
      action: () => navigate(SCREENS.HOROSCOPE),
      delay: 0.4,
      color: 'bg-yellow-400/10'
    },
    {
      id: 'love',
      title: t('home.love'),
      description: t('home.loveDesc'),
      icon: <HeartIcon className="w-8 h-8 text-pink-400" />,
      action: () => navigate(SCREENS.LOVE_READING),
      delay: 0.5,
      color: 'bg-pink-400/10'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {features.map((feature) => (
        <FeatureCard
          key={feature.id}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          onClick={feature.action}
          delay={feature.delay}
          iconBg={feature.color}
        />
      ))}
    </div>
  );
};

export default FeatureGrid;
