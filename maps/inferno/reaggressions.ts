import { Tactic } from "@/types";

export const tacticReaggression1: Tactic = {
  id: "inferno-ct-aggression-mid",
  name: "CT Aggression Mid",
  category: "Reaggression",
  team: "CT",
  setup: "2 Mid / 3 Banana",
  description: "Aggression de CT hacia mid para negar el control T y recuperar corto.",
  objectivePrincipal: "Tomar el control de mid e impedir el split A.",
  minimumUtility: ["Smoke mid", "Flash corto"],
  timingWindows: "Antes de 12s si mid está libre.",
  winCondition: "Pick en mid + control de corto.",
  reactionTree: "Mid despejado -> empujar hasta banco y negar T; T en mid -> retroceder a CT y mantener el ángulo; Banana presionada -> priorizar banana sobre mid.",
  roles: [],
};