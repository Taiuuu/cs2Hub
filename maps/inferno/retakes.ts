import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "inferno-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Arch / 1 Mid",
  description: "Retake A usando arch como entrada principal y CT spawn como flanqueo.",
  minimumUtility: ["Smoke pit", "Flash site", "Molotov library"],
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Arch limpio -> entrada doble CT + arch; T en pit -> smoke pit y flanquear; T en library -> molotov library antes de entrar.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "inferno-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Banana / 1 Mid",
  description: "Retake B coordinado desde CT B y banana con flashes.",
  minimumUtility: ["Smoke site B", "Flash entrance", "Molotov coil"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Banana libre -> entrar CT B primero; T en car B -> smoke car y entrar; T consolida -> coordinar entrada doble con flash.",
  roles: [],
};