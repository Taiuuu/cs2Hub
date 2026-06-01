import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "train-midround-switch-b",
  name: "Switch B after A Pressure",
  category: "MidRound",
  team: "T",
  description: "Generar presión en A por ivy y girar a B si CT colapsa.",
  timingWindows: "Cambiar a B después de 18s si CT confirmó rotación a A.",
  reactionTree: "CT confirmado en A -> execute B por T-con; CT no rota -> execute A completo; CT dividido -> explotar el lado más débil.",
  roles: [],
};