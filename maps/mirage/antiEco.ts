import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const mirageAntiEco: StratDetail[] = [
  createStrat({
    id: 'mirage-antico-ct-van',
    name: 'Anti-Eco B Van/Bench',
    category: 'Anti Eco',
    type: 'antiEco',
    team: 'CT',
    description:
      'Controlar B con dos jugadores en Van/Bench y uno en Short para neutralizar eco/force buy.',
    objectivePrincipal:
      'No ceder el sitio B y castigar cualquier entrada con trade disciplinado.',
    concept: 'Cerrar el sitio con líneas cortas y un tercer jugador listo para apoyar desde Short.',
    risks: ['Horarios de flash mal sincronizados', 'entrada muy rápida sin cubrir Market'],
    failReaction:
      'Si el T rompe Van, esconderse en Bench y forzar el retake con smoke de Market.',
    adaptationsPossible: 'Rotar un jugador a CT si el eco define un split A/B.',
    midRoundOptions: ['Mantener B', 'jugar un retake lento'],
    winCondition: 'El eco no planta en B y muere en el intento.',
    failureStates: ['T planta en B', 'CT sin trade en Van'],
    commonMistakes: ['expulsar el flash antes de tiempo', 'subir a Short sin trade'],
    recoveryPlan:
      'Reagruparse en Bench y usar el retake con smoke de Market y flash de Van.',
    economyLogic: 'No usar muchas granadas; confiar en los rifles para tradear.',
    minimumUtility: ['Flash Van', 'Smoke Market'],
    priorityWeapons: ['Rifle en Van', 'SMG en Bench'],
    spacingRules: 'Presionar en corto y proteger el ángulo de Market.',
    utilityLayering: 'Flash Van → Smoke Market.',
    timingWindows: 'Responder al eco entre 8-18s con presión inmediata.',
    reactionTree: 'Van contestado → Bench; Market abierto → Short; no contacto → mantener sitio.',
    rotationPunish:
      'Si el T usa split con Apps, usar el jugador de Short para cortar la entrada.',
    lurkTiming: 'El lurker espera a confirmar la dirección del eco antes de actuar.',
    infoProtocols: 'Informar cuerpos en Van, presencia en Market y Short libre.',
    setup: '2 Van/Bench / 1 Short / 2 Mid.',
    playerDistribution: 'Dos Van/Bench, uno Short, dos Mid.',
    importantSpaces: ['Van', 'Bench', 'Short', 'Market'],
    pointOfContact: 'Van y Market.',
    postplant: 'Retener la planta desde Van con Bench cubriendo al mismo tiempo.',
    roles: {
      anchor: fillRole(
        {
          position: 'Van',
          objective: 'Absorber el primer choque y guiar el trade.',
          utility: 'Flash Van y posible smoke Market.',
          timing: 'Resistir al primer empuje y no avanzar sin trade.',
          postplant: 'Cubrir Market y evitar el bomb plant fácil.',
        },
        sharedRoles.anchor,
      ),
      support: fillRole(
        {
          position: 'Bench',
          objective: 'Proveer trade y cubrir Short.',
          utility: 'Smoke Market y flash de salida.',
          timing: 'Seguir al primer trade y no adelantar demasiado.',
          postplant: 'Cubrir la rotación y mantener la línea de Market.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
