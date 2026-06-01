import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "inferno-midround-fake-b-a",
  name: "Fake B -> Rotate A",
  category: "MidRound",
  team: "T",
  description: "Generar presión en banana, forzar rotación CT a B y girar a A.",
  timingWindows: "Cambiar a A después de 18s si CT confirmó rotación a B.",
  reactionTree: "CT confirmado en B -> todos rotan a A inmediato; CT no rota -> execute B con ventaja; CT dividido -> explotar el sitio más débil.",
  roles: [],
};