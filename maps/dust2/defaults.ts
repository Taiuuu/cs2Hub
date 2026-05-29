import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const dust2Defaults: StratDetail[] = [
  createStrat({
    id: 'dust2-default-3-2',
    name: 'Default 3-2 A/B con Medio',
    category: 'Default',
    type: 'default',
    team: 'T',
    description:
      '3 jugadores en A para controlar fondo y largo, 2 en B para negar presión temprana de túnel. El quinto jugador retiene mid para leer rotaciones.',
    objectivePrincipal: 'Conservar util y resto del equipo vivo hasta el momento de decidir site.',
    concept:
      'Un default equilibrado que cierra ventanas de rotación y permite decidir entre A o B en función de la información.',
    risks: ['CT presiona medio temprano', 'pierde fondo A sin trade', 'B recibe mucha presión de túnel'],
    failReaction:
      'Si el CT toma control medio, reagrupar hacia B con ejecución de smoke de puerta o tirar un rush A corto.',
    adaptationsPossible:
      'Mover un jugador de A a medio si el CT usa stack en fondo; convertirlo en un split rápido a B.',
    midRoundOptions: ['Transición a B a través de Oscuro', 'Split A desde Fondo + Baranda', 'Rush B con util reducida'],
    winCondition: 'No perder más de un jugador antes de 25s y luego ejecutar el site elegido con trade.',
    failureStates: ['A pierde fondo sin respuesta', 'B abre con doble costa', 'Ninguna información de medio al 20s'],
    commonMistakes: ['Entrar en un ángulo sin trade', 'usar util en silencio', 'perder fondo A tempranamente'],
    recoveryPlan: 'Retirar el lurker hacia B, retrasar el push principal y forzar al CT a jugar defensivo.',
    economyLogic: 'Mantener dos rifles en el default y solo gastar util en retardo; ahorrar para el impacto final.',
    minimumUtility: ['Smoke puerta', 'Flash entrada', 'Flash de medio'],
    priorityWeapons: ['Rifle', 'SMG contra eco', 'AWP en Xbox si hay arma disponible'],
    spacingRules: 'Mantener líneas de trade y no agruparse en fondo ni en tunel.',
    utilityLayering: 'Smoke de puerta antes de presionar B, flash para baranda y retraso en medio.',
    timingWindows: 'Leer rotaciones al 20s; decidir site entre 18-22s; ejecutar en 25-30s.',
    reactionTree: 'No presión → default; presión medio → reagrupar a B; presión A → cortar fondo y reevaluar.',
    rotationPunish: 'Si CT rota lento, explotar A con smoke de puerta adicional y un segundo push corto.',
    lurkTiming: 'Lurker espera hasta 18s para confirmar rotación antes de avanzar con soporte.',
    infoProtocols:
      'Avisar presencia en Puerta, Oscuro, Medio y Long en intervalos de 5 segundos.',
    setup: '3 A / 2 B con 1 punto medio fijo.',
    playerDistribution:
      'Dos en fondo, uno en baranda, uno en B y uno en Xbox como enlace central.',
    importantSpaces: ['Fondo A', 'Puerta B', 'Xbox', 'Túnel', 'Corta'],
    pointOfContact: 'Baranda y fondo para A; puerta para B dependiendo de la lectura.',
    postplant:
      'Plantar en Puerta o Fondo A con cruz de Long y Puerta; planta B con rotaciones cortas protegidas.',
    roles: {
      entry: fillRole(
        {
          position: 'Baranda',
          objective: 'Obtener información temprana sin comprometer fondo.',
          utility: 'Flash a baranda y humo de puerta en caso de transición a B.',
          timing: 'Contacta lentamente al 18-20s para confirmar defensores.',
          postplant: 'Mantener el ángulo de caja y apoyar la cruz hacia Puerta.',
        },
        sharedRoles.entry,
      ),
      lurker: fillRole(
        {
          position: 'Fondo A',
          objective: 'Asegurar la rotación y conservar arma para el late game.',
          utility: 'Molotov fondo y flash de soporte si el sitio se activa.',
          timing: 'No avanzar hasta tener confirmación de rotación enemiga.',
          postplant: 'Cubrir la entrada larga y cortar a cualquier rotador que intente visitar A.',
        },
        sharedRoles.lurker,
      ),
      support: fillRole(
        {
          position: 'Xbox',
          objective: 'Conectar el default y proporcionar util al mid.',
          utility: 'Flash de medio y smoke de puerta para B.',
          timing: 'Listo para empujar o retroceder según la llamada principal.',
          postplant:
            'Reubicar a Corta o Puerta para cerrar el postplant y dar trade al entry.',
        },
        sharedRoles.support,
      ),
      rotator: fillRole(
        {
          position: 'Short',
          objective: 'Controlar la opción de split y estar listo para ayudar en A o B.',
          utility: 'Smoke puerta y flash corto si hay push de medio.',
          timing: 'No rotar sin confirmación; priorizar site objetivo.',
          postplant: 'Cortar la rotación de CT desde Puerta o medio.',
        },
        sharedRoles.rotator,
      ),
    },
  }),
];
