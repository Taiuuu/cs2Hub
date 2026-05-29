export type StratType =
  | 'pistol'
  | 'eco'
  | 'force'
  | 'buy'
  | 'default'
  | 'retake'
  | 'protocol'
  | 'antiEco'
  | 'reaggression'
  | 'midRound';

export type StratCategory =
  | 'Pistol'
  | 'Eco'
  | 'Force Buy'
  | 'Full Buy'
  | 'Default'
  | 'Retake'
  | 'Protocol'
  | 'Anti Eco'
  | 'Reaggression'
  | 'Mid Round';

export type RoleName =
  | 'entry'
  | 'lurker'
  | 'support'
  | 'anchor'
  | 'rotator'
  | 'awper'
  | 'secondEntry';

export interface RoleDetail {
  position: string;
  objective: string;
  utility: string;
  timing: string;
  responsibility: string;
  whatToLook: string;
  communication: string;
  onTeammateDeath: string;
  onNoContact: string;
  postplant: string;
}

export interface StratDetail {
  id: string;
  name: string;
  category?: StratCategory;
  type: StratType;
  team: 'T' | 'CT';
  description: string;
  objectivePrincipal: string;
  concept: string;
  risks: string[];
  failReaction: string;
  adaptationsPossible: string;
  midRoundOptions: string[];
  winCondition: string;
  failureStates: string[];
  commonMistakes: string[];
  recoveryPlan: string;
  economyLogic: string;
  minimumUtility: string[];
  priorityWeapons: string[];
  spacingRules: string;
  utilityLayering: string;
  timingWindows: string;
  reactionTree: string;
  rotationPunish: string;
  lurkTiming: string;
  infoProtocols: string;
  setup: string;
  playerDistribution: string;
  importantSpaces: string[];
  pointOfContact: string;
  postplant: string;
  roles: Partial<Record<RoleName, RoleDetail>>;
}

export interface MapPhilosophy {
  philosophy: string;
  tWinCondition: string;
  ctWinCondition: string;
  keyAreas: string[];
  tempo: string;
  rotationComplexity: string;
}

export interface MapFundamentals {
  t: string[];
  ct: string[];
}

export interface MapCallouts {
  siteA: string[];
  siteB: string[];
  middle: string[];
}

export interface MapPlaybook {
  id: string;
  name: string;
  image?: string;
  calloutImage?: string;
  sideFavor: 'T-sided' | 'CT-sided' | 'Balanced';
  description: string;
  philosophy: MapPhilosophy;
  callouts: MapCallouts;
  fundamentals: MapFundamentals;
  defaults: StratDetail[];
  protocols: StratDetail[];
  retakes: StratDetail[];
  reaggressions: StratDetail[];
  antiEco: StratDetail[];
  strats: {
    pistol: StratDetail[];
    eco: StratDetail[];
    force: StratDetail[];
    buy: StratDetail[];
    midRound: StratDetail[];
    default: StratDetail[];
    protocol: StratDetail[];
    antiEco: StratDetail[];
    reaggression: StratDetail[];
  };
}
