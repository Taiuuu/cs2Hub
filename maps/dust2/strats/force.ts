import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "dust2-force-b-smg",
  name: "Force B con SMG",
  category: "Force",
  team: "T",
  setup: "5 B",
  description: "Rush B con SMGs aprovechando que el CT probablemente tenga escopetas o pistolas mejoradas.",
  minimumUtility: ["Smoke puerta", "Flash upper"],
  winCondition: "B plantado con ventaja de trade.",
  timingWindows: "Entrar antes de 18s para pillar al CT despistado.",
  roles: [],
};