import type { MapPlaybook } from "../core/types";
import { nukePhilosophy } from "./philosophy";
import { nukeCallouts } from "./callouts";
import { nukeFundamentals } from "./fundamentals";
import { nukeDefaults } from "./defaults";
import { nukeProtocols } from "./protocols";
import { nukeRetakes } from "./retakes";
import { nukeReaggressions } from "./reaggressions";
import { nukeAntiEco } from "./antiEco";
import { nukePistolStrats } from "./strats/pistol";
import { nukeEcoStrats } from "./strats/eco";
import { nukeForceStrats } from "./strats/force";
import { nukeBuyStrats } from "./strats/buy";
import { nukeMidRoundStrats } from "./strats/midRound";

export const nukeMap: MapPlaybook = {
  id: 'nuke',
  name: 'Nuke',
  image: '/maps/nuke-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'CT-sided',
  description: 'Nuke premia control vertical. La CT debe maximizar sus ángulos y minimizar la información que pierde en ramps.',
  philosophy: nukePhilosophy,
  callouts: nukeCallouts,
  fundamentals: nukeFundamentals,
  defaults: nukeDefaults,
  protocols: nukeProtocols,
  retakes: nukeRetakes,
  reaggressions: nukeReaggressions,
  antiEco: nukeAntiEco,
  strats: {
    pistol: nukePistolStrats,
    eco: nukeEcoStrats,
    force: nukeForceStrats,
    buy: nukeBuyStrats,
    midRound: nukeMidRoundStrats,
    default: nukeDefaults,
    protocol: nukeProtocols,
    antiEco: nukeAntiEco,
    reaggression: nukeReaggressions,
  },
};
