import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "cache-full-buy-a-split",
  name: "Full Execute A Split Utility",
  category: "Buy",
  team: "T",
  setup: "2 Main / 2 Squeaky / 1 Lurk B",
  description: "Split A completo con utility perfecta desde main y squeaky.",
  minimumUtility: ["Smoke heaven A", "Smoke CT A", "Smoke squeaky entry", "Flash main", "Flash squeaky", "Molotov quad"],
  utilityLayering: "Smoke heaven -> Smoke CT A -> Smoke squeaky -> Flash main -> Flash squeaky -> Molotov quad -> Entrada doble",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Smokes activas -> entrada doble simultánea; CT aggression main -> esperar smoke y entrar por squeaky; Lurker B -> corta rotación.",
  postplant: "Cubrir desde quad y truck A.",
  roles: [],
};