import type { StratDetail } from "../../core/types";
import { createStrat, fillRole } from "../../core/stratTemplates";
import { sharedRoles } from "../../core/sharedRoles";

export const infernoForceStrats: StratDetail[] = [
  createStrat({
    id: "inferno-force-b-early",
    name: "Force B Early",
    category: "Force Buy",
    type: "force",
    team: "T",
    description: "Entrar B rápido con SMGs y flashes para aprovechar una defensiva CT débil.",
    objectivePrincipal: "Obtener el sitio antes de que el CT se establezca.",
    concept: "Velocidad y trade corto sobre control de util.",
    risks: ["Flash mal sincronizado", "upper cerrado"],
    failReaction: "Si se pierde el primer contacto, plantar con el resto y jugar postplant.",
    adaptationsPossible: "Rotar a A si B se cierra completamente.",
    midRoundOptions: ["Plantar B", "jugar una segunda línea"],
    winCondition: "B plantado con ventaja de trade.",
    failureStates: ["T pierde la mayoría antes de entrar"],
    commonMistakes: ["asomarse solo", "no coordinar flashes"],
    recoveryPlan: "Desplegar el postplant con el humo restante.",
    economyLogic: "Usar util mínima y priorizar peso de arma corta.",
    minimumUtility: ["Flash B", "Smoke Market"],
    priorityWeapons: ["SMG en Banana", "Rifle en Van"],
    spacingRules: "Grupo compacto con trade cercano.",
    utilityLayering: "Flash B -> Smoke Market.",
    timingWindows: "Entrar antes del 18s.",
    reactionTree: "B libre -> empujar; contestado -> plantar.",
    rotationPunish: "Si el CT rota de A, usar Market para cortar.",
    lurkTiming: "El lurker entra tras el primer contacto.",
    infoProtocols: "Reportar platform y Market.",
    setup: "5 B.",
    playerDistribution: "Todos en Banana.",
    importantSpaces: ["Banana", "B Site", "Market"],
    pointOfContact: "Banana.",
    postplant: "Retener desde Market y Van.",
    roles: {
      entry: fillRole({
        position: "Banana",
        objective: "Forzar el contacto temprano y abrir el sitio B.",
        utility: "Flash de entrada y humo de Market.",
        timing: "Entrada rápida antes de los 18s.",
        responsibility: "Ser el primer impacto y asegurar trade.",
        whatToLook: "Platform, Market y Secret.",
        communication: "\"Rush B / flash listo\"",
        onTeammateDeath: "Mantener el impulso y plantar si es posible.",
        onNoContact: "Avanzar hacia la planta y usar el humo restante.",
        postplant: "Cubrir desde Market y Van."
      }, sharedRoles.entry),
    },
  }),
];
