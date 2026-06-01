import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "anubis-execute-a-full",
  name: "Full Execute A",
  category: "Protocol",
  team: "T",
  setup: "3 Palace / 2 Mid",
  description: "Execute A con smokes de CT A, arches y stairs.",
  minimumUtility: ["Smoke CT A", "Smoke arches", "Smoke stairs A", "Flash palace", "Molotov corner A"],
  utilityLayering: "Smoke CT A -> Smoke arches -> Smoke stairs -> Flash palace -> Entrada",
  timingWindows: "Ejecutar a 20-22s.",
  winCondition: "A plantado en el centro con cuatro vivos.",
  reactionTree: "CT A fumado y arches fumado -> entrada palace + mid simultánea; AWP en arches -> smoke arches primero; CT aggression palace -> esperás smokes y entráis por mid.",
  postplant: "Cubrir desde palace y arches con smokes activas.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "anubis-execute-b-full",
  name: "Full Execute B",
  category: "Protocol",
  team: "T",
  setup: "4 B Water / 1 Canal Lurk",
  description: "Execute B rápido con smokes de CT B, bridge y corner B.",
  minimumUtility: ["Smoke CT B", "Smoke bridge B", "Flash water", "Molotov corner B"],
  utilityLayering: "Smoke CT B -> Smoke bridge B -> Flash water -> Molotov corner B -> Entrada",
  timingWindows: "Ejecutar a 18-20s (es una de las rutas más cortas del mapa).",
  winCondition: "B plantado en el centro con tres vivos.",
  reactionTree: "CT B fumado -> entrada doble water + bridge; CT aggression water -> smoke water y entrar por short B; Lurker canal -> corta rotación si CT viene de A.",
  postplant: "Cubrir desde water y bridge con smokes activas.",
  roles: [],
};