import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "vertigo-force-b-scaffolding",
  name: "B Scaffolding Force",
  category: "Force",
  team: "T",
  setup: "4 Scaffolding / 1 Mid",
  description: "Forzar B por scaffolding con SMGs en una ronda de force buy.",
  minimumUtility: ["Smoke CT B", "Flash scaffolding"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 18s.",
  roles: [],
};