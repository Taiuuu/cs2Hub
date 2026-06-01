import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "inferno-force-banana-smg",
  name: "Force B Banana SMG",
  category: "Force",
  team: "T",
  setup: "4 Banana / 1 Mid",
  description: "Forzar B por banana con SMGs en una ronda de force buy.",
  minimumUtility: ["Smoke CT B", "Molotov second oranges"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 20s.",
  roles: [],
};