import type { MapPlaybook } from "../core/types";
import { infernoPhilosophy } from "./philosophy";
import { infernoCallouts } from "./callouts";
import { infernoFundamentals } from "./fundamentals";
import { infernoDefaults } from "./defaults";
import { infernoProtocols } from "./protocols";
import { infernoRetakes } from "./retakes";
import { infernoReaggressions } from "./reaggressions";
import { infernoAntiEco } from "./antiEco";
import { infernoPistolStrats } from "./strats/pistol";
import { infernoEcoStrats } from "./strats/eco";
import { infernoForceStrats } from "./strats/force";
import { infernoBuyStrats } from "./strats/buy";
import { infernoMidRoundStrats } from "./strats/midRound";

export const infernoMap: MapPlaybook = {
  id: 'inferno',
  name: 'Inferno',
  image: '/maps/inferno-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'Balanced',
  description: 'Inferno exige control de banana y medio. La CT debe frenar avances tempranos y estar lista para retakes con smokes precisas.',
  philosophy: infernoPhilosophy,
  callouts: infernoCallouts,
  fundamentals: infernoFundamentals,
  defaults: infernoDefaults,
  protocols: infernoProtocols,
  retakes: infernoRetakes,
  reaggressions: infernoReaggressions,
  antiEco: infernoAntiEco,
  strats: {
    pistol: infernoPistolStrats,
    eco: infernoEcoStrats,
    force: infernoForceStrats,
    buy: infernoBuyStrats,
    midRound: infernoMidRoundStrats,
    default: infernoDefaults,
    protocol: infernoProtocols,
    antiEco: infernoAntiEco,
    reaggression: infernoReaggressions,
  },
};
