import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "overpass-eco-agua-pick",
  name: "Agua Pick + Execute B",
  category: "Eco",
  team: "T",
  setup: "2 Agua / 3 B apoyo",
  description: "Pick en agua con rifle eco y execute B con ventaja.",
  minimumUtility: ["Molotov monster"],
  winCondition: "Pick en agua + B plantado.",
  reactionTree: "Pick en agua -> execute B; Sin pick -> rush B directo; CT aggression -> reset económico.",
  roles: [],
};