import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const infernoProtocols: StratDetail[] = [
  createStrat({
    id: "inferno-protocol-b-fake-a",
    name: "Fake B / Execute A",
    category: "Protocol",
    type: "protocol",
    team: "T",
    description: "Presionar banana duro para atraer rotaciones y luego ejecutar A con advantage.",
    objectivePrincipal: "Crear huecos en A usando la amenaza de B.",
    concept: "Usar el fake de B para ganar medio y luego pasar a A.",
    risks: ["CT no rota", "gastar util sin impacto"],
    failReaction: "Si B queda intacto, reforzar B o volver a A con más calma.",
    adaptationsPossible: "Split A con Palace si A se siente débil.",
    midRoundOptions: ["Entrar A", "retener en B", "jugar sitio lento"],
    winCondition: "A abierto con menos rotación en contra.",
    failureStates: ["No se abre A", "B pierde sin cambio"],
    commonMistakes: ["no comunicar el cambio", "usar util residual en el fake"],
    recoveryPlan: "Volver a colocar la rotación en B o medio.",
    economyLogic: "Conservar el humo para A.",
    minimumUtility: ["Smoke Banana", "Flash A"],
    priorityWeapons: ["Rifle", "AWP in Mid"],
    spacingRules: "No agruparse en B durante el fake.",
    utilityLayering: "Pressión B -> Smoke A.",
    timingWindows: "Fake a 18s, cambio a 22s.",
    reactionTree: "B reacciona -> A rápido; B no reacciona -> retener.",
    rotationPunish: "Si el CT rota lento, castigar con util extra por B.",
    lurkTiming: "Lurker de mid observa el cambio.",
    infoProtocols: "Reportar smoke y contacto en B.",
    setup: "3 B / 2 A.",
    playerDistribution: "Tres B, dos A.",
    importantSpaces: ["Banana", "Mid", "A Site"],
    pointOfContact: "A después del fake.",
    postplant: "Sostener desde Pit y Library.",
    roles: {
      entry: fillRole({
        position: "Banana",
        objective: "Presionar y atraer la rotación enemiga.",
        utility: "Flash naranja y smoke banana.",
        timing: "Iniciar el fake en 18s.",
        responsibility: "Ser la primera amenaza que obliga a CT a reaccionar.",
        whatToLook: "Respuesta de CT en B y medio.",
        communication: "\"Fake B activo / cambio a A\"",
        onTeammateDeath: "Mantener la presión y no ceder terreno.",
        onNoContact: "Cambiar rápido a A con la util restante.",
        postplant: "Cubrir desde Pit si se planta en A."
      }, sharedRoles.entry),
    },
  }),
];
