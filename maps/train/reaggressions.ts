import { Tactic } from "@/types";

export const tacticReaggression1: Tactic = {
  id: "train-ct-aggression-ivy",
  name: "Ivy Aggression CT",
  category: "Reaggression",
  team: "CT",
  setup: "2 Ivy / 3 A",
  description: "Aggression de CT en ivy para negar el control T y conseguir picks early.",
  objectivePrincipal: "Tomar control de ivy e impedir el execute A.",
  minimumUtility: ["Smoke T-ivy", "Flash ivy entry"],
  timingWindows: "Antes de 12s si ivy está libre.",
  winCondition: "Pick en ivy + control de upper A.",
  reactionTree: "Ivy despejado -> pushear y negar T; T en ivy -> retroceder a upper A; B presionado -> priorizar B.",
  roles: [],
};