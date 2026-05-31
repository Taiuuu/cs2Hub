import type { MapPlaybook } from '../core/types';

export const vertigoMap: MapPlaybook = {
  id: 'vertigo',
  name: 'Vertigo',
  image: '/maps/vertigo-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'Balanced',
  description: 'Vertigo es un mapa de alturas y espacio. El control de rampas y arena define el ritmo; quien juega mejor las verticales gana las peleas clave.',
  philosophy: {
    philosophy: 'Vertigo gira en torno a dominar niveles y cortes de rotación. La T debe saber cuándo subir por A o B, mientras el CT usa niveles altos para cortar avances.',
    tWinCondition: 'Forzar rotaciones y ganar altura en el sitio elegido antes de cerrar la postplant.',
    ctWinCondition: 'Negar el nivel alto y frenar split mediante utility coordinada.',
    keyAreas: ['Arena', 'Rampa', 'Headshot', 'Sandbag'],
    tempo: 'Variable: puede ser rápido en split o lento esperando errores en defensa.',
    rotationComplexity: 'Alta: rotaciones verticales entre A y B deben ser precisas.',
  },
  callouts: {
    siteA: ['Arena', 'Headshot', 'Rampa'],
    siteB: ['Sandbag', 'Escalera', 'Generador'],
    middle: ['Mid', 'Connect', 'Plataforma'],
  },
  fundamentals: {
    t: ['Controlar altura', 'No dejar que el CT pelee sin utility', 'Cuidar los ángulos pre-aimed'],
    ct: ['Jugar los cortes de rotación', 'Usar niveles altos para castigar avances', 'Tener smokes listos para splits'],
  },
  defaults: [],
  protocols: [],
  retakes: [],
  reaggressions: [],
  antiEco: [],
  strats: {
    pistol: [],
    eco: [],
    force: [],
    buy: [],
    midRound: [],
    default: [],
    protocol: [],
    antiEco: [],
    reaggression: [],
  },
};
