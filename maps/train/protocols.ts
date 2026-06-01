import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "train-execute-a-full",
  name: "Full Execute A",
  category: "Protocol",
  team: "T",
  setup: "3 Ivy / 2 Popdog",
  description: "Execute A con smokes de ivy, upper A, CT A y popdog simultáneo.",
  objectivePrincipal: "Tomar A site con crossfire desde ivy y popdog.",
  minimumUtility: ["Smoke ivy CT", "Smoke upper A", "Smoke CT A", "Flash ivy entry", "Molotov e-box"],
  utilityLayering: "Smoke ivy CT -> Smoke upper A -> Smoke CT A -> Flash ivy -> Molotov e-box -> Entrada",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado en bomb train con cuatro vivos.",
  failureStates: ["Upper A no smokado y el AWP está activo", "Ivy sin smoke de CT"],
  commonMistakes: ["Entrar por ivy sin smoke de upper A", "Popdog sin apoyo de flash"],
  reactionTree: "Upper A fumado y CT A fumado -> entrada doble ivy + popdog; CT aggression ivy -> esperar smoke y entrar por popdog; Lurker B -> corta rotación CT.",
  postplant: "Cubrir desde e-box y lower A.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "train-execute-b-full",
  name: "Full Execute B",
  category: "Protocol",
  team: "T",
  setup: "3 T-con / 2 Ladder",
  description: "Execute B por T-con y ladder room con smokes de CT B y hay.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke CT B", "Smoke hay", "Flash upper B", "Molotov olof boost"],
  utilityLayering: "Smoke CT B -> Smoke hay -> Flash upper B -> Molotov olof boost -> Entrada",
  timingWindows: "Entrar a 20-22s.",
  winCondition: "B plantado en el centro con tres vivos.",
  reactionTree: "CT B fumado -> entrada T-con y ladder simultánea; CT aggression T-con -> retroceder y esperar; Lurker mid -> corta rotación CT.",
  postplant: "Cubrir desde hay y upper B.",
  roles: [],
};