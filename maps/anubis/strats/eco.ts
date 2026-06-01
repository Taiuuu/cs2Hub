import { Tactic } from "@/types";

export const tacticEco1: Tactic = {
  id: "anubis-eco-mid-pick",
  name: "Mid Pick + Rush B",
  category: "Eco",
  team: "T",
  setup: "1 Mid / 4 B Water",
  description: "Pick en mid con rifle eco y rush B con el resto del equipo.",
  minimumUtility: ["Flash mid"],
  winCondition: "Pick en mid + B plantado.",
  roles: [],
};