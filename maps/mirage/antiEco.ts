import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "mirage-antieco-hold-mid-b",
  name: "Hold Mid + B Two",
  category: "AntiEco",
  team: "CT",
  setup: "2 Mid (ventana + short) / 1 A / 2 B",
  description: "Priorizar el control de mid para evitar que el eco tome connector.",
  minimumUtility: ["Molotov top mid", "Flash short mid"],
  winCondition: "Eco no llega a connector; si intenta B, dos CTs están listos.",
  roles: [],
};