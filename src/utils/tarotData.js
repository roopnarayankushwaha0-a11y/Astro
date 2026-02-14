/**
 * 🃏 Tarot Deck Data
 * Complete list of 78 Rider-Waite Tarot cards.
 * Used for shuffling and drawing logic.
 */

// Major Arcana
const MAJOR_ARCANA = [
  { id: 'major_0', name: 'The Fool', type: 'major', number: 0 },
  { id: 'major_1', name: 'The Magician', type: 'major', number: 1 },
  { id: 'major_2', name: 'The High Priestess', type: 'major', number: 2 },
  { id: 'major_3', name: 'The Empress', type: 'major', number: 3 },
  { id: 'major_4', name: 'The Emperor', type: 'major', number: 4 },
  { id: 'major_5', name: 'The Hierophant', type: 'major', number: 5 },
  { id: 'major_6', name: 'The Lovers', type: 'major', number: 6 },
  { id: 'major_7', name: 'The Chariot', type: 'major', number: 7 },
  { id: 'major_8', name: 'Strength', type: 'major', number: 8 },
  { id: 'major_9', name: 'The Hermit', type: 'major', number: 9 },
  { id: 'major_10', name: 'Wheel of Fortune', type: 'major', number: 10 },
  { id: 'major_11', name: 'Justice', type: 'major', number: 11 },
  { id: 'major_12', name: 'The Hanged Man', type: 'major', number: 12 },
  { id: 'major_13', name: 'Death', type: 'major', number: 13 },
  { id: 'major_14', name: 'Temperance', type: 'major', number: 14 },
  { id: 'major_15', name: 'The Devil', type: 'major', number: 15 },
  { id: 'major_16', name: 'The Tower', type: 'major', number: 16 },
  { id: 'major_17', name: 'The Star', type: 'major', number: 17 },
  { id: 'major_18', name: 'The Moon', type: 'major', number: 18 },
  { id: 'major_19', name: 'The Sun', type: 'major', number: 19 },
  { id: 'major_20', name: 'Judgement', type: 'major', number: 20 },
  { id: 'major_21', name: 'The World', type: 'major', number: 21 }
];

// Minor Arcana Generators
const SUITS = ['Wands', 'Cups', 'Swords', 'Pentacles'];
const RANKS = [
  'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Page', 'Knight', 'Queen', 'King'
];

const MINOR_ARCANA = [];

SUITS.forEach(suit => {
  RANKS.forEach((rank, index) => {
    MINOR_ARCANA.push({
      id: `minor_${suit.toLowerCase()}_${index}`,
      name: `${rank} of ${suit}`,
      type: 'minor',
      suit: suit,
      rank: rank,
      number: index + 1
    });
  });
});

export const tarotDeck = [...MAJOR_ARCANA, ...MINOR_ARCANA];

export default tarotDeck;
