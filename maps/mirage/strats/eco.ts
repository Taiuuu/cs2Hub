import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const mirageEcoStrats: StratDetail[] = [
  createStrat({
    id: 'mirage-eco-t-short-dip',
    name: 'Eco Short Dip',
    category: 'Eco',
    type: 'eco',
    team: 'T',
    description:
      'Forzar presencia en Short con un jugador de rifle y dos pistolas para buscar un pick o robar arma.',
    objectivePrincipal: 'Conseguir un arma o un daño significativo sin arriesgar la ronda completa.',
    concept: 'Presionar un solo ángulo con soporte cercano y conservar vidas.',
    risks: ['Ser flanqueado por Window', 'no recibir trade', 'perder el rifle temprano'],
    failReaction:
      'Si Short se cierra, retirarse a Apps y buscar una entrada alterna a B.',
    adaptationsPossible: 'Rotar hacia B si la línea de Short no es factible.',
    midRoundOptions: ['Sostener Short', 'jugar algo más lento hacia Apps'],
    winCondition: 'Ganar el pick y salir con una ventaja de arma clara.',
    failureStates: ['Short perdido sin daño', 'ninguna arma robada'],
    commonMistakes: ['correr solos', 'no cubrir la rotación de Window'],
    recoveryPlan: 'Tomar información y jugar un sitio conservador con el arma restante.',
    economyLogic: 'Cuidar cada arma y usar util solo para escapes.',
    minimumUtility: ['Flash Short'],
    priorityWeapons: ['Rifle económico en Short', 'Pistolas en apoyo'],
    spacingRules: 'Avanzar en pareja con trade cercano.',
    utilityLayering: 'Flash Short simple.',
    timingWindows: 'Moverse alrededor de 20s para pillar la rotación antes de que el CT se acomode.',
    reactionTree: 'Short libre → entrar; Short contestado → rotar a Apps.',
    rotationPunish: 'Si el CT rota lento, presionar el hueco en Apps.',
    lurkTiming: 'El lurker permanece en CT hasta que Short se decide.',
    infoProtocols: 'Reportar contacto en Short y Window.',
    setup: '2 Short / 2 Apps / 1 CT.',
    playerDistribution: 'Dos Short, dos Apps, uno CT.',
    importantSpaces: ['Short', 'Window', 'Apps', 'CT'],
    pointOfContact: 'Short.',
    postplant: 'Mantener la planta pequeña y cubrir Jungle.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Obtener el primer pick y retener el espacio.',
          utility: 'Flash Short.',
          timing: 'Ser agresivo al ver la oportunidad.',
          postplant: 'Cubrir el paso de Window.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'CT',
          objective: 'Cubrir la rotación y apoyar el Short.',
          utility: 'Flash de retardo si el Short sufre presión.',
          timing: 'No avanzar sin que el entry confirme.',
          postplant: 'Mantener visión de Window y Jungle.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
