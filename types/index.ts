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
export type MapName = 'Dust2' | 'Mirage' | 'Nuke' | 'Inferno' | 'Vertigo' | 'Ancient' | 'Anubis';

// Tipos de rondas
export type RoundType = 'pistol' | 'eco' | 'force' | 'buy' | 'anti-eco' | 'anti-force';

// Utilidades tácticas
export type TacticType = 'smoke' | 'flash' | 'molotov' | 'execute' | 'setup';

// Estrategia por ronda y lado
export interface RoundStrat {
  id: string;
  name: string;
  type: RoundType;
  team: 'T' | 'CT';
  description: string;
  setup?: string; // setup general (ej: "5 por Apps")
  utilities?: string[]; // (smokes, flashes, molis requeridas)
  tips: string[]; // array de tips/consejos
}

// Información de un mapa
export interface MapDetail {
  id: string;
  name: MapName;
  image?: string; // URL de la foto del mapa
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

export interface Tactic {
  id: string;
  name: string;
  map: MapName;
  type: TacticType;
  team: 'CT' | 'T';
  description?: string;
  utility?: string[]; // referencias a grenadas/utilidades
  createdAt: Date;
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
