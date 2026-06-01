import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "nuke-antieco-ramp-aggression",
  name: "Ramp Aggression",
  category: "AntiEco",
  team: "CT",
  setup: "3 Ramp / 2 Heaven",
  description: "Aggression masiva de CT en ramp para matar el eco en lobby.",
  minimumUtility: ["Flash lobby", "Molotov ramp entry"],
  winCondition: "Eco muerto antes de llegar a los sitios.",
  commonMistakes: ["Over-aggression sin trade", "No retroceder si el eco tiene rifles"],
  roles: [],
};