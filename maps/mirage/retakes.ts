import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const mirageRetakes: StratDetail[] = [
  createStrat({
    id: 'mirage-retake-a',
    name: 'Retake A Jungle / CT',
    category: 'Retake',
    type: 'retake',
    team: 'CT',
    description:
      'Limpiar A desde Jungle y CT con smokes en Puerta y Palace, preservando dos ángulos de trade.',
    objectivePrincipal:
      'Recuperar la posición sin perder demasiados recursos y cerrando el punto de plant.',
    concept:
      'Tomar Jungle primero, usar smoke en Puerta y luego entrar desde CT con un trade cercano.',
    risks: ['No hay trade desde Jungle', 'falla la smoke de Puerta', 'A plantado muy temprano'],
    failReaction:
      'Si el T controla Jungle, resetear el retake y forzar a A a través de CT/Palace.',
    adaptationsPossible:
      'Entrar por Palace en lugar de CT si la línea de Jungle es demasiado fuerte.',
    midRoundOptions: ['Forzar la pelea desde Jungle', 'esperar al swing por CT'],
    winCondition: 'A limpio y bomb plantado neutralizado con la bomba retakeada o el T muerto.',
    failureStates: ['T mantiene Jungle', 'no hay smoke de Puerta', 'trade rotas'],
    commonMistakes: ['entrar sin smoke', 'moverse sin trade', 'no cubrir el backstab de Palace'],
    recoveryPlan: 'Reagruparse detrás de CT/Palace y volver a intentar con más util si hay tiempo.',
    economyLogic: 'No gastar más de dos granadas clave y preservar un smoke para el plant.',
    minimumUtility: ['Smoke Puerta', 'Flash Jungle', 'Molotov Palace'],
    priorityWeapons: ['Rifle en Jungle', 'Rifle en CT'],
    spacingRules: 'Mantener líneas de apoyo cortas y cerrar siempre un ángulo.',
    utilityLayering: 'Smoke Puerta → Flash Jungle → Molotov Palace.',
    timingWindows: 'Iniciar el retake a 22-26s si el bomb ya está plantado.',
    reactionTree: 'Jungle claro → entrar; Jungle contestado → CT; no trade → resetear.',
    rotationPunish:
      'Si el T rota por B, mantener Jungle y usar CT para cortar la rotación.',
    lurkTiming: 'El lurker de Jungle sale con el primer flash y no antes.',
    infoProtocols: 'Reportar cuerpo en Puerta, Palace y CT.',
    setup: '2 Jungle / 2 CT / 1 Ramp.',
    playerDistribution: 'Dos Jungle, dos CT, uno Ramp.',
    importantSpaces: ['Jungle', 'CT', 'Puerta', 'Palace'],
    pointOfContact: 'Jungle primero, CT segundo.',
    postplant:
      'Cubrir la planta desde Jungle y CT, evitando esquinas cerradas de Palace.',
    roles: {
      entry: fillRole(
        {
          position: 'Jungle',
          objective: 'Abrir la entrada y fijar a los defensa.',
          utility: 'Flash Jungle y smoke Puerta.',
          timing: 'Entrar con el primer flash tras la smoke de Puerta.',
          postplant: 'Mantener la vista de Puerta y jungle.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'CT',
          objective: 'Proveer trade desde la otra línea de entrada.',
          utility: 'Flash CT y posible smoke Palace.',
          timing: 'Acompañar al entry sin adelantarse.',
          postplant: 'Cubrir Palace y el hueco de CT.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
