import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "train-pistol-rush-b",
  name: "Rush B T-con Pistol",
  category: "Pistol",
  team: "T",
  setup: "5 B T-con",
  description: "Rush completo por T-con en ronda de pistol con flashes coordinadas.",
  minimumUtility: ["Flash upper B", "Smoke CT B"],
  timingWindows: "Entrar a B a 18s.",
  winCondition: "B plantado en el primer trade.",
  commonMistakes: ["Entrar por T-con sin flash", "Apilados en el mismo ángulo"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "train-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Popdog / 2 A (upper + ivy) / 2 B (T-con + CT B)",
  description: "Setup CT conservador con AWP en popdog o upper A.",
  minimumUtility: ["Molotov ivy", "Flash T-con B"],
  winCondition: "Dos intercambios positivos antes de que el T plante.",
  roles: [],
};