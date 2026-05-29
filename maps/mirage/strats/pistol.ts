import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const miragePistolStrats: StratDetail[] = [
  createStrat({
    id: 'mirage-pistol-t-split-a',
    name: 'Pistol Split A',
    category: 'Pistol',
    type: 'pistol',
    team: 'T',
    description:
      'Entrada rápida por Short y Palace para forzar la defensa de A a dividirse.',
    objectivePrincipal: 'Plantar la bomba en A antes de que el CT pueda rotar con fuerza.',
    concept: 'Crear presión desde dos ángulos distintos para saturar al CT.',
    risks: ['Short contestado', 'Palace sin trade', 'CT rota rápido desde B'],
    failReaction:
      'Si Short se cierra, pivotar a Jungle y tratar de plant en la Puerta de A.',
    adaptationsPossible: 'Dirigir más jugadores a Palace si Short está muy defendido.',
    midRoundOptions: ['Finalizar la entrada A', 'retroceder y jugar un plant seguro'],
    winCondition: 'Bomb plantado con lado de A asegurado y dos cruces disponibles.',
    failureStates: ['Short perdido y Palace rodeado'],
    commonMistakes: ['correr sin trade', 'no cubrir rotación de CT'],
    recoveryPlan: 'Tomar Goose o CT y jugar un postplant estrecho.',
    economyLogic: 'Gastar solo flashes y confiar en la movilidad de las pistolas.',
    minimumUtility: ['Flash Short', 'Smoke Window'],
    priorityWeapons: ['Rifle en Short si está disponible', 'Pistolas fuertes en Palace'],
    spacingRules: 'Avanzar en parejas pequeñas con trade cercano.',
    utilityLayering: 'Flash Short → Smoke Window.',
    timingWindows: 'Empujar a 18-20s para pillar al CT sin util.',
    reactionTree: 'Short libre → entrar; Short contestado → Palace; no contacto → apoyarse en A.',
    rotationPunish: 'Si el CT rota desde B, usar la presión de Palace para castigar.',
    lurkTiming: 'El lurker de Jungle espera el primer aviso antes de incorporarse.',
    infoProtocols: 'Reportar contacto en Short, Palace y medio.',
    setup: '3 A / 2 B con Short fuerte.',
    playerDistribution: 'Dos Short, uno Palace, dos B resistentes.',
    importantSpaces: ['Short', 'Palace', 'Window', 'Jungle', 'CT'],
    pointOfContact: 'Short primero, Palace segundo.',
    postplant: 'Cubrir Puerta y Jungle con las pistolas de Palace.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Tomar la línea de Short y fijar el trade.',
          utility: 'Flash Short y posible smoke Window.',
          timing: 'Empujar con el grupo principal.',
          postplant: 'Mantener la puerta y cortar el rotador de Jungle.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Palace',
          objective: 'Presionar el segundo ángulo y ayudar al plant.',
          utility: 'Flash Palace y smoke de Window.',
          timing: 'Salir tras el contacto de Short.',
          postplant: 'Mantener Jungle y Puerta.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
