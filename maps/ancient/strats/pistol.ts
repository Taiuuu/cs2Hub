import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "ancient-pistol-rush-a",
  name: "Rush A Main",
  category: "Pistol",
  team: "T",
  setup: "5 A Main",
  description: "Rush a A por main con flashes y molotov de donut.",
  minimumUtility: ["Flash main", "Smoke donut", "Molotov house CT"],
  timingWindows: "Entrar a 18-20s.",
  winCondition: "A plantado en el primer trade.",
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "ancient-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Mid / 2 A (donut + main) / 2 B",
  description: "Setup CT conservador; AWP en mid o donut.",
  minimumUtility: ["Molotov main", "Flash B entrada"],
  winCondition: "Dos intercambios positivos.",
  roles: [],
};