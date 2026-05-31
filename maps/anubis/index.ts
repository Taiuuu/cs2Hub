import type { MapPlaybook } from '../core/types';

export const anubisMap: MapPlaybook = {
  id: 'anubis',
  name: 'Anubis',
  image: '/maps/anubis-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'T-sided',
  description: 'Anubis es un mapa de entrada y timings precisos. El control temprano de medio y del canal define qué sitio se puede ejecutar con utility limpia.',
  philosophy: {
    philosophy: 'Anubis exige presión constante en medio y canal. La T busca crear desajustes con splits ajustados y el CT debe responder con smokes que cierren rutas de acceso.',
    tWinCondition: 'Conseguir info y ventaja en medio para ejecutar rápido en A o B.',
    ctWinCondition: 'Negar medio, canal y templo; rotar rápido para frenar cualquier split.',
    keyAreas: ['Main', 'Canal', 'Temple', 'Heaven'],
    tempo: 'Flex: tanto rápido para aprovechar info como lento para esperar errores.',
    rotationComplexity: 'Elevada: rotaciones entre canal, main y templo deben ser fluidas.',
  },
  callouts: {
    siteA: ['Main', 'Temple', 'Heaven'],
    siteB: ['Puente', 'Cueva', 'Canal'],
    middle: ['Mid', 'Canal', 'Agua'],
  },
  fundamentals: {
    t: ['Presionar medio primero', 'Forzar humo de canal', 'No ejecutar sin util limpia'],
    ct: ['Jugar ventanas de rotación', 'Hacer daño desde main sin perder control', 'Mantener temple cerrado'],
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
