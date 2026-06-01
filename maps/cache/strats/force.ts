import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "cache-force-b-smg",
  name: "Force B Cross SMG",
  category: "Force",
  team: "T",
  setup: "4 B Cross / 1 Mid",
  description: "Forzar B por cross con SMGs en una ronda de force buy.",
  minimumUtility: ["Smoke CT B", "Flash cross"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 18s.",
  roles: [],
};