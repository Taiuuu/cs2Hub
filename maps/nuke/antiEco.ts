import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const nukeAntiEco: StratDetail[] = [
  createStrat({
    id: "nuke-antico-outside",
    name: "Anti-Eco Outside Setup",
    category: "Anti Eco",
    type: "antiEco",
    team: "CT",
    description: "Cortar el eco en outside con líneas cerradas y trade cercano.",
    objectivePrincipal: "Evitar que planten barato y forzar errores de toma de decisiones.",
    concept: "Enviar a un jugador por Secret y otro por Outside line para cubrir rotaciones.",
    risks: ["Ser divididos", "perder fuera sin trade"],
    failReaction: "Si el eco entra en B, cerrar Secret y jugar retake.",
    adaptationsPossible: "Reforzar Secret si outside es sobrepasado.",
    midRoundOptions: ["Cerrar Outside", "jugar más profundo"],
    winCondition: "El eco no planta y se pierde por trade.",
    failureStates: ["B plantado barato"],
    commonMistakes: ["jugar muy adelantado", "no traducir la información"],
    recoveryPlan: "Ceder yard y jugar un retake B con util.",
    economyLogic: "Usar util de forma selectiva y económica.",
    minimumUtility: ["Flash Outside", "Smoke Yard"],
    priorityWeapons: ["Rifle Outside", "SMG Secret"],
    spacingRules: "Mantener líneas cerradas.",
    utilityLayering: "Flash Outside -> Smoke Yard.",
    timingWindows: "Responder entre 10-18s.",
    reactionTree: "Outside claro -> mantener; contestado -> resetear.",
    rotationPunish: "Si el eco divide, castigar la línea más ligera.",
    lurkTiming: "El lurker se mantiene en Secret para trade.",
    infoProtocols: "Reportar presencia en Outside.",
    setup: "2 Outside / 1 Secret / 2 Ramp.",
    playerDistribution: "Dos Outside, uno Secret, dos Ramp.",
    importantSpaces: ["Outside", "Yard", "Secret"],
    pointOfContact: "Outside.",
    postplant: "Cubrir desde Silo y Heaven.",
    roles: {
      support: fillRole({
        position: "Outside",
        objective: "Mantener la línea de outside y negar el eco.",
        utility: "Flash Outside y smoke Yard.",
        timing: "Responder rápido a la entrada del eco.",
        responsibility: "Forzar al eco a exponerse y gastar util.",
        whatToLook: "Yard, Silo y Secret.",
        communication: "\"Outside bloqueado / eco presente\"",
        onTeammateDeath: "Cerrar la línea y mantener la presión.",
        onNoContact: "Mantenerse en la línea y asegurar rotación.",
        postplant: "Cubrir desde Silo y Heaven."
      }, sharedRoles.support),
    },
  }),
];
