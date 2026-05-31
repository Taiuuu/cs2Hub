import type { MapPlaybook } from '../core/types';

export const trainMap: MapPlaybook = {
  id: 'train',
  name: 'Train',
  image: '/maps/train-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'CT-sided',
  description: 'Train es un mapa de líneas y rotaciones rápidas. El control de Ivy y pop define las bombas L y el timing en Main.',
  philosophy: {
    philosophy: 'Train es un mapa de espacio y trades. El CT busca castigar entradas con ángulos cerrados, mientras que la T busca rotaciones limpias y control de trenes.',
    tWinCondition: 'Abrir líneas en Ivy o Main y forzar al CT a rotar fuera de posición.',
    ctWinCondition: 'Mantener velocidad de rotación alta y usar utility para cerrar las rutas principales.',
    keyAreas: ['Ivy', 'Pop', 'Main', 'Hell'],
    tempo: 'Rentable: buscar trades y no exponerse en trenes sin util.',
    rotationComplexity: 'Media-alta: las rotaciones deben ser rápidas entre A y B.',
  },
  callouts: {
    siteA: ['Ivy', 'Hell', 'Main'],
    siteB: ['Pop', 'Verde', 'Azul'],
    middle: ['Connector', 'Túnel', 'Escalera'],
  },
  fundamentals: {
    t: ['Tomar líneas con utilidad', 'Forzar trades en Main', 'No entrar a pop sin apoyo'],
    ct: ['Jugar con ángulos de tren', 'Formar líneas en Ivy y Hell', 'Rotar rápido tras primer contacto'],
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
