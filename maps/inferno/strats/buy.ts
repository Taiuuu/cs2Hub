import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const infernoBuyStrats: StratDetail[] = [
  createStrat({
    id: "inferno-buy-a-exec",
    name: "Full A Execute",
    category: "Full Buy",
    type: "buy",
    team: "T",
    description: "Ejecutar A con smokes de Library y Pit, apoyado por Palace y Short.",
    objectivePrincipal: "Tomar A con control total y planta segura en Puerta.",
    concept: "Aislar el sitio con util y obligar al CT a jugar bajo presión.",
    risks: ["Fallas de smoke", "Short aún fuerte"],
    failReaction: "Si no se abre, plantar barato y jugar postplant en Puerta.",
    adaptationsPossible: "Split A con Short si Library está bloqueado.",
    midRoundOptions: ["Plantar rápido", "reajustar a Short con más smokes"],
    winCondition: "A con cruz limpia y planta protegida.",
    failureStates: ["A cerrado sin plant", "bomb plant con mal ángulo"],
    commonMistakes: ["avanzar sin trade", "no cubrir Short"],
    recoveryPlan: "Replegar a la Puerta y jugar un plant seguro.",
    economyLogic: "Invertir en util clave y rifles.",
    minimumUtility: ["Smoke Library", "Smoke Pit", "Flash Short"],
    priorityWeapons: ["Rifle en Palace", "AWP en Mid"],
    spacingRules: "Mantener líneas de trade para cada ángulo.",
    utilityLayering: "Smoke Library -> Smoke Pit -> Flash Short.",
    timingWindows: "Ejecutar a 22-24s.",
    reactionTree: "A claro -> empujar; A contestado -> plantear.",
    rotationPunish: "Si el CT rota de B, usar Palace para cortar.",
    lurkTiming: "El lurker de Short apoya después del primer trade.",
    infoProtocols: "Reportar Short, Palace y Library.",
    setup: "2 Palace / 2 Short / 1 Mid.",
    playerDistribution: "Dos Palace, dos Short, uno Mid.",
    importantSpaces: ["Palace", "Short", "Pit", "A Site"],
    pointOfContact: "Short y Palace.",
    postplant: "Cubrir desde Pit y Library.",
    roles: {
      support: fillRole({
        position: "Short",
        objective: "Proveer util y trade para el execute A.",
        utility: "Flash Short y smoke Library.",
        timing: "Sincronizar el apoyo con la entrada principal.",
        responsibility: "Mantener la línea de trade y asegurar el sitio.",
        whatToLook: "Short, Library y Palace.",
        communication: "\"Short listo / smoke library\"",
        onTeammateDeath: "Cerrar el hueco y mantener el sitio.",
        onNoContact: "Avanzar con cuidado y apoyar la planta.",
        postplant: "Cubrir desde Short y Library."
      }, sharedRoles.support),
    },
  }),
];
