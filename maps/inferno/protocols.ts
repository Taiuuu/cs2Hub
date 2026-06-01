import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "inferno-execute-a-split",
  name: "Full A Split via Palace + Short",
  category: "Protocol",
  team: "T",
  setup: "2 Palace / 2 Short (vía mid) / 1 Lurk B",
  description: "Split A clásico de pro play; entrar desde palace y short simultáneamente.",
  objectivePrincipal: "Aislar el site A con dos ángulos de entrada para forzar trades negativos al CT.",
  minimumUtility: ["Smoke library", "Smoke CT", "Smoke pit", "Flash short", "Flash palace"],
  utilityLayering: "Smoke library -> Smoke CT -> Smoke pit -> Flash corto -> Flash palace -> Entrada",
  timingWindows: "Ejecutar a 22-24s con todas las smokes activas.",
  winCondition: "A plantado bajo library o en puerta con cuatro vivos.",
  failureStates: ["Short sigue activo con AWP", "Library no smokada y hay ángulo"],
  commonMistakes: ["Entrar sin que todas las smokes estén activas", "Palace entra solo sin apoyo"],
  reactionTree: "Short fumado y library fumado -> entrada doble simultánea; CT aggression desde short -> esperás la smoke y entras por palace; Lurk corta rotación si CT llega de B.",
  postplant: "Cubrir desde pit y library (fumada); lurker corta en B.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "inferno-execute-b-banana",
  name: "Full Execute B Banana",
  category: "Protocol",
  team: "T",
  setup: "4 Banana / 1 Mid Lurk",
  description: "Inundar B por banana con smokes y molotovs coordinados.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke CT B", "Smoke car B", "Flash site", "Molotov second oranges"],
  utilityLayering: "Molotov second oranges -> Smoke CT B -> Smoke car B -> Flash site -> Entrada",
  timingWindows: "Entrar a 20-22s.",
  winCondition: "B plantado en el centro con tres vivos.",
  reactionTree: "CT B fumado -> entrada desde banana; CT aggression -> retroceder y esperar smoke; Lurker mid -> corta rotación CT.",
  postplant: "Cubrir desde coil y first oranges.",
  roles: [],
};