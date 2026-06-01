import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "mirage-midround-backdoor-b",
  name: "Backdoor B desde Mid",
  category: "MidRound",
  team: "T",
  description: "Después de generar presión en A con palace, girar a B por mid-connector.",
  timingWindows: "Cambiar a 18s si CT rota a A.",
  reactionTree: "CT rota a A -> pasar connector a B rápido; CT no rota -> ejecutar A con palace + ramp; CT dividido -> explotar con el grupo más numeroso.",
  roles: [],
};