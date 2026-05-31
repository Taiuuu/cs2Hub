import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const infernoMidRoundStrats: StratDetail[] = [
  createStrat({
    id: "inferno-midround-b-split",
    name: "Mid Round B Split",
    category: "Mid Round",
    type: "midRound",
    team: "T",
    description: "Cambiar a B desde Mid y Apps cuando la defensa CT se despliega hacia A.",
    objectivePrincipal: "Aprovechar las rotaciones del CT para abrir B.",
    concept: "Sumar presión desde Mid y Apartments al mismo tiempo.",
    risks: ["CT no rota", "B se vuelve más fuerte"],
    failReaction: "Si B no se abre, volver a A con la util restante.",
    adaptationsPossible: "Transformar en un rush B clásico si el CT es débil en Apps.",
    midRoundOptions: ["Entrar B", "resituar a A"],
    winCondition: "B con control de Van y Market.",
    failureStates: ["CT demasiado firme en B"],
    commonMistakes: ["moverse sin trade", "no cubrir Market"],
    recoveryPlan: "Retirarse a Apartments y esperar la segunda fase.",
    economyLogic: "Usar util clave para el split y guardar lo esencial.",
    minimumUtility: ["Smoke Market", "Flash Apps"],
    priorityWeapons: ["Rifle en Mid", "AWP en Short"],
    spacingRules: "Entrar en dos líneas con trade cercano.",
    utilityLayering: "Smoke Market -> Flash Apps.",
    timingWindows: "Cambiar a B tras 18s de lectura.",
    reactionTree: "B libre -> empujar; B contestado -> resetear.",
    rotationPunish: "Si el CT rota mal, castigar desde Mid.",
    lurkTiming: "El lurker de Apartments entra si B está vacío.",
    infoProtocols: "Reportar Van y Market abiertos.",
    setup: "2 Mid / 3 B.",
    playerDistribution: "Dos Mid, tres B.",
    importantSpaces: ["Mid", "Apps", "Market"],
    pointOfContact: "Van y Market.",
    postplant: "Cubrir desde Van y Bench.",
    roles: {
      rotator: fillRole({
        position: "Mid",
        objective: "Cortar rotaciones y apoyar el split B.",
        utility: "Flash Apps y smoke Market.",
        timing: "Entrar tras evaluar la respuesta de A.",
        responsibility: "Asegurar la segunda línea de presión.",
        whatToLook: "Market, Van y apartamentos.",
        communication: "\"Mid listo / B en camino\"",
        onTeammateDeath: "Mantener la línea central y cubrir el hueco.",
        onNoContact: "Progresar lentamente y preparar el site.",
        postplant: "Cubrir desde Van y Bench."
      }, sharedRoles.rotator),
    },
  }),
];
