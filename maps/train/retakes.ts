import { Tactic } from "@/types";

export const tacticRetake1: Tactic = {
  id: "train-retake-a",
  name: "Retake A",
  category: "Retake",
  team: "CT",
  setup: "2 CT Spawn / 2 Upper A / 1 Popdog",
  description: "Retake A usando upper A como entrada y CT spawn como flanqueo.",
  minimumUtility: ["Smoke e-box", "Flash site A", "Molotov ivy"],
  timingWindows: "Iniciar retake a 22-25s.",
  winCondition: "A limpio con dos CTs vivos.",
  reactionTree: "Upper A libre -> entrada CT spawn y upper A; T en e-box -> smoke e-box y entrar; T en bomb train -> molotov bomb train antes de asomarte.",
  roles: [],
};

export const tacticRetake2: Tactic = {
  id: "train-retake-b",
  name: "Retake B",
  category: "Retake",
  team: "CT",
  setup: "2 CT B / 2 Upper B / 1 Mid",
  description: "Retake B coordinado desde CT B y upper B.",
  minimumUtility: ["Smoke site B", "Flash upper B", "Molotov hay"],
  winCondition: "B limpio con dos CTs vivos.",
  reactionTree: "Upper B libre -> entrar CT B y upper B; T en hay -> molotov hay y entrar; T consolida -> coordinar entrada doble con flash.",
  roles: [],
};