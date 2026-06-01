import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "ancient-antieco-hold-mid-b",
  name: "Hold Mid + B Two",
  category: "AntiEco",
  team: "CT",
  setup: "2 Mid / 1 A / 2 B",
  description: "Priorizar mid para cortar el split A del eco.",
  minimumUtility: ["Molotov main", "Flash open B"],
  winCondition: "Eco muerto en main o mid sin llegar a plantar.",
  roles: [],
};