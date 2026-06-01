import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "inferno-eco-banana-pick",
  name: "Banana Pick + Execute B",
  category: "Eco",
  team: "T",
  setup: "2 Banana / 3 B apoyo",
  description: "Conseguir un pick en banana y luego ejecutar B con ventaja.",
  minimumUtility: ["Smoke top banana"],
  winCondition: "Pick en banana + B plantado.",
  reactionTree: "Pick en banana -> execute B con ventaja; Sin pick -> rush B directo; CT aggression -> reset economía.",
  roles: [],
};