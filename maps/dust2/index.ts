import type { MapPlaybook } from '../core/types';
import { dust2Philosophy } from './philosophy';
import { dust2Callouts } from './callouts';
import { dust2Fundamentals } from './fundamentals';
import { dust2Defaults } from './defaults';
import { dust2Protocols } from './protocols';
import { dust2Retakes } from './retakes';
import { dust2Reaggressions } from './reaggressions';
import { dust2AntiEco } from './antiEco';
import { dust2PistolStrats } from './strats/pistol';
import { dust2EcoStrats } from './strats/eco';
import { dust2ForceStrats } from './strats/force';
import { dust2BuyStrats } from './strats/buy';
import { dust2MidRoundStrats } from './strats/midRound';

export const dust2Map: MapPlaybook = {
  id: 'dust2',
  name: 'Dust2',
  image: '/maps/dust2-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'Balanced',
  description:
    'Dust2 es un mapa de presión coordinada y trade timing. El control de puertas y medio define las rondas y obliga a tomar decisiones tempranas.',
  philosophy: dust2Philosophy,
  callouts: dust2Callouts,
  fundamentals: dust2Fundamentals,
  defaults: dust2Defaults,
  protocols: dust2Protocols,
  retakes: dust2Retakes,
  reaggressions: dust2Reaggressions,
  antiEco: dust2AntiEco,
  strats: {
    pistol: dust2PistolStrats,
    eco: dust2EcoStrats,
    force: dust2ForceStrats,
    buy: dust2BuyStrats,
    midRound: dust2MidRoundStrats,
    default: dust2Defaults,
    protocol: dust2Protocols,
    antiEco: dust2AntiEco,
    reaggression: dust2Reaggressions,
  },
};
