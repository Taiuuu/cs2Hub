import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "overpass-antieco-agua-hold",
  name: "Hold Agua + A Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "3 Agua-Monster / 1 Mid / 1 A",
  description: "Colapsar sobre agua si el eco intenta el rush B.",
  minimumUtility: ["Molotov agua", "Flash monster"],
  winCondition: "Eco muerto en agua sin llegar a plantar.",
  roles: [],
};