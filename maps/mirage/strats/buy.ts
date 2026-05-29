import type { StratDetail } from '../../core/types';
import { createStrat, fillRole } from '../../core/stratTemplates';
import { sharedRoles } from '../../core/sharedRoles';

export const mirageBuyStrats: StratDetail[] = [
  createStrat({
    id: 'mirage-buy-t-a-exec',
    name: 'Full A Exec',
    category: 'Full Buy',
    type: 'buy',
    team: 'T',
    description:
      'Ejecutar A con Palace, Short y Jungle, usando cuatro smokes y flashes para aislar el sitio.',
    objectivePrincipal: 'Tomar A con control top y planta segura en Puerta o Caja.',
    concept:
      'Doblar la presión desde Palace y Short mientras Jungle cierra la rotación del CT.',
    risks: ['Falla de la smoke de Jungle', 'CT corta el push desde CT', 'no trade en Short'],
    failReaction:
      'Si el sitio se cierra, jugar un postplant en Puerta e impedir la rotación hacia Jungle.',
    adaptationsPossible: 'Variar a un split más lento usando un tercer smoke de Short si hace falta.',
    midRoundOptions: ['Plantar rápido', 'replantear hacia Short/CT si el sitio no está listo'],
    winCondition: 'A con bomb plantado y dos líneas de retake aseguradas.',
    failureStates: ['No hay entrada limpia a A', 'bomb plant imposible por la presión CT'],
    commonMistakes: ['correr sin trade', 'no cubrir CT', 'gastar util en ángulos incorrectos'],
    recoveryPlan: 'Si falla el sitio, retroceder a Puerta y jugar un postplant estrecho.',
    economyLogic: 'Invertir en util clave + rifles; no hay lugar para sparing de util.',
    minimumUtility: ['Smoke Jungle', 'Smoke Short', 'Flash Short', 'Flash Palace'],
    priorityWeapons: ['Rifle en Short', 'AWP en Window', 'Rifle en Palace'],
    spacingRules: 'Mantener las líneas de trade abiertas y no agruparse pronto.',
    utilityLayering: 'Smoke Jungle → Smoke Short → Flash Palace → Flash Short.',
    timingWindows: 'Ejecutar a 22-25s para pillarlo con cada smoke en su lugar.',
    reactionTree:
      'A claro → entrar; A contestado → decelerar; no contacto → usar Jungle para plant.',
    rotationPunish: 'Si el CT rota de B, presionar la Puerta y Jungle con más fuerza.',
    lurkTiming: 'El lurker de Jungle se mantiene hasta que Short gané control.',
    infoProtocols: 'Reportar Jungle, Short y CT en intervalos constantes.',
    setup: '2 Short / 2 Palace / 1 Jungle.',
    playerDistribution: 'Dos Short, dos Palace, uno Jungle.',
    importantSpaces: ['Short', 'Palace', 'Jungle', 'Window', 'CT'],
    pointOfContact: 'Short y Palace.',
    postplant:
      'Cubrir la planta desde Puerta y Jungle con cruces desde Short y Palace.',
    roles: {
      entry: fillRole(
        {
          position: 'Short',
          objective: 'Abrir ruta a A y fijar la línea de trade.',
          utility: 'Flash Short y humo de Window.',
          timing: 'Entrar con Short en presión.',
          postplant: 'Protección de Puerta y Jungle.',
        },
        sharedRoles.entry,
      ),
      support: fillRole(
        {
          position: 'Palace',
          objective: 'Mantener la segunda línea de presión y ayudar al plant.',
          utility: 'Flash Palace y smoke Jungle si es necesario.',
          timing: 'Seguir al entry con calma y no adelantarse.',
          postplant: 'Cubrir Jungle y CT.',
        },
        sharedRoles.support,
      ),
    },
  }),
];
