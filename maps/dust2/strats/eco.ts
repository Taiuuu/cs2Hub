import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const dust2EcoStrats: StratDetail[] = [
  createStrat({
    id: 'dust2-eco-t-default',
    name: 'Eco Default A/B',
    category: 'Eco',
    type: 'eco',
    team: 'T',
    description:
      'Distribuirse en A y B con un jugador en Short y uno en Xbox para buscar un pick y robar un arma.',
    objectivePrincipal: 'No perder a todos y salir con un arma o un bomb plant barato.',
    concept: 'Presionar las líneas básicas sin comprometerse en peleas largas.',
    risks: ['Ser flanqueado desde Xbox', 'matarse sin robar arma', 'no obtener información'],
    failReaction: 'Si se pierde un ángulo, replegar y jugar a tiempo para buscar el segundo daño.',
    adaptationsPossible:
      'Si ganan el pick en A, convertirlo en un rush corto a Puerta/B.',
    midRoundOptions: ['Empujar con rifles si se roba arma', 'jugar postplant en sitio barato'],
    winCondition: 'Salvo gana el duelo y el bomb se planta con riesgo mínimo.',
    failureStates: ['Cinco muertos antes del sitio', 'bomb plant imposible'],
    commonMistakes: ['abandonar el control medio', 'atacar sin trade', 'moverse en masa sin ángulos'],
    recoveryPlan: 'Si el sitio está cerrado, retrasar y jugar la última pelea desde una esquina segura.',
    economyLogic: 'Cuidar el arma restante, no gastar más util de la necesaria.',
    minimumUtility: ['Flash de corto', 'Smoke de puerta si es posible'],
    priorityWeapons: ['SMG económico', 'Pistolas + salvada de AWP'],
    spacingRules: 'Mantenerse separado y jugar ángulos cortos.',
    utilityLayering: 'Solo utilizar flashes para escapes o trades.',
    timingWindows: 'Manejar el tiempo hasta 10s y luego decidir site según el pick.',
    reactionTree: 'Pick conseguido → avanzar; no pick → replegar y jugar sitio barato.',
    rotationPunish: 'Si el CT se agarra al sitio, castigar con el jugador de Xbox o Short.',
    lurkTiming: 'El lurker de Xbox espera hasta el final para cortar la rotación.',
    infoProtocols: 'Reportar presencia en Medio, A y B.',
    setup: '2 A / 2 B / 1 Short.',
    playerDistribution: 'Dos A, dos B, uno Short con vista a Medio.',
    importantSpaces: ['Short', 'Xbox', 'Puerta B', 'Long', 'Fondo A'],
    pointOfContact: 'Short si el pick está disponible; de lo contrario no forzar el sitio.',
    postplant: 'Formar la cruz más segura posible con el arma restante.',
    roles: {
      lurker: fillRole(
        {
          position: 'Xbox',
          objective: 'Cortar la rotación y buscar la arma robada.',
          utility: 'Flash de escape y humo de corta si está disponible.',
          timing: 'Esperar al segundo 20 antes de moverse si no hay info.',
          postplant: 'Mantener la vista hacia Medio y Puerta si el bomb se planta en B.',
        },
        sharedRoles.lurker,
      ),
      support: fillRole(
        {
          position: 'Short',
          objective: 'Proveer trade y presión en la línea de medio.',
          utility: 'Flash corto y smoke de medio si se roba arma.',
          timing: 'Avanzar si el pick confirma baja en el sitio principal.',
          postplant: 'Cubrir el paso del T de Medio si el bomb se planta en A.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
