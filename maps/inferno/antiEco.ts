import type { StratDetail } from "../core/types";
import { createStrat, fillRole } from "../core/stratTemplates";
import { sharedRoles } from "../core/sharedRoles";

export const infernoAntiEco: StratDetail[] = [
  createStrat({
    id: "inferno-antico-b-tight",
    name: "Anti-Eco B Tight Defense",
    category: "Anti Eco",
    type: "antiEco",
    team: "CT",
    description: "Cerrar B con líneas cortas y tradear al eco desde Van y Oranges.",
    objectivePrincipal: "No permitir un plant barato y castigar entradas tempranas.",
    concept: "Compactar la defensa y forzar al eco a exponerse.",
    risks: ["Ser presionado por fuerza bruta", "no cubrir Market"],
    failReaction: "Si el T rompe B, jugar el retake con smoke de Market.",
    adaptationsPossible: "Mover un jugador a Mid si el eco se divide.",
    midRoundOptions: ["Mantener B", "rotar apoyo a A"],
    winCondition: "El eco no planta y pierde la ronda por trade.",
    failureStates: ["B plantado fácilmente", "CT sin trade en plataforma"],
    commonMistakes: ["exponerse demasiado", "no economizar util"],
    recoveryPlan: "Ceder B y jugar un retake con util restante.",
    economyLogic: "Usar util mínima y confiar en la posición.",
    minimumUtility: ["Flash oranges", "Smoke Market"],
    priorityWeapons: ["Rifle Van", "SMG Bench"],
    spacingRules: "Líneas cerradas y trade cercano.",
    utilityLayering: "Flash oranges -> Smoke Market.",
    timingWindows: "Responder entre 8-18s.",
    reactionTree: "B claro -> mantener; contestado -> reforzar.",
    rotationPunish: "Si el T divide, castigar la linea libre.",
    lurkTiming: "El lurker entra tras el primer trade.",
    infoProtocols: "Informar bloques de B y Market.",
    setup: "2 Van / 2 Oranges / 1 Mid.",
    playerDistribution: "Dos Van, dos Oranges, uno Mid.",
    importantSpaces: ["Van", "Oranges", "Market"],
    pointOfContact: "Van.",
    postplant: "Cubrir desde Van y Bench.",
    roles: {
      anchor: fillRole({
        position: "Van",
        objective: "Ser la base de la defensa B y asegurar el primer trade.",
        utility: "Flash oranges y smoke Market.",
        timing: "Mantenerse en la línea hasta que el eco pruebe el sitio.",
        responsibility: "No dejar que el eco entre libremente a B.",
        whatToLook: "Nuevos flashes, entradas de túnel y movimientos por Market.",
        communication: "\"Van firme / necesita trade\"",
        onTeammateDeath: "Cortar la rotación y avisar la presión enemiga.",
        onNoContact: "Mantener la línea y no adelantarse sin información.",
        postplant: "Cubrir desde Van y Bench."
      }, sharedRoles.anchor),
    },
  }),
];
