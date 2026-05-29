import type { MapPlaybook } from '../core/types';
import { miragePhilosophy } from './philosophy';
import { mirageCallouts } from './callouts';
import { mirageFundamentals } from './fundamentals';
import { mirageDefaults } from './defaults';
import { mirageProtocols } from './protocols';
import { mirageRetakes } from './retakes';
import { mirageReaggressions } from './reaggressions';
import { mirageAntiEco } from './antiEco';
import { miragePistolStrats } from './strats/pistol';
import { mirageEcoStrats } from './strats/eco';
import { mirageForceStrats } from './strats/force';
import { mirageBuyStrats } from './strats/buy';
import { mirageMidRoundStrats } from './strats/midRound';

export const mirageMap: MapPlaybook = {
  id: 'mirage',
  name: 'Mirage',
  image: '/maps/mirage-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'CT-sided',
  description:
    'Mirage es un mapa donde el control del medio dicta las decisiones. El equipo que gana medio suele imponer su agenda en A o B.',
  philosophy: miragePhilosophy,
  callouts: mirageCallouts,
  fundamentals: mirageFundamentals,
  defaults: mirageDefaults,
  protocols: mirageProtocols,
  retakes: mirageRetakes,
  reaggressions: mirageReaggressions,
  antiEco: mirageAntiEco,
  strats: {
    pistol: miragePistolStrats,
    eco: mirageEcoStrats,
    force: mirageForceStrats,
    buy: mirageBuyStrats,
    midRound: mirageMidRoundStrats,
    default: mirageDefaults,
    protocol: mirageProtocols,
    antiEco: mirageAntiEco,
    reaggression: mirageReaggressions,
  },
};
