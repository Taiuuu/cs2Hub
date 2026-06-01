import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "overpass-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Short / 1 Mid",
  description: "Retake A usando short como entrada y CT spawn como flanqueo.",
  minimumUtility: ["Smoke fountain", "Flash site", "Molotov long"],
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Short libre -> entrar CT spawn y short; T en fountain -> smoke fountain y flanquear; T en heaven -> necesitás flash antes de asomarte.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "overpass-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Monster / 1 Toilets",
  description: "Retake B coordinado desde CT B y monster.",
  minimumUtility: ["Smoke site B", "Flash pillar", "Molotov agua"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Monster libre -> entrar CT B y monster; T en pillar -> smoke pillar y entrar; T consolida -> coordinar entrada doble con flash.",
  roles: [],
};