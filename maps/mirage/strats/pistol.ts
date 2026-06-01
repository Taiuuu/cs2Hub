import { Tactic } from "@/types";

export const tacticPistol1: Tactic = {
  id: "mirage-pistol-rush-a",
  name: "Rush A con Palace",
  category: "Pistol",
  team: "T",
  setup: "5 A (3 palace / 2 ramp-stairs)",
  description: "Rush coordinado a A por palace con flashes y molotov de site.",
  minimumUtility: ["Flash palace", "Flash ticket", "Molotov site o CT"],
  timingWindows: "Entrar a 18-20s.",
  winCondition: "A plantado en el primer trade.",
  commonMistakes: ["Ir a palace de a uno", "No usar las flashes simultáneamente"],
  roles: [],
};

export const tacticPistol2: Tactic = {
  id: "mirage-pistol-ct-default",
  name: "CT Default Pistol",
  category: "Pistol",
  team: "CT",
  setup: "2 A (jungle + ticket) / 1 Mid / 2 B (van + short)",
  description: "Setup CT conservador que cubre todos los flancos sin over-aggression.",
  minimumUtility: ["Molotov ramp", "Flash mid"],
  winCondition: "Dos intercambios positivos antes de que el T plante.",
  roles: [],
};