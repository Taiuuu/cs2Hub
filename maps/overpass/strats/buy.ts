import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "overpass-full-buy-b-execute",
  name: "Full Execute B Utility",
  category: "Buy",
  team: "T",
  setup: "4 Agua / 1 Lurk Mid",
  description: "Execute B completo con utility perfecta de smokes y molotovs coordinados.",
  minimumUtility: ["Molotov monster", "Smoke monster", "Smoke CT B", "Smoke pillar B", "Flash site", "Molotov bank"],
  utilityLayering: "Molotov monster -> Smoke monster -> Smoke CT B -> Smoke pillar -> Flash site -> Molotov bank -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "B plantado con cuatro vivos.",
  reactionTree: "Todas las smokes activas -> entrada directa agua; CT aggression -> esperar smokes; Lurker mid -> corta rotación.",
  postplant: "Cubrir desde agua y bank.",
  roles: [],
};