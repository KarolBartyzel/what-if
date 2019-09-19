import { adjectives, getRandomInt, roomNouns } from '../../../constants/Names';

export default function generateRoomName() {
  return `${adjectives[getRandomInt(0, adjectives.length)]} ${roomNouns[getRandomInt(0, roomNouns.length)]}`;
}
