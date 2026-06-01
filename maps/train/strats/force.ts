import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "train-force-b-smg",
  name: "Force B T-con SMG",
  category: "Force",
  team: "T",
  setup: "4 T-con / 1 Mid",
  description: "Forzar B por T-con con SMGs en una ronda de force buy.",
  minimumUtility: ["Smoke CT B", "Flash upper B"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 18s.",
  roles: [],
};