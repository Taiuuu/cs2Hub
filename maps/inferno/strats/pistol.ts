import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "inferno-pistol-rush-b",
  name: "Rush B Banana Pistol",
  category: "Pistol",
  team: "T",
  setup: "5 Banana",
  description: "Rush completo por banana con molotovs y flashes en ronda de pistol.",
  minimumUtility: ["Molotov second oranges", "Flash site B"],
  timingWindows: "Entrar a B a 20s.",
  winCondition: "B plantado en el primer trade.",
  commonMistakes: ["Avanzar apilados por banana", "No usar molotov de second oranges"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "inferno-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "2 Banana / 1 Mid / 2 A (pit + arch)",
  description: "Setup CT conservador con molotovs en banana y cobertura de A.",
  minimumUtility: ["Molotov banana", "Flash arch"],
  winCondition: "Dos intercambios positivos antes de que el T plante.",
  roles: [],
};