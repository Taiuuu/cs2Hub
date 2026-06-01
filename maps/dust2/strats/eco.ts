import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "dust2-eco-mid-pick",
  name: "Mid Pick + Rush",
  category: "Eco",
  team: "T",
  setup: "2 Mid / 3 B",
  description: "Conseguir un pick en mid con el rifle eco y luego ejecutar B con ventaja.",
  minimumUtility: ["Flash ventanas"],
  winCondition: "Pick en mid + B plantado.",
  reactionTree: "Pick en mid -> 5 B con ventaja numérica; Sin pick -> rush B directo a 22s; CT reaggression -> reset y jugar económico.",
  roles: [],
};