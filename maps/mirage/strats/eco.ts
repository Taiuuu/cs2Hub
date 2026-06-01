import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "mirage-eco-mid-pick",
  name: "Mid Pick + Rush B",
  category: "Eco",
  team: "T",
  setup: "1 Mid AWP / 2 Mid apoyo / 2 B",
  description: "Conseguir un pick en mid-window con el AWP y luego ejecutar B.",
  minimumUtility: ["Smoke window"],
  winCondition: "Pick en window + B plantado.",
  reactionTree: "Pick en window -> 4 B immediate; Sin pick -> rush B directo; CT aggression -> reset economía.",
  roles: [],
};