const adjectives = [
  'Boiling',
  'Fluffy',
  'Sharp',
  'Breezy',
  'Freezing',
  'Silky',
  'Bumpy',
  'Fuzzy',
  'Slick',
  'Chilly',
  'Greasy',
  'Slimy',
  'Cold',
  'Hard',
  'Slippery',
  'Cool',
  'Hot',
  'Smooth',
  'Cuddly',
  'Icy',
  'Soft',
  'Damp',
  'Loose',
  'Solid',
  'Dirty',
  'Melted',
  'Sticky',
  'Dry',
  'Painful',
  'Tender',
  'Dusty',
  'Prickly',
  'Tight',
  'Encrusted',
  'Rough',
  'Uneven',
  'Filthy',
  'Shaggy',
  'Warm',
  'Flaky',
  'Shaky',
  'Wet',
];
const nouns = [
  'Bay',
  'Pass',
  'Room',
  'House',
  'Inn',
  'Village',
  'Town',
  'Beach',
  'Desert',
  'River',
  'Creek',
  'Cavern',
  'Peninsula',
  'Haven',
  'Valley',
  'Sea',
  'Sanctuary',
];

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

export default function generateRoomName() {
  return `${adjectives[getRandomInt(0, adjectives.length)]} ${nouns[getRandomInt(0, nouns.length)]}`;
}
