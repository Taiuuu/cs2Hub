import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "anubis-antieco-hold-mid-a",
  name: "Hold Mid + A Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "2 Mid / 3 A",
  description: "Priorizar mid para evitar el split A del eco.",
  minimumUtility: ["Molotov palace", "Flash mid"],
  winCondition: "Eco muerto en palace o mid sin plantar.",
  roles: [],
};