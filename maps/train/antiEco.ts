import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "train-antieco-ivy-hold",
  name: "Hold Ivy + B Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "3 Ivy-Upper A / 1 Mid / 1 B",
  description: "Colapsar sobre ivy si el eco intenta el rush A.",
  minimumUtility: ["Molotov ivy", "Flash upper A"],
  winCondition: "Eco muerto en ivy sin llegar a plantar.",
  roles: [],
};