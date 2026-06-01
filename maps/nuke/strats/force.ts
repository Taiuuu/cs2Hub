import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "nuke-force-outside",
  name: "Outside Force Buy",
  category: "Force",
  team: "T",
  setup: "4 Outside / 1 Secret",
  description: "Forzar outside con SMGs para conseguir picks y luego ejecutar A.",
  minimumUtility: ["Smoke outside CT", "Flash outside"],
  winCondition: "A plantado con ventaja de trade.",
  timingWindows: "Avanzar a outside antes de 15s.",
  roles: [],
};