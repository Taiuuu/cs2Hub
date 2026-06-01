import { Tactic } from "@/types";

export const tacticProtocol1: Tactic = {
  id: "cache-execute-a-split",
  name: "Full Execute A Split",
  category: "Protocol",
  team: "T",
  setup: "2 Main / 2 Squeaky / 1 Lurk B",
  description: "Split A con smokes de heaven, CT A y squeaky simultáneo desde main.",
  objectivePrincipal: "Aislar A con entrada doble desde main y squeaky.",
  minimumUtility: ["Smoke heaven A", "Smoke CT A", "Smoke squeaky entry", "Flash main", "Molotov quad"],
  utilityLayering: "Smoke heaven A -> Smoke CT A -> Smoke squeaky entry -> Flash main -> Molotov quad -> Entrada doble",
  timingWindows: "Ejecutar a 22-24s.",
  winCondition: "A plantado en el centro con cuatro vivos.",
  failureStates: ["Heaven no smokado y el AWP está activo", "Squeaky bloqueado"],
  commonMistakes: ["Entrar por main sin smoke de heaven", "Squeaky sin apoyo de flash"],
  reactionTree: "Heaven fumado y CT A fumado -> entrada doble main + squeaky; CT aggression main -> esperar smoke y entrar por squeaky; Lurker B -> corta rotación CT.",
  postplant: "Cubrir desde quad y truck A.",
  roles: [],
};

export const tacticProtocol2: Tactic = {
  id: "cache-execute-b-cross",
  name: "Full Execute B Cross",
  category: "Protocol",
  team: "T",
  setup: "4 B Cross / 1 Mid Lurk",
  description: "Execute B por cross con smokes de headshot, CT B y sun room.",
  objectivePrincipal: "Tomar B site antes de que CT rote de A.",
  minimumUtility: ["Smoke headshot B", "Smoke CT B", "Flash cross", "Molotov close B"],
  utilityLayering: "Smoke headshot -> Smoke CT B -> Flash cross -> Molotov close B -> Entrada",
  timingWindows: "Entrar a 20-22s.",
  winCondition: "B plantado en el centro con tres vivos.",
  reactionTree: "CT B fumado -> entrada directa por cross; CT aggression cross -> retroceder y esperar; Lurker mid -> corta rotación CT.",
  postplant: "Cubrir desde headshot y sun room.",
  roles: [],
};