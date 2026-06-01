import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "cache-antieco-mid-hold",
  name: "Hold Mid + B Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "2 Mid / 1 A / 2 B",
  description: "Priorizar mid para evitar que el eco tome highway y prepare el split A.",
  minimumUtility: ["Molotov highway", "Flash cross B"],
  winCondition: "Eco muerto en mid o cross sin llegar a plantar.",
  roles: [],
};