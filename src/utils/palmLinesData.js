/**
 * 🖐️ Palm Lines Data
 * Static definitions for the major lines used in palmistry analysis.
 * Used for UI tooltips and structuring the result display.
 */

export const PALM_LINES = [
  {
    id: 'heart_line',
    name: 'Heart Line',
    altName: 'Love Line',
    description: 'Represents emotional stability, romantic perspectives, depression, and cardiac health.',
    color: '#F472B6', // Pink
    icon: '❤️'
  },
  {
    id: 'head_line',
    name: 'Head Line',
    altName: 'Wisdom Line',
    description: 'Represents learning style, communication approach, intellectualism, and thirst for knowledge.',
    color: '#60A5FA', // Blue
    icon: '🧠'
  },
  {
    id: 'life_line',
    name: 'Life Line',
    altName: 'Vitality Line',
    description: 'Reflects physical vitality, life energy, and major life changes. It does NOT predict length of life.',
    color: '#34D399', // Green
    icon: '🌱'
  },
  {
    id: 'fate_line',
    name: 'Fate Line',
    altName: 'Destiny Line',
    description: 'Relates to career, path in life, and external circumstances beyond your control.',
    color: '#A78BFA', // Purple
    icon: '🏹'
  }
];

export const SECONDARY_LINES = [
  {
    id: 'sun_line',
    name: 'Sun Line',
    description: 'Indicates capability, fame, and success.'
  },
  {
    id: 'marriage_line',
    name: 'Marriage Line',
    description: 'Indicates the state of marriage and romantic relationships.'
  }
];

export default {
  PALM_LINES,
  SECONDARY_LINES
};
