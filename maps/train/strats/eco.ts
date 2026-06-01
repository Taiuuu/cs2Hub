import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "train-eco-ivy-pick",
  name: "Ivy Pick + Execute A",
  category: "Eco",
  team: "T",
  setup: "2 Ivy / 3 A apoyo",
  description: "Pick en ivy con rifle eco y execute A con ventaja numérica.",
  minimumUtility: ["Smoke ivy CT"],
  winCondition: "Pick en ivy + A plantado.",
  reactionTree: "Pick en ivy -> execute A con smokes; Sin pick -> rush B por T-con; CT aggression -> reset económico.",
  roles: [],
};