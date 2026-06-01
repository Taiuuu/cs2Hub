import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "ancient-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Temple / 1 Mid",
  description: "Retake A usando temple y CT spawn como entradas coordinadas.",
  minimumUtility: ["Smoke main", "Flash site", "Molotov ruins"],
  timingWindows: "Iniciar a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Main libre -> entrar desde temple y CT spawn; T en ruins -> molotov ruins antes de entrar; T en donut -> smoke donut y flanquear desde temple.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "ancient-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Open B / 1 Lurk Mid",
  description: "Retake B coordinado desde CT B y open B.",
  minimumUtility: ["Smoke site", "Flash ladder", "Molotov pit"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Open B libre -> entrar CT B y open B; T en pit -> molotov pit y flanquear; Ladder activa -> smoke ladder antes de entrar.",
  roles: [],
};