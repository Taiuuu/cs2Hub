import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "cache-eco-mid-pick",
  name: "Mid Pick + Execute A",
  category: "Eco",
  team: "T",
  setup: "2 Mid / 3 A Main",
  description: "Pick en mid con rifle eco y execute A con ventaja numérica.",
  minimumUtility: ["Smoke CT mid"],
  winCondition: "Pick en mid + A plantado.",
  reactionTree: "Pick en mid -> execute A con squeaky; Sin pick -> rush B por cross; CT aggression -> reset económico.",
  roles: [],
};