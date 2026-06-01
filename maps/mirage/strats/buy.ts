import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "mirage-full-buy-mid-split-a",
  name: "Mid Control + Split A",
  category: "Buy",
  team: "T",
  setup: "2 Mid (window + connector) / 2 Palace / 1 Ramp",
  description: "Controlar mid para el split A más efectivo del mapa.",
  objectivePrincipal: "Llegar a connector y entrar a A desde CT + palace simultáneamente.",
  minimumUtility: ["Smoke window", "Smoke CT", "Flash ticket", "Smoke jungle", "Molotov site"],
  utilityLayering: "Smoke window -> avanzar mid -> Smoke CT + Smoke jungle -> Flash ticket -> Split",
  timingWindows: "Ejecutar a 22-24s después de tomar connector.",
  winCondition: "A plantado bajo jungle con cuatro vivos.",
  reactionTree: "Connector tomado -> split inmediato palace + CT; CT aggression en mid -> retroceder y jugar execute B; AWP en jungle -> smoke jungle y entrar por CT con lurk.",
  roles: [],
};