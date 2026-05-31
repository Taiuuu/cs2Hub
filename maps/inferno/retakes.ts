import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const infernoRetakes: StratDetail[] = [
  createStrat({
    id: "inferno-retake-b",
    name: "Retake B",
    category: "Retake",
    type: "retake",
    team: "CT",
    description: "Recuperar B con smoke de plataforma y flash de second oranges.",
    objectivePrincipal: "Limpiar B con util y evitar trades perdidos.",
    concept: "Tomar platform primero, luego retomar el site con crossfire.",
    risks: ["No hay trade desde platform", "falla la smoke"],
    failReaction: "Si el T planta rápido, resetear a la salida de Banana.",
    adaptationsPossible: "Entrar por Construction si platform no es posible.",
    midRoundOptions: ["Plant retake", "reset a Banana"],
    winCondition: "B limpio y bomb sin plant o T muerto.",
    failureStates: ["No hay smoke", "T planta con ventaja"],
    commonMistakes: ["Entrar sin trade", "disparar a cuerpos sin limpiar ángulos"],
    recoveryPlan: "Tomar la aproximación por Construction y volver a entrar.",
    economyLogic: "Usar util crítica y guardar una smoke extra.",
    minimumUtility: ["Smoke platform", "Flash oranges"],
    priorityWeapons: ["Rifle platform", "SMG en Construction"],
    spacingRules: "Entrar en columnas cortas.",
    utilityLayering: "Smoke platform -> Flash oranges.",
    timingWindows: "Iniciar retake a 22-25s.",
    reactionTree: "Platform claro -> entrar; contestado -> resetear.",
    rotationPunish: "Si el T rota de A, usar la línea de CT para cortar.",
    lurkTiming: "Lurker se queda en platform hasta el primer trade.",
    infoProtocols: "Reportar platform y oranges.",
    setup: "2 Platform / 2 Construction / 1 Mid.",
    playerDistribution: "Dos Platform, dos Construction, uno Mid.",
    importantSpaces: ["Platform", "Oranges", "Construction"],
    pointOfContact: "Platform.",
    postplant: "Cubrir la planta desde Platform y Construction.",
    roles: {
      anchor: fillRole({
        position: "Platform",
        objective: "Mantener la línea de retake y proteger la entrada.",
        utility: "Smoke platform y flash oranges.",
        timing: "Entrar tras limpiar platform con el apoyo del equipo.",
        responsibility: "Ser el último ángulo que retiene a B.",
        whatToLook: "Contacto en platform, oranges y construction.",
        communication: "\"Platform listo / entro en 3\"",
        onTeammateDeath: "Retener la posición y cubrir el hueco con util.",
        onNoContact: "Progresar lentamente y asegurar los ángulos uno por uno.",
        postplant: "Cubrir la planta desde platform y construction."
      }, sharedRoles.anchor),
    },
  }),
];
