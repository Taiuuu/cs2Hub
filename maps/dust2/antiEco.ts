import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const dust2AntiEco: StratDetail[] = [
  createStrat({
    id: 'dust2-antico-ct-b-tight',
    name: 'Anti-Eco B Tight Defense',
    category: 'Anti Eco',
    type: 'antiEco',
    team: 'CT',
    description:
      'Cerrar B con dos ángulos cortos y mantener el trade en Upper mientras se protege Platform.',
    objectivePrincipal:
      'Negar el eco de túnel al no ofrecer ángulos expuestos y castigar entradas en grupos.',
    concept:
      'Utilizar la fuerza de la distancia corta y la información de Platform para mantener el control.',
    risks: ['Entradas coordinadas por Upper', 'flashes mal sincronizados', 'perder Upper temprano'],
    failReaction:
      'Si el T gana Upper, retirar a Door y jugar el retake con humo desde Door.',
    adaptationsPossible:
      'Rotar un jugador a Mid para ayudar si el eco se divide y empuja Short.',
    midRoundOptions: ['Mantener la línea Upper', 'Retroceder a Door con un smoke'],
    winCondition: 'El eco no planta en B y la CT gana la ronda por trade disciplinado.',
    failureStates: ['T entra con fuerza y planta', 'CT pierde Upper sin trade'],
    commonMistakes: ['correr sin trade', 'usar flash demasiado temprano', 'perder Platform'],
    recoveryPlan: 'Recomponer la línea en Door y esperar a que el eco rompa el sitio.',
    economyLogic:
      'No gastar util de más; usar solo lo necesario para mantener la línea y guardar un smoke para la postplant.',
    minimumUtility: ['Flash Upper', 'Smoke Door', 'HE Platform'],
    priorityWeapons: ['Rifle en Upper', 'SMG en Door'],
    spacingRules: 'No agruparse en Upper; trade cercano con líneas cruzadas.',
    utilityLayering: 'Flash de peeking, smoke de Door y HE de Platform.',
    timingWindows: 'Contener el eco desde el primer momento y no permitir recoil en el sitio.',
    reactionTree: 'Upper bajo presión → Door; Platform libre → rotar; sin contacto → consolidar el sitio.',
    rotationPunish:
      'Si el eco abandona Upper, usar el rotador para cortar la segunda línea de entrada.',
    lurkTiming: 'El lurker de B espera a ver si el eco se abre por Upper o Platform.',
    infoProtocols: 'Informar presencia en Platform, cuerpo en Door y humo usado.',
    setup: '2 Upper / 2 Door / 1 Mid swing.',
    playerDistribution: 'Dos Upper, dos Door, uno Mid de swing.',
    importantSpaces: ['Upper', 'Door', 'Platform', 'Tunnels'],
    pointOfContact: 'Upper. Door solo si la línea superior es comprometida.',
    postplant: 'Plantar con soporte de Upper y cortar retakes desde Upper y Door.',
    roles: {
      anchor: fillRole(
        {
          position: 'Upper',
          objective: 'Ser la primera línea de defensa y obligar al eco a exponerse.',
          utility: 'Flash corto y posible molotov de Upper.',
          timing: 'Mantener la posición y no rendir el ángulo hasta que haya trade.',
          postplant: 'Establecer la cruz y negar el rotador de Platform.',
        },
        sharedRoles.anchor,
      ),
      support: fillRole(
        {
          position: 'Door',
          objective: 'Proteger el sitio y ayudar con trade cercano.',
          utility: 'Smoke Door y flash de seguimiento.',
          timing: 'Avanzar solo tras confirmar que Upper sigue bajo control.',
          postplant: 'Bloquear la entrada de Platform y Door.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
