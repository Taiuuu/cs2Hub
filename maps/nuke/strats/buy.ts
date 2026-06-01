import { Tactic } from "@/types";

export const tacticBuy1: Tactic = {
  id: "nuke-full-buy-a-execute",
  name: "Full Execute A Utility",
  category: "Buy",
  team: "T",
  setup: "3 Ramp / 2 Squeaky",
  description: "Execute A completo con utility perfecta de smokes y flashes coordinadas.",
  minimumUtility: ["Smoke heaven", "Smoke hut", "Smoke squeaky", "Flash ramp", "Flash squeaky entry", "Molotov trophy"],
  utilityLayering: "Smoke heaven -> Smoke hut -> Smoke squeaky -> Flash ramp -> Flash squeaky -> Molotov trophy -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado con cuatro vivos.",
  reactionTree: "Smokes activas -> entrada doble ramp + squeaky; CT aggression -> esperar smokes y entrar por el otro lado; Lurker vents -> corta rotación.",
  postplant: "Cubrir desde ramp y squeaky.",
  roles: [],
};