import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "ancient-full-buy-mid-split-a",
  name: "Mid Control + Split A",
  category: "Buy",
  team: "T",
  setup: "2 Mid (river) / 2 Main / 1 Temple (CT mid)",
  description: "Tomar mid y splitear A desde main y mid simultáneamente.",
  minimumUtility: ["Smoke mid CT", "Smoke donut", "Smoke house", "Flash main", "Molotov ruins"],
  timingWindows: "Ejecutar split a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Mid tomado -> split inmediato main + mid; CT aggression en mid -> retroceder y execute B; AWP en donut -> smoke donut y entrar por main.",
  roles: [],
};