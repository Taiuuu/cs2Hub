import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "nuke-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Heaven / 1 Squeaky",
  description: "Retake A usando heaven como entrada superior y CT spawn como flanqueo.",
  minimumUtility: ["Smoke site A", "Flash ramp", "Molotov trophy"],
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Heaven libre -> entrada desde heaven y CT spawn; T en hut -> molotov hut y entrar; T consolida site -> smoke site y coordinar entrada doble.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "nuke-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Hell / 1 Vents",
  description: "Retake B coordinado desde CT B y hell con flashes.",
  minimumUtility: ["Smoke site B", "Flash hell entrance", "Molotov secret"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Hell libre -> entrar CT B y hell; T en secret -> smoke secret y flanquear; Vents disponible -> usar vents para sorprender.",
  roles: [],
};