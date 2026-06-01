import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "ancient-execute-a-full",
  name: "Full Execute A",
  category: "Protocol",
  team: "T",
  setup: "3 Main / 2 Mid (river)",
  description: "Split A con smokes de house, donut y temple.",
  minimumUtility: ["Smoke house CT", "Smoke donut", "Smoke temple", "Flash main", "Flash mid"],
  utilityLayering: "Smoke house -> Smoke donut -> Smoke temple -> Flash main + Flash mid -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado en el centro con cuatro vivos.",
  reactionTree: "Donut fumado y temple fumado -> entrada main + mid simultánea; AWP en donut -> smoke donut y entrar por mid; CT aggression main -> esperás smokes y entráis por mid.",
  postplant: "Cubrir desde donut y ruins con smokes activas.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "ancient-execute-b-full",
  name: "Full Execute B",
  category: "Protocol",
  team: "T",
  setup: "4 B / 1 Lurk Mid",
  description: "Ejecución a B con smokes de CT B, pit B y open B.",
  minimumUtility: ["Smoke CT B", "Smoke pit B", "Flash open B", "Molotov ladder"],
  utilityLayering: "Smoke CT B -> Smoke pit B -> Flash open B -> Molotov ladder -> Entrada",
  timingWindows: "Ejecutar a 20-22s.",
  winCondition: "B plantado en el centro con tres vivos.",
  reactionTree: "CT B fumado -> entrada doble open B + cave; CT aggression cave -> smoke cave y entrar por open B; Lurker mid -> corta rotación si CT viene de A.",
  postplant: "Cubrir desde pit B y CT B con smokes activas.",
  roles: [],
};