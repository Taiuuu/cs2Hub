import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const infernoReaggressions: StratDetail[] = [
  createStrat({
    id: "inferno-reaggression-b",
    name: "Reaggression Banana",
    category: "Reaggression",
    type: "reaggression",
    team: "CT",
    description: "Volver a presionar banana con flash y molotov tras perder el primer avance.",
    objectivePrincipal: "Recuperar espacio y restaurar la línea de contención.",
    concept: "Usar la velocidad y util para sorprender al T que no espera la agresión.",
    risks: ["Quedar expuesto sin apoyo", "fallar los flashes"],
    failReaction: "Si el T se repliega, cerrar banana y jugar el retake.",
    adaptationsPossible: "Convertir a un control pasivo si el T se mantiene firme.",
    midRoundOptions: ["Mantener banana", "rotar a A"],
    winCondition: "Banana limpio de nuevo y el T forzado a jugar retrasado.",
    failureStates: ["Banana perdido de nuevo", "CT sin trade"],
    commonMistakes: ["Avanzar sin trade", "usar util demasiado rápido"],
    recoveryPlan: "Cerrar banana y reorganizar para un retake.",
    economyLogic: "Usar util justa para recuperar el hueco.",
    minimumUtility: ["Flash banana", "Molotov top"],
    priorityWeapons: ["Rifle banana", "SMG apoyo"],
    spacingRules: "Entrar con líneas cortas y trade cercano.",
    utilityLayering: "Flash banana -> Molotov top.",
    timingWindows: "Hacer la re-agresión antes de 18s.",
    reactionTree: "Banana claro -> empujar; contestado -> resetear.",
    rotationPunish: "Si el T rota tarde, usar la presión para cortar su apoyo.",
    lurkTiming: "El lurker de Mid puede apoyar solo tras el primer trade.",
    infoProtocols: "Reportar apertura de banana y utilizaciones enemigas.",
    setup: "3 Banana / 2 Mid.",
    playerDistribution: "Tres Banana, dos Mid.",
    importantSpaces: ["Banana", "Top", "Bottom"],
    pointOfContact: "Banana.",
    postplant: "Cubrir la planta desde Banana si el T ha plantado.",
    roles: {
      rotator: fillRole({
        position: "Mid",
        objective: "Aportar apoyo rápido si banana se limpia.",
        utility: "Flash de medio y humo para negar rotación rápida.",
        timing: "Mantenerse listo para entrar tras el primer contacto.",
        responsibility: "Reforzar banana o girar hacia A según información.",
        whatToLook: "Movimientos en banana y posible cambio de A.",
        communication: "\"Banana limpio / rotación en camino\"",
        onTeammateDeath: "Cerrar el hueco dejado y frenar el avance enemigo.",
        onNoContact: "Mantener posición y esperar al trade.",
        postplant: "Cubrir desde Mid si el bomb se planta en B."
      }, sharedRoles.rotator),
    },
  }),
];
