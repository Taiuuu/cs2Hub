import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const nukePistolStrats: StratDetail[] = [
  createStrat({
    id: "nuke-pistol-ramp-split",
    name: "Pistol Ramp Split",
    category: "Pistol",
    type: "pistol",
    team: "T",
    description: "Empujar ramp con trade cercano y presencia secundaria en vent.",
    objectivePrincipal: "Forzar a la CT a abrir A con poca util.",
    concept: "Velocidad y múltiples líneas de fuego.",
    risks: ["Perder ramp sin trade", "vent expuesto"],
    failReaction: "Si está cerrada, girar a B con el arma restante.",
    adaptationsPossible: "Reagruparse en Lobby.",
    midRoundOptions: ["Plantar A", "rotar B"],
    winCondition: "A plantado con ventaja de trade.",
    failureStates: ["CT demasiado firme en ramp"],
    commonMistakes: ["asomarse solos", "no usar flashes"],
    recoveryPlan: "Tomar una posición cómoda y jugar el plant.",
    economyLogic: "Conservar lo mínimo necesario.",
    minimumUtility: ["Flash Ramp"],
    priorityWeapons: ["SMG", "Pistola con penetración"],
    spacingRules: "Trade cercano y compacto.",
    utilityLayering: "Flash Ramp.",
    timingWindows: "Abrir a 18-20s.",
    reactionTree: "Ramp libre -> empujar; contestado -> rotar.",
    rotationPunish: "Si el CT rota a B, explotar ganador en yard.",
    lurkTiming: "Lurker en Vent espera la rotación.",
    infoProtocols: "Reportar daño en ramp.",
    setup: "3 Ramp / 2 Vent.",
    playerDistribution: "Tres Ramp, dos Vent.",
    importantSpaces: ["Ramp", "Vent", "A Site"],
    pointOfContact: "Ramp.",
    postplant: "Cubrir desde Squeaky y Heaven.",
    roles: {
      entry: fillRole({
        position: "Ramp",
        objective: "Abrir la línea hacia A.",
        utility: "Flash Ramp.",
        timing: "Entrar tras el primer contacto.",
        responsibility: "Ser el primer impacto y absorber el fuego enemigo.",
        whatToLook: "Lobby, Heaven y Squeaky.",
        communication: "\"Ramp listo / flash\"",
        onTeammateDeath: "Mantener la presión y cubrir el segundo paso.",
        onNoContact: "Avanzar hacia A y plantar si es posible.",
        postplant: "Cubrir desde Heaven y Hut."
      }, sharedRoles.entry),
    },
  }),
];
