import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const dust2Retakes: StratDetail[] = [
  createStrat({
    id: 'dust2-retake-b',
    name: 'Retake B Upper / Door',
    category: 'Retake',
    type: 'retake',
    team: 'CT',
    description:
      'Despejar B desde Upper y Door con util de retake para limitar los ángulos de trade.',
    objectivePrincipal:
      'Forzar al atacante a jugar en una situación de crossfire y obligarlo a reubicarse lento.',
    concept:
      'Control de tiempo y util: retomar Upper primero, luego usar smoke para entrar desde Door.',
    risks: ['Perder la smoke de Door', 'sobrerotar desde medio temprano', 'ceder Upper por exceso de presión'],
    failReaction:
      'Si el T toma Door, quedarse cortos y limpiar por Platform desde Upper en lugar de forzar el paso.',
    adaptationsPossible:
      'Usar una rotación de Split Upper+Tunnel cuando no se pueda tomar Door con confort.',
    midRoundOptions: ['Dividir el retake por Platform y Upper', 'Esperar al swing de Mid si hay duda'],
    winCondition: 'Clear completo de Upper y Door con el sitio neutralizado y un trade limpio.',
    failureStates: ['No hay smoke de Door', 'T mantiene Platform', 'CT muere en Upper sin trade'],
    commonMistakes: ['Entrar sin limpiar Toxic', 'no disparar a los cuerpos', 'gastar util en ángulos incorrectos'],
    recoveryPlan:
      'Si el sitio está cerrado, regresar a safe angles y forzar un retake desde Outside.',
    economyLogic: 'Conservar una HE para Platform y dejar un smoke extra para la postplant.',
    minimumUtility: ['Smoke Door', 'Flash Upper', 'HE Platform'],
    priorityWeapons: ['Rifle en Door', 'SMG en Upper', 'AWP en Platform'],
    spacingRules: 'Entrar en líneas cortas con trade cercano y no avanzar en masa.',
    utilityLayering: 'Upper flash → Door smoke → Platform HE.',
    timingWindows: 'Iniciar el retake en 25-28s con una ventana de 5 segundos para trade.',
    reactionTree:
      'Upper salvo → entrar Door; Upper comprometido → resetear a Platform; No hay trade → esperar rotación.',
    rotationPunish:
      'Si el T rota from Mid, usar el jugador de Platform para cortar el apoyo extra.',
    lurkTiming: 'El lurker de B latea hasta que se sabe que el T plantó o no hay cuerpo en Door.',
    infoProtocols:
      'Comunicar Händen en Upper, cuerpo en Door y línea abierta de Platform.',
    setup: '3 en B / 2 medio para apoyo de rotación.',
    playerDistribution:
      'Uno en Door, uno en Upper, uno en Platform, uno en Mid y uno en Xbox de swing.',
    importantSpaces: ['Upper', 'Door', 'Platform', 'Tunnels', 'Xbox'],
    pointOfContact: 'Upper primero; Door solo tras smoke y espacio de trade.',
    postplant:
      'Cubrir el bomb desde Platform y Upper si el T planta en Backsite.',
    roles: {
      entry: fillRole(
        {
          position: 'Door',
          objective: 'Tomar el control interno y fijar la rotación contraria.',
          utility: 'Smoke Door y flash de follow.',
          timing: 'Saltar la smoke con el segundo paso de Door.',
          postplant: 'Mantener la línea de trade hacia Platform y Backsite.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Upper',
          objective: 'Proveer el primer trade y cerrar Platform desde arriba.',
          utility: 'Flash Upper y HE Platform.',
          timing: 'Moverse con el entry y ajustar si el T rota hacia Platform.',
          postplant: 'Cubrir el bomb y castigar cualquier backstab desde Window.',
        },
        sharedRoles.support,
      ),
      rotator: fillRole(
        {
          position: 'Xbox',
          objective: 'Estar listo para entrar por Mid si se recibe información de rotación.',
          utility: 'Smoke Xbox o flash si se necesita un ángulo adicional.',
          timing: 'No rotar hasta confirmar el primer clear de B.',
          postplant: 'Cortar cualquier apoyo desde Medio hacia B.',
        },
        sharedRoles.rotator,
      ),
    },
  }),
  createStrat({
    id: 'dust2-retake-a',
    name: 'Retake A Long / Pit',
    category: 'Retake',
    type: 'retake',
    team: 'CT',
    description:
      'Tomar backsite de A mediante un control de Long y apoyar con HE de Pit para obligar al T a reubicarse.',
    objectivePrincipal:
      'Neutralizar la cruz en A sin perder las líneas de escape del CT.',
    concept:
      'Asegurar Long y Pit, luego usar utility para barrer el sitio desde tres ángulos.',
    risks: ['Perder Long temprano', 'no tener un trade cuando el T planta', 'gastar util sin impacto'],
    failReaction:
      'Si el T entra con el sitio plantado, resetear la aproximación a través de Xbox y Puerta.',
    adaptationsPossible:
      'Cambiar el clear principal a Short si el T cierra Long con mythics.',
    midRoundOptions: ['Forzar la pelea por Short', 'esperar al retador de Xbox'],
    winCondition: 'T no puede jugar la planta sin ser castigado desde Long, Pit y Puerta.',
    failureStates: ['T planta Volcano', 'CT pierde Long sin trade', 'No hay util para cubrir Pit'],
    commonMistakes: ['Tratar de clavar el sitio sin smoke', 'moverse demasiado rápido por Long', 'no usar HE en Pit'],
    recoveryPlan: 'Retroceder a ángulos seguros y reentry con humo de Short si la primera línea falla.',
    economyLogic: 'Salvar al menos un flash y un smoke para el postplant.',
    minimumUtility: ['Smoke Short', 'HE Pit', 'Flash Long'],
    priorityWeapons: ['Rifle en Long', 'SMG en Pit', 'AWP en Xbox'],
    spacingRules: 'No bunch en Long; el trade debe ser cercano y sincronizado.',
    utilityLayering: 'Long flash → Pit HE → Short smoke.',
    timingWindows: 'Iniciar el retake en 20s si la información confirma el plant.',
    reactionTree:
      'Long perdido → reorientar a Short; Pit limpio → tomar Puerta; No hay trade → esperar recaída.',
    rotationPunish:
      'Si el T se gira por Short, usar la presión de Long para castigarlo al salir.',
    lurkTiming: 'El lurker de A latea en Pit y sale tras la primera confirmación de rotación.',
    infoProtocols:
      'Indicar cuerpos, humo de Short y la presencia del T en Goose o Puerta.',
    setup: '2 Long / 1 Pit / 2 Mid swing.',
    playerDistribution:
      'Uno en Pit, uno en Long, uno en Short, uno en Xbox y uno en Mid.',
    importantSpaces: ['Long', 'Pit', 'Short', 'Goose', 'PLanta A'],
    pointOfContact: 'Long primero; Pit solo cuando el smoke bloquee la línea directa.',
    postplant: 'Cubrir la planta desde Long y Pit con incendios cruzados.',
    roles: {
      anchor: fillRole(
        {
          position: 'Pit',
          objective: 'Evitar que el T se repose en el sitio y castigar las aperturas de Puerta.',
          utility: 'HE Pit y flash de salida si es necesario.',
          timing: 'No salir hasta que Long y Short estén en posición.',
          postplant: 'Moverse a Goose o Puerta según la planta.',
        },
        sharedRoles.anchor,
      ),
      support: fillRole(
        {
          position: 'Long',
          objective: 'Asegurar el trade y pescar al T que intenta cortar la rotación.',
          utility: 'Flash Long y posible smoke Short.',
          timing: 'Iniciar la presión con el primer flash para descubrir la posición enemiga.',
          postplant: 'Usar la vista de Long para cortar puentes de rotación.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
