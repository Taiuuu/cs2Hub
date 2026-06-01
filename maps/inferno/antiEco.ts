import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "inferno-antieco-banana-hold",
  name: "Hold Banana + A Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "3 Banana / 1 Mid / 1 A",
  description: "Colapsar sobre banana si el eco intenta el rush B.",
  minimumUtility: ["Molotov banana", "Flash second oranges"],
  winCondition: "Eco muerto en banana sin llegar a plantar.",
  roles: [],
};