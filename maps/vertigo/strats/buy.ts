import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "vertigo-full-buy-mid-split-a",
  name: "Mid Control + Split A",
  category: "Buy",
  team: "T",
  setup: "2 Mid / 2 A Ramp / 1 Side A",
  description: "Tomar mid y luego splitear A desde ramp y side simultáneamente.",
  minimumUtility: ["Smoke mid", "Smoke stairs CT", "Smoke way", "Flash side", "Molotov CT"],
  timingWindows: "Ejecutar split a 22-24s después de tomar mid.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Mid tomado -> split inmediato ramp + side; CT aggression en mid -> retroceder y execute B; AWP en stairs CT -> smoke stairs y entrar por way.",
  roles: [],
};