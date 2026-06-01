import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "overpass-pistol-rush-b",
  name: "Rush B Agua Pistol",
  category: "Pistol",
  team: "T",
  setup: "5 Agua",
  description: "Rush completo por agua con molotov de monster en ronda de pistol.",
  minimumUtility: ["Molotov monster", "Flash site B"],
  timingWindows: "Entrar a B a 20s.",
  winCondition: "B plantado en el primer trade.",
  commonMistakes: ["Avanzar sin negar monster", "Apilados en el mismo ángulo"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "overpass-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "2 Agua / 1 Monster / 2 A (short + long)",
  description: "Setup CT conservador con molotovs en agua y cobertura de A.",
  minimumUtility: ["Molotov agua", "Flash short"],
  winCondition: "Dos intercambios positivos antes de que el T plante.",
  roles: [],
};