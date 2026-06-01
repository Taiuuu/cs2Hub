import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "mirage-force-b-apps",
  name: "B Apps Force",
  category: "Force",
  team: "T",
  setup: "4 Apps / 1 Mid",
  description: "Forzar B apps con SMGs aprovechando que la CT tenga armamento ligero.",
  minimumUtility: ["Smoke van", "Flash apps"],
  winCondition: "B plantado en los primeros trades.",
  timingWindows: "Entrar antes de 18s.",
  roles: [],
};