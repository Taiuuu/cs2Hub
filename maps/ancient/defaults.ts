import { Tactic } from "@/types";

export const tacticDefault1: Tactic = {
  id: "ancient-default-2-1-2",
  name: "Default 2-1-2",
  category: "Default",
  team: "T",
  setup: "2 A Main / 1 Mid / 2 B",
  description: "Lectura de la CT con presencia en main, mid y B.",
  minimumUtility: ["Smoke donut", "Smoke mid CT", "Flash main"],
  timingWindows: "Decidir sitio entre 18-22s.",
  reactionTree: "Pick en mid -> split A con mid + main; Pick en donut -> execute A completo; Sin pick -> execute B con CT B y pit smokes.",
  postplant: "Cubrir desde donut y ruins.",
  roles: [],
};