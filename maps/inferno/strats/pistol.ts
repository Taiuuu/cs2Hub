import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const infernoPistolStrats: StratDetail[] = [
  createStrat({
    id: "inferno-pistol-t-b-rush",
    name: "Pistol Rush B",
    category: "Pistol",
    type: "pistol",
    team: "T",
    description: "Cargar Banana con flashes rápidos y plant costoso en B.",
    objectivePrincipal: "Ganar B antes de que el CT tenga util.",
    concept: "Velocidad, flash y trade cercano.",
    risks: ["Mala sincronía en flashes", "CT en platform"],
    failReaction: "Si el CT está fuerte, plantar barato cerca del Car.",
    adaptationsPossible: "Cambiar a un rush A si banana está cerrada.",
    midRoundOptions: ["Plantar B", "apoyar un postplant estándar"],
    winCondition: "Bomb plantado y dos cruces claras.",
    failureStates: ["Perder la ronda en Banana"],
    commonMistakes: ["Flashear fuera de tiempo", "entrar separados"],
    recoveryPlan: "Jugar el postplant de B con el arma restante.",
    economyLogic: "Gastar util mínima y máxima movilidad.",
    minimumUtility: ["Flash banana", "Smoke cave"],
    priorityWeapons: ["Pistolas fuertes", "SMG si hay"],
    spacingRules: "Mantener grupos pequeños.",
    utilityLayering: "Flash banana -> Smoke cave.",
    timingWindows: "Entrar a 18-20s.",
    reactionTree: "Banana claro -> empujar; contestado -> plantear.",
    rotationPunish: "Si el CT rota de A, usar banana para castigar.",
    lurkTiming: "El lurker va a cave tras el primer trade.",
    infoProtocols: "Reportar platform y cave.",
    setup: "5 B.",
    playerDistribution: "Todos en Banana.",
    importantSpaces: ["Banana", "Cave", "Platform"],
    pointOfContact: "Banana.",
    postplant: "Cubrir desde Platform y Car.",
    roles: {
      entry: fillRole({
        position: "Banana",
        objective: "Abrir la línea principal y obligar a gastar util.",
        utility: "Flash a platform y smoke cave.",
        timing: "Entrar agresivo a 18-20s.",
        responsibility: "Ser la primera presión y absorber el primer fuego.",
        whatToLook: "Platform, cave y amarillo.",
        communication: "\"Banana listo / flash arriba\"",
        onTeammateDeath: "Avanzar con el segundo entry y cubrir el ángulo.",
        onNoContact: "Acelerar hacia el sitio y plantar rápido.",
        postplant: "Cubrir desde Platform y Car."
      }, sharedRoles.entry),
    },
  }),
];
