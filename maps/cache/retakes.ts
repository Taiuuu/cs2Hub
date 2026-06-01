import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "cache-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Heaven / 1 Mid-Squeaky",
  description: "Retake A usando heaven como entrada superior y CT spawn como flanqueo.",
  minimumUtility: ["Smoke quad", "Flash site A", "Molotov main"],
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Heaven libre -> entrada heaven y CT spawn; T en quad -> smoke quad y entrar; T en truck -> molotov truck antes de asomarte.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "cache-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Sun Room / 1 Mid",
  description: "Retake B coordinado desde CT B y sun room.",
  minimumUtility: ["Smoke cross", "Flash site B", "Molotov headshot"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Sun room libre -> entrar CT B y sun room; T en headshot -> molotov headshot y entrar; T consolida -> coordinar entrada doble con flash.",
  roles: [],
};