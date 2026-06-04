// Miras (Crosshairs)
export interface Crosshair {
  id: string;
  name: string;
  code: string;
  description?: string;
  team?: 'CT' | 'T' | 'Both';
  createdAt: Date;
}

// Configuraciones de juego
export interface GameConfig {
  id: string;
  name: string;
  description?: string;
  settings: Record<string, string | number | boolean>;
  createdAt: Date;
}

// Mapas disponibles en CS2
export type MapName = 'Dust2' | 'Mirage' | 'Nuke' | 'Inferno' | 'Vertigo' | 'Ancient' | 'Anubis' | 'Train';

export type MapStrategyCategory =
  | 'Default'
  | 'Pistol'
  | 'Eco'
  | 'Force Buy'
  | 'Full Buy'
  | 'Anti Eco'
  | 'Anti Force'
  | 'Buy vs Buy'
  | 'Retakes'
  | 'Protocol'
  | 'Reaggression'
  | 'Mid Round Calls'
  | 'Reacciones CT'
  | 'Reacciones T'
  | 'Situaciones especiales';

// Tipos de rondas
export type RoundType =
  | 'pistol'
  | 'eco'
  | 'force'
  | 'buy'
  | 'full-buy'
  | 'anti-eco'
  | 'anti-force'
  | 'buy-vs-buy'
  | 'default'
  | 'retake'
  | 'protocol'
  | 'antiEco'
  | 'reaggression'
  | 'midRound'
  | 'exec'
  | 'split'
  | 'rush'
  | 'contact'
  | 'mid-control'
  | 'late-exec';

// Utilidades tácticas
export type TacticType = 'smoke' | 'flash' | 'molotov' | 'execute' | 'setup';

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
  postplantOrRetake: string;
}

// Estrategia por ronda y lado
export interface RoundStrat {
  id: string;
  name: string;
  category?: MapStrategyCategory;
  type: RoundType;
  team: 'T' | 'CT';
  description: string;
  objectivePrincipal?: string;
  difficulty?: 'Low' | 'Medium' | 'High' | 'Very High';
  recommendedLevel?: string;
  concept?: string;
  risks?: string[];
  whenToUse?: string;
  whenNotToUse?: string;
  failReaction?: string;
  adaptationsPossible?: string;
  setup?: string; // setup general (ej: "5 por Apps")
  playerDistribution?: string;
  utilities?: string[]; // (smokes, flashes, molis requeridas)
  timing?: string;
  importantSpaces?: string[];
  pointOfContact?: string;
  victoryCondition?: string;
  postplant?: string;
  roles?: {
    entry?: RoleDetail;
    lurker?: RoleDetail;
    support?: RoleDetail;
    mid?: RoleDetail;
    anchor?: RoleDetail;
    rotator?: RoleDetail;
    awper?: RoleDetail;
    secondEntry?: RoleDetail;
  };
  tips: string[]; // array de tips/consejos
}

// Información de un mapa
export interface MapDetail {
  id: string;
  name: MapName;
  image?: string; // URL de la foto del mapa
  calloutImage?: string; // URL de la imagen del minimap para callouts
  description: string; // filosofía del mapa
  sideFavor: 'T-sided' | 'CT-sided' | 'Balanced';
  callouts: {
    siteA: string[];
    siteB: string[];
    middle: string[];
  };
  fundamentals: {
    t: string[]; // principios T
    ct: string[]; // principios CT
  };
  strats: RoundStrat[];
}

// Alias para compatibilidad con archivos generados
export interface Tactic {
  id: string;
  name: string;
  category: string;
  team: "T" | "CT";
  setup?: string;
  description?: string;
  objectivePrincipal?: string;
  concept?: string;
  winCondition?: string;
  failureStates?: string[];
  commonMistakes?: string[];
  minimumUtility?: string[];
  priorityWeapons?: string[];
  timingWindows?: string;
  utilityLayering?: string;
  reactionTree?: string;
  lurkTiming?: string;
  postplant?: string;
  roles: TacticRole[];
}

// Notas y documentos
export interface Note {
  id: string;
  title: string;
  content: string;
  map?: MapName;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Estadísticas (estructura básica para FACEIT/Steam)
export interface PlayerStats {
  id: string;
  platform: 'FACEIT' | 'Steam';
  nickname: string;
  rating?: number;
  elo?: number;
  lastUpdated: Date;
}

// ============================================================
// Tipos para los archivos generados de mapas
// ============================================================

export interface MapPhilosophy {
  tWinCondition: string;
  ctWinCondition: string;
  keyAreas: string[];
  tempo: string;
  rotationComplexity: string;
}

export interface MapCalloutZone {
  name: string;
  description: string;
}

export interface MapCallouts {
  siteA: MapCalloutZone[];
  siteB: MapCalloutZone[];
  middle: MapCalloutZone[];
}

export interface MapFundamentals {
  T: string[];
  CT: string[];
}

export interface TacticRole {
  name: string;
  label: string;
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

export interface MapTactic {
  id: string;
  name: string;
  category: string;
  team: "T" | "CT";
  setup?: string;
  description?: string;
  objectivePrincipal?: string;
  concept?: string;
  winCondition?: string;
  failureStates?: string[];
  commonMistakes?: string[];
  minimumUtility?: string[];
  priorityWeapons?: string[];
  timingWindows?: string;
  utilityLayering?: string;
  reactionTree?: string;
  lurkTiming?: string;
  postplant?: string;
  roles: TacticRole[];
}

export interface MapData {
  id: string;
  name: string;
  sideFavor: string;
  description: string;
  philosophy: MapPhilosophy;
  callouts: MapCallouts;
  fundamentals: MapFundamentals;
  tactics: MapTactic[];
}