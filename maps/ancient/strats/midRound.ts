import { Tactic } from "@/types";

export const tacticMidRound1: Tactic = {
  id: "ancient-midround-fake-a-b",
  name: "Rotate to B from A Fake",
  category: "MidRound",
  team: "T",
  description: "Fake A con presión en main, forzar rotación CT y girar a B.",
  timingWindows: "Cambiar a B a los 18s cuando CT confirme rotación a A.",
  reactionTree: "CT rota a A -> todos a B con smokes completas; CT no rota -> execute A; CT dividido -> explotar el sitio más débil.",
  roles: [],
};