import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "overpass-force-b-smg",
  name: "Force B Agua SMG",
  category: "Force",
  team: "T",
  setup: "4 Agua / 1 Mid",
  description: "Forzar B por agua con SMGs en una ronda de force buy.",
  minimumUtility: ["Smoke monster", "Smoke CT B"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 20s.",
  roles: [],
};