import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const nukeBuyStrats: StratDetail[] = [
  createStrat({
    id: "nuke-buy-a-squeeze",
    name: "A Squeeze",
    category: "Full Buy",
    type: "buy",
    team: "T",
    description: "Combinar ramp y squeaky con humo de heaven para forzar el A.",
    objectivePrincipal: "Abrir A con múltiples líneas de presión.",
    concept: "Distraer al CT en ramp mientras squeaky entra con utility.",
    risks: ["AWP en Heaven", "no trade suficiente"],
    failReaction: "Si A no se abre, retroceder a B con util restante.",
    adaptationsPossible: "Cambiar a split B.",
    midRoundOptions: ["Plantar A", "reagruparse"],
    winCondition: "A con planta segura y cuórum del sitio.",
    failureStates: ["Squeaky aislado", "AWP en Heaven"],
    commonMistakes: ["no coordinar smokes", "forzar sin trade"],
    recoveryPlan: "Cubrir la planta desde Heaven y Hut.",
    economyLogic: "Invertir en todas las util esenciales.",
    minimumUtility: ["Smoke Heaven", "Smoke Squeaky", "Flash Ramp"],
    priorityWeapons: ["Rifle en Squeaky", "AWP en Outside"],
    spacingRules: "Trade entre ramp y squeaky.",
    utilityLayering: "Smoke Heaven -> Smoke Squeaky -> Flash Ramp.",
    timingWindows: "Ejecutar a 22-24s.",
    reactionTree: "A abierto -> empujar; A contestado -> plantar seguro.",
    rotationPunish: "Si CT rota lento, plantar con apoyo de Squeaky.",
    lurkTiming: "El lurker en Vent corta rotación si hay rotaciones a B.",
    infoProtocols: "Reportar Heaven y Squeaky.",
    setup: "3 Ramp / 2 Outside.",
    playerDistribution: "Tres Ramp, dos Outside.",
    importantSpaces: ["Ramp", "Squeaky", "Heaven"],
    pointOfContact: "A Site.",
    postplant: "Cubrir desde Heaven y Hut.",
    roles: {
      support: fillRole({
        position: "Squeaky",
        objective: "Proveer util y trade en el execute A.",
        utility: "Smoke Squeaky y flash Ramp.",
        timing: "Sincronizar con el avance de Ramp.",
        responsibility: "Mantener la presión del sitio y asegurar el trade.",
        whatToLook: "Heaven, Hut y Ramp.",
        communication: "\"Squeaky listo / A en camino\"",
        onTeammateDeath: "Cerrar el hueco y estabilizar el sitio.",
        onNoContact: "Apoyar con util y mantener la línea.",
        postplant: "Cubrir desde Silo y Secret."
      }, sharedRoles.support),
    },
  }),
];
