import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const nukeMidRoundStrats: StratDetail[] = [
  createStrat({
    id: "nuke-midround-backdoor-b",
    name: "Mid Round Backdoor B",
    category: "Mid Round",
    type: "midRound",
    team: "T",
    description: "Volver a B por Secret y Yard después de generar dudas en A.",
    objectivePrincipal: "Aprovechar la rotación CT hacia A para explotar B.",
    concept: "Fingir el ataque A y cambiar a B con ventaja de rotación.",
    risks: ["CT mantiene B", "Secret no limpia"],
    failReaction: "Si Secret está cerrada, girar a A de nuevo.",
    adaptationsPossible: "Reconvertir en un rush B directo.",
    midRoundOptions: ["Entrar B", "reagruparse"],
    winCondition: "B abierto con menos rotaciones en contra.",
    failureStates: ["B bloqueado"],
    commonMistakes: ["cambiar sin información", "no limpiar Secret"],
    recoveryPlan: "Volver a Outside y jugar un split B lento.",
    economyLogic: "Conservar util para el cambio.",
    minimumUtility: ["Smoke Yard", "Flash Secret"],
    priorityWeapons: ["Rifle Secret", "AWP Outside"],
    spacingRules: "Entrar con trade cercano.",
    utilityLayering: "Smoke Yard -> Flash Secret.",
    timingWindows: "Cambiar tras 18-20s.",
    reactionTree: "B libre -> empujar; B contestado -> reset.",
    rotationPunish: "Si CT rota mal, explotar la abertura tras A.",
    lurkTiming: "Lurker en Outside corta la rotación.",
    infoProtocols: "Reportar A y B simultáneamente.",
    setup: "2 Outside / 3 Secret.",
    playerDistribution: "Dos Outside, tres Secret.",
    importantSpaces: ["Secret", "Yard", "B Site"],
    pointOfContact: "Yard.",
    postplant: "Cubrir desde Silo y Heaven.",
    roles: {
      rotator: fillRole({
        position: "Outside",
        objective: "Cortar la rotación hacia B y asegurar el backdoor.",
        utility: "Flash Secret y smoke Yard.",
        timing: "Entrar tras confirmar el ataque a A.",
        responsibility: "Ser la bala extra que llega al sitio B.",
        whatToLook: "A, B y rotaciones.",
        communication: "\"Backdoor listo / B en camino\"",
        onTeammateDeath: "Retirarse a Outside y mantener la línea.",
        onNoContact: "Avanzar con precaución hacia Secret.",
        postplant: "Cubrir desde Secret y Silo."
      }, sharedRoles.rotator),
    },
  }),
];
