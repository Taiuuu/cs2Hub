import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const nukeRetakes: StratDetail[] = [
  createStrat({
    id: "nuke-retake-b",
    name: "Retake B",
    category: "Retake",
    type: "retake",
    team: "CT",
    description: "Recuperar B con humo de Silo y control de Secret.",
    objectivePrincipal: "Limpiar B con util y trade eficiente.",
    concept: "Asegurar Secret primero y luego entrar con humo.",
    risks: ["Pérdida de Secret", "falla de smoke"],
    failReaction: "Si Secret no se limpia, esperar una segunda oportunidad.",
    adaptationsPossible: "Usar Ramp para cortar rotación.",
    midRoundOptions: ["Retake B", "resetear a Outside"],
    winCondition: "B limpio con el site cerrado.",
    failureStates: ["T planta con ventaja"],
    commonMistakes: ["entrar sin Secret limpio", "usar toda la util de una vez"],
    recoveryPlan: "Tomar una posición defensiva en Outside.",
    economyLogic: "Usar util clave y conservar una smoke.",
    minimumUtility: ["Smoke Silo", "Flash Secret"],
    priorityWeapons: ["Rifle Secret", "AWP Heaven"],
    spacingRules: "Entrar en columnas estrechas.",
    utilityLayering: "Smoke Silo -> Flash Secret.",
    timingWindows: "Empezar a 22-24s.",
    reactionTree: "Secret limpio -> entrar; contestado -> resetear.",
    rotationPunish: "Si el T rota a A, usar la altura de Heaven para cortar.",
    lurkTiming: "Lurker se mantiene en Hell para trade.",
    infoProtocols: "Reportar Secret y B Site.",
    setup: "2 Heaven / 2 Secret / 1 Ramp.",
    playerDistribution: "Dos Heaven, dos Secret, uno Ramp.",
    importantSpaces: ["Silo", "Secret", "B Site"],
    pointOfContact: "Secret.",
    postplant: "Cubrir desde Heaven y Secret.",
    roles: {
      anchor: fillRole({
        position: "Secret",
        objective: "Mantener la línea de retake desde Secret.",
        utility: "Flash Secret y smoke Silo.",
        timing: "Entrar solo tras limpiar Secret.",
        responsibility: "Proteger el acceso a B y frenar al T.",
        whatToLook: "Silo, Hell y rotaciones desde Ramp.",
        communication: "\"Secret listo / entro\"",
        onTeammateDeath: "Cobrar la posición y evitar que el sitio se caiga.",
        onNoContact: "Mantener la línea y esperar al trade.",
        postplant: "Cubrir desde Secret y Heaven."
      }, sharedRoles.anchor),
    },
  }),
];
