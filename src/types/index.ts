export type PartnerCharacter = 'prince' | 'frog' | 'vampire' | 'bread' | 'rollercoaster';
export type YourCharacter = 'rescuer' | 'detective' | 'dumpling' | 'psychologist' | 'calm';

export type AppScreen =
  | 'start'
  | 'loading'
  | 'quiz'
  | 'result-partner'
  | 'your-quiz'
  | 'result-you'
  | 'compatibility'
  | 'wheel'
  | 'dumping'
  | 'queen';

export interface PartnerAnswer {
  text: string;
  type: PartnerCharacter;
}

export interface YourAnswer {
  text: string;
  type: YourCharacter;
}

export interface PartnerQuestion {
  id: number;
  question: string;
  emoji: string;
  answers: PartnerAnswer[];
}

export interface YourQuestion {
  id: number;
  question: string;
  emoji: string;
  answers: YourAnswer[];
}

export interface CharacterData {
  id: string;
  emoji: string;
  name: string;
  shortBio: string;
  tagline: string;
  descriptions: string[];
  gradient: string;
  accentColor: string;
}

export interface CompatibilityMetric {
  emoji: string;
  label: string;
  value: number;
}
