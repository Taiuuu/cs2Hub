import type { MapPlaybook } from '../core/types';

export const overpassMap: MapPlaybook = {
  id: 'overpass',
  name: 'Overpass',
  image: '/maps/callout-bg.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'T-sided',
  description: 'Overpass es un mapa de rotaciones largas y control de altura. El equipo que domina el puente aéreo y los espacios elevados tiene ventaja decisiva.',
  philosophy: {
    philosophy: 'Overpass gira en torno a las alturas y las rotaciones por puente. La T busca controlar el cielo y forzar al CT a jugar posiciones comprometidas; el CT usa níeles altos para frenar avances.',
    tWinCondition: 'Conseguir control del puente, forzar rotaciones y ejecutar en A o B con superioridad.',
    ctWinCondition: 'Negar el puente, mantener altura y frenar splits mediante utility coordinada.',
    keyAreas: ['Puente', 'Cielo', 'Agua', 'Plaza'],
    tempo: 'Flexible: puede ser rápido con presión de puente o lento esperando errores en altura.',
    rotationComplexity: 'Alta: rotaciones por puente y terreno requieren timing preciso.',
  },
  callouts: {
    siteA: ['Plaza', 'Escalera', 'Agua'],
    siteB: ['Puente', 'Rampa', 'Cielo'],
    middle: ['Puente', 'Generador', 'Calle'],
  },
  fundamentals: {
    t: ['Controlar el puente temprano', 'Forzar rotaciones con altura', 'No exponerse sin util'],
    ct: ['Mantener cielo y plaza', 'Cortar puente con smokes', 'Rotar rápido desde agua'],
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
