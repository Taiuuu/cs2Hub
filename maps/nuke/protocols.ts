import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const nukeProtocols: StratDetail[] = [
  createStrat({
    id: "nuke-protocol-outside-b",
    name: "Outside Pressure B",
    category: "Protocol",
    type: "protocol",
    team: "T",
    description: "Forzar a la CT a gastar util en outside para abrir el B más tarde.",
    objectivePrincipal: "Provocar rotaciones y ganar espacio en yard.",
    concept: "Presionar outside sin comprometer inmediatamente el sitio.",
    risks: ["CT aguanta outside fuerte", "perder lobby"],
    failReaction: "Si la CT resiste, girar a A por ramp.",
    adaptationsPossible: "Convertir en un rush B si hay hueco en yard.",
    midRoundOptions: ["Plantar B tarde", "rotar a A"],
    winCondition: "B con menos rotaciones en contra.",
    failureStates: ["CT intacta en B"],
    commonMistakes: ["exponerse sin trade", "no proteger yard"],
    recoveryPlan: "Reforzar ramp y jugar A o un postplant B.",
    economyLogic: "Guardar dos smokes para B.",
    minimumUtility: ["Smoke Yard", "Flash Outside"],
    priorityWeapons: ["AWP Outside", "Rifle Ramp"],
    spacingRules: "Dividir líneas entre Outside y Lobby.",
    utilityLayering: "Smoke Yard -> Flash Outside.",
    timingWindows: "Mantener la presión hasta 22s.",
    reactionTree: "B abierto -> ejecutar; B cerrado -> girar A.",
    rotationPunish: "Si la CT rota mal, explotar el sitio sin cobertura.",
    lurkTiming: "Lurker en Vent entra si hay rotación baja.",
    infoProtocols: "Reportar daño en outside y yard.",
    setup: "3 Outside / 2 Lobby.",
    playerDistribution: "Tres Outside, dos Lobby.",
    importantSpaces: ["Outside", "Yard", "Vent"],
    pointOfContact: "Yard y Outside.",
    postplant: "Cubrir desde Silo y Secret.",
    roles: {
      support: fillRole({
        position: "Outside",
        objective: "Presionar yard y negar la rotación B.",
        utility: "Flash Outside y smoke Yard.",
        timing: "Sincronizar el apoyo con el avance inicial.",
        responsibility: "Mantener a la CT incómoda sin abrir B de inmediato.",
        whatToLook: "Silo, Secret y Lobby.",
        communication: "\"Outside presionado / B posible\"",
        onTeammateDeath: "Cerrar la línea y proteger la rotación.",
        onNoContact: "Continuar la presión sin exponerse.",
        postplant: "Cubrir desde Silo y Secret."
      }, sharedRoles.support),
    },
  }),
];
