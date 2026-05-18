import type { PartnerCharacter, YourCharacter } from '../types';
import { partnerCharacters } from '../data/partnerCharacters';
import { yourCharacters } from '../data/yourCharacters';

export function calculatePartnerCharacter(answers: PartnerCharacter[]): PartnerCharacter {
  const counts: Record<PartnerCharacter, number> = {
    prince: 0, frog: 0, vampire: 0, bread: 0, rollercoaster: 0,
  };
  for (const a of answers) counts[a]++;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as PartnerCharacter;
}

export function calculateYourCharacter(answers: YourCharacter[]): YourCharacter {
  const counts: Record<YourCharacter, number> = {
    rescuer: 0, detective: 0, dumpling: 0, psychologist: 0, calm: 0,
  };
  for (const a of answers) counts[a]++;
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0] as YourCharacter;
}

export function getRandomDescription(id: string, dataset: { id: string; descriptions: string[] }[]): string {
  const found = dataset.find(c => c.id === id);
  if (!found) return '';
  return found.descriptions[Math.floor(Math.random() * found.descriptions.length)];
}

export function getPartnerData(id: PartnerCharacter) {
  return partnerCharacters.find(c => c.id === id)!;
}

export function getYourData(id: YourCharacter) {
  return yourCharacters.find(c => c.id === id)!;
}
