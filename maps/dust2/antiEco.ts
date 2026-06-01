import { Tactic } from "@/types";

export const tacticAntiEco1: Tactic = {
  id: "dust2-antieco-b-info",
  name: "Setup B + Información de Largo",
  category: "AntiEco",
  team: "CT",
  setup: "3 B / 1 Largo / 1 Mid",
  description: "Colapsar sobre B si el eco intenta un rush, usando largo y mid para información.",
  minimumUtility: ["Molotov tunnels", "Flash upper B"],
  winCondition: "El eco no planta; si planta, retake inmediato con dos CTs vivos.",
  roles: [],
};