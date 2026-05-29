import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const mirageForceStrats: StratDetail[] = [
  createStrat({
    id: 'mirage-force-t-b-rush',
    name: 'Force B Rush',
    category: 'Force Buy',
    type: 'force',
    team: 'T',
    description:
      'Cargar B con util compacta para superar la defensa CT y plantar con crossfires zangueados.',
    objectivePrincipal: 'Aprovechar el tempo para vencer a la defensa inferior del CT.',
    concept: 'Presión rápida desde Apps y Van con trade cercano.',
    risks: ['No coordinar flasheos', 'respawn mal colocado', 'baja util de apoyo'],
    failReaction:
      'Si la defensa aguanta, plantar rápido y jugar el postplant desde Van y Bench.',
    adaptationsPossible: 'Si Upper es fuerte, pivotar el ataque a Short.',
    midRoundOptions: ['Plantar B rápido', 'rotar uno a Short si hay información clara'],
    winCondition: 'Bomb plantado con B controlado y ventaja de trade.',
    failureStates: ['T pierde la mayoría antes de entrar', 'B se cierra sin chance de plant'],
    commonMistakes: ['salir separados', 'no usar las flashes al mismo tiempo'],
    recoveryPlan: 'Si el rush falla, orgániar un postplant con puede manter o humo de Market.',
    economyLogic: 'Confiar en SMGs y solo usar util clave.',
    minimumUtility: ['Flash Apps', 'Smoke Market'],
    priorityWeapons: ['SMG en Apps', 'Rifle en Van'],
    spacingRules: 'Avanzar en línea cerrada con trade inmediato.',
    utilityLayering: 'Flash Apps → Smoke Market.',
    timingWindows: 'Entrar a 18-20s antes de que el CT tenga util de retardo completa.',
    reactionTree: 'B claro → empujar; B contestado → plantar y jugar postplant.',
    rotationPunish: 'Si CT rota de A, usar el área de Market para cortar su camino.',
    lurkTiming: 'El lurker de Bench entra tras el primer trade.',
    infoProtocols: 'Reportar presencia en Van, Market y Apps.',
    setup: '5 B con armas ligeras.',
    playerDistribution: 'Tres Apps, dos Van/Market.',
    importantSpaces: ['Apps', 'Van', 'Bench', 'Market'],
    pointOfContact: 'Apps y Van.',
    postplant: 'Mantener a la bomba desde Van y Bench.',
    roles: {
      entry: fillRole(
        {
          position: 'Apps',
          objective: 'Abrir la línea de Van y forzar el primer trade.',
          utility: 'Flash Apps y molotov de Market si es necesario.',
          timing: 'Entrar con el primer flash a 19s.',
          postplant: 'Cubrir la entrada de Van y Bench.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Van',
          objective: 'Cerrar el sitio y proveer trade desde el interior.',
          utility: 'Smoke Market y flash de apoyo.',
          timing: 'Seguir al entry con calma y no anticiparse.',
          postplant: 'Mantener Market y cortar la rotación.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
