import { Tactic } from "@/types";

export const tacticForce1: Tactic = {
  id: "anubis-force-b-water",
  name: "B Water Force",
  category: "Force",
  team: "T",
  setup: "4 Water / 1 Canal",
  description: "Forzar B water con SMGs aprovechando rutas cortas.",
  minimumUtility: ["Smoke CT B", "Flash water"],
  winCondition: "B plantado en los primeros trades.",
  timingWindows: "Entrar antes de 16s.",
  roles: [],
};