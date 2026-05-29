import type { MapPhilosophy } from '../core/types';

export const dust2Philosophy: MapPhilosophy = {
  philosophy:
    'Dust2 es un mapa de toma de decisiones rápidas y presión coordinada. Los T deben elegir un punto de ataque temprano y comprometer la rotación CT mientras los CT buscan mantener control sobre fondo y medio.',
  tWinCondition:
    'Buscar control de fondo A o presión constante en B para forzar rotaciones equivocadas y plantar con una cruz limpia.',
  ctWinCondition:
    'Negar el default enemigo con información en medio, proteger fondo/puerta y conservar util para el retake en el sitio más vulnerable.',
  keyAreas: ['Fondo A', 'Puerta B', 'Xbox', 'Oscuro Alto', 'Medio'],
  tempo: 'Rápido en pistol y force; controlado en full buy con espera de rotación enemiga.',
  rotationComplexity:
    'Media: los CT rotan desde medio y fondo; los T deben preservar un lurker y un rotator para cambiar de site.',
};
