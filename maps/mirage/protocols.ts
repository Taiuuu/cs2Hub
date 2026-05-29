import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const mirageProtocols: StratDetail[] = [
  createStrat({
    id: 'mirage-protocol-b-fake',
    name: 'Apps Fake / A Quick',
    category: 'Protocol',
    type: 'protocol',
    team: 'T',
    description:
      'Hacer presión en B para atraer rotaciones y luego ejecutar una entrada rápida por Short hacia A.',
    objectivePrincipal:
      'Crear un hueco en A usando la rotación enemiga generada por el fake de B.',
    concept:
      'Imitar un rush B con util y luego cambiar a A antes de que el CT regrese.',
    risks: ['CT espera el fake', 'gastar util sin impacto', 'A queda demasiado cerrado al final'],
    failReaction:
      'Si el CT no rota, abandonar A y consolidar B con la util restante.',
    adaptationsPossible:
      'Convertirlo en un split A con Palace y Short si B está flojo.',
    midRoundOptions: ['Reafirmar B', 'cortar a CT si rota lento'],
    winCondition: 'A abierto con al menos dos ángulos limpios y la bomba plantada.',
    failureStates: ['B no recibe respuesta', 'A no se abre', 'no hay trade en A'],
    commonMistakes: ['gastar demasiada util en el fake', 'no comunicar el cambio', 'avanzar demasiado rápido'],
    recoveryPlan: 'Reagruparse en B y buscar el split con posicionamiento más lento.',
    economyLogic: 'No gastar más util de la necesaria en el fake; ahorrar al menos una smoke para A.',
    minimumUtility: ['Smoke Window', 'Flash Short', 'Smoke Market'],
    priorityWeapons: ['Rifle en Short', 'AWP en Window'],
    spacingRules: 'Mantener varias líneas para que el fake luzca creíble.',
    utilityLayering: 'Apps fake → Smoke Market → Flash Short.',
    timingWindows: 'Iniciar el fake a 18s y el cambio a A a 22s.',
    reactionTree:
      'CT rota → A rápido; CT no rota → volver a B; A cerrado → retrasar y jugar sitio.',
    rotationPunish:
      'Si el CT rota desde Jungle, castigar con un push directo desde Short.',
    lurkTiming: 'El lurker de Palace espera la confirmación del fake y entra por Jungle.',
    infoProtocols: 'Comunicar presencia en Apps, Market y el tiempo de cambio a A.',
    setup: '3 B / 2 A con fake de Apps.',
    playerDistribution: 'Dos Apps, uno Market, dos A/Short.',
    importantSpaces: ['Apps', 'Short', 'Window', 'Palace'],
    pointOfContact: 'Short y Window.',
    postplant: 'Cubrir Puerta A y Jungle con cruces desde Palace.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Limpiar el camino a A y forzar al CT a usar util.',
          utility: 'Flash Short y smoke Window.',
          timing: 'Entrar contenido tras el fake inicial.',
          postplant: 'Mantener la puerta y Jungle.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Window',
          objective: 'Proveer el trade y cortar a la rotación entrenante.',
          utility: 'Smoke Window y posible flash de continuación.',
          timing: 'Seguir al entry con velocidad controlada.',
          postplant: 'Cubrir el giro hacia Jungle o CT.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
