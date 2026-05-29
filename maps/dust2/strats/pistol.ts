import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const dust2PistolStrats: StratDetail[] = [
  createStrat({
    id: 'dust2-pistol-t-split-a',
    name: 'Pistol Split A',
    category: 'Pistol',
    type: 'pistol',
    team: 'T',
    description:
      'Dos jugadores presionan Long mientras el resto hace click en fondo para tomar A con trade cercano.',
    objectivePrincipal: 'Abrir el sitio A y plantar rápido antes de que el CT recoloque.',
    concept:
      'Dividir la atención CT entre Long y A fondo para encontrar un hueco sin perder fondo.',
    risks: ['CT corta el split con rotación rápida', 'perder fondo temprano', 'no encontrar trade en Long'],
    failReaction:
      'Si el CT defiende fuerte en Long, reagruparse a Short/CT para un plant secundario.',
    adaptationsPossible:
      'Convertir a una acción casi completa en fondo si Long está cerrado.',
    midRoundOptions: ['Presionar hacia A desde Fondo', 'Usar Short como ruta de apoyo'],
    winCondition: 'Control de A con al menos dos cruces disponibles tras el plant.',
    failureStates: ['Long perdido sin trade', 'A planta difícil de mantener'],
    commonMistakes: ['avanzar solos', 'no usar flashes en Long', 'dejar el bomb sin trade'],
    recoveryPlan: 'Limitar la pelea y jugar alrededor del sitio con el bomb plantado en Puerta o Fondo.',
    economyLogic: 'Gastar util mínima en flashes y confiar en pistolas en distancia corta.',
    minimumUtility: ['Flash Long', 'Smoke Puerta'],
    priorityWeapons: ['Pistolas fuertes en Long', 'Rifle económico si se roba arma'],
    spacingRules: 'Avanzar en pareja por Long y fondo para trade inmediato.',
    utilityLayering: 'Flash Long → Smoke Puerta.',
    timingWindows: 'Iniciar el split a 18-20s con la idea de plant a 25s.',
    reactionTree: 'Long libre → empujar; Long contestado → cambiar a fondo; no contacto → mantener bomb.',
    rotationPunish: 'Si el CT rota de B, explotar A con el espacio tomado en fondo.',
    lurkTiming: 'El lurker de fondo espera hasta 20s para confirmar rotación y luego sale.',
    infoProtocols:
      'Reportar contacto en Long, fondo A y si Puerta está clara.',
    setup: '2 Long / 3 Fondo A.',
    playerDistribution: 'Dos Long, tres fondo con trade cerrado.',
    importantSpaces: ['Long', 'Fondo A', 'Puerta', 'A Site'],
    pointOfContact: 'Long primero; si se limpia, el segundo paso toma Fondo.',
    postplant: 'Plantar en Puerta y usar el humo para negar Short y Long.',
    roles: {
      entry: fillRole(
        {
          position: 'Long',
          objective: 'Abrir el ángulo contra el defensor de Long.',
          utility: 'Flash Long y humo Peek.',
          timing: 'Entrar a 19s con el segundo jugador pegado.',
          postplant: 'Formar la cruz con el segundo jugador y cubrir Puerta.',
        },
        sharedRoles.entry,
      ),
      lurker: fillRole(
        {
          position: 'Fondo A',
          objective: 'Mantener la rotación corta y estar listo para reclamar el sitio.',
          utility: 'Flash corto y molotov de Puerta si hay contacto.',
          timing: 'Entrada retrasada hasta que haya sensación de presión en Long.',
          postplant: 'Cubrir la Puerta y cortar cualquier retake por Short.',
        },
        sharedRoles.lurker,
      ),
      support: fillRole(
        {
          position: 'Xbox',
          objective: 'Proveer trade y util para el split.',
          utility: 'Flash a Long y apoyo con humo de Puerta.',
          timing: 'Seguir al entry en el segundo paso.',
          postplant: 'Moverse a Puerta y mantener visión de Short.',
        },
        sharedRoles.support,
      ),
    },
  }),
  createStrat({
    id: 'dust2-pistol-ct-b-burst',
    name: 'Pistol Anti-Rush B',
    category: 'Pistol',
    type: 'pistol',
    team: 'CT',
    description:
      'Cierre B con un setup de dos en Upper y dos en Door, usando flashes para frenar el rush de túnel.',
    objectivePrincipal: 'Hacer que el rush B del rival explote a los CT en trade y no llegue al sitio.',
    concept:
      'Jugar retrasado y dejar que el T entre en una línea cruzada fuerte en Upper/Door.',
    risks: ['Entradas por Platform con buen trade', 'tocar mal el tiempo de los flashes'],
    failReaction:
      'Si el T entra fuerte, pivotar a retake inmediato y usar el segundo flash de Door.',
    adaptationsPossible:
      'Mover un jugador a Platform si se siente un split B.',
    midRoundOptions: ['Consolidar en Door', 'Rotar uno a Mid si el sitio se abre'],
    winCondition: 'Rechazar el rush sin que el T alcance la plataforma.',
    failureStates: ['T toma Platform', 'CT sin trade en Upper'],
    commonMistakes: ['asomarse demasiado temprano', 'gastar el flash antes de la amenaza'],
    recoveryPlan: 'Retroceder a Door y usar el retake con HE y smoke.',
    economyLogic: 'No desperdiciar util; mantener la línea y usar a los CT en trade corto.',
    minimumUtility: ['Flash Door', 'Smoke Platform'],
    priorityWeapons: ['Rifle en Upper', 'SMG en Door'],
    spacingRules: 'Mantener lineas cerradas y no exponerse como un grupo.',
    utilityLayering: 'Primer flash de entry, segundo flash de soporte, smoke si el rush sigue.',
    timingWindows: 'Esperar el tiro al 15s y frenar antes del 18s.',
    reactionTree: 'Rush intenso → usar flashes; rush lento → mantener la línea; split → rotar.',
    rotationPunish: 'Si el T divide, usar la visión de Platform para tomar el ángulo libre.',
    lurkTiming: 'El lurker se queda en Platform hasta confirmar que el rush entra a B.',
    infoProtocols: 'Reportar cuerpo en Upper, humo usado y Platform libre.',
    setup: '2 Upper / 2 Door / 1 Platform.',
    playerDistribution: 'Dos Upper, dos Door, uno Platform.',
    importantSpaces: ['Upper', 'Door', 'Platform', 'Lower B'],
    pointOfContact: 'Upper y Door a la vez.',
    postplant: 'Retomar el sitio por Door y Upper, usando smoke de Platform.',
    roles: {
      anchor: fillRole(
        {
          position: 'Upper',
          objective: 'Ser la última barrera si el rush entra.',
          utility: 'Flash Upper y slow peek.',
          timing: 'Resistir hasta que el segundo trade llegue.',
          postplant: 'Cubrir Platform y Door desde el ángulo alto.',
        },
        sharedRoles.anchor,
      ),
      support: fillRole(
        {
          position: 'Door',
          objective: 'Tradear al Upper y contener la entrada.',
          utility: 'Flash Door y smoke de Platform si hay split.',
          timing: 'Avanzar con y no antes del primer contacto.',
          postplant: 'Mantener el ángulo corto y cortar la reclea. ',
        },
        sharedRoles.support,
      ),
    },
  }),
];
