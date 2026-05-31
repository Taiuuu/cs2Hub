import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const nukeDefaults: StratDetail[] = [
  createStrat({
    id: "nuke-default-ramp-split",
    name: "Default Ramp Split",
    category: "Default",
    type: "default",
    team: "T",
    description: "Presión desplegada entre ramp y vent para forzar swaps CT.",
    objectivePrincipal: "Leer si la CT abandona A o B.",
    concept: "Custodiar la información y luego empujar el sitio débil.",
    risks: ["CT se atrinchera en vent", "pérdida de ramp inicial"],
    failReaction: "Retroceder a yard si la CT cierra A.",
    adaptationsPossible: "Volcar a B si A está muy congestionado.",
    midRoundOptions: ["Split A", "Rush B"],
    winCondition: "Ganar control vertical y ejecutar con util.",
    failureStates: ["Batalla de trades perdidos"],
    commonMistakes: ["forzar sin trade", "olvidar vent"],
    recoveryPlan: "Aislar a la CT en Out o Secret.",
    economyLogic: "Conservar nades para la ejecución.",
    minimumUtility: ["Smoke Ramp", "Smoke Squeaky"],
    priorityWeapons: ["Rifle", "AWP en Outside"],
    spacingRules: "Dos líneas de trade en Ramp y Vent.",
    utilityLayering: "Smoke Ramp -> Flash Squeaky.",
    timingWindows: "Decidir el sitio a 18s.",
    reactionTree: "A libre -> ejecutar; A contestado -> girar B.",
    rotationPunish: "Si la CT gira lento, golpear B rápido.",
    lurkTiming: "Lurker en Outside espera la rotación.",
    infoProtocols: "Reportar ramp y squeaky.",
    setup: "2 Ramp / 2 Outside / 1 Vent.",
    playerDistribution: "Dos Ramp, dos Outside, uno Vent.",
    importantSpaces: ["Ramp", "Squeaky", "Outside", "Vent"],
    pointOfContact: "Ramp y Vent.",
    postplant: "Cubrir desde Heaven y Hut.",
    roles: {
      entry: fillRole({
        position: "Ramp",
        objective: "Tomar el espacio inicial y forzar la rotación.",
        utility: "Smoke Ramp y flash Squeaky.",
        timing: "Avanzar tras recibir información de Lobby.",
        responsibility: "Ser el primer contacto y abrir la ruta a A.",
        whatToLook: "Lobby, Outside y Vent.",
        communication: "\"Ramp listo / rotación pendiente\"",
        onTeammateDeath: "Mantener el avance y no ceder la posición.",
        onNoContact: "Acelerar hacia A o vent según el plan.",
        postplant: "Cubrir desde Ramp y Heaven."
      }, sharedRoles.entry),
    },
  }),
];
