import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "train-full-buy-a-execute",
  name: "Full Execute A Utility",
  category: "Buy",
  team: "T",
  setup: "3 Ivy / 2 Popdog",
  description: "Execute A completo con utility perfecta de smokes y molotovs coordinados.",
  minimumUtility: ["Smoke ivy CT", "Smoke upper A", "Smoke CT A", "Flash ivy entry", "Flash popdog", "Molotov e-box"],
  utilityLayering: "Smoke ivy CT -> Smoke upper A -> Smoke CT A -> Flash ivy -> Flash popdog -> Molotov e-box -> Entrada doble",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Smokes activas -> entrada doble ivy + popdog; CT aggression ivy -> esperar smoke y entrar por popdog; Lurker B -> corta rotación.",
  postplant: "Cubrir desde e-box y lower A.",
  roles: [],
};