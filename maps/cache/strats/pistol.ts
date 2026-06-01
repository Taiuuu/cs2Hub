import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "cache-pistol-rush-b",
  name: "Rush B Cross Pistol",
  category: "Pistol",
  team: "T",
  setup: "5 B Cross",
  description: "Rush completo por cross en ronda de pistol con flashes coordinadas.",
  minimumUtility: ["Flash cross", "Smoke CT B"],
  timingWindows: "Entrar a B a 18s.",
  winCondition: "B plantado en el primer trade.",
  commonMistakes: ["Cruzar sin flash", "Apilados en el mismo ángulo"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "cache-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Mid / 2 A (heaven + main) / 2 B (cross + CT B)",
  description: "Setup CT conservador con AWP en mid o heaven.",
  minimumUtility: ["Molotov cross B", "Flash main A"],
  winCondition: "Dos intercambios positivos antes de que el T plante.",
  roles: [],
};