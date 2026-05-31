import type { MapPlaybook } from '../core/types';

export const cacheMap: MapPlaybook = {
  id: 'cache',
  name: 'Cache',
  image: '/maps/cache-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'T-sided',
  description: 'Cache es un mapa de utilidad y control de puntos clave. El equipo que domina Main y el Pozo es el que define la dinámica de la ronda.',
  philosophy: {
    philosophy: 'Cache depende del control temprano de Main y del Pozo. La T presiona para conseguir información y generar trades; el CT debe mantener su control defensivo sin perder posiciones.',
    tWinCondition: 'Ganar Main, controlar el Pozo y ejecutar rápido en A o B con utilidad limpia.',
    ctWinCondition: 'Contener Main, mantener el Pozo y frenar la ejecución antes de la postplant.',
    keyAreas: ['Main', 'Pozo', 'A', 'B'],
    tempo: 'Variable: puede ser rápido si la T consigue ventaja en Main o lento esperando errores.',
    rotationComplexity: 'Media-alta: rotaciones rápidas entre A y B, con atención al control de Main.',
  },
  callouts: {
    siteA: ['Main', 'Pozo', 'Esquina A'],
    siteB: ['Patio', 'Conecta', 'Estrecho'],
    middle: ['Main', 'Pasillo', 'Lobby'],
  },
  fundamentals: {
    t: ['Presionar Main con utilidad', 'Forzar rotaciones rápidas', 'No ejecutar sin ventaja clara'],
    ct: ['Jugar posiciones de reacción', 'Mantener Main lo máximo posible', 'Rotar rápido tras primer contacto'],
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
