import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "vertigo-antieco-hold-mid",
  name: "Hold Mid Two CT",
  category: "AntiEco",
  team: "CT",
  setup: "2 Mid / 3 A",
  description: "Priorizar el control de mid para evitar el split A del eco.",
  minimumUtility: ["Molotov mid T", "Flash stairs"],
  winCondition: "Eco no llega a mid o muere en el intento.",
  roles: [],
};