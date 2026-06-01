import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "cache-midround-switch-b",
  name: "Switch B after A Pressure",
  category: "MidRound",
  team: "T",
  description: "Generar presión en A y girar a B si CT colapsa sobre A.",
  timingWindows: "Cambiar a B después de 18s si CT confirmó rotación a A.",
  reactionTree: "CT confirmado en A -> execute B por cross; CT no rota -> execute A completo; CT dividido -> explotar el lado más débil.",
  roles: [],
};