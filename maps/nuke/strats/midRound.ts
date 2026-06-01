import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "nuke-midround-switch-b",
  name: "Switch B after A Pressure",
  category: "MidRound",
  team: "T",
  description: "Generar presión en A por ramp y girar a B por secret si CT colapsa.",
  timingWindows: "Cambiar a B después de 18s si CT confirmó rotación a A.",
  reactionTree: "CT confirmado en A -> execute B por secret; CT dividido -> presionar el lado más débil; CT no rota -> execute A completo.",
  roles: [],
};