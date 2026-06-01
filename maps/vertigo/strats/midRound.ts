import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "vertigo-midround-rotate-b",
  name: "Rotate B from A Pressure",
  category: "MidRound",
  team: "T",
  description: "Generar presión en A, forzar la rotación CT y girar a B.",
  timingWindows: "Cambiar a 18s si CT confirmó rotación a A.",
  reactionTree: "CT rota a A -> todos a B por scaffolding + ramp; CT no rota -> execute A completo; CT dividido -> explotar el lado más débil.",
  roles: [],
};