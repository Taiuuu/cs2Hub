import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const dust2Protocols: StratDetail[] = [
  createStrat({
    id: 'dust2-protocol-long-bait',
    name: 'Long / Xbox Bait Protocol',
    category: 'Protocol',
    type: 'protocol',
    team: 'T',
    description:
      'Simula un compromiso a A para arrastrar util del CT y luego cambia rápido a B con short controlado.',
    objectivePrincipal:
      'Forzar al CT a gastar smokes o flashes en A y aprovechar la ventana que queda para un split B.',
    concept:
      'Ejecución de doble feint: dar apariencia de A desde Long y Xbox mientras la rotación se desplaza hacia B.',
    risks: ['CT espera la finta y mantiene B fuerte', 'perder el tiempo de cambio', 'pérdida de rotación por no confirmar A'],
    failReaction:
      'Si la defensa no responde a A, quedarse en B con humo de puerta y preparar el trade por short.',
    adaptationsPossible:
      'Invertir el protocolo y atacar A short si el CT muestra debilidad en Xbox.',
    midRoundOptions: ['Reformar en short B', 'Regresar a default y volver a intentar en A'],
    winCondition: 'B con control de short y puerta abiertos, bomb plantado con cruz limpia.',
    failureStates: ['CT planta agarrado en A', 'B queda demasiado cerrado', 'ninguna información clara de rotación'],
    commonMistakes: ['gastar demasiada util al fingir A', 'no comunicar cambio de site', 'quedarse en medio sin impacto'],
    recoveryPlan:
      'Replantear la ronda hacia el default y usar un solo caminao de Vorteil con dos flashes en short.',
    economyLogic:
      'Proteger rifles y usar solo util de feint necesario; ahorrar para la finalización de B.',
    minimumUtility: ['Smoke puerta', 'Flash short', 'Molotov bajo'],
    priorityWeapons: ['Rifle de soporte en short', 'AWP en medio para controlar la rotación'],
    spacingRules: 'No exponerse todos juntos al cambio; el grupo de B debe llegar en línea cerrada.',
    utilityLayering: 'Smoke de medio, flash de short y molotov de puerta para sellar el cambio.',
    timingWindows: 'Iniciar el falso A al 18s; changeover a B al 22s; ejecutar antes del 27s.',
    reactionTree:
      'A responde agresivo → acelerar B; A pasivo → mantener presión en medio y salir por short.',
    rotationPunish:
      'Si CT rota lento, ejecutar con 3 jugadores por short y uno por puerta para castigar la tardanza.',
    lurkTiming: 'El lurker toma short retrasado para llegar cuando el CT ya esté comprometido en A.',
    infoProtocols:
      'Comunicar humo de Long, presencia en Xbox y si A queda vacío antes del cambio a B.',
    setup: '3 A / 2 B con intención de falso movimiento.',
    playerDistribution:
      '2 en A, 3 en B; el jugador de medio actúa como swing para cubrir la rotación.',
    importantSpaces: ['Long', 'Xbox', 'Short', 'Puerta B', 'Túnel'],
    pointOfContact:
      'Baranda o Puerta primero si hay presión; luego short para el segundo choque.',
    postplant:
      'Plantar en Puerta/B o Car y usar el humo de puerta para negar cut y medio.',
    roles: {
      entry: fillRole(
        {
          position: 'Baranda',
          objective: 'Simular presión en A y forzar util del CT.',
          utility: 'Flash baranda y smoke de puerta si es necesario.',
          timing: 'Entrar con un toque ligero al 18s y retroceder si no encuentra hostiles.',
          postplant: 'Apoyar a la cruz desde Puerta si la ronda cambia a B.',
        },
        sharedRoles.entry,
      ),
      lurker: fillRole(
        {
          position: 'Xbox',
          objective: 'Hacer sentir al CT que A es la opción y mantener reducida la presencia en B.',
          utility: 'Flash de medio e información constante.',
          timing: 'Generar ruido a 20s y luego volver a short.',
          postplant: 'Servir de corte por medio si el CT intenta retomar B.',
        },
        sharedRoles.lurker,
      ),
      support: fillRole(
        {
          position: 'Túnel',
          objective: 'Apoyar el cambio a B con util y trade seguro.',
          utility: 'Smoke puerta y flash short.',
          timing: 'Moverse a B al 22s para estar listo con el entry.',
          postplant: 'Formar la cruz en Puerta y ayudar a mantener la línea de fuego.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
