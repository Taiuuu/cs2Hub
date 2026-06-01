import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "nuke-pistol-outside-rush",
  name: "Outside Rush + B Entry",
  category: "Pistol",
  team: "T",
  setup: "5 Outside (3 yard / 2 secret)",
  description: "Rush masivo por outside hacia B aprovechando que la CT no tiene util en pistol.",
  minimumUtility: ["Smoke yard", "Flash B"],
  timingWindows: "Entrar antes de 18s.",
  winCondition: "B plantado en el primer trade.",
  commonMistakes: ["No cubrir secret", "Ir apilados al mismo ángulo de silo"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "nuke-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Heaven / 2 Ramp / 1 Outside / 1 B",
  description: "Setup CT conservador con AWP en heaven y cobertura de ramp.",
  minimumUtility: ["Flash ramp entry", "Molotov lobby"],
  winCondition: "Dos intercambios positivos.",
  roles: [],
};