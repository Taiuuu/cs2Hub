import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "nuke-eco-ramp-pick",
  name: "Ramp Pick + Execute A",
  category: "Eco",
  team: "T",
  setup: "2 Ramp / 3 Outside apoyo",
  description: "Pick en ramp con rifle eco y execute A con ventaja.",
  minimumUtility: ["Flash ramp"],
  winCondition: "Pick en ramp + A plantado.",
  reactionTree: "Pick en ramp -> execute A; Sin pick -> execute B por secret; CT aggression -> reset económico.",
  roles: [],
};