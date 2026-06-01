import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "dust2-midround-rotate-a",
  name: "Rotate A from B Pressure",
  category: "MidRound",
  team: "T",
  description: "Después de generar presión en B, rotar a A aprovechando la rotación del CT.",
  timingWindows: "Cambiar a A después de 18s si CT confirmó rotación a B.",
  reactionTree: "CT confirmado en B -> todos rotan a A inmediato; CT no rota -> ejecutar B con ventaja numérica; CT dividido -> explotar el sitio más débil.",
  roles: [],
};