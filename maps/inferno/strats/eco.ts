import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const infernoEcoStrats: StratDetail[] = [
  createStrat({
    id: "inferno-eco-mid-pick",
    name: "Eco Mid Pick",
    category: "Eco",
    type: "eco",
    team: "T",
    description: "Jugar medio con un rifle para robar un arma o escalar ventaja.",
    objectivePrincipal: "Obtener un pick que permita un giro rápido de la ronda.",
    concept: "Presión controlada desde Arch mientras se respeta el trade.",
    risks: ["Ser flanqueado", "no conseguir pick"],
    failReaction: "Si no hay pick, retirarse y jugar un sitio barato.",
    adaptationsPossible: "Rotar a B si el CT abandona banana.",
    midRoundOptions: ["Seguir mid", "push a A"],
    winCondition: "Pick conseguido y equipo con ventaja de arma.",
    failureStates: ["Desperdiciar el rifle comprado"],
    commonMistakes: ["Forzar el duelo sin trade"],
    recoveryPlan: "Retirarse a una posición segura con el arma restante.",
    economyLogic: "Conservar el rifle y no gastar util.",
    minimumUtility: ["Flash Mid"],
    priorityWeapons: ["Rifle económico"],
    spacingRules: "Mantener líneas cortas.",
    utilityLayering: "Flash Mid.",
    timingWindows: "Buscar el pick a 18-20s.",
    reactionTree: "Pick -> empujar; sin pick -> replegar.",
    rotationPunish: "Si rota mal, explotar A o B.",
    lurkTiming: "El lurker de A recorta tras el pick.",
    infoProtocols: "Reportar movimientos en Mid y Arch.",
    setup: "2 Mid / 3 A/B.",
    playerDistribution: "Dos Mid, tres de apoyo.",
    importantSpaces: ["Mid", "Arch", "CT"],
    pointOfContact: "Mid.",
    postplant: "Ajustar al arma y la planta segura.",
    roles: {
      awper: fillRole({
        position: "Mid",
        objective: "Controlar el largo y atrapar rotaciones.",
        utility: "Flash de recuperación si hay múltiples enemigos.",
        timing: "Esperar hasta ver la primera pista de movimiento.",
        responsibility: "Ser la pieza clave para robar información.",
        whatToLook: "Arch, Short y CT mid.",
        communication: "\"AWP mid listo / pick pendiente\"",
        onTeammateDeath: "Reubicar y mantener la línea de mid.",
        onNoContact: "Avanzar con cautela y buscar el trade.",
        postplant: "Cubrir la rotación larga desde mid."
      }, sharedRoles.awper),
    },
  }),
];
