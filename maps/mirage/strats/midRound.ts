import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const mirageMidRoundStrats: StratDetail[] = [
  createStrat({
    id: 'mirage-midround-b-split',
    name: 'Mid Round B Split',
    category: 'Mid Round',
    type: 'midRound',
    team: 'T',
    description:
      'Transformar un default en un split B rápido desde Apps y Short cuando el CT se compromete a A.',
    objectivePrincipal: 'Aprovechar la rotación del CT y caer por dos líneas a B.',
    concept: 'Si el CT gira hacia A, usar Short y Apps para abrir B con ventaja numérica.',
    risks: ['El CT no rota', 'quedar atrapados en Market', 'gastar util demasiado pronto'],
    failReaction:
      'Si el CT no rota, pivotar a un rush B más clásico con smoke de Market.',
    adaptationsPossible: 'Si el CT hace un stack B, convertirlo en un retake rápido de A.',
    midRoundOptions: ['Split B', 'reforzar A si la rotación no llega'],
    winCondition: 'B abierto con bomb plantado y control de Van/Bench.',
    failureStates: ['No hay espacio en B', 'el CT vuelve a A con ventaja'],
    commonMistakes: ['moverse sin coordinación', 'no apoyar la línea de Short'],
    recoveryPlan: 'Quedarse fuera de B y jugar un postplant con humo de Market.',
    economyLogic: 'Usar util clave para el split y ahorrar el resto para defender el plant.',
    minimumUtility: ['Smoke Market', 'Flash Apps', 'Flash Short'],
    priorityWeapons: ['Rifle en Short', 'Rifle en Apps'],
    spacingRules: 'Entrar en líneas cerradas con trade cercano.',
    utilityLayering: 'Smoke Market → Flash Apps → Flash Short.',
    timingWindows: 'Iniciar el split al ver el pase de A o la rotación lenta.',
    reactionTree: 'B claro → entrar; B contestado → revaluar; no contacto → cambiar a A.',
    rotationPunish:
      'Si el CT rota de A, usar la presión de B para castigarlo mientras está en movimiento.',
    lurkTiming: 'El lurker de Palace entra solo si el short abre limpio.',
    infoProtocols: 'Reportar contacto en A, B y el estado de la ventana de Market.',
    setup: '2 Short / 2 Apps / 1 Palace.',
    playerDistribution: 'Dos Short, dos Apps, uno Palace.',
    importantSpaces: ['Short', 'Apps', 'Market', 'Van'],
    pointOfContact: 'Short y Apps.',
    postplant:
      'Mantener el sitio con cruces desde Van y Bench, evitando el retroceso del CT.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Abrir la línea B y fijar el trade.',
          utility: 'Flash Short y smoke Market.',
          timing: 'Entrar cuando el CT ha rotado hacia A.',
          postplant: 'Cubrir Van y Market.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Apps',
          objective: 'Proveer el segundo ángulo y asegurar el plant.',
          utility: 'Flash Apps y smoke Market.',
          timing: 'Avanzar con el entry asegurando la línea.',
          postplant: 'Mantener la línea de Apps y Van.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
