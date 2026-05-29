import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const mirageReaggressions: StratDetail[] = [
  createStrat({
    id: 'mirage-reaggression-short',
    name: 'Reaggression Short Control',
    category: 'Reaggression',
    type: 'reaggression',
    team: 'CT',
    description:
      'Presionar Short con util rápida para recuperar espacio tras haber perdido medio.',
    objectivePrincipal:
      'Forzar al T a ceder Short y ganar tiempo para que los anchors reciban refuerzos.',
    concept:
      'Entrar con flash corto y un trade cercano, usando el control de Window como apoyo.',
    risks: ['T dispara con util en la re-agresión', 'saltos sin trade', 'ser expuesto desde CT'],
    failReaction:
      'Si el T gana la pelea de Short, replegar a Bench y jugar un retake B lenta.',
    adaptationsPossible:
      'Convertir a una defensa estática de B si Short se ve imposible.',
    midRoundOptions: ['Mantener Short', 'rotar a CT para apoyo'],
    winCondition: 'Recuperar Short sin perder más de un jugador y frenar el ritmo T.',
    failureStates: ['Short perdido y B comprometido', 'CT sin lineas de trade'],
    commonMistakes: ['entrar tarde', 'no usar flash de continuidad', 'flanquearse desde Apps'],
    recoveryPlan:
      'Establecer crossfires en Van y Bench y jugar la postplant con smoke de Market.',
    economyLogic: 'Usar util mínima y conservar el rifle principal para el trade.',
    minimumUtility: ['Flash Short', 'Smoke Market'],
    priorityWeapons: ['Rifle en Short', 'Rifle en Window'],
    spacingRules: 'Presionar en columnas cortas con trade inmediato.',
    utilityLayering: 'Flash Short → Smoke Market.',
    timingWindows: 'Entrar rápidamente al ver la oportunidad en Short.',
    reactionTree: 'Short claro → empujar; Short contestado → retrasar; no contacto → contener.',
    rotationPunish: 'Si el T rota desde A, castigar con Window/CT.',
    lurkTiming: 'El lurker se mueve tras el primer contacto para cortar la salida de CT.',
    infoProtocols: 'Reportar presencia en Apps, Van y Market.',
    setup: '2 Short / 2 Window / 1 Bench.',
    playerDistribution: 'Dos Short, dos Window, uno Bench.',
    importantSpaces: ['Short', 'Window', 'Van', 'Market'],
    pointOfContact: 'Short con apoyo de Window.',
    postplant: 'Retener el sitio desde Van y Market.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Ganar el duelo inicial y obligar al T a moverse.',
          utility: 'Flash Short y smoke Market.',
          timing: 'Salir con el flash en el momento adecuado.',
          postplant: 'Mantener el ángulo de Short y cubrir la salida de Van.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Window',
          objective: 'Proveer el trade y cortar el retroceso del T hacia B.',
          utility: 'Smoke Market y flash de continuación si el T intenta retroceder.',
          timing: 'Avanzar cuando el entry ha fijado la línea.',
          postplant: 'Mantener la visión de Market y Van.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
