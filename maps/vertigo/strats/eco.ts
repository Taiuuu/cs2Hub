import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "vertigo-eco-mid-pick",
  name: "Mid Pick + Rush A",
  category: "Eco",
  team: "T",
  setup: "2 Mid / 3 A",
  description: "Conseguir un pick en mid y luego rushear A con ventaja.",
  minimumUtility: ["Flash mid"],
  winCondition: "Pick en mid + A plantado.",
  roles: [],
};