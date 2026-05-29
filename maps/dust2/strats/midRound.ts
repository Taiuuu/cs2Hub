import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const dust2MidRoundStrats: StratDetail[] = [
  createStrat({
    id: 'dust2-midround-a-slow',
    name: 'Mid Round A Slow Transition',
    category: 'Mid Round',
    type: 'midRound',
    team: 'T',
    description:
      'Avanzar lentamente hacia A tras perder control de medio y usar util para aislar sitio.',
    objectivePrincipal: 'Encontrar el punto débil del CT sin gastar más util de lo necesario.',
    concept:
      'Esperar la rotación del CT y luego ejecutar una entrada más estructurada a A.',
    risks: ['CT mantiene fondo A con fuerza', 'rayos de utility desperdiciados', ' perder el timing'],
    failReaction:
      'Si A está cubierto, frenar en Puerta y jugar un postplant de fondo con el bomb.',
    adaptationsPossible:
      'Convertir la acción a un split B si el CT deja short muy abierto.',
    midRoundOptions: ['Continuar hacia A', 'Pivotar a B', 'Jugar un sitio pequeño en Puerta'],
    winCondition: 'A abierto con la bomba plantada en Puerta o Caja con al menos dos atletas listos.',
    failureStates: ['No se puede entrar a A', 'bomb plant imposible', 'pierde demasiado tiempo'],
    commonMistakes: ['adelantarse sin soporte', 'no coordinar la utility', 'decidir tarde'],
    recoveryPlan: 'Si se cierra A, rotar uno a Short y despedir la ronda con un intento de split.',
    economyLogic: 'Usar util de manera efectiva para conservar la segunda fase de la ronda.',
    minimumUtility: ['Smoke Puerta', 'Flash de entry', 'Molotov en fondo'],
    priorityWeapons: ['Rifle en Baranda', 'AWP en Xbox', 'SMG en Puerta'],
    spacingRules: 'Mantener las líneas de trade y no agruparse al llegar a la Puerta.',
    utilityLayering: 'Smoke Puerta → Flash Baranda → Molotov Fondo.',
    timingWindows: 'Alrededor de 18-24s, antes de que el CT pueda reposicionarse completamente.',
    reactionTree:
      'A disponible → entrar; A cerrado → pivotar a B; no contacto → usar la bomba como señuelo.',
    rotationPunish:
      'Si el CT rota desde B, ejecutar la presión restante en A con el humo de Puerta.',
    lurkTiming: 'El lurker de Xbox entra tarde para aprovechar los espacios dejados por rotación.',
    infoProtocols:
      'Avisar estados de Puerta, Long y fondo A continuamente.',
    setup: '3 A / 2 Medio / 1 Short controlado.',
    playerDistribution: 'Dos Baranda, uno Xbox, dos en fondo, uno en Short.',
    importantSpaces: ['Puerta', 'Caja', 'Baranda', 'Fondo A', 'Short'],
    pointOfContact: 'Puerta y Baranda.',
    postplant:
      'Usar cruces desde Baranda y Corta mientras el bomb está en Puerta o Caja.',
    roles: {
      entry: fillRole(
        {
          position: 'Baranda',
          objective: 'Someter al primer defensor de A y abrir la Puerta.',
          utility: 'Flash de Baranda y smoke de Puerta.',
          timing: 'Iniciar el contacto al 20-22s.',
          postplant: 'Cubrir la Puerta y coordinar con el segundo entry.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Xbox',
          objective: 'Sostener la presión desde el medio y apoyar la cross de Puerta.',
          utility: 'Flash de Xbox y molotov de fondo.',
          timing: 'Moverse al sitio tras la primera apertura de Baranda.',
          postplant: 'Mantener la vista hacia Mid y Puerta.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
