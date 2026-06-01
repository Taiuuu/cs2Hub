import { Tactic } from "@/types";

export const tacticReaggression1: Tactic = {
  id: "overpass-ct-aggression-monster",
  name: "Monster Aggression",
  category: "Reaggression",
  team: "CT",
  setup: "2 Monster / 3 A",
  description: "Aggression de CT en monster para negar el control T de agua.",
  objectivePrincipal: "Tomar control de monster e impedir el execute B.",
  minimumUtility: ["Smoke agua", "Flash monster entry"],
  timingWindows: "Antes de 12s si agua está libre.",
  winCondition: "Pick en agua + control de monster.",
  reactionTree: "Agua despejada -> pushear monster y negar T; T en agua -> retroceder a CT B y mantener ángulo; A presionado -> priorizar A sobre monster.",
  roles: [],
};