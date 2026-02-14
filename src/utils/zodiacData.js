/**
 * ♈ Zodiac Data
 * Static definitions for all 12 zodiac signs.
 */

export const ZODIAC_SIGNS = [
  {
    id: 'aries',
    name: 'Aries',
    symbol: '♈',
    dateRange: 'Mar 21 - Apr 19',
    element: 'Fire',
    planet: 'Mars',
    traits: ['Courageous', 'Determined', 'Confident', 'Enthusiastic'],
    color: '#FF4500' // Red-Orange
  },
  {
    id: 'taurus',
    name: 'Taurus',
    symbol: '♉',
    dateRange: 'Apr 20 - May 20',
    element: 'Earth',
    planet: 'Venus',
    traits: ['Reliable', 'Patient', 'Practical', 'Devoted'],
    color: '#228B22' // Forest Green
  },
  {
    id: 'gemini',
    name: 'Gemini',
    symbol: '♊',
    dateRange: 'May 21 - Jun 20',
    element: 'Air',
    planet: 'Mercury',
    traits: ['Gentle', 'Affectionate', 'Curious', 'Adaptable'],
    color: '#FFFF00' // Yellow
  },
  {
    id: 'cancer',
    name: 'Cancer',
    symbol: '♋',
    dateRange: 'Jun 21 - Jul 22',
    element: 'Water',
    planet: 'Moon',
    traits: ['Tenacious', 'Highly Imaginative', 'Loyal', 'Emotional'],
    color: '#C0C0C0' // Silver
  },
  {
    id: 'leo',
    name: 'Leo',
    symbol: '♌',
    dateRange: 'Jul 23 - Aug 22',
    element: 'Fire',
    planet: 'Sun',
    traits: ['Creative', 'Passionate', 'Generous', 'Warm-hearted'],
    color: '#FFD700' // Gold
  },
  {
    id: 'virgo',
    name: 'Virgo',
    symbol: '♍',
    dateRange: 'Aug 23 - Sep 22',
    element: 'Earth',
    planet: 'Mercury',
    traits: ['Loyal', 'Analytical', 'Kind', 'Hardworking'],
    color: '#808000' // Olive
  },
  {
    id: 'libra',
    name: 'Libra',
    symbol: '♎',
    dateRange: 'Sep 23 - Oct 22',
    element: 'Air',
    planet: 'Venus',
    traits: ['Cooperative', 'Diplomatic', 'Gracious', 'Fair-minded'],
    color: '#FF69B4' // Pink
  },
  {
    id: 'scorpio',
    name: 'Scorpio',
    symbol: '♏',
    dateRange: 'Oct 23 - Nov 21',
    element: 'Water',
    planet: 'Pluto',
    traits: ['Resourceful', 'Brave', 'Passionate', 'Stubborn'],
    color: '#800000' // Maroon
  },
  {
    id: 'sagittarius',
    name: 'Sagittarius',
    symbol: '♐',
    dateRange: 'Nov 22 - Dec 21',
    element: 'Fire',
    planet: 'Jupiter',
    traits: ['Generous', 'Idealistic', 'Great sense of humor'],
    color: '#800080' // Purple
  },
  {
    id: 'capricorn',
    name: 'Capricorn',
    symbol: '♑',
    dateRange: 'Dec 22 - Jan 19',
    element: 'Earth',
    planet: 'Saturn',
    traits: ['Responsible', 'Disciplined', 'Self-control', 'Good managers'],
    color: '#A52A2A' // Brown
  },
  {
    id: 'aquarius',
    name: 'Aquarius',
    symbol: '♒',
    dateRange: 'Jan 20 - Feb 18',
    element: 'Air',
    planet: 'Uranus',
    traits: ['Progressive', 'Original', 'Independent', 'Humanitarian'],
    color: '#00BFFF' // Deep Sky Blue
  },
  {
    id: 'pisces',
    name: 'Pisces',
    symbol: '♓',
    dateRange: 'Feb 19 - Mar 20',
    element: 'Water',
    planet: 'Neptune',
    traits: ['Compassionate', 'Artistic', 'Intuitive', 'Gentle'],
    color: '#2E8B57' // Sea Green
  }
];

export const getZodiacById = (id) => ZODIAC_SIGNS.find(z => z.id === id);

export default ZODIAC_SIGNS;
