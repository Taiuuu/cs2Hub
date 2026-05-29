import type { StratDetail } from '../core/types';
import { createStrat, fillRole } from '../core/stratTemplates';
import { sharedRoles } from '../core/sharedRoles';

export const mirageDefaults: StratDetail[] = [
  createStrat({
    id: 'mirage-default-3-2-mid',
    name: 'Default 3-2 con Control de Mid',
    category: 'Default',
    type: 'default',
    team: 'T',
    description:
      'Tres jugadores en A, dos en B y uno en Window/Connector para leer la rotación del CT.',
    objectivePrincipal: 'Preservar util y vida hasta el momento de decidir un split o un rush.',
    concept: 'Crear dudas en el CT y aprovechar cualquier rotación lenta hacia el sitio opuesto.',
    risks: ['Mid perdido tempranamente', 'split pobremente ejecutado', 'gastar util sin información'],
    failReaction:
      'Si el CT gana mid, pivotar a B con un rush rápido por Apps o un split Short.',
    adaptationsPossible:
      'Convertir a una ejecución A larga desde Palace si el CT abandona el medio.',
    midRoundOptions: ['Empujar a A con Palace', 'Cortar a B si Short está libre'],
    winCondition: 'Mantener a más de tres vivos hasta la fase de elección y ejecutar uno de los sites con ventaja.',
    failureStates: ['Pierde medio y no hay rotación', 'la T se ve dividida y predecible'],
    commonMistakes: ['mandar muchos jugadores a A', 'no tomar información en mid', 'entrar a B sin apoyo'],
    recoveryPlan: 'Retirar el lurker y usar un push rápido por Short o Palace con util mínima.',
    economyLogic: 'Ahorrar la mayoría de la util para la ejecución final y usar sólo flashes de delay.',
    minimumUtility: ['Smoke Window', 'Flash Short', 'Molotov Palace'],
    priorityWeapons: ['Rifle en Short', 'AWP en Window', 'SMG en Apps si hay arma barata'],
    spacingRules: 'Mantener trade cercano entre Short y Palace.',
    utilityLayering: 'Smoke Window → Flash Short → Molotov Palace.',
    timingWindows: 'Mantener la calma hasta 18-20s y decidir site a esa altura.',
    reactionTree:
      'Mid libre → split A; Mid controlado → pivot B; demasiada presión → jugar sitio seguro.',
    rotationPunish:
      'Si el CT rota de B lento, explotar A con Palace y la ventana corta.',
    lurkTiming: 'El lurker de Window espera hasta el último momento para decidir si entra o va a B.',
    infoProtocols: 'Informar utility usada, presencia en Window y Short, y cuerpos vistos.',
    setup: '3 A / 2 B con mid fijo.',
    playerDistribution: 'Dos Palace, uno Short, dos Apps/Market.',
    importantSpaces: ['Window', 'Short', 'Palace', 'Jungle', 'Apps'],
    pointOfContact: 'Short o Palace según la lectura de mid.',
    postplant:
      'Plantar en Puerta A con el apoyo de Jungle y la cortina de Palace.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Abrir el camino hacia A y forzar a los CT a gastar util.',
          utility: 'Flash Short y posible smoke Window.',
          timing: 'Atacar a 20-22s si la rotación indica poca presencia en A.',
          postplant: 'Cubrir la Puerta y Jungle.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Palace',
          objective: 'Proteger el flank de Jungle y apoyar el push de Short.',
          utility: 'Molotov Palace y flash de salida.',
          timing: 'Acompañar al entry cuando Short gana control.',
          postplant: 'Cubrir la rotación de CT desde Jungle.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
