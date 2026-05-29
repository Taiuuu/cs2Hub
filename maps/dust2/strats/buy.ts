import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const dust2BuyStrats: StratDetail[] = [
  createStrat({
    id: 'dust2-buy-t-a-exec',
    name: 'Full Exec A',
    category: 'Full Buy',
    type: 'buy',
    team: 'T',
    description:
      'Ejecutar A con largos cruzados, smokes a Long y Puerta, y presión desde Baranda y Puerta.',
    objectivePrincipal: 'Tomar A con control total de la caja y la Puerta para una planta segura.',
    concept:
      'Aislar el sitio con util múltiple y asegurarse de que el CT no pueda rotar libremente.',
    risks: ['Fallo de smoke de Long', 'CT corta la entrada desde Short/A', 'perder trade en Puerta'],
    failReaction: 'Si el primer contacto falla, retrasar y reorientar hacia Puerta con un segundo flash.',
    adaptationsPossible:
      'Rotar uno a Short si la defensa en Long es demasiado fuerte.',
    midRoundOptions: ['Consolidar el sitio', 'Pivote a B a través de Short si hay hueco'],
    winCondition: 'Bomb plantado con puente de trade y dos ángulos libres.',
    failureStates: ['Long controlado por CT', 'A plant imposible sin apoyo adicional'],
    commonMistakes: ['empujar demasiado rápido', 'no cubrir Puerta', 'dejar el bomb sin trade'],
    recoveryPlan: 'Si el sitio se pierde, jugar un postplant estrecho en Puerta y A Long.',
    economyLogic: 'Invertir en util clave y rifles; no hay lugar para compras frágiles.',
    minimumUtility: ['Smoke Long', 'Smoke Puerta', 'Flash Baranda', 'Molotov Puerta'],
    priorityWeapons: ['Rifle en Baranda', 'AWP en Xbox', 'SMG en Puerta si hay arma robada'],
    spacingRules: 'Mantener líneas de trade abiertas sin acercarse demasiado a Long.',
    utilityLayering: 'Smoke Long → Flash Baranda → Molotov Puerta → Smoke Puerta.',
    timingWindows: 'Smokes a 22s, push total a 24-26s.',
    reactionTree:
      'Long claro → empujar a Puerta; Long contestado → usar flash y retrasar el resto.',
    rotationPunish: 'Si el CT rota de B, emplear la line de Long para castigar el back.',
    lurkTiming: 'El lurker de Xbox aparece cuando el CT ha usado util en Long.',
    infoProtocols: 'Reportar humo de Puerta, contacto en Long y short libre.',
    setup: '2 Long / 2 Puerta / 1 Xbox.',
    playerDistribution: 'Dos Long, dos Puerta, uno Xbox.',
    importantSpaces: ['Long', 'Puerta', 'Caja', 'A Site', 'Short'],
    pointOfContact: 'Long primero; Puerta si el CT se agarra a Caja.',
    postplant: 'Cubrir Puerta y Short con cruces desde Baranda/Long.',
    roles: {
      entry: fillRole(
        {
          position: 'Baranda',
          objective: 'Abrir la línea de trade y forzar al CT a usar util.',
          utility: 'Flash Baranda y smoke Long.',
          timing: 'Entrar a la señal de la smoke de Long.',
          postplant: 'Cubrir la linea de Puerta desde Caja.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Puerta',
          objective: 'Consumir a los rotadores y asegurar el sitio.',
          utility: 'Molotov Puerta y flash de seguimiento.',
          timing: 'Avanzar tras el contact inicial de Baranda.',
          postplant: 'Mantener la Puerta y cortar la rotación de Short.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
