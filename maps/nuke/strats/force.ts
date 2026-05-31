import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const nukeForceStrats: StratDetail[] = [
  createStrat({
    id: "nuke-force-b-press",
    name: "Force B Press",
    category: "Force Buy",
    type: "force",
    team: "T",
    description: "Apostar a yard rápido con SMGs y usar el humo para entrar en B.",
    objectivePrincipal: "Abrir B con presión que la CT no pueda sostener.",
    concept: "Velocidad y líneas de trade cercanas.",
    risks: ["Smoke mal colocado", "Secret no despejada"],
    failReaction: "Si B está cerrada, plantar barato y jugar el postplant.",
    adaptationsPossible: "Reagruparse en Outside.",
    midRoundOptions: ["Plantar B", "retirarse a A"],
    winCondition: "B plantado y retener la rotación.",
    failureStates: ["T fuera de posición"],
    commonMistakes: ["entrar sin trade", "olvidar el humo de yard"],
    recoveryPlan: "Cubrir la planta desde Silo.",
    economyLogic: "Gastar util mínima y priorizar velocidad.",
    minimumUtility: ["Smoke Yard", "Flash B"],
    priorityWeapons: ["SMG", "Rifle corto"],
    spacingRules: "Trade cercano y compacto.",
    utilityLayering: "Smoke Yard -> Flash B.",
    timingWindows: "Entrar antes del 18s.",
    reactionTree: "Yard claro -> empujar; contestado -> retroceder.",
    rotationPunish: "Si CT rota mal, explotar A/vía secundaria.",
    lurkTiming: "Lurker en Secret apoya tras el primer trade.",
    infoProtocols: "Reportar Silo y Hell.",
    setup: "3 Yard / 2 Secret.",
    playerDistribution: "Tres Yard, dos Secret.",
    importantSpaces: ["Yard", "Silo", "B Site"],
    pointOfContact: "Yard.",
    postplant: "Retener desde Silo y Heaven.",
    roles: {
      entry: fillRole({
        position: "Yard",
        objective: "Abrir la ruta hacia B.",
        utility: "Flash B y smoke Yard.",
        timing: "Entrar rápido con el primer impulso.",
        responsibility: "Ser el primer contacto y asegurar la entrada.",
        whatToLook: "Silo, Secret y Hell.",
        communication: "\"Yard listo / flash arriba\"",
        onTeammateDeath: "Mantener la presión y apoyar el sitio.",
        onNoContact: "Avanzar hacia la planta con cuidado.",
        postplant: "Cubrir desde Silo y Heaven."
      }, sharedRoles.entry),
    },
  }),
];
