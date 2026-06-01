import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "anubis-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Palace / 1 Canal",
  description: "Retake A coordinado desde CT spawn y palace.",
  minimumUtility: ["Smoke site A", "Flash arches", "Molotov steps A"],
  timingWindows: "Iniciar a 21-24s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Palace libre -> entrar CT spawn y palace; T en arches -> smoke arches y flanquear; T consolida site -> smoke site y coordinar entrada doble.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "anubis-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Short B / 1 Canal",
  description: "Retake B usando CT B y short B como entradas.",
  minimumUtility: ["Smoke water", "Flash site B", "Molotov corner B"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Water libre -> entrar CT B y short B; T en corner B -> molotov corner y entrar; T en bridge -> smoke bridge y flanquear por CT B.",
  roles: [],
};