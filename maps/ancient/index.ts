import type { MapPlaybook } from '../core/types';

export const ancientMap: MapPlaybook = {
  id: 'ancient',
  name: 'Ancient',
  image: '/maps/ancient-card.svg',
  calloutImage: '/maps/callout-bg.svg',
  sideFavor: 'CT-sided',
  description: 'Ancient es un mapa de tempo y control de espacios oscuros. El equipo que manda en medio y en el agua impone la agenda de la ronda.',
  philosophy: {
    philosophy: 'Ancient depende del control temprano de medio y agua. La T debe crear ventajas con presión cercada y el CT debe reaccionar rápido a las rotaciones. Las rotaciones por cueva y main son clave.',
    tWinCondition: 'Ganar medio y forzar rotaciones rápidas para atacar A o B con utilidad limpia.',
    ctWinCondition: 'Contener el medio, mantener agua y frenar el split enemigo antes de que se cierre.',
    keyAreas: ['Agua', 'Cueva', 'Main', 'Dona'],
    tempo: 'Controlado: buscar información y castigar errores del rival.',
    rotationComplexity: 'Media-altas: rotaciones rápidas por cueva y main, con atención a la presión de agua.',
  },
  callouts: {
    siteA: ['Temple', 'Main', 'Dona'],
    siteB: ['Jaguar', 'Cueva', 'Water'],
    middle: ['Canal', 'Ruinas', 'Entrada'],
  },
  fundamentals: {
    t: ['Jugar con utility en agua', 'No forzar sin info', 'Controlar rotaciones desde main'],
    ct: ['Mantener medio y agua', 'Rotar por cueva rápido', 'Negar entradas con smokes bien colocados'],
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
