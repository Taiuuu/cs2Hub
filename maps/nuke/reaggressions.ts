import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const nukeReaggressions: StratDetail[] = [
  createStrat({
    id: "nuke-reaggression-ramp",
    name: "Reaggression Ramp",
    category: "Reaggression",
    type: "reaggression",
    team: "CT",
    description: "Volver a tomar Ramp con util después de cederlo temporalmente.",
    objectivePrincipal: "Recuperar la altura y la escalera de rotación.",
    concept: "Entrar rápido con flash y molotov para sorprender al T.",
    risks: ["No trade suficiente", "exponer Heaven"],
    failReaction: "Si falla, estabilizar en Hut y Heaven.",
    adaptationsPossible: "Dejar un jugador en Ramp y cerrar A.",
    midRoundOptions: ["Mantener Ramp", "rotar a A"],
    winCondition: "Ramp recuperado y el T sin control exterior.",
    failureStates: ["Ramp retenido por el T"],
    commonMistakes: ["Volver sin trade", "usar util mal"],
    recoveryPlan: "Replegar a Hut y Heaven.",
    economyLogic: "Usar util de forma selectiva.",
    minimumUtility: ["Flash Ramp", "Molotov Lobby"],
    priorityWeapons: ["Rifle Ramp", "SMG Hut"],
    spacingRules: "Ingresar en columnas cerradas.",
    utilityLayering: "Flash Ramp -> Molotov Lobby.",
    timingWindows: "Hacerlo antes de 18s si el T domina Ramp.",
    reactionTree: "Ramp claro -> empujar; contestado -> resetear.",
    rotationPunish: "Si el T rota a B, usar Heaven para cortar.",
    lurkTiming: "Lurker en Outside espera la rotación.",
    infoProtocols: "Reportar Ramp y Lobby.",
    setup: "2 Ramp / 2 Hut / 1 Heaven.",
    playerDistribution: "Dos Ramp, dos Hut, uno Heaven.",
    importantSpaces: ["Ramp", "Squeaky", "Lobby"],
    pointOfContact: "Ramp.",
    postplant: "Cubrir desde Heaven y Hut.",
    roles: {
      rotator: fillRole({
        position: "Ramp",
        objective: "Aportar apoyo rápido tras la recuperación.",
        utility: "Flash Ramp y molotov Lobby.",
        timing: "Entrar tras el primer trade.",
        responsibility: "Cerrar el espacio y mantener la línea.",
        whatToLook: "Lobby, Vent y outside.",
        communication: "\"Ramp otra vez / entro\"",
        onTeammateDeath: "Reagruparse y fijar la posición.",
        onNoContact: "Avanzar con cuidado y asegurar Ramp.",
        postplant: "Cubrir desde Heaven y Hut."
      }, sharedRoles.rotator),
    },
  }),
];
