import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "anubis-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 A Palace / 1 Mid Canal / 2 B Water",
  description: "Lectura CT con presencia simultánea en ambos sitios y mid.",
  minimumUtility: ["Smoke arches A", "Smoke CT B", "Flash palace"],
  timingWindows: "Decidir sitio entre 17-21s.",
  reactionTree: "Pick en mid -> split A (palace + mid); Pick en palace -> execute A completo; Sin pick -> execute B con water + bridge.",
  postplant: "Cubrir desde palace y steps A.",
  roles: [],
};