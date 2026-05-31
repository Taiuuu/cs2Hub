import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const nukeEcoStrats: StratDetail[] = [
  createStrat({
    id: "nuke-eco-secret",
    name: "Eco Secret Push",
    category: "Eco",
    type: "eco",
    team: "T",
    description: "Intentar atrapar a la defensa en Secret antes de que se consolide.",
    objectivePrincipal: "Obtener un arma o una rotación mal gestionada.",
    concept: "Presión temprana con mínima util.",
    risks: ["Ser flanqueado por Secret", "quedar fuera de sitio"],
    failReaction: "Si fallan, recular y evitar el compromiso.",
    adaptationsPossible: "Volver a Outside y forzar el sitio B.",
    midRoundOptions: ["Seguir Secret", "retirarse a Outside"],
    winCondition: "Arma recuperada o rotación ganada.",
    failureStates: ["Secret neutralizada"],
    commonMistakes: ["entrar sin trade", "no cubrir la rotación"],
    recoveryPlan: "Reagruparse y jugar un sitio seguro.",
    economyLogic: "Conservar el rifle y la util restante.",
    minimumUtility: ["Flash Secret"],
    priorityWeapons: ["Rifle económico"],
    spacingRules: "Entrar juntos.",
    utilityLayering: "Flash Secret.",
    timingWindows: "Hacerlo antes del 20s.",
    reactionTree: "Secret libre -> empujar; contestado -> retirarse.",
    rotationPunish: "Si gira mal, explotar B.",
    lurkTiming: "Lurker en Outside vigila la rotación.",
    infoProtocols: "Reportar pasos en Secret.",
    setup: "3 Secret / 2 Outside.",
    playerDistribution: "Tres Secret, dos Outside.",
    importantSpaces: ["Secret", "Outside", "B Site"],
    pointOfContact: "Secret.",
    postplant: "Retirar el arma restante con cuidado.",
    roles: {
      lurker: fillRole({
        position: "Outside",
        objective: "Asegurar información y cortar rotaciones.",
        utility: "Flash Outside.",
        timing: "Mantenerse retrasado hasta la fase de push.",
        responsibility: "Ser la bala extra si el CT rota.",
        whatToLook: "Yard, Silo y Secret.",
        communication: "\"Outside listo / Secret en camino\"",
        onTeammateDeath: "Apoyar el sitio y mantener el control del pasillo.",
        onNoContact: "Avanzar con cuidado y asegurar el ángulo.",
        postplant: "Cubrir desde Outside y Secret."
      }, sharedRoles.lurker),
    },
  }),
];
