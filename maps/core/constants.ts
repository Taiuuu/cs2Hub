import type { StratCategory, StratType } from './types';

export const STRAT_TYPES: StratType[] = [
  'pistol',
  'eco',
  'force',
  'buy',
  'default',
  'retake',
  'protocol',
  'antiEco',
  'reaggression',
  'midRound',
];

export const STRAT_CATEGORIES: StratCategory[] = [
  'Pistol',
  'Eco',
  'Force Buy',
  'Full Buy',
  'Default',
  'Retake',
  'Protocol',
  'Anti Eco',
  'Reaggression',
  'Mid Round',
];

export const ROLE_ORDER = [
  'entry',
  'lurker',
  'support',
  'anchor',
  'rotator',
  'awper',
  'secondEntry',
] as const;

export const MAP_IDS = [
  'dust2',
  'mirage',
  'inferno',
  'nuke',
  'ancient',
  'anubis',
  'vertigo',
  'train',
] as const;
