import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "anubis-pistol-rush-a",
  name: "Rush A Palace",
  category: "Pistol",
  team: "T",
  setup: "5 A Palace",
  description: "Rush a A por palace con flashes y molotov de CT A.",
  minimumUtility: ["Flash palace", "Smoke arches", "Molotov CT A"],
  timingWindows: "Entrar a 16-18s.",
  winCondition: "A plantado en el primer trade.",
  commonMistakes: ["Ir a palace de a uno", "No cubrir arches"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "anubis-pistol-rush-b",
  name: "Rush B Water",
  category: "Pistol",
  team: "T",
  setup: "5 B Water",
  description: "Rush B por water con flashes coordinadas.",
  minimumUtility: ["Flash water", "Smoke CT B"],
  timingWindows: "Entrar a 15-17s (B es muy cercano en Anubis).",
  winCondition: "B plantado en el primer trade.",
  roles: [],
};

export const tacticPistol3: Tactic = {
  id: "anubis-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Mid / 2 A (arches + palace) / 2 B (water + CT B)",
  description: "Setup CT conservador con AWP en arches o mid.",
  minimumUtility: ["Molotov water", "Flash arches"],
  winCondition: "Dos intercambios positivos.",
  roles: [],
};