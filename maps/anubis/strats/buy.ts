import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "anubis-full-buy-a-execute",
  name: "A Execute Full Utility",
  category: "Buy",
  team: "T",
  setup: "3 Palace / 1 Mid / 1 B (lurk)",
  description: "Execute A completo con utility de smokes coordinadas desde palace y mid.",
  minimumUtility: ["Smoke CT A", "Smoke arches", "Smoke stairs A", "Flash palace", "Molotov corner", "Molotov CT A"],
  timingWindows: "Ejecutar a 20-22s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "CT A fumado -> entrada palace + mid; CT aggression palace -> smoke y entrar por mid; B lurk -> corta la rotación si CT viene de B.",
  roles: [],
};