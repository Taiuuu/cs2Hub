import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "ancient-force-b",
  name: "B Force con SMG",
  category: "Force",
  team: "T",
  setup: "4 B / 1 Mid",
  description: "Forzar B con SMGs y utility mínima.",
  minimumUtility: ["Smoke CT B", "Flash open B"],
  winCondition: "B plantado en los primeros trades.",
  timingWindows: "Entrar antes de 18s.",
  roles: [],
};