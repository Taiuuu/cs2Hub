import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "inferno-full-buy-a-split",
  name: "Full A Split Palace + Short",
  category: "Buy",
  team: "T",
  setup: "2 Palace / 2 Short / 1 Lurk Banana",
  description: "Split A con utility completa desde palace y short simultáneamente.",
  minimumUtility: ["Smoke library", "Smoke CT", "Smoke pit", "Flash palace", "Flash short", "Molotov site"],
  utilityLayering: "Smoke library -> Smoke CT -> Smoke pit -> Flash palace + Flash short -> Entrada doble",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Smokes activas -> entrada doble simultánea; CT aggression short -> esperar smoke y entrar por palace; Lurker banana -> corta rotación.",
  postplant: "Cubrir desde pit y library.",
  roles: [],
};