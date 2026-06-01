import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "vertigo-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 A (ramp + side) / 1 Mid / 2 B (scaffolding + ramp B)",
  description: "Lectura CT con presencia en los tres flancos del mapa.",
  minimumUtility: ["Smoke stairs CT", "Flash mid"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en mid -> split A con mid + ramp; Pick en side A -> execute A completo; Sin pick -> execute B con scaffolding + ramp.",
  postplant: "Cubrir desde way y ramp A.",
  roles: [],
};