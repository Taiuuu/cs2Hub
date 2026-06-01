import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "ancient-eco-mid-pick",
  name: "Mid Pick + Execute A",
  category: "Eco",
  team: "T",
  setup: "2 Mid / 3 A Main",
  description: "Pick en mid y luego execute A con ventaja numérica.",
  minimumUtility: ["Smoke mid CT"],
  winCondition: "Pick en mid + A plantado.",
  roles: [],
};