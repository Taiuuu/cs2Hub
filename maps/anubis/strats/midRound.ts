import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "anubis-midround-b-quick",
  name: "B Quick after A Pressure",
  category: "MidRound",
  team: "T",
  description: "Generar presión rápida en A y girar a B si CT confirma rotación.",
  timingWindows: "Cambiar a B a 16-18s (Anubis tiene rotaciones muy cortas).",
  reactionTree: "CT rota a A -> rush B inmediato; CT no rota -> execute A; CT dividido -> explotar B que es el sitio más accesible.",
  roles: [],
};