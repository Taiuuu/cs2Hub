import { Tactic } from "@/types";

export const tacticReaggression1: Tactic = {
  id: "cache-ct-aggression-mid",
  name: "Mid Aggression CT",
  category: "Reaggression",
  team: "CT",
  setup: "2 Mid / 3 A",
  description: "Aggression de CT en mid para negar el control T de highway.",
  objectivePrincipal: "Tomar control de highway e impedir el split A.",
  minimumUtility: ["Smoke T mid", "Flash highway"],
  timingWindows: "Antes de 12s si highway está libre.",
  winCondition: "Pick en highway + control de mid.",
  reactionTree: "Highway despejado -> pushear y negar T; T en mid -> retroceder a CT mid; B presionado -> priorizar B sobre mid.",
  roles: [],
};