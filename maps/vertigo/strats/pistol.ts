import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "vertigo-pistol-rush-a",
  name: "Rush A con Way",
  category: "Pistol",
  team: "T",
  setup: "4 A / 1 Mid",
  description: "Rush a A por way con flashes coordinadas y molotov de CT.",
  minimumUtility: ["Flash way", "Flash stairs CT", "Molotov CT A"],
  timingWindows: "Entrar a 18-20s.",
  winCondition: "A plantado en el primer trade.",
  commonMistakes: ["Ir por way sin flash", "Agrupados en la escalera"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "vertigo-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "1 Stairs CT / 1 Mid / 2 A (way + ramp) / 1 B",
  description: "Setup CT conservador; stairs CT es el punto clave del pistol.",
  minimumUtility: ["Molotov way", "Flash mid"],
  winCondition: "Dos intercambios positivos.",
  roles: [],
};